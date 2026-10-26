import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Send,
  Calendar,
  BookmarkCheck,
  ChevronRight,
  Upload,
  RefreshCw,
  Star,
  Check,
  ArrowRight,
  FileUp,
  MessageSquareQuote,
  Target,
  Clock,
  ShieldCheck,
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
  const activeJobs = jobs.filter((j) => selectedJobId === 'all' || j.id === selectedJobId);
  const currentJob = activeJobs[0] || jobs[0];

  const eligibleCandidates = candidates.filter(
    (c) => selectedJobId === 'all' || c.appliedJobId === selectedJobId
  );

  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    eligibleCandidates[0]?.id || candidates[0]?.id || ''
  );

  const selectedCandidate =
    candidates.find((c) => c.id === selectedCandidateId) || eligibleCandidates[0];

  // Upload & Custom AI Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [inputCvText, setInputCvText] = useState('');
  const [inputJobId, setInputJobId] = useState(currentJob?.id || jobs[0]?.id);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Talent Pool quick prompt state
  const [showTalentPoolPrompt, setShowTalentPoolPrompt] = useState(false);
  const [talentPoolRating, setTalentPoolRating] = useState(4);
  const [talentPoolTagInput, setTalentPoolTagInput] = useState('Top Candidate, Fast Onboard');

  const handleRunAiAnalysis = async (customText?: string) => {
    const textToAnalyze = customText || inputCvText;
    if (!textToAnalyze.trim()) {
      setAnalysisError('Vui lòng dán hoặc nhập nội dung CV để phân tích');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    const targetJob = jobs.find((j) => j.id === inputJobId) || currentJob;

    try {
      const response = await fetch('/api/gemini/parse-and-evaluate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvText: textToAnalyze,
          jobTitle: targetJob.title,
          jobRequirements: targetJob.description + '\n' + targetJob.requirements.join('\n'),
          criteriaList: targetJob.criteria,
        }),
      });

      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Lỗi xử lý AI');
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
        source: 'Direct Upload',
        rawCvText: textToAnalyze,
        extractedInfo: {
          fullName: extractedInfo.fullName || 'Ứng viên',
          email: extractedInfo.email || 'candidate@email.com',
          phone: extractedInfo.phone || '0900 000 000',
          currentRole: extractedInfo.currentRole || targetJob.title,
          yearsOfExperience: extractedInfo.yearsOfExperience || 3,
          summary: extractedInfo.summary || 'Hồ sơ được trích xuất bằng AI',
          skills: extractedInfo.skills || [],
          softSkills: extractedInfo.softSkills || [],
          languages: extractedInfo.languages || ['Tiếng Việt'],
          certifications: extractedInfo.certifications || [],
          education: extractedInfo.education || [],
          workExperience: extractedInfo.workExperience || [],
        },
        aiAnalysis: {
          overallScore: aiAnalysis.overallScore || 80,
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
            author: 'AI Screening Agent',
            createdAt: 'Vừa xong',
            content: `Đã phân tích đối chiếu với vị trí ${targetJob.title}. Điểm tổng thể: ${aiAnalysis.overallScore}/100`,
          },
        ],
      };

      onAddNewCandidate(newCand);
      setSelectedCandidateId(newCand.id);
      setShowUploadModal(false);
      setInputCvText('');
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || 'Không thể kết nối dịch vụ AI. Vui lòng thử lại.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sampleCvText = `HỌ VÀ TÊN: TRẦN ĐĂNG KHOA
Email: khoatran.tech@gmail.com | SĐT: 0915 888 777
Vị trí mong muốn: Senior Frontend Engineer
Kinh nghiệm: 5 năm kinh nghiệm lập trình Web hiện đại

TÓM TẮT CHUYÊN MÔN:
5 năm kinh nghiệm chuyên sâu với React, TypeScript, Next.js và Tailwind CSS. Đã tham gia xây dựng hệ sinh thái SaaS phục vụ 500k người dùng. Tối ưu bundle size bằng code-splitting và web workers, cải thiện tốc độ tải trang 45%.

