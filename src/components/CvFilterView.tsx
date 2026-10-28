import React, { useState, useRef } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Send,
  Calendar,
  BookmarkCheck,
  ChevronRight,
  UploadCloud,
  RefreshCw,
  Star,
  Check,
  FileUp,
  MessageSquareQuote,
  Target,
  Clock,
  ShieldCheck,
  Paperclip,
  Eye,
  FileSearch,
  ArrowRight,
  Sliders,
  Layers,
} from 'lucide-react';
import { Candidate, Job, CriterionEvaluation, RecruitmentStage } from '../types/recruitment';

interface CvFilterViewProps {
  candidates: Candidate[];
  jobs: Job[];
  selectedJobId: string;
  onUpdateCandidateStage: (candidateId: string, newStage: RecruitmentStage) => void;
  onSaveToTalentPool: (candidateId: string, tags: string[], rating: number) => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
  onOpenEmailModal: (candidate: Candidate) => void;
  onAddNewCandidate: (candidate: Candidate) => void;
}

export const CvFilterView: React.FC<CvFilterViewProps> = ({
  candidates,
  jobs,
  selectedJobId,
  onUpdateCandidateStage,
  onSaveToTalentPool,
  onOpenScheduleModal,
  onOpenEmailModal,
  onAddNewCandidate,
}) => {
  const eligibleCandidates = candidates.filter(
    (c) => selectedJobId === 'all' || c.appliedJobId === selectedJobId
  );

  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    eligibleCandidates[0]?.id || candidates[0]?.id || ''
  );

  const selectedCandidate =
    candidates.find((c) => c.id === selectedCandidateId) || eligibleCandidates[0];

  // Active Job for matching
  const [targetJobId, setTargetJobId] = useState<string>(
    selectedJobId !== 'all' ? selectedJobId : jobs[0]?.id || ''
  );
  const targetJob = jobs.find((j) => j.id === targetJobId) || jobs[0];

  // Tab mode: 'inspect' (examine candidate) vs 'upload_new' (upload file & match)
  const [activeMode, setActiveMode] = useState<'inspect' | 'upload_new'>('inspect');

  // File Upload & Multi-step Screening State
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    type: string;
    base64?: string;
  } | null>(null);

  const [uploadStep, setUploadStep] = useState<1 | 2 | 3>(1);
  const [extractedRawText, setExtractedRawText] = useState('');
  const [isExtractingText, setIsExtractingText] = useState(false);
  const [isMatchingJd, setIsMatchingJd] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Talent Pool quick prompt state
  const [showTalentPoolPrompt, setShowTalentPoolPrompt] = useState(false);
  const [talentPoolRating, setTalentPoolRating] = useState(4);
  const [talentPoolTagInput, setTalentPoolTagInput] = useState('Top Candidate, Fast Onboard');

  // Sample files for quick one-click testing
  const samplePdfs = [
    {
      name: 'CV_DoanThanhTung_Digital_Growth_Lead.pdf',
      size: '245 KB',
      type: 'application/pdf',
      text: `HỌ VÀ TÊN: ĐOÀN THANH TÙNG
Vị trí ứng tuyển: Senior Digital Marketing Manager
Email: tung.doan.growth@gmail.com | SĐT: 0938 112 233 | TP. Hà Nội
Kinh nghiệm: 5 năm kinh nghiệm chuyên sâu Digital Marketing, Growth Hacking & Paid Ads.

TÓM TẮT NĂNG LỰC:
- 5 năm kinh nghiệm hoạch định chiến lược tiếp thị số cho sàn thương mại điện tử và sản phẩm công nghệ.
- Từng quản lý ngân sách quảng cáo hơn 1 tỷ VNĐ/tháng trên Facebook Ads, Google Ads và TikTok Ads.
- Đạt ROAS trung bình 4.5x, tối ưu chi phí thu hút khách hàng CAC giảm 25%.
- Thành thạo thiết lập tracking GA4, Google Tag Manager và trực quan hóa dashboard trên Looker Studio.
- Tiếng Anh: TOEIC 860, giao tiếp trôi chảy và làm việc hiệu quả với các đối tác truyền thông quốc tế.

KINH NGHIỆM LÀM VIỆC:
1. Senior Digital Marketing Specialist tại SmartTech Ecom (2022 - Nay)
- Dẫn dắt nhóm 5 chuyên viên phụ trách toàn bộ kênh Paid Ads và Inbound Funnel.
- Tối ưu tỷ lệ chuyển đổi CRO cho Landing page tăng 32%.
2. Digital Marketer tại CleverAds (2019 - 2022)
- Triển khai chiến dịch quảng cáo chuyển đổi cho các đối tác Ngân hàng và Bán lẻ.

HỌC VẤN:
- Cử nhân Quản trị Kinh doanh - Đại học Ngoại Thương Hà Nội (2015 - 2019)`,
    },
    {
      name: 'CV_NguyenThiHuyen_Content_Brand_Lead.pdf',
      size: '310 KB',
      type: 'application/pdf',
      text: `HỌ VÀ TÊN: NGUYỄN THỊ HUYỀN
Vị trí: Content Marketing & Brand Communications Lead
Email: huyen.nguyen.brand@gmail.com | SĐT: 0914 999 888 | TP. Hồ Chí Minh
Kinh nghiệm: 4.5 năm kinh nghiệm xây dựng thương hiệu và sáng tạo nội dung đa kênh.

TÓM TẮT:
- 4.5 năm kinh nghiệm sáng tạo nội dung và quản trị thương hiệu tại Brand và Creative Agency.
- Chủ trì các chiến dịch truyền thông đa nền tảng đạt trên 10 triệu lượt tiếp cận tự nhiên.
- Thành thạo xây dựng chiến lược Inbound Marketing, Content Pillar, tối ưu SEO Content.
- Có kỹ năng quản lý mạng lưới KOLs/KOCs và giám sát chất lượng sản xuất video ngắn TikTok/YouTube.

KINH NGHIỆM:
1. Senior Content Lead tại CreativeHouse (2022 - Nay)
- Phụ trách chiến lược truyền thông thương hiệu cho các nhãn hàng F&B và Bán lẻ tiêu dùng.
2. Content Strategist tại VinaMedia (2020 - 2022)
- Phát triển Fanpage và kênh TikTok đạt hơn 500,000 người theo dõi tự nhiên.

HỌC VẤN:
- Cử nhân Báo chí & Truyền thông - Đại học KHXH&NV TP.HCM (2016 - 2020)`,
    },
  ];

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      setUploadedFile({
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type || 'application/pdf',
        base64,
      });
      setUploadError(null);
      setExtractedRawText('');
      setUploadStep(1);
    };

    reader.readAsDataURL(file);
  };

  const handlePickSampleFile = (sample: (typeof samplePdfs)[0]) => {
    setUploadedFile({
      name: sample.name,
      size: sample.size,
      type: sample.type,
      base64: btoa(unescape(encodeURIComponent(sample.text))),
    });
    setExtractedRawText(sample.text);
    setUploadError(null);
    setUploadStep(2);
  };

  const handleExtractTextFromFile = async () => {
    if (!uploadedFile) {
      setUploadError('Vui lòng chọn hoặc tải lên tệp CV trước');
      return;
    }

    setIsExtractingText(true);
    setUploadError(null);

    try {
      const response = await fetch('/api/gemini/extract-text-from-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileBase64: uploadedFile.base64,
          mimeType: uploadedFile.type,
          fileName: uploadedFile.name,
        }),
      });

      const data = await response.json();
      if (!data.success || !data.extractedText) {
        throw new Error(data.error || 'Không thể trích xuất văn bản từ tệp');
      }

      setExtractedRawText(data.extractedText);
      setUploadStep(2);
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Lỗi đọc tệp tin. Vui lòng kiểm tra lại định dạng tệp.');
    } finally {
      setIsExtractingText(false);
    }
  };

  const handleMatchWithJd = async () => {
    if (!extractedRawText.trim()) {
      setUploadError('Vui lòng hoàn thành bước trích xuất văn bản trước');
      return;
    }

    setIsMatchingJd(true);
    setUploadError(null);

    try {
      const response = await fetch('/api/gemini/parse-and-evaluate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvText: extractedRawText,
          jobTitle: targetJob.title,
          jobRequirements: targetJob.description + '\n' + targetJob.requirements.join('\n'),
          criteriaList: targetJob.criteria,
        }),
      });

      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Lỗi đối chiếu JD');
      }

      const { extractedInfo, aiAnalysis } = result.data;

      const newCand: Candidate = {
        id: `cand-${Date.now()}`,
        name: extractedInfo.fullName || 'Ứng viên mới',
        email: extractedInfo.email || 'candidate@email.com',
        phone: extractedInfo.phone || '0900 000 000',
        avatar: `https://images.unsplash.com/photo-${1534528741775 + (candidates.length % 5)}?w=150&auto=format&fit=crop&q=80`,
        appliedJobId: targetJob.id,
        appliedJobTitle: targetJob.title,
        appliedDate: new Date().toISOString().split('T')[0],
        source: 'Tải lên CV (File Upload)',
        sourceFileName: uploadedFile?.name || 'Uploaded_CV.pdf',
        rawCvText: extractedRawText,
        extractedInfo: {
          fullName: extractedInfo.fullName || 'Ứng viên',
          email: extractedInfo.email || 'candidate@email.com',
          phone: extractedInfo.phone || '0900 000 000',
          currentRole: extractedInfo.currentRole || targetJob.title,
          yearsOfExperience: extractedInfo.yearsOfExperience || 3,
          summary: extractedInfo.summary || 'Trích xuất từ tệp hồ sơ',
          skills: extractedInfo.skills || [],
          softSkills: extractedInfo.softSkills || [],
          languages: extractedInfo.languages || ['Tiếng Việt'],
          certifications: extractedInfo.certifications || [],
          education: extractedInfo.education || [],
          workExperience: extractedInfo.workExperience || [],
        },
        aiAnalysis: {
          overallScore: aiAnalysis.overallScore || 85,
          matchLevel: (aiAnalysis.matchLevel as any) || 'Cao',
          recommendation: (aiAnalysis.recommendation as any) || 'Cân nhắc phỏng vấn',
          summaryAssessment: aiAnalysis.summaryAssessment || 'Đã phân tích hồ sơ.',
          strengths: aiAnalysis.strengths || [],
          gapsOrConcerns: aiAnalysis.gapsOrConcerns || [],
          suggestedInterviewQuestions: aiAnalysis.suggestedInterviewQuestions || [],
          criteriaEvaluations: aiAnalysis.criteriaEvaluations || [],
        },
        stage: 'cv_filter',
        emailLogs: [],
        notes: [
          {
            id: `note-${Date.now()}`,
            author: 'AI Screening System',
            createdAt: 'Vừa xong',
            content: `Tự động trích xuất từ file ${uploadedFile?.name || 'CV'}. Đối chiếu JD: ${targetJob.title}. Điểm: ${aiAnalysis.overallScore}/100`,
          },
        ],
      };

      onAddNewCandidate(newCand);
      setSelectedCandidateId(newCand.id);
      setActiveMode('inspect');
      setUploadStep(1);
      setUploadedFile(null);
      setExtractedRawText('');
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Lỗi đối chiếu tiêu chí JD');
    } finally {
      setIsMatchingJd(false);
    }
  };

  const aiAnalysis = selectedCandidate?.aiAnalysis;
  const overallScore = aiAnalysis?.overallScore || 0;

  const scoreBadgeColor =
    overallScore >= 90
      ? 'from-emerald-400 via-teal-300 to-emerald-500'
      : overallScore >= 80
      ? 'from-indigo-400 via-blue-300 to-indigo-500'
      : overallScore >= 65
      ? 'from-amber-400 via-yellow-300 to-amber-500'
      : 'from-rose-400 via-pink-300 to-rose-500';

  return (
    <div className="space-y-6">
      {/* Top Controls: Mode Switcher & Candidate Filter */}
      <div className="glass-panel rounded-3xl p-5 shadow-sm border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-700 rounded-2xl border border-indigo-200 shadow-xs">
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              Lọc CV Tự Động & Đối Chiếu Tiêu Chí JD
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tải file lên → AI tự chuyển sang text/nhận diện → Tự động đối chiếu với tiêu chí JD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveMode('inspect')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'inspect'
                ? 'btn-primary shadow-md shadow-indigo-600/20'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Xem Bảng Đối Chiếu</span>
          </button>

          <button
            onClick={() => setActiveMode('upload_new')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'upload_new'
                ? 'btn-emerald shadow-md shadow-emerald-600/20'
                : 'bg-white hover:bg-emerald-50/50 text-emerald-700 border border-emerald-200 shadow-xs'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>+ Upload Tệp CV Mới</span>
          </button>
        </div>
      </div>

      {/* Candidate Selector Strip for Inspect Mode */}
      {activeMode === 'inspect' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
          <span className="text-xs font-bold text-slate-500 shrink-0 mr-1">
            Chọn ứng viên:
          </span>
          {eligibleCandidates.map((c) => {
            const isSelected = c.id === selectedCandidateId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCandidateId(c.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'btn-primary text-white shadow-md shadow-indigo-600/25 scale-[1.02]'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs'
                }`}
              >
                <img
                  src={
                    c.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50'
                  }
                  alt={c.name}
                  className="w-4 h-4 rounded-full object-cover border border-slate-200"
                />
                <span>{c.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                  ({c.aiAnalysis?.overallScore || 0}đ)
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* MODE 1: UPLOAD FILE & 2-STEP AI EXTRACTION WORKFLOW */}
      {activeMode === 'upload_new' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          {/* Progress Indicator - Full Width */}
          <div className="w-full pb-4 border-b border-slate-200">
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div
                className={`flex items-center gap-2.5 p-3 rounded-2xl transition border ${
                  uploadStep >= 1
                    ? 'bg-indigo-50/80 border-indigo-200 text-indigo-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    uploadStep >= 1
                      ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  1
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Tải Lên Tệp CV</div>
                  <div className="text-[10px] text-slate-500 hidden sm:block truncate">PDF, DOCX hoặc Ảnh</div>
                </div>
              </div>

              <div
                className={`flex items-center gap-2.5 p-3 rounded-2xl transition border ${
                  uploadStep >= 2
                    ? 'bg-indigo-50/80 border-indigo-200 text-indigo-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    uploadStep >= 2
                      ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  2
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">AI Trích Xuất & OCR</div>
                  <div className="text-[10px] text-slate-500 hidden sm:block truncate">Đọc text & nhận diện</div>
                </div>
              </div>

              <div
                className={`flex items-center gap-2.5 p-3 rounded-2xl transition border ${
                  uploadStep >= 3
                    ? 'bg-indigo-50/80 border-indigo-200 text-indigo-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    uploadStep >= 3
                      ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  3
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Đối Chiếu JD & Chấm Điểm</div>
                  <div className="text-[10px] text-slate-500 hidden sm:block truncate">Bảng điểm tiêu chí</div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 1: RESPONSIVE TWO-COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Target Job Selection & Criteria Overview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-indigo-600" />
                    Vị trí JD Cần Đối Chiếu:
                  </span>
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                    {targetJob.code}
                  </span>
                </div>

                <select
                  value={targetJobId}
                  onChange={(e) => setTargetJobId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-bold shadow-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({j.criteria.length} tiêu chí)
                    </option>
                  ))}
                </select>

                {/* Job Specs Overview */}
                <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Phòng ban:</span>
                    <strong className="text-slate-800 font-semibold">{targetJob.department}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Kinh nghiệm yêu cầu:</span>
                    <strong className="text-slate-800 font-semibold">{targetJob.experienceRequired}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Mức lương:</span>
                    <strong className="text-indigo-700 font-bold">{targetJob.salaryRange}</strong>
                  </div>
                </div>

                {/* Criteria Pills */}
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 block mb-2 uppercase tracking-wider">
                    {targetJob.criteria.length} Tiêu chí trọng yếu sẽ được AI chấm điểm:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {targetJob.criteria.map((crit) => (
                      <span
                        key={crit.id}
                        className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs"
                      >
                        {crit.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick 1-click sample CV files */}
              <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2.5">
                <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                  Hoặc nạp nhanh tệp CV mẫu có sẵn:
                </span>
                <div className="space-y-2">
                  {samplePdfs.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePickSampleFile(sample)}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-200 shadow-2xs text-left transition flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-4 h-4 text-indigo-600 shrink-0 group-hover:scale-110 transition" />
                        <div className="truncate">
                          <span className="text-xs font-bold text-slate-800 block truncate">
                            {sample.name}
                          </span>
                          <span className="text-[10px] text-slate-500">{sample.size} • PDF Document</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-indigo-600 font-bold shrink-0 ml-2 group-hover:translate-x-0.5 transition">
                        Nạp ngay →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Expansive Dropzone & OCR Action */}
            <div className="lg:col-span-7 space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-3xl p-8 sm:p-12 text-center bg-indigo-50/30 hover:bg-indigo-50/70 transition-all duration-300 cursor-pointer space-y-4 group shadow-2xs"
              >
                <div className="w-18 h-18 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-200 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition duration-300">
                  <FileUp className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-indigo-700 transition">
                    Kéo thả tệp CV hoặc bấm vào đây để tải lên
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto">
                    Hỗ trợ định dạng PDF, DOCX, TXT hoặc hình ảnh scan (PNG, JPG). AI sẽ tự động đọc tài liệu và trích xuất nguyên vẹn văn bản.
                  </p>
                </div>

                {uploadedFile ? (
                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 font-bold shadow-xs">
                    <Paperclip className="w-4 h-4 text-emerald-600" />
                    <span>{uploadedFile.name}</span>
                    <span className="text-slate-500 font-normal">({uploadedFile.size})</span>
                    <span className="ml-2 px-2 py-0.5 bg-emerald-200/70 rounded-md text-[10px] text-emerald-900 font-extrabold">Đã nhận tệp</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white border border-slate-200 text-slate-600">.PDF</span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white border border-slate-200 text-slate-600">.DOCX</span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white border border-slate-200 text-slate-600">.TXT</span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white border border-slate-200 text-slate-600">.PNG / .JPG</span>
                  </div>
                )}
              </div>

              {/* Action Button: Step 1 -> Step 2 */}
              {uploadedFile && uploadStep === 1 && (
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isExtractingText}
                    onClick={handleExtractTextFromFile}
                    className="btn-primary w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-extrabold cursor-pointer disabled:opacity-50 shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
                  >
                    {isExtractingText ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>AI Đang Đọc File & Trích Xuất Văn Bản OCR...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-lime-300 animate-pulse" />
                        <span>Bước 1: Chuyển Sang Text & Nhận Diện Thông Tin Bằng AI →</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* STEP 2: EXTRACTED TEXT INSPECTION & MATCHING ACTION (Full Width Grid) */}
          {extractedRawText && (
            <div className="w-full space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Văn bản đã nhận diện từ tệp: <strong className="text-indigo-700">{uploadedFile?.name}</strong>
                  </h4>
                </div>
                <span className="text-[11px] text-slate-500 font-mono font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
                  {extractedRawText.length} ký tự
                </span>
              </div>

              <textarea
                rows={9}
                value={extractedRawText}
                onChange={(e) => setExtractedRawText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-800 leading-relaxed shadow-inner focus:outline-none focus:bg-white focus:border-indigo-500"
                placeholder="Nội dung trích xuất từ file CV..."
              />

              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                <div className="text-xs text-slate-700">
                  <span>Đối chiếu văn bản trên với vị trí: </span>
                  <strong className="text-slate-900 font-extrabold text-sm">{targetJob.title}</strong>
                  <p className="text-[11px] text-indigo-700 font-semibold mt-0.5">
                    ({targetJob.criteria.length} tiêu chí đánh giá định lượng kèm trọng số)
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isMatchingJd}
                  onClick={handleMatchWithJd}
                  className="btn-emerald inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold cursor-pointer disabled:opacity-50 shrink-0 shadow-md shadow-emerald-600/20"
                >
                  {isMatchingJd ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AI Đang Đối Chiếu & Chấm Điểm Tiêu Chí...</span>
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4" />
                      <span>Bước 2: Đối Chiếu Tiêu Chí JD & Chấm Điểm AI Ngay</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {uploadError && (
            <div className="w-full p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {uploadError}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: CANDIDATE INSPECTOR & DETAILED SCORECARD */}
      {activeMode === 'inspect' && selectedCandidate && (
        <div className="space-y-6">
          {/* Candidate Dossier Header */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/90">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Candidate Info */}
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xs opacity-75" />
                  <img
                    src={
                      selectedCandidate.avatar ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
                    }
                    alt={selectedCandidate.name}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                      {selectedCandidate.name}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {aiAnalysis?.recommendation || 'Đang thẩm định'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      Nguồn: {selectedCandidate.source}
                    </span>
                    {selectedCandidate.sourceFileName && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] bg-cyan-50 text-cyan-800 border border-cyan-200 flex items-center gap-1 font-mono font-medium">
                        <Paperclip className="w-3 h-3 text-cyan-600" />
                        {selectedCandidate.sourceFileName}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 font-semibold">
                    {selectedCandidate.extractedInfo.currentRole}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                    <span>📧 {selectedCandidate.email}</span>
                    <span>📞 {selectedCandidate.phone}</span>
                    <span>💼 {selectedCandidate.extractedInfo.yearsOfExperience} năm kinh nghiệm</span>
                    {selectedCandidate.expectedSalary && (
                      <span className="text-amber-800 font-bold">
                        💰 Kỳ vọng: {selectedCandidate.expectedSalary}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Overall AI Score & Rating Ring */}
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 lg:min-w-[280px] shadow-xs">
                <div className="relative w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-indigo-200 shrink-0 shadow-xs">
                  <div
                    className={`text-2xl font-black bg-gradient-to-br ${scoreBadgeColor} bg-clip-text text-transparent`}
                  >
                    {overallScore}
                  </div>
                  <span className="absolute -bottom-1.5 text-[8px] uppercase tracking-wider font-extrabold text-slate-700 bg-white px-2 py-0.2 rounded-full border border-slate-200 shadow-xs">
                    Điểm AI
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Mức độ đáp ứng JD
                  </div>
                  <div className="text-base font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <span>Khớp {aiAnalysis?.matchLevel}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate max-w-[170px]">
                    {selectedCandidate.appliedJobTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Summary Assessment (Executive Summary - High Contrast Light Mode) */}
            <div className="mt-6 p-4.5 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/60 to-slate-50 border border-indigo-200 text-slate-800 shadow-xs">
              <div className="flex items-center gap-2 font-black text-indigo-950 mb-1.5">
                <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                <span className="text-sm font-extrabold tracking-tight">
                  Nhận định tổng quan từ AI (Executive Summary):
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {aiAnalysis?.summaryAssessment || 'Đang cập nhật đánh giá...'}
              </p>
            </div>
          </div>

          {/* DETAILED CRITERIA SCORECARD TABLE */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/90">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-600" />
                  Bảng đối chiếu từng tiêu chí JD (Criteria Scorecard)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  AI so sánh chi tiết từng yêu cầu, trích dẫn minh chứng từ CV và giải thích lý do
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đạt
                </span>
                <span className="flex items-center gap-1 text-amber-800 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Đạt một phần
                </span>
                <span className="flex items-center gap-1 text-rose-700 font-bold">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" /> Chưa đạt
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Tiêu chí tuyển dụng</th>
                    <th className="py-3.5 px-3 text-center">Trạng thái</th>
                    <th className="py-3.5 px-3 text-center">Điểm số</th>
                    <th className="py-3.5 px-4">Dẫn chứng trích từ CV</th>
                    <th className="py-3.5 px-4">Đánh giá & Phân tích AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {aiAnalysis?.criteriaEvaluations && aiAnalysis.criteriaEvaluations.length > 0 ? (
                    aiAnalysis.criteriaEvaluations.map((item, index) => {
                      const isPass = item.status === 'Đạt';
                      const isPartial = item.status === 'Đạt một phần';

                      const statusBadge = isPass ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đạt
                        </span>
                      ) : isPartial ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Một phần
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" /> Chưa đạt
                        </span>
                      );

                      return (
                        <tr key={index} className="hover:bg-slate-50/70 transition">
                          <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs">
                            {item.criterionName}
                          </td>
                          <td className="py-3.5 px-3 text-center whitespace-nowrap">{statusBadge}</td>
                          <td className="py-3.5 px-3 text-center font-bold">
                            <span
                              className={
                                item.score >= 85
                                  ? 'text-emerald-700 font-black text-sm'
                                  : item.score >= 70
                                  ? 'text-amber-800 font-black text-sm'
                                  : 'text-rose-700 font-black text-sm'
                              }
                            >
                              {item.score}/100
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 max-w-sm">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs italic text-slate-700">
                              "{item.evidence || 'Không tìm thấy dữ liệu liên quan'}"
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 max-w-sm text-xs leading-relaxed font-medium">
                            {item.notes}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-500 text-xs font-medium">
                        Chưa có tiêu chí đánh giá chi tiết
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Two Column Grid: Strengths/Gaps & Suggested Interview Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths & Gaps */}
            <div className="glass-panel rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Điểm mạnh nổi bật (Key Strengths)
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {aiAnalysis?.strengths?.map((str, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/70 text-slate-800 font-medium"
                    >
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2 pt-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Điểm cần lưu ý / Hạn chế (Gaps & Concerns)
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {aiAnalysis?.gapsOrConcerns && aiAnalysis.gapsOrConcerns.length > 0 ? (
                    aiAnalysis.gapsOrConcerns.map((gap, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/70 text-slate-800 font-medium"
                      >
                        <span className="text-amber-600 font-bold shrink-0">!</span>
                        <span>{gap}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-slate-500 italic">Không có điểm lo ngại đáng kể.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Suggested Interview Questions & Skills */}
            <div className="glass-panel rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <MessageSquareQuote className="w-4 h-4 text-indigo-600" />
                  Gợi ý câu hỏi phỏng vấn đào sâu (AI Suggested Questions)
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Được AI soạn riêng dựa trên các điểm cần làm rõ trong hồ sơ của {selectedCandidate.name}
                </p>
                <div className="space-y-2.5">
                  {aiAnalysis?.suggestedInterviewQuestions?.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Kỹ năng bóc tách từ CV
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.extractedInfo.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* HUMAN-IN-THE-LOOP HR DECISION ACTION BAR */}
          <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  HR Quyết Định Hành Động (Human Decision)
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Trạng thái hiện tại:{' '}
                  <span className="font-black text-slate-900 uppercase">{selectedCandidate.stage}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onUpdateCandidateStage(selectedCandidate.id, 'assessment')}
                  className="px-3.5 py-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>Gửi bài Test Năng Lực</span>
                </button>

                <button
                  onClick={() => onOpenScheduleModal(selectedCandidate)}
                  className="btn-primary px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20 active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Lên lịch Phỏng Vấn</span>
                </button>

                <button
                  onClick={() => setShowTalentPoolPrompt(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-xs"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Lưu Talent Pool</span>
                </button>

                <button
                  onClick={() => onOpenEmailModal(selectedCandidate)}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <Send className="w-4 h-4 text-indigo-600" />
                  <span>Gửi Email</span>
                </button>

                <button
                  onClick={() => onUpdateCandidateStage(selectedCandidate.id, 'rejected')}
                  className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-xs"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Từ chối</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Talent Pool Save Modal Prompt */}
      {showTalentPoolPrompt && selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl text-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-amber-500" />
                Lưu vào Kho Tài Năng (Talent Pool)
              </h3>
              <button
                onClick={() => setShowTalentPoolPrompt(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Lưu trữ hồ sơ của <strong className="text-slate-900">{selectedCandidate.name}</strong> để tái liên hệ cho các cơ
              hội tiếp theo.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Đánh giá tiềm năng (Sao):
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setTalentPoolRating(star)}
                    className="p-1 cursor-pointer transition hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= talentPoolRating
                          ? 'text-amber-500 fill-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Gắn thẻ phân loại (cách nhau bởi dấu phẩy):
              </label>
              <input
                type="text"
                value={talentPoolTagInput}
                onChange={(e) => setTalentPoolTagInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500"
                placeholder="Senior, High Potential, Fast Onboard..."
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowTalentPoolPrompt(false)}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 text-xs font-bold rounded-xl cursor-pointer shadow-xs"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  const tags = talentPoolTagInput
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean);
                  onSaveToTalentPool(selectedCandidate.id, tags, talentPoolRating);
                  setShowTalentPoolPrompt(false);
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-md cursor-pointer transition active:scale-95"
              >
                Lưu vào Talent Pool ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
