import React, { useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Calendar,
  Send,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck2,
  Mail,
  Star,
  BookmarkCheck,
  Clock,
  ShieldCheck,
  Plus,
  Brain,
  Award,
} from 'lucide-react';
import { Candidate, RecruitmentStage } from '../types/recruitment';

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onUpdateStage: (candidateId: string, newStage: RecruitmentStage) => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
  onOpenEmailModal: (candidate: Candidate) => void;
  onAddNote: (candidateId: string, content: string) => void;
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  candidate,
  onClose,
  onUpdateStage,
  onOpenScheduleModal,
  onOpenEmailModal,
  onAddNote,
}) => {
  if (!candidate) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'criteria' | 'test' | 'notes' | 'emails'>(
    'profile'
  );
  const [newNoteText, setNewNoteText] = useState('');

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(candidate.id, newNoteText.trim());
    setNewNoteText('');
  };

  const ai = candidate.aiAnalysis;
  const score = ai?.overallScore || 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/30 rounded-3xl max-w-4xl w-full p-6 shadow-2xl text-slate-800 dark:text-slate-100 space-y-5 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={
                candidate.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
              }
              alt={candidate.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 dark:border-indigo-500/40 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">{candidate.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                  {candidate.stage.toUpperCase()}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                  Điểm AI: {score}/100
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                {candidate.appliedJobTitle} • {candidate.extractedInfo.yearsOfExperience} năm KN •
                Nguồn: {candidate.source}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>📧 {candidate.email}</span>
                <span>📞 {candidate.phone}</span>
                {candidate.expectedSalary && (
                  <span className="text-amber-700 dark:text-amber-300 font-semibold">💰 {candidate.expectedSalary}</span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-lg font-bold p-1 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs sm:text-sm font-bold overflow-x-auto no-scrollbar">
          {[
            { id: 'profile', label: 'Hồ sơ & Kinh nghiệm' },
            { id: 'criteria', label: `Đối chiếu JD (${ai?.criteriaEvaluations?.length || 0})` },
            { id: 'test', label: 'Bài Test Năng Lực (IQ/EQ/AQ)' },
            { id: 'notes', label: `Ghi chú HR (${candidate.notes?.length || 0})` },
            { id: 'emails', label: `Lịch sử Email (${candidate.emailLogs?.length || 0})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-indigo-50 dark:bg-indigo-600/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* TAB 1: Profile & Work History */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                <h4 className="font-extrabold text-slate-900 dark:text-white mb-1">Tóm tắt tiểu sử nghề nghiệp:</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {candidate.extractedInfo.summary || 'Chưa có thông tin tóm tắt'}
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Lịch sử công việc & Dự án đã tham gia:
                </h4>
                <div className="space-y-2">
                  {candidate.extractedInfo.workExperience?.map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 dark:text-white text-sm font-bold">{w.role}</strong>
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">{w.period}</span>
                      </div>
                      <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs mt-0.5">{w.company}</div>
                      {w.description && (
                        <p className="text-slate-600 dark:text-slate-300 mt-2 text-xs leading-relaxed">
                          {w.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  Học vấn & Bằng cấp:
                </h4>
                <div className="space-y-1.5">
                  {candidate.extractedInfo.education?.map((edu, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 flex items-center justify-between"
                    >
                      <div>
                        <strong className="text-slate-900 dark:text-white font-bold">{edu.school}</strong>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{edu.degree}</p>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white mb-2">Kỹ năng chuyên môn:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.extractedInfo.skills?.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Criteria Breakdown */}
          {activeTab === 'criteria' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/20 text-xs text-indigo-900 dark:text-slate-200 font-medium">
                <strong className="font-bold text-indigo-800 dark:text-indigo-300">Nhận định AI:</strong> {ai?.summaryAssessment}
              </div>

              <div className="space-y-2">
                {ai?.criteriaEvaluations?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs sm:text-sm text-slate-900 dark:text-white font-bold">
                        {item.criterionName}
                      </strong>
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${
                          item.status === 'Đạt'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300'
                            : item.status === 'Đạt một phần'
                            ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300'
                            : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-500/20 dark:text-rose-300'
                        }`}
                      >
                        {item.status} ({item.score}/100)
                      </span>
                    </div>
                    <p className="text-xs italic text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200 dark:border-white/5">
                      Dẫn chứng từ CV: "{item.evidence}"
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{item.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Test Result (IQ, EQ, AQ, Technical) */}
          {activeTab === 'test' && (
            <div className="space-y-4">
              {/* Highlight Dimensions Card */}
              {(candidate.iqScore || candidate.eqScore || candidate.aqScore) && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-lime-50/40 to-white dark:from-slate-800/60 dark:to-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">
                        Hồ Sơ Năng Lực Toàn Diện (IQ + EQ + AQ)
                      </h4>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-lime-100 text-lime-800 border border-lime-300">
                      Tự động gửi trước
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-500/30 text-center shadow-xs">
                      <div className="text-[11px] font-bold text-blue-700 dark:text-blue-300">Trí Tuệ (IQ)</div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
                        {candidate.iqScore || 90}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Tư duy logic & giải thuật</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-500/30 text-center shadow-xs">
                      <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Cảm Xúc (EQ)</div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
                        {candidate.eqScore || 85}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Thấu cảm & giao tiếp</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-lime-300 dark:border-lime-500/30 text-center shadow-xs">
                      <div className="text-[11px] font-bold text-lime-800 dark:text-lime-300">Vượt Khó (AQ)</div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
                        {candidate.aqScore || 88}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Nghịch cảnh & chịu áp lực</div>
                    </div>
                  </div>
                </div>
              )}

              {candidate.testResult ? (
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Kết quả bài test: {candidate.testResult.score}% (
                        {candidate.testResult.passed ? 'ĐẠT YÊU CẦU' : 'CHƯA ĐẠT'})
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                        Ngày thi: {candidate.testResult.completedAt} • Thời gian:{' '}
                        {candidate.testResult.timeSpentMinutes} phút
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 rounded-full text-xs font-bold">
                      {candidate.testResult.correctAnswers}/{candidate.testResult.totalQuestions} Câu đúng
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <h5 className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                      Chi tiết theo từng năng lực:
                    </h5>
                    {candidate.testResult.breakdown.map((b) => (
                      <div key={b.topic} className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold">
                          <span>{b.topic}</span>
                          <strong className="text-slate-900 dark:text-white">{b.score}%</strong>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1.5 rounded-full" style={{ width: `${b.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-10 text-center text-slate-500 dark:text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/30">
                  Ứng viên chưa hoàn thành bài test năng lực trực tuyến.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Internal HR Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <form onSubmit={handleAddNoteSubmit} className="space-y-2">
                <textarea
                  rows={3}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Thêm ghi chú đánh giá nội bộ của HR..."
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 btn-primary rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lưu Ghi Chú</span>
                </button>
              </form>

              <div className="space-y-2 pt-2">
                {candidate.notes?.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-xs text-slate-700 dark:text-slate-200 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                      <strong className="text-slate-800 dark:text-white">{n.author}</strong>
                      <span>{n.createdAt}</span>
                    </div>
                    <p className="leading-relaxed font-normal">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Email History */}
          {activeTab === 'emails' && (
            <div className="space-y-2">
              {candidate.emailLogs && candidate.emailLogs.length > 0 ? (
                candidate.emailLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-200 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 dark:text-white font-bold">{log.subject}</strong>
                      <span className="text-slate-500 dark:text-slate-400">{log.sentAt}</span>
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                      Trạng thái: Đã gửi thành công ({log.status})
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/30">
                  Chưa có lịch sử email nào được gửi cho ứng viên này.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Bottom */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Chuyển vòng:</span>
            <select
              value={candidate.stage}
              onChange={(e) => onUpdateStage(candidate.id, e.target.value as RecruitmentStage)}
              className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white font-medium cursor-pointer"
            >
              <option value="cv_filter">1. Lọc CV & Đối chiếu JD</option>
              <option value="assessment">2. Test IQ/EQ/AQ</option>
              <option value="interview_1">3. Phỏng Vấn Vòng 1</option>
              <option value="interview_2">4. Phỏng Vấn Vòng 2</option>
              <option value="offer">5. Đề Xuất Offer</option>
              <option value="hired">6. Đã Tuyển</option>
              <option value="talent_pool">Lưu Talent Pool</option>
              <option value="rejected">Từ chối</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenScheduleModal(candidate);
              }}
              className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition hover:scale-[1.02] active:scale-95 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>Lên Lịch Phỏng Vấn</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenEmailModal(candidate);
              }}
              className="btn-primary px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
