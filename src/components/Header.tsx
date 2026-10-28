import React from 'react';
import {
  Sparkles,
  Mail,
  UploadCloud,
  Users,
  Briefcase,
  Layers,
  Scale,
  FileCheck2,
  BookmarkCheck,
  Plus,
  Sun,
  Moon,
} from 'lucide-react';
import { Job } from '../types/recruitment';

export type ActiveTab =
  | 'dashboard'
  | 'jobs_management'
  | 'cv_filter'
  | 'email_inbox'
  | 'kanban'
  | 'comparison'
  | 'assessment'
  | 'talent_pool';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  jobs: Job[];
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  onOpenUploadModal: () => void;
  onOpenNewJobModal: () => void;
  unreadEmailCount: number;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  jobs,
  selectedJobId,
  setSelectedJobId,
  onOpenUploadModal,
  onOpenNewJobModal,
  unreadEmailCount,
  theme = 'light',
  onToggleTheme,
}) => {
  const isLight = theme === 'light';

  const navItems = [
    { id: 'dashboard', label: 'Tổng quan ATS', icon: Layers },
    { id: 'jobs_management', label: 'Vị trí & JD Mới', icon: Briefcase, badge: 'JD Builder' },
    { id: 'cv_filter', label: 'Lọc CV & Khớp JD', icon: Sparkles, badge: 'AI OCR' },
    { id: 'email_inbox', label: 'Hộp thư CV Email', icon: Mail, count: unreadEmailCount },
    { id: 'kanban', label: 'Quy trình Pipeline', icon: Users },
    { id: 'comparison', label: 'So sánh ứng viên', icon: Scale },
    { id: 'assessment', label: 'Test Năng lực (IQ/EQ/AQ)', icon: FileCheck2, badge: 'Auto-Send' },
    { id: 'talent_pool', label: 'Talent Pool', icon: BookmarkCheck },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-2xl transition-colors duration-200 border-b ${
      isLight
        ? 'bg-white/85 border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]'
        : 'bg-slate-950/80 border-white/[0.08] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          {/* Logo & Platform Name */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 via-emerald-400 to-indigo-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-tr from-lime-500 via-emerald-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-lime-500/20 ring-1 ring-white/50 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-lg tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  TalentPulse
                </span>
                <span className="px-2 py-0.5 text-[9px] font-black tracking-widest uppercase bg-lime-400/20 text-lime-700 dark:text-lime-300 border border-lime-400/50 rounded-full shadow-xs">
                  AI ATS PRO
                </span>
              </div>
              <p className={`text-[11px] hidden sm:block font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Hệ thống tuyển dụng thông minh • Lọc CV, Đối chiếu JD & Test IQ/EQ/AQ
              </p>
            </div>
          </div>

          {/* Active Job Selector Dropdown */}
          <div className={`flex items-center gap-2 rounded-2xl px-3.5 py-1.5 max-w-xs sm:max-w-sm shadow-xs border transition ${
            isLight
              ? 'bg-slate-100/90 border-slate-200 text-slate-800 hover:border-indigo-400'
              : 'bg-slate-900/80 border-white/10 text-slate-200 hover:border-indigo-500/40'
          }`}>
            <Briefcase className="w-4 h-4 text-indigo-500 shrink-0" />
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer truncate w-full"
            >
              <option value="all" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-200'}>
                Tất cả vị trí ({jobs.length})
              </option>
              {jobs.map((job) => (
                <option
                  key={job.id}
                  value={job.id}
                  className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-200'}
                >
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons & Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-xl transition cursor-pointer border shadow-xs ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-amber-500 border-slate-200'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                }`}
                title={isLight ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
                aria-label="Toggle Theme"
              >
                {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={onOpenNewJobModal}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl btn-secondary cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>+ Tạo JD Mới</span>
            </button>

            <button
              onClick={onOpenUploadModal}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl btn-primary cursor-pointer shrink-0"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload CV File</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className={`flex items-center gap-1 overflow-x-auto py-2.5 no-scrollbar border-t ${
          isLight ? 'border-slate-200/70' : 'border-white/[0.06]'
        }`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isLight
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                      : 'bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 text-white border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? isLight
                        ? 'text-indigo-600'
                        : 'text-indigo-400'
                      : isLight
                      ? 'text-slate-500'
                      : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md leading-none ${
                      item.badge === 'Auto-Send'
                        ? 'bg-lime-500/20 text-lime-700 dark:text-lime-300 border border-lime-500/30'
                        : item.badge === 'JD Builder'
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                        : 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white leading-none shadow-xs">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
