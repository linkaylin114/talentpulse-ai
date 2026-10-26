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

  // Default select the top 2 candidates
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
        // Max 4 candidates
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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                <Scale className="w-5 h-5 text-indigo-300" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Bảng Đối Chiếu & So Sánh Ứng Viên (Candidate Matrix)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              So sánh trực quan từ 2 - 4 ứng viên dựa trên thang điểm AI, kết quả kiểm tra năng lực và mức độ đáp ứng JD.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Chọn tối đa 4 ứng viên:</span>
          </div>
        </div>

        {/* Candidate Selector Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800">
          {eligibleCandidates.map((c) => {
            const isSelected = selectedCandidateIds.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => handleToggleCandidate(c.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <img
                  src={
                    c.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50'
                  }
                  alt={c.name}
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span>{c.name}</span>
                <span className="text-[10px] opacity-80">({c.aiAnalysis?.overallScore || 0}đ)</span>
                {isSelected ? <Check className="w-3 h-3 ml-0.5" /> : <Plus className="w-3 h-3 ml-0.5 opacity-50" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60">
                <th className="py-4 px-5 text-xs font-semibold text-slate-400 uppercase w-48 sm:w-56">
                  Tiêu chí so sánh
                </th>
                {selectedCandidates.map((cand) => {
                  const isWinner = cand.id === bestCandidate?.id && selectedCandidates.length > 1;
                  return (
                    <th key={cand.id} className="py-4 px-5 min-w-[240px] align-top">
                      <div className="space-y-2">
                        {isWinner && (
                          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            <Crown className="w-3 h-3 fill-amber-400" />
                            <span>AI Đề Xuất Hàng Đầu</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              cand.avatar ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                            }
                            alt={cand.name}
                            className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
                          />
                          <div>
                            <h3 className="text-sm font-bold text-white">{cand.name}</h3>
                            <p className="text-[11px] text-slate-400">{cand.appliedJobTitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => onSelectCandidate(cand)}
                            className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-medium"
                          >
                            Xem hồ sơ 360
                          </button>
                          <span className="text-slate-600">•</span>
                          <button
                            onClick={() => handleToggleCandidate(cand.id)}
                            className="text-[11px] text-rose-400 hover:text-rose-300"
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

            <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
              {/* Row: Điểm số AI Tổng hợp */}
              <tr className="hover:bg-slate-800/20">
                <td className="py-3.5 px-5 font-semibold text-slate-300 bg-slate-950/30">
                  <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Điểm AI Khớp JD
                  </span>
                </td>
                {selectedCandidates.map((cand) => {
                  const score = cand.aiAnalysis?.overallScore || 0;
                  return (
                    <td key={cand.id} className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-extrabold text-white">{score}/100</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            score >= 90
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : score >= 80
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
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
              <tr className="hover:bg-slate-800/20">
                <td className="py-3.5 px-5 font-semibold text-slate-300 bg-slate-950/30">
                  Khuyến nghị Tuyển dụng
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5">
                    <span className="font-semibold text-indigo-300">
                      {cand.aiAnalysis?.recommendation || 'Đang đánh giá'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Điểm kiểm tra năng lực trực tuyến */}
              <tr className="hover:bg-slate-800/20">
                <td className="py-3.5 px-5 font-semibold text-slate-300 bg-slate-950/30">
                  <span className="flex items-center gap-1.5 text-violet-400">
                    <FileCheck2 className="w-4 h-4" />
                    Điểm Test Năng Lực
                  </span>
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5">
                    {cand.testResult ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-white">
                            {cand.testResult.score}%
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            Đạt chuẩn
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Đúng {cand.testResult.correctAnswers}/{cand.testResult.totalQuestions} câu • {cand.testResult.timeSpentMinutes} phút
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Chưa thực hiện test</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Số năm kinh nghiệm & Vị trí hiện tại */}
              <tr className="hover:bg-slate-800/20">
                <td className="py-3.5 px-5 font-semibold text-slate-300 bg-slate-950/30">
                  Kinh nghiệm thực chiến
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5">
                    <strong className="text-white">
                      {cand.extractedInfo.yearsOfExperience} năm
                    </strong>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {cand.extractedInfo.currentRole}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Row: Kỹ năng cốt lõi */}
              <tr className="hover:bg-slate-800/20">
                <td className="py-3.5 px-5 font-semibold text-slate-300 bg-slate-950/30">
                  Kỹ năng chuyên môn
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5">
                    <div className="flex flex-wrap gap-1">
                      {cand.extractedInfo.skills.slice(0, 5).map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-200 border border-slate-700"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row: Trình độ học vấn & Chứng chỉ */}
              <tr className="hover:bg-slate-800/20">
                <td className="py-3.5 px-5 font-semibold text-slate-300 bg-slate-950/30">
                  Học vấn & Chứng chỉ
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5 text-xs text-slate-300 space-y-1">
                    {cand.extractedInfo.education.map((edu, idx) => (
                      <div key={idx}>
                        🎓 <strong>{edu.school}</strong> ({edu.degree})
                      </div>
                    ))}
                    {cand.extractedInfo.certifications.length > 0 && (
                      <div className="text-[11px] text-cyan-300">
                        📜 {cand.extractedInfo.certifications.join(', ')}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Mức lương kỳ vọng & Sẵn sàng */}
              <tr className="hover:bg-slate-800/20">
                <td className="py-3.5 px-5 font-semibold text-slate-300 bg-slate-950/30">
                  Mức lương & Sẵn sàng
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5">
                    <div className="font-semibold text-amber-300">
                      {cand.expectedSalary || 'Thương lượng'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Báo trước: {cand.noticePeriod || 'Thoả thuận'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row: Điểm mạnh chính */}
              <tr className="hover:bg-slate-800/20">
                <td className="py-3.5 px-5 font-semibold text-slate-300 bg-slate-950/30">
                  Điểm mạnh vượt trội
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3.5 px-5 text-xs text-slate-300">
                    <ul className="space-y-1">
                      {cand.aiAnalysis?.strengths?.slice(0, 2).map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row: Hành động tuyển dụng nhanh */}
              <tr className="bg-slate-950/40">
                <td className="py-4 px-5 font-semibold text-slate-300 bg-slate-950/60">
                  Hành động nhanh
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-4 px-5">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onOpenScheduleModal(cand)}
                        className="w-full px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Mời phỏng vấn</span>
                      </button>
                      <button
                        onClick={() => onOpenEmailModal(cand)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-indigo-400" />
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
