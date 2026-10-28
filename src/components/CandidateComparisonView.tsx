import React, { useState } from 'react';
import {
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Award,
  Crown,
  Calendar,
  Send,
  Star,
  FileCheck2,
  TrendingUp,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';
import { Candidate, Job } from '../types/recruitment';

interface CandidateComparisonViewProps {
  candidates: Candidate[];
  jobs: Job[];
  selectedJobId: string;
  onOpenScheduleModal: (candidate: Candidate) => void;
  onOpenEmailModal: (candidate: Candidate) => void;
  onSelectCandidate: (candidate: Candidate) => void;
}

export const CandidateComparisonView: React.FC<CandidateComparisonViewProps> = ({
  candidates,
  jobs,
  selectedJobId,
  onOpenScheduleModal,
  onOpenEmailModal,
  onSelectCandidate,
}) => {
  const eligibleCandidates =
    selectedJobId === 'all'
      ? candidates
      : candidates.filter((c) => c.appliedJobId === selectedJobId);

  // Default select the top 3 candidates
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>(
    eligibleCandidates.slice(0, 3).map((c) => c.id)
  );

  const selectedCandidates = candidates.filter((c) => selectedCandidateIds.includes(c.id));

  const handleToggleCandidate = (id: string) => {
    if (selectedCandidateIds.includes(id)) {
      if (selectedCandidateIds.length <= 1) return; // Keep at least 1
      setSelectedCandidateIds((prev) => prev.filter((item) => item !== id));
    } else {
      if (selectedCandidateIds.length >= 4) {
        return;
      }
      setSelectedCandidateIds((prev) => [...prev, id]);
    }
  };

  // Find the top scored candidate among selected
  const bestCandidate = [...selectedCandidates].sort(
    (a, b) => (b.aiAnalysis?.overallScore || 0) - (a.aiAnalysis?.overallScore || 0)
  )[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-6 shadow-sm border border-slate-200/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-2xl border border-indigo-200 shadow-xs">
                <Scale className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Bảng Đối Chiếu & So Sánh Ứng Viên (Candidate Matrix)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  So sánh trực quan từ 2 - 4 ứng viên dựa trên thang điểm AI, kết quả kiểm tra năng lực và mức độ đáp ứng JD.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Chọn tối đa 4 ứng viên:</span>
          </div>
        </div>

        {/* Candidate Selector Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          {eligibleCandidates.map((c) => {
            const isSelected = selectedCandidateIds.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => handleToggleCandidate(c.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                  isSelected
                    ? 'btn-primary text-white shadow-md shadow-indigo-600/25'
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
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 ml-0.5 text-white" />
                ) : (
                  <Plus className="w-3.5 h-3.5 ml-0.5 text-slate-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-sm border border-slate-200/90">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-4 px-5 text-xs font-bold text-slate-700 uppercase tracking-wider w-48 sm:w-56 bg-slate-100/70 border-r border-slate-200">
                  Tiêu chí so sánh
                </th>
                {selectedCandidates.map((cand) => {
                  const isWinner = cand.id === bestCandidate?.id && selectedCandidates.length > 1;
                  return (
                    <th
                      key={cand.id}
                      className="py-4 px-5 min-w-[250px] align-top border-r border-slate-200 last:border-r-0 bg-white"
                    >
                      <div className="space-y-2">
                        {isWinner ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
                            <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>AI Đề Xuất Hàng Đầu</span>
                          </div>
                        ) : (
                          <div className="h-6" />
                        )}
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              cand.avatar ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                            }
                            alt={cand.name}
                            className="w-10 h-10 rounded-2xl object-cover border-2 border-indigo-100 shadow-xs"
                          />
                          <div className="min-w-0">
                            <h3 className="text-sm font-black text-slate-900 truncate">{cand.name}</h3>
                            <p className="text-[11px] text-slate-500 font-medium truncate">
                              {cand.appliedJobTitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1 text-xs">
                          <button
                            onClick={() => onSelectCandidate(cand)}
                            className="text-[11px] text-indigo-600 hover:text-indigo-800 underline font-semibold cursor-pointer"
                          >
                            Xem hồ sơ 360
                          </button>
                          <span className="text-slate-300">•</span>
                          <button
                            onClick={() => handleToggleCandidate(cand.id)}
                            className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                          >
                            Bỏ chọn
                          </button>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {/* Row: Điểm số AI Tổng hợp */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-bold text-slate-800 bg-slate-50/80 border-r border-slate-200">
                  <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Điểm AI Khớp JD
                  </span>
                </td>
                {selectedCandidates.map((cand) => {
                  const score = cand.aiAnalysis?.overallScore || 0;
                  return (
                    <td key={cand.id} className="py-3.5 px-5 border-r border-slate-200 last:border-r-0 bg-white">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl font-black text-slate-900 tracking-tight">{score}/100</span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${
                            score >= 90
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : score >= 80
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          Khớp {cand.aiAnalysis?.matchLevel}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row: Khuyến nghị AI */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-bold text-slate-800 bg-slate-50/80 border-r border-slate-200">
                  Khuyến nghị Tuyển dụng
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5 border-r border-slate-200 last:border-r-0 bg-white">
                    <span className="font-bold text-indigo-700 text-sm">
                      {cand.aiAnalysis?.recommendation || 'Đang đánh giá'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Điểm kiểm tra năng lực trực tuyến */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-bold text-slate-800 bg-slate-50/80 border-r border-slate-200">
                  <span className="flex items-center gap-1.5 text-violet-700 font-bold">
                    <FileCheck2 className="w-4 h-4 text-violet-600" />
                    Điểm Test Năng Lực
                  </span>
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5 border-r border-slate-200 last:border-r-0 bg-white">
                    {cand.testResult ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-slate-900">
                            {cand.testResult.score}%
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                            Đạt chuẩn
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          Đúng {cand.testResult.correctAnswers}/{cand.testResult.totalQuestions} câu • {cand.testResult.timeSpentMinutes} phút
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Chưa thực hiện test</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Số năm kinh nghiệm & Vị trí hiện tại */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-bold text-slate-800 bg-slate-50/80 border-r border-slate-200">
                  Kinh nghiệm thực chiến
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5 border-r border-slate-200 last:border-r-0 bg-white">
                    <strong className="text-slate-900 font-bold text-sm">
                      {cand.extractedInfo.yearsOfExperience} năm
                    </strong>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      {cand.extractedInfo.currentRole}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Row: Kỹ năng cốt lõi */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-bold text-slate-800 bg-slate-50/80 border-r border-slate-200">
                  Kỹ năng chuyên môn
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5 border-r border-slate-200 last:border-r-0 bg-white">
                    <div className="flex flex-wrap gap-1.5">
                      {cand.extractedInfo.skills.slice(0, 5).map((sk) => (
                        <span
                          key={sk}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-[11px] text-slate-700 font-semibold border border-slate-200"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row: Trình độ học vấn & Chứng chỉ */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-bold text-slate-800 bg-slate-50/80 border-r border-slate-200">
                  Học vấn & Chứng chỉ
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5 text-xs text-slate-700 space-y-1 border-r border-slate-200 last:border-r-0 bg-white">
                    {cand.extractedInfo.education.map((edu, idx) => (
                      <div key={idx} className="leading-snug">
                        🎓 <strong className="text-slate-900 font-semibold">{edu.school}</strong> ({edu.degree})
                      </div>
                    ))}
                    {cand.extractedInfo.certifications.length > 0 && (
                      <div className="text-[11px] text-indigo-600 font-semibold pt-0.5">
                        📜 {cand.extractedInfo.certifications.join(', ')}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Mức lương kỳ vọng & Sẵn sàng */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-bold text-slate-800 bg-slate-50/80 border-r border-slate-200">
                  Mức lương & Sẵn sàng
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5 border-r border-slate-200 last:border-r-0 bg-white">
                    <div className="font-bold text-amber-700 text-sm">
                      {cand.expectedSalary || 'Thương lượng'}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Báo trước: {cand.noticePeriod || 'Thoả thuận'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row: Điểm mạnh chính */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-bold text-slate-800 bg-slate-50/80 border-r border-slate-200">
                  Điểm mạnh vượt trội
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5 text-xs text-slate-700 border-r border-slate-200 last:border-r-0 bg-white">
                    <ul className="space-y-1.5">
                      {cand.aiAnalysis?.strengths?.slice(0, 2).map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className="text-emerald-600 font-bold shrink-0">✓</span>
                          <span className="font-medium text-slate-700">{str}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row: Hành động tuyển dụng nhanh */}
              <tr className="bg-slate-50/60">
                <td className="py-4 px-5 font-bold text-slate-800 bg-slate-100/70 border-r border-slate-200">
                  Hành động nhanh
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-4 px-5 border-r border-slate-200 last:border-r-0 bg-white">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onOpenScheduleModal(cand)}
                        className="w-full btn-primary px-3 py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20 active:scale-98"
                      >
                        <Calendar className="w-3.5 h-3.5 text-white" />
                        <span>Mời phỏng vấn</span>
                      </button>
                      <button
                        onClick={() => onOpenEmailModal(cand)}
                        className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                      >
                        <Send className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Gửi email</span>
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
