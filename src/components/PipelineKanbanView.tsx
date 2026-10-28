import React, { useRef } from 'react';
import {
  Users,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Send,
  Eye,
  Mail,
  UploadCloud,
  FileCheck2,
  Brain,
  ShieldCheck,
  HeartHandshake,
  ArrowLeft,
  ArrowRight,
  MousePointer,
} from 'lucide-react';
import { Candidate, RecruitmentStage, Job } from '../types/recruitment';

interface PipelineKanbanViewProps {
  candidates: Candidate[];
  jobs: Job[];
  selectedJobId: string;
  onUpdateCandidateStage: (candidateId: string, newStage: RecruitmentStage) => void;
  onSelectCandidate: (candidate: Candidate) => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
  onOpenEmailModal: (candidate: Candidate) => void;
}

const STAGES: { id: RecruitmentStage; title: string; color: string; badgeColor: string }[] = [
  {
    id: 'cv_filter',
    title: '1. Lọc CV & Đối chiếu JD',
    color: 'border-t-blue-500',
    badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/40',
  },
  {
    id: 'assessment',
    title: '2. Test IQ + EQ + AQ',
    color: 'border-t-lime-500',
    badgeColor: 'bg-lime-50 text-lime-800 dark:bg-lime-500/20 dark:text-lime-300 border-lime-200 dark:border-lime-500/40',
  },
  {
    id: 'interview_1',
    title: '3. Phỏng Vấn Vòng 1',
    color: 'border-t-indigo-500',
    badgeColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/40',
  },
  {
    id: 'interview_2',
    title: '4. Phỏng Vấn Chuyên Sâu',
    color: 'border-t-purple-500',
    badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border-purple-200 dark:border-purple-500/40',
  },
  {
    id: 'offer',
    title: '5. Đề Xuất Offer',
    color: 'border-t-amber-500',
    badgeColor: 'bg-amber-50 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border-amber-200 dark:border-amber-500/40',
  },
  {
    id: 'hired',
    title: '6. Đã Tuyển Dụng',
    color: 'border-t-emerald-500',
    badgeColor: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40',
  },
];