KỸ NĂNG:
- Frontend: React, TypeScript, Next.js (App router), Zustand, TanStack Query, Tailwind CSS, Jest, Playwright.
- Backend cơ bản: Node.js, Express, REST API.
- Ngoại ngữ: Tiếng Anh IELTS 6.5, đọc hiểu tài liệu và giao tiếp chuyên ngành.

KINH NGHIỆM LÀM VIỆC:
1. Senior Frontend Engineer tại SkyTech Solutions (2022 - Hiện tại)
- Thiết kế Design System bằng React và Tailwind CSS cho 4 sản phẩm chính.
- Triển khai Micro-frontends sử dụng Module Federation.
2. Frontend Developer tại CleverWeb (2019 - 2022)
- Phát triển giao diện dashboard quản lý tài chính với React & TypeScript.

HỌC VẤN:
- Cử nhân Khoa học Máy tính - Đại học Công nghệ (UET) (2015 - 2019)`;

  if (!selectedCandidate) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <Sparkles className="w-12 h-12 mx-auto text-indigo-400 mb-4" />
        <h3 className="text-lg font-semibold text-white">Chưa có ứng viên nào trong danh sách</h3>
        <p className="text-sm mt-1 mb-6">Hãy thêm mới CV hoặc quét hộp thư email để bắt đầu</p>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm"
        >
          + Tải lên CV phân tích ngay
        </button>
      </div>
    );
  }

  const aiAnalysis = selectedCandidate.aiAnalysis;
  const overallScore = aiAnalysis?.overallScore || 0;

  const scoreBadgeColor =
    overallScore >= 90
      ? 'from-emerald-500 to-teal-500 text-emerald-300 border-emerald-500/40'
      : overallScore >= 80
      ? 'from-indigo-500 to-blue-500 text-indigo-300 border-indigo-500/40'
      : overallScore >= 65
      ? 'from-amber-500 to-yellow-500 text-amber-300 border-amber-500/40'
      : 'from-rose-500 to-red-500 text-rose-300 border-rose-500/40';

  const recommendationStyle =
    aiAnalysis?.recommendation === 'Tuyển dụng ngay'
      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
      : aiAnalysis?.recommendation === 'Rất tiềm năng'
      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
      : aiAnalysis?.recommendation === 'Cân nhắc phỏng vấn'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

  return (
    <div className="space-y-6">
      {/* Top Header with Candidate Selector & Upload button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Lọc CV bằng AI & Đối chiếu tiêu chí JD
            </h2>
            <p className="text-xs text-slate-400">
              AI đánh giá mức độ đáp ứng từng tiêu chí cụ thể để HR tự tin đưa ra quyết định
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick candidate picker */}
          <select
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-lg px-3 py-2 focus:outline-none cursor-pointer max-w-[200px] sm:max-w-xs"
          >
            {eligibleCandidates.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} - ({c.aiAnalysis?.overallScore || 0}đ)
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer shadow-md"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Phân tích CV mới</span>
            <span className="sm:hidden">Thêm</span>
          </button>
        </div>
      </div>

      {/* Candidate Dossier Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Candidate profile info */}
          <div className="flex items-start gap-4">
            <img
              src={
                selectedCandidate.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
              }
              alt={selectedCandidate.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500/30 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedCandidate.name}
                </h1>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${recommendationStyle}`}
                >
                  {aiAnalysis?.recommendation || 'Đang thẩm định'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  Nguồn: {selectedCandidate.source}
                </span>
              </div>
              <p className="text-sm text-slate-300 font-medium">
                {selectedCandidate.extractedInfo.currentRole}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span>📧 {selectedCandidate.email}</span>
                <span>📞 {selectedCandidate.phone}</span>
                <span>
                  💼 {selectedCandidate.extractedInfo.yearsOfExperience} năm kinh nghiệm
                </span>
                {selectedCandidate.expectedSalary && (
                  <span className="text-amber-300">
                    💰 Kỳ vọng: {selectedCandidate.expectedSalary}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Overall AI Score & Rating Ring */}
          <div className="flex items-center gap-4 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 lg:min-w-[280px]">
            <div className="relative w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border-2 border-slate-700 shrink-0">
              <div
                className={`text-xl font-extrabold bg-gradient-to-br ${scoreBadgeColor} bg-clip-text text-transparent`}
              >
                {overallScore}
              </div>
              <span className="absolute -bottom-1 text-[9px] uppercase font-bold text-slate-400 bg-slate-800 px-1 rounded">
                Điểm AI
              </span>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-400">Mức độ đáp ứng JD</div>
              <div className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
                <span>Khớp {aiAnalysis?.matchLevel}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Vị trí: {selectedCandidate.appliedJobTitle}
              </p>
            </div>
          </div>
        </div>

        {/* AI Summary Assessment */}
        <div className="mt-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-slate-200 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-2 font-semibold text-indigo-300 mb-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Nhận định tổng thể từ AI (Executive Summary):</span>
          </div>
          {aiAnalysis?.summaryAssessment || 'Đang cập nhật đánh giá...'}
        </div>
      </div>

      {/* DETAILED CRITERIA SCORECARD TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              Bảng đối chiếu từng tiêu chí JD (Criteria Scorecard)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              AI so sánh chi tiết từng yêu cầu, trích dẫn minh chứng từ CV và giải thích lý do
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Đạt
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" /> Đạt một phần
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <XCircle className="w-3.5 h-3.5" /> Chưa đạt
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Tiêu chí tuyển dụng</th>
                <th className="py-3 px-3 text-center">Trạng thái</th>
                <th className="py-3 px-3 text-center">Điểm số</th>
                <th className="py-3 px-4">Dẫn chứng trích từ CV</th>
                <th className="py-3 px-4">Đánh giá & Phân tích AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
              {aiAnalysis?.criteriaEvaluations && aiAnalysis.criteriaEvaluations.length > 0 ? (
                aiAnalysis.criteriaEvaluations.map((item, index) => {
                  const isPass = item.status === 'Đạt';
                  const isPartial = item.status === 'Đạt một phần';

                  const statusBadge = isPass ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đạt
                    </span>
                  ) : isPartial ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      <AlertTriangle className="w-3.5 h-3.5" /> Một phần
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30">
                      <XCircle className="w-3.5 h-3.5" /> Chưa đạt
                    </span>
                  );

                  return (
                    <tr key={index} className="hover:bg-slate-800/40 transition">
                      {/* Tiêu chí */}
                      <td className="py-3.5 px-4 font-medium text-white max-w-xs">
                        {item.criterionName}
                      </td>

                      {/* Trạng thái */}
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        {statusBadge}
                      </td>

                      {/* Điểm số */}
                      <td className="py-3.5 px-3 text-center font-bold">
                        <span
                          className={
                            item.score >= 85
                              ? 'text-emerald-400'
                              : item.score >= 70
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }
                        >
                          {item.score}/100
                        </span>
                      </td>

                      {/* Dẫn chứng CV */}
                      <td className="py-3.5 px-4 text-slate-300 max-w-sm">
                        <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/60 text-xs italic">
                          "{item.evidence || 'Không tìm thấy dữ liệu liên quan'}"
                        </div>
                      </td>

                      {/* Phân tích AI */}
                      <td className="py-3.5 px-4 text-slate-300 max-w-sm text-xs leading-relaxed">
                        {item.notes}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-400 text-xs">
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Điểm mạnh nổi bật (Key Strengths)
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {aiAnalysis?.strengths?.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2 pt-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Điểm cần lưu ý / Hạn chế (Gaps & Concerns)
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {aiAnalysis?.gapsOrConcerns && aiAnalysis.gapsOrConcerns.length > 0 ? (
                aiAnalysis.gapsOrConcerns.map((gap, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
                    <span className="text-amber-400 font-bold shrink-0">!</span>
                    <span>{gap}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-400 italic">Không có điểm lo ngại đáng kể.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Suggested Interview Questions & Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <MessageSquareQuote className="w-4 h-4 text-indigo-400" />
              Gợi ý câu hỏi phỏng vấn đào sâu (AI Suggested Questions)
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Được AI soạn riêng dựa trên các điểm cần làm rõ trong hồ sơ của {selectedCandidate.name}
            </p>
            <div className="space-y-2.5">
              {aiAnalysis?.suggestedInterviewQuestions?.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs sm:text-sm text-slate-200 flex items-start gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Kỹ năng bóc tách từ CV
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedCandidate.extractedInfo.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HUMAN-IN-THE-LOOP HR DECISION ACTION BAR */}
      <div className="sticky bottom-4 z-20 bg-slate-900/95 border border-indigo-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              HR Quyết Định Hành Động (Human Decision)
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Trạng thái hiện tại: <span className="font-semibold text-white uppercase">{selectedCandidate.stage}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Chuyển sang làm bài test */}
            <button
              onClick={() => onUpdateCandidateStage(selectedCandidate.id, 'assessment')}
              className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/40 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Gửi bài Test Năng Lực</span>
            </button>

            {/* Lên lịch phỏng vấn */}
            <button
              onClick={() => onOpenScheduleModal(selectedCandidate)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/30 transition cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Lên lịch Phỏng Vấn</span>
            </button>

            {/* Lưu Talent Pool */}
            <button
              onClick={() => setShowTalentPoolPrompt(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Lưu Talent Pool</span>
            </button>

            {/* Gửi Email thông báo */}
            <button
              onClick={() => onOpenEmailModal(selectedCandidate)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Gửi Email</span>
            </button>

            {/* Từ chối */}
            <button
              onClick={() => onUpdateCandidateStage(selectedCandidate.id, 'rejected')}
              className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <XCircle className="w-4 h-4" />
              <span>Từ chối</span>
            </button>
          </div>
        </div>
      </div>

      {/* Talent Pool Save Modal Prompt */}
      {showTalentPoolPrompt && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-amber-400" />
                Lưu vào Kho Tài Năng (Talent Pool)
              </h3>
              <button
                onClick={() => setShowTalentPoolPrompt(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Lưu trữ hồ sơ của <strong>{selectedCandidate.name}</strong> để tái liên hệ cho các cơ hội tiếp theo.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Đánh giá tiềm năng (Sao):
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setTalentPoolRating(star)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= talentPoolRating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Gắn thẻ phân loại (cách nhau bởi dấu phẩy):
              </label>
              <input
                type="text"
                value={talentPoolTagInput}
                onChange={(e) => setTalentPoolTagInput(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                placeholder="Senior, High Potential, React..."
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowTalentPoolPrompt(false)}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
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
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md"
              >
                Lưu vào Talent Pool ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload & Paste CV Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Tải lên & Phân tích CV bằng AI
                </h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {/* Select Target Job */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Vị trí tuyển dụng cần đối chiếu tiêu chí JD:
              </label>
              <select
                value={inputJobId}
                onChange={(e) => setInputJobId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title} ({j.criteria.length} tiêu chí)
                  </option>
                ))}
              </select>
            </div>

            {/* CV Text Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Dán nội dung CV hoặc kéo thả tệp văn bản:
                </label>
                <button
                  type="button"
                  onClick={() => setInputCvText(sampleCvText)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline"
                >
                  Nạp CV mẫu thử nghiệm
                </button>
              </div>
              <textarea
                rows={9}
                value={inputCvText}
                onChange={(e) => setInputCvText(e.target.value)}
                placeholder="Dán nội dung hồ sơ / CV của ứng viên vào đây..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            {analysisError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {analysisError}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                Gemini 3.8 Flash sẽ trích xuất thông tin và đối chiếu từng tiêu chí JD
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={() => handleRunAiAnalysis()}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AI Đang Phân Tích...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>Bắt đầu Lọc CV bằng AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
