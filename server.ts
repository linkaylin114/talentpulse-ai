import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Google GenAI on server
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes

/**
 * 1. AI Parse CV and Evaluate Against Job Description Criteria
 */
app.post('/api/gemini/parse-and-evaluate-cv', async (req, res) => {
  try {
    const { cvText, jobTitle, jobRequirements, criteriaList } = req.body;

    if (!cvText) {
      return res.status(400).json({ error: 'Nội dung CV không được để trống' });
    }

    const prompt = `
Bạn là chuyên gia Tuyển dụng Nhân sự cấp cao (Senior Technical Recruiter) và Chuyên gia Đánh giá Năng lực Ứng viên.
Hãy phân tích kỹ lưỡng CV sau đây và đối chiếu với Bản mô tả công việc (JD) cùng các tiêu chí tuyển dụng.

--- THÔNG TIN VỊ TRÍ TUYỂN DỤNG ---
Vị trí: ${jobTitle || 'Không xác định'}
Mô tả & Yêu cầu:
${jobRequirements || 'Yêu cầu kỹ năng và kinh nghiệm phù hợp với vị trí'}

Danh sách tiêu chí đánh giá trọng yếu:
${JSON.stringify(criteriaList || [], null, 2)}

--- NỘI DUNG CV CỦA ỨNG VIÊN ---
${cvText}

--- YÊU CẦU ĐÁNH GIÁ ---
1. Trích xuất thông tin ứng viên: Họ tên, Email, Số điện thoại, Vị trí hiện tại, Số năm kinh nghiệm, Trình độ học vấn, Danh sách kỹ năng cứng, Kỹ năng mềm, Chứng chỉ, Lịch sử làm việc tóm tắt, Điểm mạnh chính, Điểm yếu/Hạn chế.
2. Đối chiếu từng tiêu chí trong danh sách criteriaList:
   - status: "Đạt" | "Đạt một phần" | "Chưa đạt"
   - score: từ 0 đến 100
   - evidence: trích dẫn dẫn chứng hoặc dữ kiện cụ thể từ CV
   - notes: phân tích lý do ngắn gọn, khách quan
3. Điểm tổng hợp (overallScore: 0 - 100).
4. Mức độ đáp ứng (matchLevel: "Cao" | "Trung bình" | "Thấp").
5. Đề xuất quyết định (recommendation: "Tuyển dụng ngay" | "Rất tiềm năng" | "Cân nhắc phỏng vấn" | "Không phù hợp").
6. Tóm tắt nhận định tổng quan (summaryAssessment) bằng tiếng Việt rõ ràng, khách quan.
7. Gợi ý 3 câu hỏi phỏng vấn đào sâu dựa trên các điểm còn mâu thuẫn hoặc chưa rõ ràng trong CV (suggestedInterviewQuestions).

Trả về kết quả chuẩn định dạng JSON.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            extractedInfo: {
              type: Type.OBJECT,
              properties: {
                fullName: { type: Type.STRING },
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                currentRole: { type: Type.STRING },
                yearsOfExperience: { type: Type.NUMBER },
                summary: { type: Type.STRING },
                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                softSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                languages: { type: Type.ARRAY, items: { type: Type.STRING } },
                certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                education: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      degree: { type: Type.STRING },
                      school: { type: Type.STRING },
                      year: { type: Type.STRING },
                    },
                    required: ['degree', 'school'],
                  },
                },
                workExperience: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      role: { type: Type.STRING },
                      company: { type: Type.STRING },
                      period: { type: Type.STRING },
                      description: { type: Type.STRING },
                    },
                    required: ['role', 'company'],
                  },
                },
              },
              required: ['fullName', 'skills', 'yearsOfExperience'],
            },
            aiAnalysis: {
              type: Type.OBJECT,
              properties: {
                overallScore: { type: Type.NUMBER },
                matchLevel: { type: Type.STRING },
                recommendation: { type: Type.STRING },
                summaryAssessment: { type: Type.STRING },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                gapsOrConcerns: { type: Type.ARRAY, items: { type: Type.STRING } },
                suggestedInterviewQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                criteriaEvaluations: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      criterionName: { type: Type.STRING },
                      status: { type: Type.STRING },
                      score: { type: Type.NUMBER },
                      evidence: { type: Type.STRING },
                      notes: { type: Type.STRING },
                    },
                    required: ['criterionName', 'status', 'score', 'evidence', 'notes'],
                  },
                },
              },
              required: [
                'overallScore',
                'matchLevel',
                'recommendation',
                'summaryAssessment',
                'criteriaEvaluations',
                'strengths',
                'gapsOrConcerns',
              ],
            },
          },
          required: ['extractedInfo', 'aiAnalysis'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error parsing CV with Gemini:', error);
    return res.status(500).json({
      error: 'Không thể phân tích CV bằng AI lúc này',
      details: error.message,
    });
  }
});

/**
 * 2. Generate Interactive Online Competency Test based on Job Description
 */
app.post('/api/gemini/generate-test', async (req, res) => {
  try {
    const { jobTitle, level, focusAreas, numQuestions } = req.body;

    const count = numQuestions || 5;
    const prompt = `
Bạn là chuyên gia khảo thí tuyển dụng. Hãy tạo bài test năng lực trắc nghiệm trực tuyến (${count} câu hỏi) cho vị trí "${jobTitle || 'Chuyên viên kỹ thuật'}", cấp bậc "${level || 'Middle/Senior'}".
Lĩnh vực trọng tâm: ${focusAreas || 'Kỹ năng chuyên môn, giải quyết vấn đề thực tế, tư duy logic'}.

Mỗi câu hỏi cần:
- question: Câu hỏi rõ ràng, có tình huống thực tế (case scenario).
- options: 4 lựa chọn (A, B, C, D).
- correctIndex: Chỉ số đáp án đúng (0, 1, 2, hoặc 3).
- explanation: Lời giải thích cặn kẽ tại sao đáp án này là tối ưu trong môi trường doanh nghiệp thực tế.
- topic: Phân loại kỹ năng (ví dụ: "Kiến trúc hệ thống", "Tối ưu hiệu năng", "Kỹ năng phân tích", v.v.).

Ngôn ngữ: Tiếng Việt chuẩn.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            testTitle: { type: Type.STRING },
            durationMinutes: { type: Type.NUMBER },
            passingScore: { type: Type.NUMBER },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  topic: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctIndex: { type: Type.NUMBER },
                  explanation: { type: Type.STRING },
                },
                required: ['question', 'options', 'correctIndex', 'explanation', 'topic'],
              },
            },
          },
          required: ['testTitle', 'durationMinutes', 'passingScore', 'questions'],
        },
      },
    });

    const testData = JSON.parse(response.text || '{}');
    return res.json({ success: true, test: testData });
  } catch (error: any) {
    console.error('Error generating assessment test:', error);
    return res.status(500).json({
      error: 'Không thể tạo bài test bằng AI',
      details: error.message,
    });
  }
});

