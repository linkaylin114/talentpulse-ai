import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Video,
  User,
  CheckCircle2,
  Sparkles,
  Link2,
  FileText,
} from 'lucide-react';
import { Candidate, InterviewSchedule } from '../types/recruitment';

interface InterviewScheduleModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onSaveSchedule: (candidateId: string, schedule: InterviewSchedule) => void;
}

export const InterviewScheduleModal: React.FC<InterviewScheduleModalProps> = ({
  candidate,
  onClose,
  onSaveSchedule,
}) => {
  if (!candidate) return null;

  const [date, setDate] = useState('2026-10-24');
  const [time, setTime] = useState('14:30 - 15:30');
  const [round, setRound] = useState('Phỏng vấn Kỹ thuật Vòng 1');
  const [interviewer, setInterviewer] = useState('Trần Văn Quyết (Head of Engineering)');
  const [meetingLink, setMeetingLink] = useState(
    `https://meet.google.com/talentpulse-${candidate.name.toLowerCase().replace(/\s+/g, '-')}`
  );
  const [notes, setNotes] = useState(
    'Tập trung kiểm tra kiến trúc hệ thống, kinh nghiệm tối ưu performance và giải quyết bài toán concurrency.'
  );

  const handleSave = () => {
    const schedule: InterviewSchedule = {
      id: `sched-${Date.now()}`,
      date,
      time,
      round,
      interviewer,
      meetingLink,
      notes,
      status: 'scheduled',
    };

    onSaveSchedule(candidate.id, schedule);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel border border-purple-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-slate-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30 shadow-sm">
              <Calendar className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Lên Lịch Phỏng Vấn Tự Động</h3>
              <p className="text-xs text-slate-400">
                Ứng viên: <strong className="text-white">{candidate.name}</strong> • {candidate.appliedJobTitle}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold cursor-pointer transition-colors">
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3.5">
          {/* Round */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Vòng phỏng vấn:
            </label>
            <select
              value={round}
              onChange={(e) => setRound(e.target.value)}
              className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Phỏng vấn Sơ bộ HR Screening" className="bg-slate-900 text-white">Phỏng vấn Sơ bộ HR Screening</option>
              <option value="Phỏng vấn Kỹ thuật Vòng 1" className="bg-slate-900 text-white">Phỏng vấn Kỹ thuật Vòng 1 (Technical)</option>
              <option value="Phỏng vấn Chuyên sâu Vòng 2" className="bg-slate-900 text-white">Phỏng vấn Chuyên sâu Vòng 2 (System Design)</option>
              <option value="Phỏng vấn Ban Giám Đốc & CTO Final" className="bg-slate-900 text-white">Phỏng vấn Ban Giám Đốc & CTO (Final Round)</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Ngày phỏng vấn:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Khung giờ:</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="09:00 - 10:00" className="bg-slate-900 text-white">09:00 - 10:00 (Sáng)</option>
                <option value="10:30 - 11:30" className="bg-slate-900 text-white">10:30 - 11:30 (Sáng)</option>
                <option value="14:00 - 15:00" className="bg-slate-900 text-white">14:00 - 15:00 (Chiều)</option>
                <option value="15:30 - 16:30" className="bg-slate-900 text-white">15:30 - 16:30 (Chiều)</option>
              </select>
            </div>
          </div>

          {/* Interviewer */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Người phỏng vấn chính (Interviewer):
            </label>
            <select
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
              className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Trần Văn Quyết (Head of Engineering)" className="bg-slate-900 text-white">Trần Văn Quyết (Head of Engineering)</option>
              <option value="Lê Hoàng Long (Chief Technology Officer)" className="bg-slate-900 text-white">Lê Hoàng Long (Chief Technology Officer)</option>
              <option value="Lê Thu Trang (Senior HR Manager)" className="bg-slate-900 text-white">Lê Thu Trang (Senior HR Manager)</option>
              <option value="Nguyễn Minh Hằng (Product Director)" className="bg-slate-900 text-white">Nguyễn Minh Hằng (Product Director)</option>
            </select>
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Phòng họp trực tuyến (Google Meet):
            </label>
            <div className="relative">
              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 font-mono text-cyan-300"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Ghi chú nội bộ cho người phỏng vấn:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full glass-input rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary px-4 py-2 text-xs font-medium rounded-xl cursor-pointer"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn-primary px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl text-white cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Xác Nhận & Lưu Lịch Phỏng Vấn</span>
          </button>
        </div>
      </div>
    </div>
  );
};
