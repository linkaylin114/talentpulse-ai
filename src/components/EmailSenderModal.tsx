import React, { useState, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Mail,
  CheckCircle2,
  RefreshCw,
  Eye,
  Calendar,
  FileCheck2,
  Check,
  XCircle,
  FileText,
} from 'lucide-react';
import { Candidate, EmailLog } from '../types/recruitment';

interface EmailSenderModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onSendEmail: (candidateId: string, emailLog: EmailLog) => void;
}

export const EmailSenderModal: React.FC<EmailSenderModalProps> = ({
  candidate,
  onClose,
  onSendEmail,
}) => {
  if (!candidate) return null;

  const [emailType, setEmailType] = useState<
    'interview_invite' | 'assessment_invite' | 'offer' | 'rejection'
  >('interview_invite');

  const [tone, setTone] = useState('Trang trọng, chuyên nghiệp và lịch thiệp');
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [previewMode, setPreviewMode] = useState<'editor' | 'preview'>('preview');

  // Auto-generate initial draft when opened or when emailType changes
  useEffect(() => {
    generateDraft(emailType);
  }, [emailType, candidate.id]);

  const generateDraft = async (type: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/gemini/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailType: type,
          candidateName: candidate.name,
          jobTitle: candidate.appliedJobTitle,
          companyName: 'Công ty Công nghệ TalentPulse',
          tone,
          extraDetails: {
            interviewDate: candidate.interviewSchedule?.date || 'Thứ Năm tới',
            interviewTime: candidate.interviewSchedule?.time || '14:30',
            meetingLink:
              candidate.interviewSchedule?.meetingLink || 'https://meet.google.com/talentpulse-interview',
            score: candidate.aiAnalysis?.overallScore,
            salaryOffer: candidate.expectedSalary || 'Cạnh tranh',
          },
        }),
      });

      const data = await response.json();
      if (data.success && data.email) {
        setSubject(data.email.subject);
        setHtmlContent(data.email.htmlContent);
      }
    } catch (err) {
      console.error('Failed to generate email:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      const newLog: EmailLog = {
        id: `email-${Date.now()}`,
        type: emailType,
        subject,
        sentAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        recipient: candidate.email,
        status: 'delivered',
        htmlPreview: htmlContent,
      };

      onSendEmail(candidate.id, newLog);
      setIsSending(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Gửi Thông Báo Email Kết Quả</h3>
              <p className="text-xs text-slate-400">
                Gửi tới: <strong>{candidate.name}</strong> &lt;{candidate.email}&gt;
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>

        {/* Email Type Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Chọn loại thông báo:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'interview_invite', label: 'Mời Phỏng Vấn', icon: Calendar },
              { id: 'assessment_invite', label: 'Mời Làm Test', icon: FileCheck2 },
              { id: 'offer', label: 'Thư Mời Nhận Việc', icon: CheckCircle2 },
              { id: 'rejection', label: 'Thông Báo Từ Chối', icon: XCircle },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = emailType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEmailType(item.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 shadow-sm'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-center">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subject input & AI refresh button */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300">Tiêu đề email (Subject):</label>
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => generateDraft(emailType)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Soạn lại thư</span>
            </button>
          </div>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        {/* Editor or Preview Toggle */}
        <div className="flex items-center justify-between pt-1">
          <label className="text-xs font-medium text-slate-300">Nội dung thư:</label>
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setPreviewMode('preview')}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                previewMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Xem trước (Live Preview)
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('editor')}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                previewMode === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Chỉnh sửa Text
            </button>
          </div>
        </div>

        {/* Body View */}
        {isGenerating ? (
          <div className="h-64 flex flex-col items-center justify-center bg-slate-800/40 rounded-xl border border-slate-700/60 text-slate-400 text-xs space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
            <span>AI Đang soạn nội dung email tối ưu...</span>
          </div>
        ) : previewMode === 'preview' ? (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-700/80 text-slate-200 text-xs sm:text-sm leading-relaxed overflow-y-auto max-h-72 space-y-3 font-sans shadow-inner">
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Từ: Tuyển dụng TalentPulse &lt;careers@talentpulse.ai&gt;</span>
              <span>Đến: {candidate.email}</span>
            </div>
            <div
              className="prose prose-invert prose-sm max-w-none space-y-2"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        ) : (
          <textarea
            rows={10}
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
          />
        )}

        {/* Action Bottom */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            Email sẽ được lưu vào lịch sử tương tác hồ sơ ứng viên
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              disabled={isSending || isGenerating}
              onClick={handleSend}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition cursor-pointer disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang gửi...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Gửi Thông Báo Email Ngay</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