export const PipelineKanbanView: React.FC<PipelineKanbanViewProps> = ({
  candidates,
  jobs,
  selectedJobId,
  onUpdateCandidateStage,
  onSelectCandidate,
  onOpenScheduleModal,
  onOpenEmailModal,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredCandidates =
    selectedJobId === 'all'
      ? candidates
      : candidates.filter((c) => c.appliedJobId === selectedJobId);

  // Convert vertical mouse wheel into horizontal scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      if (Math.abs(e.deltaY) > 0) {
        scrollContainerRef.current.scrollLeft += e.deltaY * 1.2;
      }
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const getNextStage = (currentStage: RecruitmentStage): RecruitmentStage | null => {
    const stageIds: RecruitmentStage[] = [
      'cv_filter',
      'assessment',
      'interview_1',
      'interview_2',
      'offer',
      'hired',
    ];
    const currentIndex = stageIds.indexOf(currentStage);
    if (currentIndex >= 0 && currentIndex < stageIds.length - 1) {
      return stageIds[currentIndex + 1];
    }
    return null;
  };

  const getPrevStage = (currentStage: RecruitmentStage): RecruitmentStage | null => {
    const stageIds: RecruitmentStage[] = [
      'cv_filter',
      'assessment',
      'interview_1',
      'interview_2',
      'offer',
      'hired',
    ];
    const currentIndex = stageIds.indexOf(currentStage);
    if (currentIndex > 0) {
      return stageIds[currentIndex - 1];
    }
    return null;
  };

  return (
    <div className="space-y-5">
      {/* Top Banner with Horizontal Scroll Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              Bảng Quản Lý Trạng Thái Tuyển Dụng (Real-time ATS Pipeline)
            </h2>
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <MousePointer className="w-3 h-3" />
              Lăn chuột để cuộn ngang
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Theo dõi tiến trình từng ứng viên theo thời gian thực từ khâu Lọc CV, Tự động gửi Test IQ/EQ/AQ tới Phỏng vấn & Offer
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Scroll Left / Right Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={handleScrollLeft}
              className="p-1.5 rounded-xl hover:bg-white text-slate-600 hover:text-indigo-600 shadow-2xs transition cursor-pointer"
              title="Cuộn sang trái"
              aria-label="Cuộn sang trái"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold text-slate-500 px-1 select-none">
              6 Cột
            </span>
            <button
              onClick={handleScrollRight}
              className="p-1.5 rounded-xl hover:bg-white text-slate-600 hover:text-indigo-600 shadow-2xs transition cursor-pointer"
              title="Cuộn sang phải"
              aria-label="Cuộn sang phải"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-700 glass-card px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs font-medium">
            Đang hiển thị: <strong className="text-indigo-600 font-bold">{filteredCandidates.length}</strong> ứng viên
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Kanban Columns with Mouse Wheel Support */}
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        className="flex items-start gap-4 overflow-x-auto pb-6 pt-1 select-none transition-all"
        style={{
          scrollbarWidth: 'auto',
        }}
      >
        {STAGES.map((stage) => {
          const stageCandidates = filteredCandidates.filter((c) => c.stage === stage.id);

          return (
            <div
              key={stage.id}
              className={`glass-panel border-t-4 ${stage.color} rounded-3xl p-4 flex flex-col min-h-[600px] min-w-[310px] w-[310px] shrink-0 shadow-sm border border-slate-200/80 dark:border-white/5`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-3.5">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {stage.title}
                </h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${stage.badgeColor}`}
                >
                  {stageCandidates.length}
                </span>
              </div>

              {/* Candidates list in column */}
              <div className="space-y-3.5 flex-1 overflow-y-auto pr-0.5">
                {stageCandidates.map((cand) => {
                  const score = cand.aiAnalysis?.overallScore || 0;
                  const nextStage = getNextStage(cand.stage);
                  const prevStage = getPrevStage(cand.stage);

                  const scoreColor =
                    score >= 90
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-300 dark:text-emerald-300 dark:bg-emerald-500/15 dark:border-emerald-500/30'
                      : score >= 80
                      ? 'text-indigo-700 bg-indigo-50 border-indigo-300 dark:text-indigo-300 dark:bg-indigo-500/15 dark:border-indigo-500/30'
                      : 'text-amber-800 bg-amber-50 border-amber-300 dark:text-amber-300 dark:bg-amber-500/15 dark:border-amber-500/30';

                  return (
                    <div
                      key={cand.id}
                      className="group glass-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 space-y-3 border border-slate-200/90 dark:border-white/10 hover:-translate-y-0.5 bg-white/95 dark:bg-slate-900/70"
                    >
                      {/* Avatar, Full Name & AI Score */}
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <img
                            src={
                              cand.avatar ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                            }
                            alt={cand.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/15 shrink-0 shadow-xs"
                          />
                          <div className="min-w-0 flex-1">
                            <h4
                              onClick={() => onSelectCandidate(cand)}
                              className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer truncate"
                              title={cand.name}
                            >
                              {cand.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate" title={cand.appliedJobTitle}>
                              {cand.appliedJobTitle}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-lg text-[11px] font-black border shrink-0 ${scoreColor}`}
                          title="Điểm AI đối chiếu tiêu chí JD"
                        >
                          {score}đ
                        </span>
                      </div>

                      {/* Source & File tag */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 font-medium">
                          {cand.source === 'Email' ? (
                            <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-300 font-semibold">
                              <Mail className="w-2.5 h-2.5" /> Email
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-300 font-semibold">
                              <UploadCloud className="w-2.5 h-2.5" /> Tải tệp CV
                            </span>
                          )}
                        </span>

                        {cand.sourceFileName && (
                          <span
                            className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 truncate max-w-[140px] border border-slate-200 dark:border-white/5 font-mono text-[9px]"
                            title={cand.sourceFileName}
                          >
                            {cand.sourceFileName}
                          </span>
                        )}
                      </div>

                      {/* IQ, EQ, AQ Dimensions Badge Container */}
                      {(cand.iqScore || cand.eqScore || cand.aqScore) ? (
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/5 space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-semibold">
                            <span className="text-slate-600 dark:text-slate-400">Chỉ số năng lực:</span>
                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">
                              Test: {cand.testResult?.score || 90}%
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-1 pt-0.5 text-center text-[10px]">
                            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 py-0.5 rounded font-bold border border-blue-200 dark:border-blue-500/30">
                              IQ: {cand.iqScore || 90}
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 py-0.5 rounded font-bold border border-emerald-200 dark:border-emerald-500/30">
                              EQ: {cand.eqScore || 85}
                            </div>
                            <div className="bg-lime-50 dark:bg-lime-900/30 text-lime-800 dark:text-lime-300 py-0.5 rounded font-bold border border-lime-200 dark:border-lime-500/30">
                              AQ: {cand.aqScore || 88}
                            </div>
                          </div>
                        </div>
                      ) : cand.assessmentStatus === 'auto_sent' ? (
                        <div className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 flex items-center justify-between text-[10px]">
                          <span className="text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1">
                            <FileCheck2 className="w-3 h-3 text-amber-600" />
                            Đã tự động gửi link test
                          </span>
                          <span className="text-slate-500 text-[9px]">Chờ nộp</span>
                        </div>
                      ) : null}

                      {/* Skills snippet */}
                      <div className="flex flex-wrap gap-1">
                        {cand.extractedInfo.skills.slice(0, 3).map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 text-[10px] rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons on card with adequate room */}
                      <div className="pt-2.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onSelectCandidate(cand)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                            title="Xem chi tiết hồ sơ"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onOpenScheduleModal(cand)}
                            className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-500/20 dark:hover:bg-purple-500/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 transition cursor-pointer"
                            title="Lên lịch phỏng vấn"
                          >
                            <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          </button>
                          <button
                            onClick={() => onOpenEmailModal(cand)}
                            className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 transition cursor-pointer"
                            title="Gửi email thông báo"
                          >
                            <Send className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          </button>
                        </div>

                        {/* Stage transition controls */}
                        <div className="flex items-center gap-1.5">
                          {prevStage && (
                            <button
                              onClick={() => onUpdateCandidateStage(cand.id, prevStage)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition cursor-pointer"
                              title="Chuyển về vòng trước"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {nextStage && (
                            <button
                              onClick={() => onUpdateCandidateStage(cand.id, nextStage)}
                              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold transition cursor-pointer flex items-center gap-1 shadow-xs"
                              title="Chuyển sang vòng tiếp theo"
                            >
                              <span>Tiến</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {stageCandidates.length === 0 && (
                  <div className="h-36 border border-dashed border-slate-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-xs text-slate-400 dark:text-slate-500 gap-1">
                    <span>Không có ứng viên</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