/**
 * 3. Generate Personalized Recruitment Email (Interview / Offer / Rejection / Test)
 */
app.post('/api/gemini/generate-email', async (req, res) => {
  try {
    const { emailType, candidateName, jobTitle, companyName, extraDetails, tone } = req.body;

    const prompt = `
Bạn là Giám đốc Nhân sự chuyên nghiệp tại công ty ${companyName || 'Công nghệ TalentPulse'}.
Hãy soạn một email tuyển dụng gửi cho ứng viên ${candidateName || 'Ứng viên'}.

- Loại email: ${emailType} (Ví dụ: "interview_invite" - Mời phỏng vấn, "offer" - Thư mời nhận việc / Thư mời trúng tuyển, "rejection" - Thư cảm ơn & thông báo từ chối tinh tế, "assessment_invite" - Mời làm bài test năng lực trực tuyến)
- Vị trí ứng tuyển: ${jobTitle}
- Tông giọng (tone): ${tone || 'Trang trọng, ấm áp, khích lệ và chuyên nghiệp'}
- Dữ liệu bổ sung: ${JSON.stringify(extraDetails || {})}

Yêu cầu:
- Email bằng tiếng Việt chuẩn mực, tôn trọng ứng viên, đại diện văn hóa doanh nghiệp hiện đại.
- Nếu là thư từ chối, cần lịch sự, trân trọng thời gian ứng viên đã dành cho công ty, và ngỏ ý lưu hồ sơ vào Talent Pool cho các cơ hội tương lai.
- Trả về subject (tiêu đề email) và htmlContent (nội dung HTML sạch sẽ với các thẻ <p>, <ul>, <li>, <strong>) và plainTextContent.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            htmlContent: { type: Type.STRING },
            plainTextContent: { type: Type.STRING },
          },
          required: ['subject', 'htmlContent', 'plainTextContent'],
        },
      },
    });

    const emailData = JSON.parse(response.text || '{}');
    return res.json({ success: true, email: emailData });
  } catch (error: any) {
    console.error('Error generating email draft:', error);
    return res.status(500).json({
      error: 'Không thể soạn email bằng AI',
      details: error.message,
    });
  }
});

/**
 * 4. LinkedIn Profile Quick Scraper / Sourcing Extractor
 */
app.post('/api/gemini/scrape-linkedin', async (req, res) => {
  try {
    const { linkedinInput } = req.body;

    if (!linkedinInput) {
      return res.status(400).json({ error: 'Dữ liệu hoặc liên kết LinkedIn không được để trống' });
    }

    const prompt = `
Bạn là chuyên gia Headhunter & Talent Sourcing. Dưới đây là thông tin profile LinkedIn được thu thập (có thể là đường dẫn URL, bản tóm tắt profile, hoặc chuỗi văn bản copy từ trang cá nhân LinkedIn):

${linkedinInput}

Hãy phân tích và trích xuất thành hồ sơ ứng viên tiêu chuẩn:
- Họ tên (fullName)
- Tiêu đề nghề nghiệp / Headline hiện tại (headline)
- Vị trí đề xuất phù hợp (targetRole)
- Công ty hiện tại / gần nhất (currentCompany)
- Địa điểm (location)
- Số năm kinh nghiệm ước tính (yearsOfExperience)
- Tóm tắt tiểu sử nghề nghiệp (summary)
- Danh sách kỹ năng chính (skills)
- Học vấn (education)
- Lịch sử công việc (workHistory)
- Mức độ tiềm năng (sourcingRating: 1 - 5 sao)

Trả về JSON.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fullName: { type: Type.STRING },
            headline: { type: Type.STRING },
            targetRole: { type: Type.STRING },
            currentCompany: { type: Type.STRING },
            location: { type: Type.STRING },
            yearsOfExperience: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            sourcingRating: { type: Type.NUMBER },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  degree: { type: Type.STRING },
                  school: { type: Type.STRING },
                  year: { type: Type.STRING },
                },
                required: ['degree', 'school'],
              },
            },
            workHistory: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  company: { type: Type.STRING },
                  period: { type: Type.STRING },
                },
                required: ['role', 'company'],
              },
            },
          },
          required: ['fullName', 'headline', 'skills', 'yearsOfExperience', 'targetRole'],
        },
      },
    });

    const parsedProfile = JSON.parse(response.text || '{}');
    return res.json({ success: true, profile: parsedProfile });
  } catch (error: any) {
    console.error('Error extracting LinkedIn profile:', error);
    return res.status(500).json({
      error: 'Không thể xử lý profile LinkedIn lúc này',
      details: error.message,
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
