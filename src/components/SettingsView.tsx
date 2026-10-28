import React, { useState } from 'react';
import {
  Settings,
  Mail,
  Building,
  Sparkles,
  FileText,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Send,
  Save,
  Lock,
  Globe,
  User,
  Phone,
  Sliders,
  Check,
  ExternalLink,
  Laptop,
  Flame,
  Zap,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'company' | 'ai' | 'templates'>('email');

  // Email Config State
  const [emailProvider, setEmailProvider] = useState<'smtp' | 'google_workspace'>('smtp');
  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('careers@talentpulse.ai');
  const [smtpPassword, setSmtpPassword] = useState('••••••••••••••••');
  const [senderName, setSenderName] = useState('Ban Tuyển Dụng TalentPulse');
  const [replyTo, setReplyTo] = useState('careers@talentpulse.ai');
  const [emailSignature, setEmailSignature] = useState(
    `<p><strong>Ban Tuyển Dụng & Phát Triển Nhân Tài TalentPulse</strong><br/>🏢 Tòa nhà Keangnam Landmark 72, Nam Từ Liêm, Hà Nội<br/>📧 careers@talentpulse.ai | ☎️ Hotline: 024 7300 8899 | 🌐 https://talentpulse.ai</p>`
  );

  // Testing connection state
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);
  const [smtpStatusMessage, setSmtpStatusMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  // Company Profile State
  const [companyName, setCompanyName] = useState('Công ty Cổ phần Công nghệ TalentPulse');
  const [hrManagerName, setHrManagerName] = useState('Vũ Thùy Linh');
  const [hrManagerRole, setHrManagerRole] = useState('Senior Talent Acquisition Lead');
  const [hrPhone, setHrPhone] = useState('024 7300 8899');
  const [companyWebsite, setCompanyWebsite] = useState('https://talentpulse.ai');
  const [companyAddress, setCompanyAddress] = useState(
    'Tầng 28, Tòa nhà Keangnam Landmark 72, Phạm Hùng, Nam Từ Liêm, Hà Nội'
  );

  // AI & Automation Rules State
  const [autoSendAssessment, setAutoSendAssessment] = useState(true);
  const [autoGenerateMeet, setAutoGenerateMeet] = useState(true);
  const [autoSaveTalentPool, setAutoSaveTalentPool] = useState(true);
  const [qualificationThreshold, setQualificationThreshold] = useState(80);

  // Global save state
  const [isSaved, setIsSaved] = useState(false);

  const handleTestConnection = async () => {
    setIsTestingSmtp(true);
    setSmtpStatusMessage(null);

    try {
      const response = await fetch('/api/email/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: smtpHost,
          port: smtpPort,
          username: smtpUser,
          senderName,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSmtpStatusMessage({
          text: data.message || 'Kết nối máy chủ email thành công! Sẵn sàng gửi thư tự động.',
          type: 'success',
        });
      } else {
        throw new Error(data.error || 'Không thể kết nối đến máy chủ mail.');
      }
    } catch (err: any) {
      setSmtpStatusMessage({
        text: err.message || 'Lỗi kiểm tra kết nối email. Vui lòng kiểm tra lại cấu hình Host/Port.',
        type: 'error',
      });
    } finally {
      setIsTestingSmtp(false);
    }
  };

  const handleSaveAll = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200 shadow-2xs">
            <Settings className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Cài Đặt Hệ Thống & Cấu Hình Email Tuyển Dụng
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Đang Hoạt Động
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Thiết lập thông tin tài khoản doanh nghiệp, máy chủ gửi email (SMTP/Google Workspace), quy tắc AI và mẫu thông báo.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white cursor-pointer shadow-md shadow-indigo-600/20 active:scale-98"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 text-lime-300" />
              <span>Đã Lưu Cài Đặt!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Lưu Toàn Bộ Cấu Hình</span>
            </>
          )}
        </button>
      </div>

      {/* Main Settings Panel with Left Sub-Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 min-h-[550px]">
        {/* Left Sub-tabs */}
        <div className="lg:col-span-3 border-r border-slate-200 p-4 space-y-1.5 bg-slate-50/70">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Mục Cài Đặt
          </span>

          {[
            { id: 'email', label: 'Cấu Hình Email Gửi Đi', icon: Mail, desc: 'SMTP & Google Workspace' },
            { id: 'company', label: 'Hồ Sơ Doanh Nghiệp', icon: Building, desc: 'Tên công ty & Thông tin HR' },
            { id: 'ai', label: 'AI Screening & Tự Động Hóa', icon: Sparkles, desc: 'Ngưỡng điểm & Gemini AI' },
            { id: 'templates', label: 'Mẫu Email Tuyển Dụng', icon: FileText, desc: 'Phỏng vấn, Test, Offer' },
          ].map((item) => {
            const Icon = item.icon;
            const isCurrent = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-white text-indigo-700 font-bold border border-slate-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    isCurrent ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200/60 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold leading-tight truncate">{item.label}</div>
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5 truncate">{item.desc}</div>
                </div>
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-200 px-3">
            <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs text-indigo-900 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Bảo mật chuẩn TLS
              </span>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Mọi thông tin kết nối và API Key được mã hóa an toàn trên hệ thống.
              </p>
            </div>
          </div>
        </div>

        {/* Right Settings Content */}
        <div className="lg:col-span-9 p-6 sm:p-8 overflow-y-auto">
          {/* TAB 1: EMAIL CONFIGURATION */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Cấu Hình Máy Chủ Email Gửi Đi (Outgoing Mail Server)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Định cấu hình tài khoản mail chính thức để hệ thống tự động gửi Thư mời phỏng vấn, Bài test 4-in-1 và Thư mời nhận việc cho ứng viên.
                </p>
              </div>

              {/* Provider Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Phương thức kết nối:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setEmailProvider('smtp')}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      emailProvider === 'smtp'
                        ? 'bg-indigo-50/60 border-indigo-400 ring-1 ring-indigo-400 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-indigo-600 shadow-2xs">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">SMTP Server Chuẩn</div>
                        <div className="text-[10px] text-slate-500">Gmail, Outlook 365, Mail Server riêng</div>
                      </div>
                    </div>
                    {emailProvider === 'smtp' && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                    )}
                  </div>

                  <div
                    onClick={() => setEmailProvider('google_workspace')}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      emailProvider === 'google_workspace'
                        ? 'bg-indigo-50/60 border-indigo-400 ring-1 ring-indigo-400 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-blue-600 shadow-2xs">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Google Workspace / Gmail</div>
                        <div className="text-[10px] text-slate-500">Kết nối OAuth qua tài khoản doanh nghiệp</div>
                      </div>
                    </div>
                    {emailProvider === 'google_workspace' && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                    )}
                  </div>
                </div>
              </div>

              {/* Server Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Máy chủ SMTP Host:</label>
                  <input
                    type="text"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400">Ví dụ: smtp.gmail.com, smtp.office365.com</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Cổng Port & Mã hóa:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                      className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                    />
                    <select className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-indigo-500 focus:bg-white">
                      <option value="tls">STARTTLS (Khuyên dùng)</option>
                      <option value="ssl">SSL / TLS</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Tài khoản Email gửi (Username):</label>
                  <input
                    type="email"
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Mật khẩu ứng dụng (App Password):</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={smtpPassword}
                      onChange={(e) => setSmtpPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Tên người gửi hiển thị (Sender Name):</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email nhận phản hồi (Reply-To):</label>
                  <input
                    type="email"
                    value={replyTo}
                    onChange={(e) => setReplyTo(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Chữ ký email tự động */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Chữ ký email tuyển dụng mặc định (HTML Signature):</label>
                  <span className="text-[10px] text-slate-400">Tự động gắn vào cuối mỗi email</span>
                </div>
                <textarea
                  rows={3}
                  value={emailSignature}
                  onChange={(e) => setEmailSignature(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3 text-xs font-mono text-slate-800 leading-relaxed focus:outline-none focus:border-indigo-500 focus:bg-white shadow-inner"
                />
              </div>

              {/* Test Email Connection Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Kiểm tra kết nối Email ngay lập tức</span>
                  <span className="text-[11px] text-slate-500">
                    Gửi gói tin ping kiểm tra bắt tay SMTP với máy chủ {smtpHost}:{smtpPort}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isTestingSmtp}
                  onClick={handleTestConnection}
                  className="btn-secondary inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  {isTestingSmtp ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                      <span>Đang kiểm tra...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Kiểm Tra Kết Nối (Test Connection)</span>
                    </>
                  )}
                </button>
              </div>

              {smtpStatusMessage && (
                <div
                  className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
                    smtpStatusMessage.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{smtpStatusMessage.text}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COMPANY & HR PROFILE */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Hồ Sơ Doanh Nghiệp & Đầu Mối Tuyển Dụng
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Thông tin đại diện xuất hiện trong thư mời phỏng vấn, Job Offer và các hợp đồng tuyển dụng.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700">Tên doanh nghiệp chính thức:</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Người phụ trách tuyển dụng (HR Lead):</label>
                  <input
                    type="text"
                    value={hrManagerName}
                    onChange={(e) => setHrManagerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Chức vụ đại diện:</label>
                  <input
                    type="text"
                    value={hrManagerRole}
                    onChange={(e) => setHrManagerRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Hotline Tuyển Dụng:</label>
                  <input
                    type="text"
                    value={hrPhone}
                    onChange={(e) => setHrPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Website tuyển dụng / Career portal:</label>
                  <input
                    type="text"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700">Địa chỉ văn phòng / Địa điểm phỏng vấn:</label>
                  <input
                    type="text"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI SCREENING & AUTOMATION */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Cấu Hình Trí Tuệ Nhân Tạo & Tự Động Hóa Tuyển Dụng
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Điều chỉnh mức độ can thiệp của AI, ngưỡng lọc tự động và các luồng kích hoạt tức thời.
                </p>
              </div>

              {/* Model status card */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xs">
                    <Sparkles className="w-5 h-5 text-lime-300" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Mô hình AI: Google Gemini 2.5 Flash</div>
                    <div className="text-[10px] text-indigo-700 font-semibold">Tối ưu tốc độ suy luận, OCR tệp CV và đối chiếu tiêu chí chuẩn xác cao</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ONLINE • KẾT NỐI SẴN SÀNG
                </span>
              </div>

              {/* Threshold Slider */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900">
                    Ngưỡng điểm AI tối thiểu để đề xuất Phỏng Vấn:
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-xs font-bold">
                    {qualificationThreshold} / 100 điểm
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={qualificationThreshold}
                  onChange={(e) => setQualificationThreshold(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                  <span>60đ (Mở rộng ứng viên)</span>
                  <span>80đ (Khuyên dùng tiêu chuẩn)</span>
                  <span>95đ (Chỉ lấy ứng viên xuất sắc nhất)</span>
                </div>
              </div>

              {/* Automation Toggles */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Luồng Tự Động Hóa (Automation Workflow):
                </span>

                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 rounded-2xl border border-slate-200 cursor-pointer transition">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        ⚡ Tự động gửi link bài test 4-in-1 khi ứng viên đạt lọc CV
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Hệ thống tự động kích hoạt gửi bài khảo sát năng lực (Chuyên môn + IQ + EQ + AQ) qua email ngay sau khi đạt tiêu chí JD.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSendAssessment}
                      onChange={(e) => setAutoSendAssessment(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 rounded-2xl border border-slate-200 cursor-pointer transition">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        📅 Tự động tạo link Google Meet khi lên lịch phỏng vấn
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Sinh đường link phòng họp trực tuyến an toàn và gửi thư mời lịch hẹn vào Google Calendar của hội đồng.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoGenerateMeet}
                      onChange={(e) => setAutoGenerateMeet(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 rounded-2xl border border-slate-200 cursor-pointer transition">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        📂 Tự động lưu trữ hồ sơ tiềm năng vào Talent Pool khi từ chối
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Ứng viên có điểm &gt;= 75đ nếu trượt vòng phỏng vấn cuối sẽ tự động được gắn nhãn và lưu kho Talent Pool để tái liên hệ.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSaveTalentPool}
                      onChange={(e) => setAutoSaveTalentPool(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TEMPLATES MANAGER */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Quản Lý Mẫu Email Tuyển Dụng Chuẩn Doanh Nghiệp
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tùy chỉnh nội dung các mẫu thư tuyển dụng. Các biến động như <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px] text-indigo-700">&#123;candidate_name&#125;</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px] text-indigo-700">&#123;job_title&#125;</code> sẽ được tự động điền khi gửi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: '1. Thư Mời Tham Gia Phỏng Vấn (Google Meet)',
                    code: 'interview_invite',
                    badge: 'Vòng 1 & Vòng 2',
                    desc: 'Gửi link Google Meet, ngày giờ hẹn và danh sách hội đồng phỏng vấn.',
                  },
                  {
                    title: '2. Thư Mời Làm Bài Test 4-in-1',
                    code: 'assessment_invite',
                    badge: 'Trước Phỏng Vấn',
                    desc: 'Gửi link làm bài test kết hợp Chuyên môn + IQ + EQ + AQ cùng thời hạn 48h.',
                  },
                  {
                    title: '3. Thư Mời Nhận Việc (Job Offer Letter)',
                    code: 'offer',
                    badge: 'Đạt Tuyển Dụng',
                    desc: 'Gửi mức lương khởi điểm, gói bảo hiểm phúc lợi và ngày bắt đầu làm việc.',
                  },
                  {
                    title: '4. Thư Cảm Ơn & Lưu Trữ Talent Pool',
                    code: 'rejection',
                    badge: 'Từ Chối Lịch Thiệp',
                    desc: 'Cảm ơn trân trọng và xin phép lưu trữ hồ sơ cho các cơ hội tiếp theo.',
                  },
                ].map((tpl) => (
                  <div
                    key={tpl.code}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 shadow-2xs hover:border-indigo-300 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">{tpl.title}</span>
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
                        {tpl.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{tpl.desc}</p>
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-700 font-semibold">✓ Đã thiết lập sẵn</span>
                      <span className="text-indigo-600 font-bold hover:underline cursor-pointer">
                        Chỉnh sửa mẫu →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
