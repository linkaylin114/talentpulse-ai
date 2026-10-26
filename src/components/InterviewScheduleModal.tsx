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
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-slate-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Lên Lịch Phỏng Vấn Tự Động</h3>
              <p className="text-xs text-slate-400">
                Ứng viên: <strong>{candidate.name}</strong> • {candidate.appliedJobTitle}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">
          {/* Round */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Vòng phỏng vấn:
            </label>
            <select
              value={round}
              onChange={(e) => setRound(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Phỏng vấn Sơ bộ HR Screening">Phỏng vấn Sơ bộ HR Screening</option>
              <option value="Phỏng vấn Kỹ thuật Vòng 1">Phỏng vấn Kỹ thuật Vòng 1 (Technical)</option>
              <option value="Phỏng vấn Chuyên sâu Vòng 2">Phỏng vấn Chuyên sâu Vòng 2 (System Design)</option>
              <option value="Phỏng vấn Ban Giám Đốc & CTO Final">Phỏng vấn Ban Giám Đốc & CTO (Final Round)</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Ngày phỏng vấn:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Khung giờ:</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="09:00 - 10:00">09:00 - 10:00 (Sáng)</option>
                <option value="10:30 - 11:30">10:30 - 11:30 (Sáng)</option>
                <option value="14:00 - 15:00">14:00 - 15:00 (Chiều)</option>
                <option value="15:30 - 16:30">15:30 - 16:30 (Chiều)</option>
              </select>
            </div>
          </div>

          {/* Interviewer */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Người phỏng vấn chính (Interviewer):
            </label>
            <select
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Trần Văn Quyết (Head of Engineering)">Trần Văn Quyết (Head of Engineering)</option>
              <option value="Lê Hoàng Long (Chief Technology Officer)">Lê Hoàng Long (Chief Technology Officer)</option>
              <option value="Lê Thu Trang (Senior HR Manager)">Lê Thu Trang (Senior HR Manager)</option>
              <option value="Nguyễn Minh Hằng (Product Director)">Nguyễn Minh Hằng (Product Director)</option>
            </select>
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Phòng họp trực tuyến (Google Meet):
            </label>
            <div className="relative">
              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 font-mono text-cyan-300"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Ghi chú nội bộ cho người phỏng vấn:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30 transition cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Xác Nhận & Lưu Lịch Phỏng Vấn</span>
          </button>
        </div>
      </div>
    </div>
  );
};
