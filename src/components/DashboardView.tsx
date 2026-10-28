import React from 'react';
import {
  Users,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowUpRight,
  Mail,
  UploadCloud,
  Calendar,
  Layers,
  Star,
  Eye,
  Send,
  Briefcase,
  FileCheck2,
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
      name: 'Test IQ / EQ / AQ',
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
  const directSources = filteredCandidates.filter((c) => c.source === 'Tải lên CV (File Upload)').length;
  const portalSources = total - (emailSources + directSources);

  // Top candidates
  const topCandidates = [...filteredCandidates]
    .sort((a, b) => (b.aiAnalysis?.overallScore || 0) - (a.aiAnalysis?.overallScore || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 shadow-md border border-slate-200">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-lime-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-cyan-500/8 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/25 text-lime-800 dark:text-lime-300 text-xs font-bold border border-lime-400/50 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-lime-700 dark:text-lime-400 animate-pulse" />
              <span>TalentPulse ATS • Trí tuệ nhân tạo tuyển dụng thế hệ mới</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">
              Bảng điều khiển quy trình tuyển dụng thông minh
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Tải lên tệp CV (PDF/DOCX/Ảnh) để AI tự chuyển sang text, nhận diện năng lực & đối chiếu
              chuẩn xác từng tiêu chí JD đưa ra. Tích hợp bài kiểm tra IQ, EQ, AQ tự động gửi trước cho ứng viên.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('assessment')}
              className="btn-lime inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-slate-900" />
              <span>Test IQ/EQ/AQ Mới</span>
            </button>
            <button
              onClick={() => onNavigateTab('cv_filter')}
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white text-xs sm:text-sm font-bold cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Tải Lên File & Lọc CV</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Applicants */}
        <div className="glass-card rounded-3xl p-5 shadow-sm group hover:-translate-y-1 transition-all duration-300 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng ứng viên tiếp nhận</span>
            <span className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-200 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight tabular-nums">{total}</span>
            <span className="text-xs text-emerald-700 font-bold flex items-center bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +15% tuần này
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 font-medium">Đã bóc tách & phân loại tự động</p>
        </div>

        {/* AI High Match Rate */}
        <div className="glass-card rounded-3xl p-5 shadow-sm group hover:-translate-y-1 transition-all duration-300 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tỷ lệ đạt chuẩn AI JD</span>
            <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight tabular-nums">{matchRate}%</span>
            <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
              {highMatchCount}/{total} hồ sơ
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 font-medium">Điểm AI đối chiếu JD &ge; 85%</p>
        </div>

        {/* In Interview */}
        <div className="glass-card rounded-3xl p-5 shadow-sm group hover:-translate-y-1 transition-all duration-300 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Đang phỏng vấn</span>
            <span className="p-2.5 bg-purple-50 text-purple-600 rounded-2xl border border-purple-200 group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4 text-purple-600" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight tabular-nums">{inInterviewCount}</span>
            <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
              Vòng 1 & Vòng 2
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 font-medium">Có link Google Meet tự động</p>
        </div>

        {/* Talent Pool & Offers */}
        <div className="glass-card rounded-3xl p-5 shadow-sm group hover:-translate-y-1 transition-all duration-300 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Kho Talent Pool</span>
            <span className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-200 group-hover:scale-110 transition-transform">
              <Star className="w-4 h-4 text-amber-600" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight tabular-nums">{talentPoolCount}</span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
              {offerCount} Offer
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 font-medium">Sẵn sàng tái kích hoạt nhanh</p>
        </div>
      </div>

      {/* Real-time Recruitment Pipeline Funnel */}
      <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              Tiến trình quy trình tuyển dụng theo thời gian thực (Pipeline Funnel)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Số lượng ứng viên luân chuyển qua từng giai đoạn tuyển dụng
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('kanban')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer hover:translate-x-1 duration-200"
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
                className="group glass-card rounded-2xl p-4 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:border-indigo-400 border border-slate-200"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                  <span>Vòng {idx + 1}</span>
                  <span className="font-bold text-indigo-700 tabular-nums">{percentage}%</span>
                </div>
                <div className="text-2xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors tabular-nums">
                  {step.count}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1">
                  {step.name}
                </div>
                <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
                  <div
                    className={`h-full bg-gradient-to-r ${step.color} transition-all duration-500`}
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
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Ứng viên điểm AI cao nhất (Top Candidates)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Được AI đối chiếu tiêu chí và trích xuất bằng chứng xác thực
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('comparison')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer hover:translate-x-0.5"
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
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : score >= 80
                  ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200';

              return (
                <div
                  key={cand.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl glass-card hover:border-indigo-400 transition-all duration-200 gap-4 border border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        cand.avatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                      }
                      alt={cand.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-slate-900">{cand.name}</h3>
                        <span
                          className={`px-2 py-0.5 text-[11px] font-bold rounded-lg border ${badgeColor}`}
                        >
                          {score}/100 Điểm AI
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">{cand.appliedJobTitle}</p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {cand.extractedInfo.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => onSelectCandidate(cand)}
                      className="btn-secondary px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5"
                      title="Xem hồ sơ chi tiết"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      <span className="hidden md:inline">Chi tiết</span>
                    </button>
                    <button
                      onClick={() => onOpenScheduleModal(cand)}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition cursor-pointer flex items-center gap-1.5 hover:scale-[1.02] active:scale-95"
                      title="Lên lịch phỏng vấn"
                    >
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      <span className="hidden md:inline">Phỏng vấn</span>
                    </button>
                    <button
                      onClick={() => onOpenEmailModal(cand)}
                      className="btn-primary px-3 py-1.5 rounded-xl text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"
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

        {/* Candidate Sources & Quick Help */}
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200">
            <h2 className="text-base font-extrabold text-slate-900 mb-4">Nguồn ứng viên tiếp nhận</h2>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-700 mb-1.5 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <UploadCloud className="w-3.5 h-3.5 text-indigo-600" />
                    Tải lên tệp CV (File Upload)
                  </span>
                  <span className="font-extrabold text-slate-900">{directSources} hồ sơ</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
                    style={{ width: `${total > 0 ? (directSources / total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-700 mb-1.5 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-600" />
                    Hộp thư Email tự động lọc
                  </span>
                  <span className="font-extrabold text-slate-900">{emailSources} hồ sơ</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full"
                    style={{ width: `${total > 0 ? (emailSources / total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-700 mb-1.5 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Portal Tuyển Dụng / Website
                  </span>
                  <span className="font-extrabold text-slate-900">{portalSources} hồ sơ</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                    style={{ width: `${total > 0 ? (portalSources / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Thời gian tuyển dụng TB:</span>
                <span className="font-bold text-slate-900">12.5 ngày</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium mt-2">
                <span>Độ chính xác AI đối chiếu:</span>
                <span className="font-bold text-emerald-700">97.4%</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-5 shadow-sm border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-black text-indigo-700">
              <Sparkles className="w-4 h-4 text-lime-600" />
              <span>Quy trình Tuyển Dụng AI Hiện Đại</span>
            </div>
            <p className="font-medium">• Tải file PDF/DOCX/Ảnh lên trực tiếp để AI tự trích xuất văn bản.</p>
            <p className="font-medium">• Tự động gửi bộ test kết hợp IQ, EQ, AQ cho ứng viên trước phỏng vấn.</p>
            <p className="font-medium">• Đối chiếu từng tiêu chí và trình bày dẫn chứng minh bạch cho HR.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
