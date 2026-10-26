import React, { useState } from 'react';
import {
  Linkedin,
  Sparkles,
  Search,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Plus,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Star,
  Users,
  Building,
} from 'lucide-react';
import { LINKEDIN_SAMPLE_PROFILES } from '../data/mockData';
import { Job, Candidate } from '../types/recruitment';

interface LinkedInImportViewProps {
  jobs: Job[];
  onImportCandidateFromLinkedIn: (parsedData: any, targetJob: Job) => Promise<Candidate | null>;
  onNavigateToCandidate: (candidate: Candidate) => void;
}

export const LinkedInImportView: React.FC<LinkedInImportViewProps> = ({
  jobs,
  onImportCandidateFromLinkedIn,
  onNavigateToCandidate,
}) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [rawText, setRawText] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '');
  const [isScraping, setIsScraping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedProfile, setParsedProfile] = useState<any | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importedCandidate, setImportedCandidate] = useState<Candidate | null>(null);

  const handleSelectSample = (sample: (typeof LINKEDIN_SAMPLE_PROFILES)[0]) => {
    setLinkedinUrl(sample.url);
    setRawText(sample.rawText);
    setParsedProfile(null);
    setImportedCandidate(null);
    setError(null);
  };

  const handleScrape = async () => {
    const input = rawText.trim() || linkedinUrl.trim();
    if (!input) {
      setError('Vui lòng nhập đường dẫn profile LinkedIn hoặc dán nội dung tóm tắt');
      return;
    }

    setIsScraping(true);
    setError(null);
    setParsedProfile(null);
    setImportedCandidate(null);

    try {
      const res = await fetch('/api/gemini/scrape-linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedinInput: input }),
      });

      const data = await res.json();
      if (!data.success || !data.profile) {
        throw new Error(data.error || 'Không thể trích xuất profile');
      }

      setParsedProfile(data.profile);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Lỗi khi trích xuất dữ liệu LinkedIn');
    } finally {
      setIsScraping(false);
    }
  };

  const handleSaveToATS = async () => {
    if (!parsedProfile) return;
    setIsImporting(true);
    const targetJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

    try {
      const candidate = await onImportCandidateFromLinkedIn(parsedProfile, targetJob);
      if (candidate) {
        setImportedCandidate(candidate);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Lỗi lưu vào ATS');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl border border-blue-500/30">
              <Linkedin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Tích Hợp LinkedIn Sourcing & Thu Thập CV Tức Thì
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Kéo hồ sơ ứng viên trực tiếp từ LinkedIn, AI tự động chuẩn hóa kinh nghiệm và đưa vào
                phễu tuyển dụng
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Chọn vị trí mục tiêu:</span>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Input & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input or 1-Click Samples */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>1. Nhập thông tin LinkedIn</span>
          </h3>

          {/* Quick 1-Click Samples */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Hoặc thử nhanh với các hồ sơ LinkedIn mẫu có sẵn:
            </label>
            <div className="grid grid-cols-1 gap-2">
              {LINKEDIN_SAMPLE_PROFILES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className="text-left p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/40 transition cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-200 truncate">
                      {sample.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-blue-400 font-semibold shrink-0">Nạp nhanh</span>
                </button>
              ))}
            </div>
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Đường dẫn profile LinkedIn:
            </label>
            <div className="relative">
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/username..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Raw Text Snippet */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Nội dung tóm tắt profile LinkedIn (About, Experience, Skills):
            </label>
            <textarea
              rows={7}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Copy nội dung text từ trang cá nhân LinkedIn dán vào đây..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <button
            onClick={handleScrape}
            disabled={isScraping}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition cursor-pointer disabled:opacity-50"
          >
            {isScraping ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Đang Thu Thập & Chuẩn Hóa Profile...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Trích Xuất Hồ Sơ Bằng AI</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Parsed Profile Preview & Action */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center justify-between mb-4">
              <span>2. Kết quả trích xuất & Chuẩn hóa</span>
              {parsedProfile && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Chuẩn hóa thành công
                </span>
              )}
            </h3>

            {parsedProfile ? (
              <div className="space-y-4">
                {/* Profile card preview */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">{parsedProfile.fullName}</h4>
                      <p className="text-xs text-blue-400 font-medium mt-0.5">
                        {parsedProfile.headline}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        📍 {parsedProfile.location || 'Việt Nam'} • 💼{' '}
                        {parsedProfile.yearsOfExperience} năm kinh nghiệm
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-lg text-amber-300 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{parsedProfile.sourcingRating || 5}/5</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    {parsedProfile.summary}
                  </p>

                  {/* Skills tags */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Kỹ năng bóc tách từ LinkedIn:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {parsedProfile.skills?.map((sk: string) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 text-xs rounded bg-slate-700 text-slate-200"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Work history */}
                  {parsedProfile.workHistory && parsedProfile.workHistory.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Lịch sử làm việc gần nhất:
                      </span>
                      <div className="space-y-1.5">
                        {parsedProfile.workHistory.map((wh: any, idx: number) => (
                          <div
                            key={idx}
                            className="text-xs text-slate-300 flex items-center justify-between bg-slate-900/40 p-2 rounded-lg"
                          >
                            <span>
                              <strong>{wh.role}</strong> tại {wh.company}
                            </span>
                            <span className="text-slate-400 text-[11px]">{wh.period}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {importedCandidate && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center justify-between">
                    <div>
                      <strong>Đã nhập vào ATS thành công!</strong>
                      <p className="text-xs text-emerald-400/90 mt-0.5">
                        Điểm AI đối chiếu JD: {importedCandidate.aiAnalysis?.overallScore}/100
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigateToCandidate(importedCandidate)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Xem hồ sơ
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 border border-dashed border-slate-800 rounded-xl">
                <Linkedin className="w-10 h-10 mx-auto text-slate-600 mb-3" />
                <p className="text-xs">
                  Chưa có dữ liệu trích xuất. Hãy chọn một hồ sơ mẫu hoặc nhập link LinkedIn ở cột bên
                  trái.
                </p>
              </div>
            )}
          </div>

          {parsedProfile && !importedCandidate && (
            <div className="pt-4 mt-4 border-t border-slate-800">
              <button
                onClick={handleSaveToATS}
                disabled={isImporting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50"
              >
                {isImporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Đang nạp vào ATS & Chạy AI Scoring...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Lưu Vào Hệ Thống Tuyển Dụng ATS & Chấm Điểm JD Ngay</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
