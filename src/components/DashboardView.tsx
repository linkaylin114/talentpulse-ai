import React from 'react';
import {
  Users,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowUpRight,
  Mail,
  Linkedin,
  FileCheck2,
  Calendar,
  Layers,
  Star,
  Eye,
  Send,
  UserCheck,
} from 'lucide-react';
import { Candidate, Job } from '../types/recruitment';
import { ActiveTab } from './Header';

interface DashboardViewProps {
  candidates: Candidate[];
  jobs: Job[];
  selectedJobId: string;
  onSelectCandidate: (candidate: Candidate) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenEmailModal: (candidate: Candidate) => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  candidates,
  jobs,
  selectedJobId,
  onSelectCandidate,
  onNavigateTab,
  onOpenEmailModal,
  onOpenScheduleModal,
}) => {
  const filteredCandidates =
    selectedJobId === 'all'
      ? candidates
      : candidates.filter((c) => c.appliedJobId === selectedJobId);

  const total = filteredCandidates.length;
  const highMatchCount = filteredCandidates.filter(
    (c) => c.aiAnalysis && c.aiAnalysis.overallScore >= 85
  ).length;
  const matchRate = total > 0 ? Math.round((highMatchCount / total) * 100) : 0;

  const inInterviewCount = filteredCandidates.filter(
    (c) => c.stage === 'interview_1' || c.stage === 'interview_2'
  ).length;

  const offerCount = filteredCandidates.filter(
    (c) => c.stage === 'offer' || c.stage === 'hired'
  ).length;

  const talentPoolCount = filteredCandidates.filter((c) => c.talentPoolData?.isSaved).length;

  // Pipeline funnel steps
  const funnelSteps = [
    {
      stage: 'cv_filter',
      name: 'Lọc CV & Khớp JD',
      count: filteredCandidates.filter((c) => c.stage === 'cv_filter').length,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      stage: 'assessment',
      name: 'Test năng lực',
      count: filteredCandidates.filter((c) => c.stage === 'assessment').length,
      color: 'from-indigo-600 to-violet-600',
    },
    {
      stage: 'interview_1',
      name: 'Phỏng vấn Vòng 1',
      count: filteredCandidates.filter((c) => c.stage === 'interview_1').length,
      color: 'from-violet-600 to-purple-600',
    },
    {
      stage: 'interview_2',
      name: 'Phỏng vấn Vòng 2',
      count: filteredCandidates.filter((c) => c.stage === 'interview_2').length,
      color: 'from-purple-600 to-pink-600',
    },
    {
      stage: 'offer',
      name: 'Đề xuất Offer',
      count: filteredCandidates.filter((c) => c.stage === 'offer').length,
      color: 'from-pink-600 to-rose-600',
    },
    {
      stage: 'hired',
      name: 'Đã tuyển dụng',
      count: filteredCandidates.filter((c) => c.stage === 'hired').length,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  // Sources breakdown
  const emailSources = filteredCandidates.filter((c) => c.source === 'Email').length;
  const linkedinSources = filteredCandidates.filter((c) => c.source === 'LinkedIn').length;
  const directSources = filteredCandidates.filter((c) => c.source === 'Direct Upload').length;
  const otherSources = total - (emailSources + linkedinSources + directSources);

  // Top candidates
  const topCandidates = [...filteredCandidates]
    .sort((a, b) => (b.aiAnalysis?.overallScore || 0) - (a.aiAnalysis?.overallScore || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Hệ Thống Tuyển Dụng AI Thông Minh & ATS Real-time</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Bảng điều khiển quy trình tuyển dụng
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Tự động hóa toàn diện từ lọc CV qua email, đối chiếu tiêu chí JD bằng AI, kiểm tra
              năng lực trực tuyến đến lên lịch phỏng vấn và quản lý Talent Pool.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('email_inbox')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition cursor-pointer shadow-sm"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Kiểm tra Email CV</span>
            </button>
            <button
              onClick={() => onNavigateTab('cv_filter')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/30 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Lọc CV bằng AI ngay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Applicants */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Tổng ứng viên tiếp nhận</span>
            <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{total}</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12% tuần này
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Từ Email, LinkedIn & Website</p>
        </div>

        {/* AI High Match Rate */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Tỷ lệ ứng viên đạt chuẩn AI</span>
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{matchRate}%</span>
            <span className="text-xs text-indigo-300 font-medium">
              {highMatchCount}/{total} ứng viên
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Điểm AI đối chiếu JD &gt;= 85%</p>
        </div>

        {/* In Interview */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Đang trong vòng phỏng vấn</span>
            <span className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{inInterviewCount}</span>
            <span className="text-xs text-purple-300 font-medium">Vòng 1 & Vòng 2</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Đã tích hợp link Google Meet</p>
        </div>

        {/* Talent Pool & Offers */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Đã lưu trữ Talent Pool</span>
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Star className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{talentPoolCount}</span>
            <span className="text-xs text-emerald-400 font-medium">
              {offerCount} Offer thành công
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Sẵn sàng kích hoạt tái tuyển dụng</p>
        </div>
      </div>

      {/* Real-time Recruitment Pipeline Funnel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Tiến trình quy trình tuyển dụng theo thời gian thực (Pipeline Funnel)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Theo dõi số lượng ứng viên di chuyển qua từng giai đoạn tuyển dụng
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('kanban')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
          >
            <span>Mở bảng Kanban chi tiết</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {funnelSteps.map((step, idx) => {
            const percentage = total > 0 ? Math.round((step.count / total) * 100) : 0;
            return (
              <div
                key={step.stage}
                onClick={() => onNavigateTab('kanban')}
                className="group relative bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 rounded-xl p-4 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Giai đoạn {idx + 1}</span>
                  <span className="font-semibold text-slate-300">{percentage}%</span>
                </div>
                <div className="text-2xl font-bold text-white group-hover:text-indigo-300 transition">
                  {step.count}
                </div>
                <div className="text-xs font-medium text-slate-300 mt-1 line-clamp-1">
                  {step.name}
                </div>
                <div className="mt-3 w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${step.color}`}
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column Section: Top Candidates & Recruitment Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Matched Candidates */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Ứng viên điểm AI cao nhất (Top Candidates)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Ứng viên được AI phân tích có mức độ đáp ứng tiêu chí JD tốt nhất
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('comparison')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
            >
              <span>So sánh ứng viên</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {topCandidates.map((cand) => {
              const score = cand.aiAnalysis?.overallScore || 0;
              const badgeColor =
                score >= 90
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : score >= 80
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                  : score >= 70
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

              return (
                <div
                  key={cand.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 transition gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        cand.avatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                      }
                      alt={cand.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-700 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-white">{cand.name}</h3>
                        <span
                          className={`px-2 py-0.5 text-[11px] font-bold rounded-md border ${badgeColor}`}
                        >
                          {score}/100 Điểm AI
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{cand.appliedJobTitle}</p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {cand.extractedInfo.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-[10px] rounded bg-slate-700/80 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                        {cand.extractedInfo.skills.length > 4 && (
                          <span className="text-[10px] text-slate-400">
                            +{cand.extractedInfo.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => onSelectCandidate(cand)}
                      className="p-2 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer flex items-center gap-1"
                      title="Xem hồ sơ chi tiết"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Chi tiết</span>
                    </button>
                    <button
                      onClick={() => onOpenScheduleModal(cand)}
                      className="p-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-medium border border-purple-500/30 transition cursor-pointer flex items-center gap-1"
                      title="Lên lịch phỏng vấn"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Phỏng vấn</span>
                    </button>
                    <button
                      onClick={() => onOpenEmailModal(cand)}
                      className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium border border-indigo-500/30 transition cursor-pointer flex items-center gap-1"
                      title="Gửi email thông báo"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Email</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Candidate Sources & Quick Stats */}
        <div className="space-y-6">
          {/* Sourcing Breakdown */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md">
            <h2 className="text-base font-semibold text-white mb-4">Nguồn ứng viên tiếp nhận</h2>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    Hộp thư Email tự động lọc
                  </span>
                  <span className="font-semibold">{emailSources} hồ sơ</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-cyan-500"
                    style={{ width: `${total > 0 ? (emailSources / total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    Thu thập từ LinkedIn
                  </span>
                  <span className="font-semibold">{linkedinSources} hồ sơ</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${total > 0 ? (linkedinSources / total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    Tải lên trực tiếp / Portal
                  </span>
                  <span className="font-semibold">{directSources} hồ sơ</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500"
                    style={{ width: `${total > 0 ? (directSources / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Thời gian tuyển dụng TB:</span>
                <span className="font-semibold text-slate-200">14.5 ngày</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                <span>Độ chính xác AI đối chiếu:</span>
                <span className="font-semibold text-emerald-400">96.8%</span>
              </div>
            </div>
          </div>

          {/* Quick Help / Capabilities card */}
          <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/20 rounded-2xl p-5 shadow-sm text-xs text-slate-300 space-y-2.5">
            <div className="flex items-center gap-2 font-semibold text-indigo-300">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Điểm nổi bật của TalentPulse AI</span>
            </div>
            <p>
              • <strong>Tự động lọc CV:</strong> Bóc tách kỹ năng, học vấn, năm kinh nghiệm từ email & file đính kèm.
            </p>
            <p>
              • <strong>Đối chiếu JD:</strong> AI chấm điểm từng tiêu chí cụ thể và trích dẫn bằng chứng từ CV.
            </p>
            <p>
              • <strong>Quyết định minh bạch:</strong> HR luôn giữ vai trò quyết định cuối cùng với đầy đủ dữ kiện.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
