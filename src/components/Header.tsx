import React from 'react';
import {
  Sparkles,
  Mail,
  Linkedin,
  UploadCloud,
  Search,
  Filter,
  CheckCircle2,
  Users,
  Briefcase,
  Layers,
  Scale,
  FileCheck2,
  Calendar,
  BookmarkCheck,
  ChevronDown,
} from 'lucide-react';
import { Job } from '../types/recruitment';

export type ActiveTab =
  | 'dashboard'
  | 'cv_filter'
  | 'email_inbox'
  | 'linkedin_import'
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
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenUploadModal: () => void;
  onOpenLinkedInModal: () => void;
  unreadEmailCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  jobs,
  selectedJobId,
  setSelectedJobId,
  searchQuery,
  setSearchQuery,
  onOpenUploadModal,
  onOpenLinkedInModal,
  unreadEmailCount,
}) => {
  const currentJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const navItems = [
    { id: 'dashboard', label: 'Tổng quan ATS', icon: Layers },
    { id: 'cv_filter', label: 'Lọc CV & Đối chiếu JD', icon: Sparkles, badge: 'AI' },
    { id: 'email_inbox', label: 'Hộp thư CV', icon: Mail, count: unreadEmailCount },
    { id: 'linkedin_import', label: 'Thu thập LinkedIn', icon: Linkedin },
    { id: 'kanban', label: 'Quy trình Tuyển dụng', icon: Users },
    { id: 'comparison', label: 'So sánh ứng viên', icon: Scale },
    { id: 'assessment', label: 'Test Năng lực', icon: FileCheck2 },
    { id: 'talent_pool', label: 'Talent Pool', icon: BookmarkCheck },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-slate-100 backdrop-blur-md shadow-lg">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-xl tracking-tight ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  TalentPulse
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  AI ATS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Hệ thống tuyển dụng thông minh & Đối chiếu tiêu chí JD
              </p>
            </div>
          </div>

          {/* Job Filter Dropdown */}
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-1.5 max-w-xs sm:max-w-sm">
            <Briefcase className="w-4 h-4 text-indigo-400 shrink-0" />
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-medium text-slate-200 focus:outline-none cursor-pointer truncate w-full"
            >
              <option value="all" className="bg-slate-800 text-slate-200">
                Tất cả vị trí ({jobs.length})
              </option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id} className="bg-slate-800 text-slate-200">
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLinkedInModal}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600/10 text-blue-300 border border-blue-500/30 hover:bg-blue-600/20 transition-all cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>Nhập LinkedIn</span>
            </button>

            <button
              onClick={onOpenUploadModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>+ Thêm CV</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-indigo-500 text-white leading-none">
                    {item.badge}
                  </span>
                )}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white leading-none">
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
