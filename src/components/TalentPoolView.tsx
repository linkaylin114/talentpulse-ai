import React, { useState } from 'react';
import {
  BookmarkCheck,
  Star,
  Search,
  Filter,
  Users,
  Sparkles,
  ArrowRight,
  Mail,
  Calendar,
  Eye,
  Download,
  Tag,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { Candidate, RecruitmentStage } from '../types/recruitment';

interface TalentPoolViewProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onOpenEmailModal: (candidate: Candidate) => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
  onReactivateCandidate: (candidateId: string, stage: RecruitmentStage) => void;
  onRemoveFromTalentPool: (candidateId: string) => void;
}

export const TalentPoolView: React.FC<TalentPoolViewProps> = ({
  candidates,
  onSelectCandidate,
  onOpenEmailModal,
  onOpenScheduleModal,
  onReactivateCandidate,
  onRemoveFromTalentPool,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  const talentPoolList = candidates.filter((c) => c.talentPoolData?.isSaved);

  // Collect all unique tags
  const allTags = Array.from(
    new Set(talentPoolList.flatMap((c) => c.talentPoolData?.tags || []))
  );

  const filteredPool = talentPoolList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.appliedJobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.extractedInfo.skills.some((sk) => sk.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTag =
      selectedTag === 'all' || (c.talentPoolData?.tags || []).includes(selectedTag);

    const matchesRating =
      ratingFilter === 0 || (c.talentPoolData?.rating || 0) >= ratingFilter;

    return matchesSearch && matchesTag && matchesRating;
  });

  const handleExportCSV = () => {
    const headers = ['Họ tên', 'Email', 'SĐT', 'Vị trí', 'Kinh nghiệm', 'Điểm AI', 'Tags'];
    const rows = filteredPool.map((c) => [
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.phone}"`,
      `"${c.appliedJobTitle}"`,
      `"${c.extractedInfo.yearsOfExperience} năm"`,
      `"${c.aiAnalysis?.overallScore || 0}"`,
      `"${(c.talentPoolData?.tags || []).join(', ')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TalentPulse_TalentPool_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Kho Ứng Viên Tiềm Năng (Talent Pool)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Lưu trữ và phân loại các hồ sơ xuất sắc để kích hoạt tuyển dụng nhanh chóng cho các chiến dịch tương lai.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Xuất Danh Sách CSV</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-800">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên, kỹ năng hoặc chức danh..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400">Lọc sao:</span>
            {[0, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRatingFilter(star)}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1 ${
                  ratingFilter === star
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {star === 0 ? 'Tất cả' : `${star}★ trở lên`}
              </button>
            ))}
          </div>
        </div>

        {/* Tags pills */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-800/60">
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3 text-amber-400" /> Thẻ:
            </span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Talent Pool Candidates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPool.map((cand) => {
          const rating = cand.talentPoolData?.rating || 4;
          const score = cand.aiAnalysis?.overallScore || 0;

          return (
            <div
              key={cand.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        cand.avatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                      }
                      alt={cand.name}
                      className="w-12 h-12 rounded-full object-cover border border-amber-500/30 shrink-0"
                    />
                    <div>
                      <h3
                        onClick={() => onSelectCandidate(cand)}
                        className="text-sm font-bold text-white hover:text-amber-300 transition cursor-pointer"
                      >
                        {cand.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{cand.appliedJobTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rating ? 'fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Score & Experience summary */}
                <div className="flex items-center justify-between text-xs bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="text-slate-300">
                    Kinh nghiệm: <strong>{cand.extractedInfo.yearsOfExperience} năm</strong>
                  </span>
                  <span className="font-bold text-amber-300">
                    Điểm AI: {score}/100
                  </span>
                </div>

                {/* Notes from HR */}
                {cand.talentPoolData?.notes && (
                  <p className="text-xs text-slate-300 italic bg-amber-950/20 border border-amber-500/20 p-2.5 rounded-xl">
                    "{cand.talentPoolData.notes}"
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cand.talentPoolData?.tags?.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {cand.extractedInfo.skills.slice(0, 4).map((sk) => (
                    <span
                      key={sk}
                      className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onReactivateCandidate(cand.id, 'interview_1')}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Tái kích hoạt phỏng vấn</span>
                </button>

                <button
                  onClick={() => onOpenEmailModal(cand)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Gửi email trao đổi cơ hội mới"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                </button>

                <button
                  onClick={() => onRemoveFromTalentPool(cand.id)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition cursor-pointer"
                  title="Xóa khỏi Talent Pool"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredPool.length === 0 && (
          <div className="col-span-full p-12 text-center text-slate-400 border border-dashed border-slate-800 rounded-2xl">
            <BookmarkCheck className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <p className="text-sm">Chưa có ứng viên nào trong Talent Pool phù hợp với bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  );
};
