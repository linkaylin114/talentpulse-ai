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

  const getDefaultDraft = (type: string) => {
    const jobTitle = candidate.appliedJobTitle || 'Vị trí ứng tuyển';
    const candidateName = candidate.name || 'Ứng viên';
    const interviewDate = candidate.interviewSchedule?.date || 'Thứ Năm tới';
    const interviewTime = candidate.interviewSchedule?.time || '14:30 - 15:30';
    const meetingLink =
      candidate.interviewSchedule?.meetingLink || 'https://meet.google.com/talentpulse-interview';
    const salary = candidate.expectedSalary || 'Cạnh tranh theo thỏa thuận';

    if (type === 'interview_invite') {
      return {
        subject: `[TalentPulse] Thư Mời Tham Gia Phỏng Vấn - Vị trí ${jobTitle} - ${candidateName}`,
        html: `
<p>Kính gửi <strong>${candidateName}</strong>,</p>
<p>Lời đầu tiên, Ban Tuyển Dụng <strong>Công ty Cổ phần Công nghệ TalentPulse</strong> xin cảm ơn bạn đã quan tâm và gửi hồ sơ ứng tuyển vị trí <strong>${jobTitle}</strong>.</p>
<p>Sau khi xem xét hồ sơ và đối chiếu các tiêu chí tuyển dụng, chúng tôi rất ấn tượng với năng lực chuyên môn và bề dày kinh nghiệm của bạn. Chúng tôi trân trọng kính mời bạn tham dự buổi phỏng vấn trực tuyến với thông tin cụ thể như sau:</p>
<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin: 12px 0;">
  <p style="margin: 4px 0;">📅 <strong>Thời gian:</strong> ${interviewTime}, ngày ${interviewDate}</p>
  <p style="margin: 4px 0;">💻 <strong>Hình thức:</strong> Phỏng vấn trực tuyến qua Google Meet</p>
  <p style="margin: 4px 0;">🔗 <strong>Đường link phòng họp:</strong> <a href="${meetingLink}" target="_blank" style="color: #4f46e5; font-weight: bold; text-decoration: underline;">${meetingLink}</a></p>
  <p style="margin: 4px 0;">👥 <strong>Người phỏng vấn:</strong> Ban Giám Đốc Kỹ Thuật & Trưởng Bộ Phận Tuyển Dụng</p>
</div>
<p>Buổi trao đổi là cơ hội để hai bên tìm hiểu sâu hơn về định hướng công việc và kỳ vọng phát triển. Bạn vui lòng bấm nút phản hồi hoặc trả lời email này trước 24 giờ để xác nhận lịch hẹn.</p>
<p>Trân trọng và chúc bạn một ngày làm việc tràn đầy năng lượng!</p>
<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
<p style="margin: 2px 0;"><strong>Ban Tuyển Dụng & Phát Triển Nhân Tài TalentPulse</strong></p>
<p style="margin: 2px 0; color: #64748b; font-size: 11px;">🏢 Tòa nhà Keangnam Landmark 72, Nam Từ Liêm, Hà Nội | 🌐 https://talentpulse.ai</p>
<p style="margin: 2px 0; color: #64748b; font-size: 11px;">📧 careers@talentpulse.ai | ☎️ Hotline: 024 7300 8899</p>
`,
      };
    } else if (type === 'assessment_invite') {
      return {
        subject: `[TalentPulse] Thư Mời Làm Bài Test Đánh Giá Toàn Diện (Năng Lực + IQ + EQ + AQ) - ${candidateName}`,
        html: `
<p>Kính gửi <strong>${candidateName}</strong>,</p>
<p>Chúc mừng bạn! Hồ sơ ứng tuyển vị trí <strong>${jobTitle}</strong> của bạn đã xuất sắc vượt qua vòng Lọc CV & Đối chiếu tiêu chí ban đầu tại <strong>TalentPulse</strong>.</p>
<p>Để đánh giá toàn diện năng lực và chuẩn bị tốt nhất cho buổi phỏng vấn tiếp theo, chúng tôi kính mời bạn thực hiện <strong>Bài Test Khảo Sát Toàn Diện 4-in-1 (Năng lực chuyên môn + IQ Logic + EQ Cảm xúc + AQ Vượt khó)</strong>:</p>
<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin: 12px 0;">
  <p style="margin: 4px 0;">⏱️ <strong>Thời lượng làm bài:</strong> 25 phút</p>
  <p style="margin: 4px 0;">📝 <strong>Cấu trúc:</strong> Trắc nghiệm tình huống chuyên môn kết hợp đánh giá chỉ số IQ, EQ, AQ</p>
  <p style="margin: 4px 0;">🌐 <strong>Cổng làm bài trực tuyến:</strong> <a href="https://talentpulse.ai/assessment-test" target="_blank" style="color: #4f46e5; font-weight: bold; text-decoration: underline;">https://talentpulse.ai/assessment-test</a></p>
  <p style="margin: 4px 0;">⏳ <strong>Hạn chót:</strong> Hoàn thành trong vòng 48 giờ kể từ khi nhận thư</p>
</div>
<p>Kết quả bài thi sẽ được hệ thống chấm điểm tự động và gửi phản hồi chi tiết tới bạn ngay sau khi hoàn thành. Chúc bạn đạt kết quả thật cao!</p>
<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
<p style="margin: 2px 0;"><strong>Ban Khảo Thí & Tuyển Dụng TalentPulse</strong></p>
<p style="margin: 2px 0; color: #64748b; font-size: 11px;">📧 careers@talentpulse.ai | 🌐 https://talentpulse.ai</p>
`,
      };
    } else if (type === 'offer') {
      return {
        subject: `[TalentPulse] Thư Mời Nhận Việc (Job Offer Letter) - Vị trí ${jobTitle} - ${candidateName}`,
        html: `
<p>Kính gửi <strong>${candidateName}</strong>,</p>
<p>Thay mặt Ban Giám Đốc và toàn thể đội ngũ <strong>Công ty Cổ phần Công nghệ TalentPulse</strong>, chúng tôi xin chúc mừng bạn đã xuất sắc vượt qua toàn bộ các vòng phỏng vấn tuyển dụng cho vị trí <strong>${jobTitle}</strong>!</p>
<p>Chúng tôi chính thức gửi tới bạn Thư Mời Nhận Việc (Job Offer) với các đãi ngộ trọng tâm như sau:</p>
<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin: 12px 0;">
  <p style="margin: 4px 0;">💼 <strong>Vị trí:</strong> ${jobTitle}</p>
  <p style="margin: 4px 0;">💰 <strong>Mức lương khởi điểm:</strong> <strong>${salary}</strong> (Net/Gross theo thỏa thuận)</p>
  <p style="margin: 4px 0;">🎁 <strong>Phúc lợi:</strong> Thưởng hiệu quả quý/năm, gói bảo hiểm sức khỏe Bảo Việt/PVI, 15 ngày phép/năm, làm việc Hybrid linh hoạt</p>
  <p style="margin: 4px 0;">🚀 <strong>Ngày bắt đầu làm việc dự kiến:</strong> Ngày làm việc đầu tiên của tháng tới</p>
</div>
<p>Chúng tôi rất tin tưởng tài năng và tư duy của bạn sẽ đóng góp quan trọng vào sự phát triển của công ty. Bạn vui lòng phản hồi xác nhận đồng ý nhận việc trong vòng 03 ngày làm việc kể từ ngày nhận thư này.</p>
<p>Chào đón bạn gia nhập đại gia đình TalentPulse!</p>
<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
<p style="margin: 2px 0;"><strong>Ban Giám Đốc & Phòng Nhân Sự TalentPulse</strong></p>
`,
      };
    } else {
      return {
        subject: `[TalentPulse] Thư Cảm Ơn & Thông Báo Kết Quả Tuyển Dụng - Vị trí ${jobTitle}`,
        html: `
<p>Kính gửi <strong>${candidateName}</strong>,</p>
<p>Ban Tuyển Dụng <strong>Công ty Cổ phần Công nghệ TalentPulse</strong> xin chân thành cảm ơn bạn đã dành thời gian và sự quan tâm tham gia ứng tuyển vị trí <strong>${jobTitle}</strong>.</p>
<p>Hội đồng tuyển dụng đánh giá rất cao năng lực chuyên môn và tinh thần tích cực của bạn. Tuy nhiên, ở giai đoạn hiện tại, dự án của chúng tôi cần ưu tiên ứng viên có hồ sơ sát nhất với một số yêu cầu kỹ thuật đặc thù, do đó chúng tôi rất tiếc phải thông báo chưa thể đồng hành cùng bạn trong đợt tuyển dụng này.</p>
<p>Chúng tôi nhận thấy bạn là một nhân sự rất có tiềm năng. Với sự đồng ý của bạn, chúng tôi xin phép được <strong>lưu trữ hồ sơ của bạn vào Talent Pool (Kho Ứng Viên Tiềm Năng)</strong> của công ty để có thể chủ động liên hệ ngay khi có những cơ hội mới phù hợp hơn trong thời gian tới.</p>
<p>Chúc bạn luôn gặt hái được nhiều thành công rực rỡ và bứt phá trên con đường sự nghiệp!</p>
<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
<p style="margin: 2px 0;"><strong>Ban Tuyển Dụng Nhân Sự TalentPulse</strong></p>
<p style="margin: 2px 0; color: #64748b; font-size: 11px;">📧 careers@talentpulse.ai | 🌐 https://talentpulse.ai</p>
`,
      };
    }
  };

  const initialDraft = getDefaultDraft(emailType);
  const [subject, setSubject] = useState(initialDraft.subject);
  const [htmlContent, setHtmlContent] = useState(initialDraft.html);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [previewMode, setPreviewMode] = useState<'editor' | 'preview'>('preview');

  // Auto-generate draft or reset to instant template
  useEffect(() => {
    const draft = getDefaultDraft(emailType);
    setSubject(draft.subject);
    setHtmlContent(draft.html);
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
          companyName: 'Công ty Cổ phần Công nghệ TalentPulse',
          tone,
          extraDetails: {
            interviewDate: candidate.interviewSchedule?.date || 'Thứ Năm tới',
            interviewTime: candidate.interviewSchedule?.time || '14:30 - 15:30',
            meetingLink:
              candidate.interviewSchedule?.meetingLink || 'https://meet.google.com/talentpulse-interview',
            score: candidate.aiAnalysis?.overallScore,
            salaryOffer: candidate.expectedSalary || 'Cạnh tranh theo thỏa thuận',
          },
        }),
      });

      const data = await response.json();
      if (data.success && data.email && data.email.htmlContent) {
        setSubject(data.email.subject || subject);
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
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/30 rounded-3xl max-w-2xl w-full p-6 shadow-2xl text-slate-800 dark:text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 shadow-xs">
              <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">Gửi Thông Báo Email Kết Quả</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Gửi tới: <strong className="text-slate-900 dark:text-white font-bold">{candidate.name}</strong> &lt;{candidate.email}&gt;
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold cursor-pointer transition-colors text-lg p-1">
            ✕
          </button>
        </div>

        {/* Email Type Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
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
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                    isSelected
                      ? 'btn-primary text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
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
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tiêu đề email (Subject):</label>
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => generateDraft(emailType)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1 font-bold cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 animate-pulse" />
              <span>AI Soạn lại thư</span>
            </button>
          </div>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-semibold"
          />
        </div>

        {/* Editor or Preview Toggle */}
        <div className="flex items-center justify-between pt-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nội dung thư:</label>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setPreviewMode('preview')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                previewMode === 'preview'
                  ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Xem trước (Live Preview)
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('editor')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                previewMode === 'editor'
                  ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Chỉnh sửa Text
            </button>
          </div>
        </div>

        {/* Body View */}
        <div className="relative">
          {previewMode === 'preview' ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 text-slate-800 text-xs sm:text-sm leading-relaxed overflow-y-auto max-h-80 space-y-3 font-sans shadow-inner border border-slate-200">
              {/* Mail Envelope Header */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-700">Từ:</span>
                    <span>Ban Tuyển Dụng TalentPulse &lt;careers@talentpulse.ai&gt;</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    Email Chính Thức
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="font-bold text-slate-700">Đến:</span>
                  <span className="text-slate-800 font-semibold">{candidate.name} &lt;{candidate.email}&gt;</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 pt-1 border-t border-slate-100">
                  <span className="font-bold text-slate-700">Tiêu đề:</span>
                  <span className="text-indigo-700 font-bold truncate">{subject || 'Thông báo tuyển dụng'}</span>
                </div>
              </div>

              {/* Rendered HTML */}
              <div
                className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs prose prose-sm max-w-none text-slate-800"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          ) : (
            <textarea
              rows={10}
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:border-indigo-500 shadow-inner"
            />
          )}

          {/* Subtle loading badge if AI is generating */}
          {isGenerating && (
            <div className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>AI đang tinh chỉnh...</span>
            </div>
          )}
        </div>

        {/* Action Bottom */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Email sẽ được lưu vào lịch sử tương tác hồ sơ ứng viên
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary px-4 py-2 text-xs font-bold rounded-xl cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              disabled={isSending || isGenerating}
              onClick={handleSend}
              className="btn-primary inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl text-white cursor-pointer disabled:opacity-50"
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
