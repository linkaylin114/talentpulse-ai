import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Send,
  Eye,
  Star,
  FileCheck2,
  Clock,
  MoreVertical,
  Plus,
  Mail,
  Linkedin,
  Filter,
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
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  {
    id: 'assessment',
    title: '2. Test Năng Lực',
    color: 'border-t-indigo-500',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  },
  {
    id: 'interview_1',
    title: '3. Phỏng Vấn Vòng 1',
    color: 'border-t-violet-500',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
  },
  {
    id: 'interview_2',
    title: '4. Phỏng Vấn Vòng 2',
    color: 'border-t-purple-500',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
  {
    id: 'offer',
    title: '5. Đề Xuất Offer',
    color: 'border-t-pink-500',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
  },
  {
    id: 'hired',
    title: '6. Đã Tuyển Dụng',
    color: 'border-t-emerald-500',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
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
  const filteredCandidates =
    selectedJobId === 'all'
      ? candidates
      : candidates.filter((c) => c.appliedJobId === selectedJobId);

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
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Bảng Quản Lý Trạng Thái Quy Trình Tuyển Dụng (ATS Kanban)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Theo dõi ứng viên theo thời gian thực từ khâu nộp đơn tới khi onboard thành công
          </p>
        </div>

        <div className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          Tổng cộng: <strong className="text-white">{filteredCandidates.length}</strong> ứng viên
        </div>
      </div>

      {/* Horizontal Scrollable Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-6">
        {STAGES.map((stage) => {
          const stageCandidates = filteredCandidates.filter((c) => c.stage === stage.id);

          return (
            <div
              key={stage.id}
              className={`bg-slate-900/90 border border-slate-800 border-t-4 ${stage.color} rounded-2xl p-3.5 flex flex-col min-h-[580px] shadow-md`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <h3 className="text-xs font-bold text-slate-200 line-clamp-1">{stage.title}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${stage.badgeColor}`}
                >
                  {stageCandidates.length}
                </span>
              </div>

              {/* Candidates list in column */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {stageCandidates.map((cand) => {
                  const score = cand.aiAnalysis?.overallScore || 0;
                  const nextStage = getNextStage(cand.stage);
                  const prevStage = getPrevStage(cand.stage);

                  const scoreColor =
                    score >= 90
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                      : score >= 80
                      ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
                      : score >= 70
                      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                      : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

                  return (
                    <div
                      key={cand.id}
                      className="group bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 rounded-xl p-3 shadow-sm transition space-y-2.5"
                    >
                      {/* Avatar, Name & Score */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              cand.avatar ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                            }
                            alt={cand.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-600 shrink-0"
                          />
                          <div>
                            <h4
                              onClick={() => onSelectCandidate(cand)}
                              className="text-xs font-bold text-white hover:text-indigo-300 transition cursor-pointer line-clamp-1"
                            >
                              {cand.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 line-clamp-1">
                              {cand.appliedJobTitle}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold border shrink-0 ${scoreColor}`}
                          title="Điểm AI đối chiếu JD"
                        >
                          {score}đ
                        </span>
                      </div>

                      {/* Source & Test Result Badge */}
                      <div className="flex flex-wrap items-center gap-1 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-slate-700/80 text-slate-300">
                          {cand.source === 'Email' ? (
                            <span className="flex items-center gap-1 text-cyan-300">
                              <Mail className="w-2.5 h-2.5" /> Email
                            </span>
                          ) : cand.source === 'LinkedIn' ? (
                            <span className="flex items-center gap-1 text-blue-300">
                              <Linkedin className="w-2.5 h-2.5" /> LinkedIn
                            </span>
                          ) : (
                            cand.source
                          )}
                        </span>

                        {cand.testResult && (
                          <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold">
                            Test: {cand.testResult.score}%
                          </span>
                        )}

                        {cand.interviewSchedule && (
                          <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            📅 {cand.interviewSchedule.date.slice(5)}
                          </span>
                        )}
                      </div>

                      {/* Skills snippet */}
                      <div className="flex flex-wrap gap-1">
                        {cand.extractedInfo.skills.slice(0, 3).map((sk) => (
                          <span
                            key={sk}
                            className="px-1.5 py-0.5 text-[9px] rounded bg-slate-900/60 text-slate-300"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons on card */}
                      <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onSelectCandidate(cand)}
                            className="p-1 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                            title="Xem chi tiết hồ sơ"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onOpenScheduleModal(cand)}
                            className="p-1 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                            title="Lên lịch phỏng vấn"
                          >
                            <Calendar className="w-3 h-3 text-purple-400" />
                          </button>
                          <button
                            onClick={() => onOpenEmailModal(cand)}
                            className="p-1 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                            title="Gửi email thông báo"
                          >
                            <Send className="w-3 h-3 text-indigo-400" />
                          </button>
                        </div>

                        {/* Move stage controls */}
                        <div className="flex items-center gap-1">
                          {prevStage && (
                            <button
                              onClick={() => onUpdateCandidateStage(cand.id, prevStage)}
                              className="p-1 rounded bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                              title="Chuyển về vòng trước"
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                          )}
                          {nextStage && (
                            <button
                              onClick={() => onUpdateCandidateStage(cand.id, nextStage)}
                              className="px-1.5 py-0.5 rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-white border border-indigo-500/40 text-[10px] font-semibold transition cursor-pointer flex items-center gap-0.5"
                              title="Chuyển sang vòng tiếp theo"
                            >
                              <span>Tiến vòng</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {stageCandidates.length === 0 && (
                  <div className="h-32 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-[11px] text-slate-500">
                    Trống
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
