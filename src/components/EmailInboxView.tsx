import React, { useState } from 'react';
import {
  Mail,
  Paperclip,
  Sparkles,
  CheckCircle2,
  Clock,
  RefreshCw,
  Search,
  ArrowRight,
  Eye,
  FileText,
  UserCheck,
  Briefcase,
  AlertCircle,
  Inbox,
} from 'lucide-react';
import { EmailInboxItem, Job, Candidate } from '../types/recruitment';

interface EmailInboxViewProps {
  emails: EmailInboxItem[];
  jobs: Job[];
  onImportEmailCandidate: (emailItem: EmailInboxItem, targetJob: Job) => Promise<Candidate | null>;
  onNavigateToCandidate: (candidate: Candidate) => void;
}

export const EmailInboxView: React.FC<EmailInboxViewProps> = ({
  emails,
  jobs,
  onImportEmailCandidate,
  onNavigateToCandidate,
}) => {
  const [inboxList, setInboxList] = useState<EmailInboxItem[]>(emails);
  const [selectedEmailId, setSelectedEmailId] = useState<string>(emails[0]?.id || '');
  const [isSyncing, setIsSyncing] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'imported'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const selectedEmail = inboxList.find((e) => e.id === selectedEmailId) || inboxList[0];

  const handleSyncEmails = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setNotification('Đã kiểm tra và đồng bộ 3 email ứng tuyển mới nhất.');
      setTimeout(() => setNotification(null), 4000);
    }, 1200);
  };

  const handleProcessAndImport = async (emailItem: EmailInboxItem) => {
    setProcessingId(emailItem.id);
    const targetJob =
      jobs.find((j) => j.id === emailItem.predictedJobId) ||
      jobs[0];

    try {
      const candidate = await onImportEmailCandidate(emailItem, targetJob);
      if (candidate) {
        setInboxList((prev) =>
          prev.map((item) =>
            item.id === emailItem.id ? { ...item, status: 'imported' } : item
          )
        );
        setNotification(`Đã trích xuất và lọc thành công hồ sơ của ${candidate.name} bằng AI!`);
        setTimeout(() => setNotification(null), 5000);
      }
    } catch (err: any) {
      console.error(err);
      setNotification(`Lỗi xử lý: ${err.message || 'Không thể trích xuất'}`);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredEmails = inboxList.filter((e) => {
    const matchesSearch =
      e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.senderEmail.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'unread') return matchesSearch && e.status !== 'imported';
    if (filterStatus === 'imported') return matchesSearch && e.status === 'imported';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200 shadow-2xs">
              <Mail className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Tự Động Lọc CV Từ Email Tuyển Dụng
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            Đồng bộ hộp thư <span className="font-mono text-indigo-600 font-semibold">careers@talentpulse.ai</span>,
            tự động nhận diện file đính kèm, phân loại vị trí và đẩy vào AI Screening.
          </p>
        </div>

        <button
          onClick={handleSyncEmails}
          disabled={isSyncing}
          className="btn-secondary inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-indigo-600 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Đang đồng bộ...' : 'Quét hộp thư mới'}</span>
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="font-bold text-slate-400 hover:text-slate-700 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Main Two-Column Inbox View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 min-h-[550px]">
        {/* Left Column: Email List */}
        <div className="lg:col-span-5 border-r border-slate-200 flex flex-col bg-slate-50/60">
          {/* Search & Filter */}
          <div className="p-4 border-b border-slate-200 space-y-3 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm email, tên người gửi hoặc CV..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 rounded-xl font-semibold transition cursor-pointer ${
                  filterStatus === 'all'
                    ? 'btn-primary text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                Tất cả ({inboxList.length})
              </button>
              <button
                onClick={() => setFilterStatus('unread')}
                className={`px-3 py-1 rounded-xl font-semibold transition cursor-pointer ${
                  filterStatus === 'unread'
                    ? 'btn-primary text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                Chưa xử lý
              </button>
              <button
                onClick={() => setFilterStatus('imported')}
                className={`px-3 py-1 rounded-xl font-semibold transition cursor-pointer ${
                  filterStatus === 'imported'
                    ? 'btn-primary text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                Đã nhập ATS
              </button>
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredEmails.map((item) => {
              const isSelected = item.id === selectedEmail?.id;
              const isImported = item.status === 'imported';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedEmailId(item.id)}
                  className={`p-4 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/90 border-l-4 border-indigo-600 shadow-2xs'
                      : 'hover:bg-slate-100/70 bg-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item.senderName}
                    </span>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap font-medium">
                      {item.receivedAt}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1">
                    {item.subject}
                  </h4>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {item.hasAttachment && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] bg-white text-slate-700 border border-slate-200 font-medium shadow-2xs">
                        <Paperclip className="w-3 h-3 text-indigo-600" />
                        <span className="truncate max-w-[130px]">{item.attachmentFileName}</span>
                      </span>
                    )}

                    {isImported ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                        ✓ Đã lọc ATS
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                        {item.predictedJobTitle?.split('(')[0] || 'Vị trí mới'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredEmails.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                Không tìm thấy email nào phù hợp bộ lọc
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Email Content & Attachment Action */}
        <div className="lg:col-span-7 flex flex-col bg-white">
          {selectedEmail ? (
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Header details */}
                <div className="pb-4 border-b border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                      {selectedEmail.subject}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">{selectedEmail.receivedAt}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <div>
                      Từ: <strong className="text-slate-900">{selectedEmail.senderName}</strong>{' '}
                      <span className="text-slate-500">&lt;{selectedEmail.senderEmail}&gt;</span>
                    </div>
                    <div className="text-slate-500">Đến: <span className="font-semibold text-slate-700">careers@talentpulse.ai</span></div>
                  </div>
                </div>

                {/* Classification pill */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <span className="text-slate-600 font-medium">AI Tự Động Phân Loại Vị Trí:</span>
                    <strong className="text-indigo-900">{selectedEmail.predictedJobTitle}</strong>
                  </div>
                  <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                    Độ tin cậy 98%
                  </span>
                </div>

                {/* Email Body */}
                <div className="bg-slate-50 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans border border-slate-200 shadow-2xs">
                  {selectedEmail.emailBody}
                </div>

                {/* Attached CV Preview Box */}
                {selectedEmail.hasAttachment && selectedEmail.cvContentSample && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-700 pb-2 border-b border-slate-200 font-bold">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        <span>
                          Nội dung trích xuất từ tệp: {selectedEmail.attachmentFileName}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">PDF Document</span>
                    </div>
                    <pre className="text-xs text-slate-800 font-mono overflow-x-auto max-h-48 p-3.5 bg-white rounded-xl border border-slate-200 shadow-inner leading-relaxed">
                      {selectedEmail.cvContentSample}
                    </pre>
                  </div>
                )}
              </div>

              {/* Action Bottom Bar */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  {selectedEmail.status === 'imported'
                    ? '✓ Hồ sơ này đã được trích xuất và lưu trong hệ thống ATS'
                    : 'Bấm nút bên dưới để AI tự động trích xuất thông tin & đối chiếu tiêu chí JD'}
                </span>

                <button
                  onClick={() => handleProcessAndImport(selectedEmail)}
                  disabled={processingId === selectedEmail.id}
                  className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-white font-bold text-xs sm:text-sm cursor-pointer disabled:opacity-50 shadow-md shadow-indigo-600/20"
                >
                  {processingId === selectedEmail.id ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Đang trích xuất & Đối chiếu tiêu chí...</span>
                    </>
                  ) : selectedEmail.status === 'imported' ? (
                    <>
                      <Sparkles className="w-4 h-4 text-lime-300 animate-pulse" />
                      <span>Chạy Lại AI Screening</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-lime-300 animate-pulse" />
                      <span>Trích Xuất CV & Đối Chiếu JD Bằng AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center h-full">
              <Inbox className="w-12 h-12 text-slate-400 mb-3" />
              <p className="text-sm font-semibold text-slate-600">Chọn một email từ danh sách bên trái để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
