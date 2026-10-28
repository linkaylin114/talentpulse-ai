import React, { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  Activity,
  Settings,
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
  | 'talent_pool'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  jobs: Job[];
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  onOpenUploadModal: () => void;
  onOpenNewJobModal: () => void;
  unreadEmailCount: number;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  jobs,
  selectedJobId,
  setSelectedJobId,
  onOpenUploadModal,
  onOpenNewJobModal,
  unreadEmailCount,
  isCollapsed,
  setIsCollapsed,
}) => {
  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Tổng quan ATS', icon: Layers },
    { id: 'jobs_management' as ActiveTab, label: 'Vị trí & JD Mới', icon: Briefcase, badge: 'Mới' },
    { id: 'cv_filter' as ActiveTab, label: 'Lọc CV & Khớp JD', icon: Sparkles, badge: 'AI OCR' },
    { id: 'email_inbox' as ActiveTab, label: 'Hộp thư CV Email', icon: Mail, count: unreadEmailCount },
    { id: 'kanban' as ActiveTab, label: 'Quy trình Pipeline', icon: Users },
    { id: 'comparison' as ActiveTab, label: 'So sánh ứng viên', icon: Scale },
    { id: 'assessment' as ActiveTab, label: 'Test IQ / EQ / AQ', icon: FileCheck2, badge: 'Tự động' },
    { id: 'talent_pool' as ActiveTab, label: 'Talent Pool', icon: BookmarkCheck },
    { id: 'settings' as ActiveTab, label: 'Cài đặt & Email', icon: Settings },
  ];

  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  return (
    <aside
      className={`relative z-30 h-screen bg-white/95 backdrop-blur-xl border-r border-slate-200/90 flex flex-col transition-all duration-300 ease-in-out shrink-0 select-none shadow-[2px_0_15px_-4px_rgba(0,0,0,0.04)] ${
        isCollapsed ? 'w-20' : 'w-64 sm:w-72'
      }`}
    >
      {/* Sidebar Header & Brand */}
      <div className="h-18 px-4 border-b border-slate-100 flex items-center justify-between">
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          title="TalentPulse AI"
        >
          <div className="relative shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 via-emerald-400 to-indigo-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
            <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-tr from-lime-500 via-emerald-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-lime-500/20 ring-1 ring-white/60 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>

          {!isCollapsed && (
            <div className="min-w-0 flex-1 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-slate-900 truncate">
                  TalentPulse
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-black tracking-wider uppercase bg-lime-400/25 text-lime-800 border border-lime-400/60 rounded-md">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium truncate">
                AI Tuyển Dụng & Đối Chiếu JD
              </p>
            </div>
          )}
        </div>

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition cursor-pointer border border-transparent hover:border-slate-200"
          title={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
          aria-label={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Position Selector Box (When expanded) */}
      {!isCollapsed ? (
        <div className="p-3 border-b border-slate-100 bg-slate-50/50">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
            Vị trí đang lọc tiêu chí
          </label>
          <div className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 bg-white border border-slate-200 shadow-xs focus-within:border-indigo-500">
            <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer truncate w-full"
            >
              <option value="all">Tất cả vị trí ({jobs.length})</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="p-2 border-b border-slate-100 flex justify-center">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition border border-slate-200"
            title={`Vị trí: ${selectedJob ? selectedJob.title : 'Tất cả'}`}
          >
            <Filter className="w-4 h-4 text-indigo-600" />
          </button>
        </div>
      )}

      {/* Quick Action CTA Buttons */}
      <div className={`p-3 space-y-2 ${isCollapsed ? 'px-2' : ''}`}>
        <button
          onClick={onOpenNewJobModal}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs ${
            isCollapsed
              ? 'p-2 bg-slate-100 hover:bg-indigo-50 text-indigo-600 border border-slate-200'
              : 'bg-white hover:bg-indigo-50/80 text-indigo-700 border border-indigo-200 hover:border-indigo-300'
          }`}
          title="Tạo vị trí tuyển dụng mới kèm JD"
        >
          <Plus className="w-4 h-4 text-indigo-600 shrink-0" />
          {!isCollapsed && <span>+ Tạo JD Mới</span>}
        </button>

        <button
          onClick={onOpenUploadModal}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white transition-all duration-200 cursor-pointer shadow-md shadow-indigo-600/20 active:scale-98 ${
            isCollapsed ? 'p-2.5' : ''
          } bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500`}
          title="Tải lên tệp CV (PDF/DOCX/Ảnh) để trích xuất & đối chiếu"
        >
          <UploadCloud className="w-4 h-4 text-white shrink-0" />
          {!isCollapsed && <span>Upload CV File</span>}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {!isCollapsed && (
          <div className="px-2 pt-1 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Menu Chức Năng
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer group relative ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-600 rounded-r-full" />
              )}
              <Icon
                className={`w-4.5 h-4.5 shrink-0 transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-700'
                }`}
              />
              {!isCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {/* Badges or counters */}
              {!isCollapsed && item.count !== undefined && item.count > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                  {item.count}
                </span>
              )}
              {!isCollapsed && item.badge && (
                <span
                  className={`px-1.5 py-0.2 text-[9px] font-bold tracking-tight rounded-md border ${
                    item.badge === 'Mới'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : item.badge === 'AI OCR'
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-lime-50 text-lime-800 border-lime-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Collapsed dot for unread */}
              {isCollapsed && item.count !== undefined && item.count > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div
        onClick={() => setActiveTab('settings')}
        className={`p-3 border-t border-slate-100 bg-slate-50/60 hover:bg-indigo-50/50 cursor-pointer transition ${
          activeTab === 'settings' ? 'bg-indigo-50/80 ring-1 ring-inset ring-indigo-200' : ''
        }`}
        title="Cài đặt tài khoản & Cấu hình Email"
      >
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lime-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0 ring-2 ring-white shadow-xs">
              HR
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 truncate">HR Recruitment</span>
                <Settings className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-600 transition" />
              </div>
              <p className="text-[10px] text-slate-500 truncate">Cài đặt & Máy chủ Email</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-lime-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-xs cursor-pointer hover:scale-105 transition"
              title="Cài đặt & Cấu hình Email"
            >
              <Settings className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
