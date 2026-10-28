import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Sparkles,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  ChevronRight,
  Target,
  RefreshCw,
  Building,
} from 'lucide-react';
import { Job, JobCriterion } from '../types/recruitment';

interface JobManagementViewProps {
  jobs: Job[];
  onAddNewJob: (newJob: Job) => void;
  onUpdateJob: (updatedJob: Job) => void;
  onDeleteJob: (jobId: string) => void;
  onSelectJobForScreening: (jobId: string) => void;
}

export const JobManagementView: React.FC<JobManagementViewProps> = ({
  jobs,
  onAddNewJob,
  onUpdateJob,
  onDeleteJob,
  onSelectJobForScreening,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedPreviewJob, setSelectedPreviewJob] = useState<Job | null>(jobs[0] || null);

  // AI JD Generation states
  const [isGeneratingAiJd, setIsGeneratingAiJd] = useState(false);
  const [aiTitleInput, setAiTitleInput] = useState('');
  const [aiKeyNotes, setAiKeyNotes] = useState('Thành thạo Docker, Kubernetes, CI/CD, Cloud');
  const [aiError, setAiError] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formDept, setFormDept] = useState('Khối Công nghệ & Kỹ thuật');
  const [formLocation, setFormLocation] = useState('Hà Nội / Hybrid');
  const [formType, setFormType] = useState<'Full-time' | 'Hybrid' | 'Remote'>('Full-time');
  const [formExperience, setFormExperience] = useState('3+ năm kinh nghiệm');
  const [formSalary, setFormSalary] = useState('30,000,000 - 50,000,000 VNĐ');
  const [formDeadline, setFormDeadline] = useState('2026-12-31');
  const [formDescription, setFormDescription] = useState('');
  const [formRequirements, setFormRequirements] = useState<string[]>([]);
  const [formBenefits, setFormBenefits] = useState<string[]>([]);
  const [formCriteria, setFormCriteria] = useState<JobCriterion[]>([]);

  const handleOpenCreateModal = () => {
    setEditingJob(null);
    setFormTitle('');
    setFormCode(`JOB-${Math.floor(100 + Math.random() * 900)}`);
    setFormDept('Khối Công nghệ & Kỹ thuật');
    setFormLocation('Hà Nội / Hybrid');
    setFormType('Full-time');
    setFormExperience('3+ năm kinh nghiệm');
    setFormSalary('30,000,000 - 50,000,000 VNĐ');
    setFormDeadline('2026-12-31');
    setFormDescription('Chịu trách nhiệm phát triển và tối ưu hóa hệ thống công nghệ.');
    setFormRequirements([
      'Có tối thiểu 3 năm kinh nghiệm trong lĩnh vực liên quan.',
      'Kỹ năng tư duy logic và giải quyết vấn đề tốt.',
      'Khả năng làm việc nhóm và giao tiếp hiệu quả.',
    ]);
    setFormBenefits([
      'Lương thưởng cạnh tranh, thưởng tháng 13 + thưởng hiệu quả.',
      'Bảo hiểm sức khỏe cao cấp cho nhân viên.',
      'Trang bị máy tính và phụ cấp học tập chứng chỉ.',
    ]);
    setFormCriteria([
      {
        id: `crit-${Date.now()}-1`,
        name: 'Kinh nghiệm thực chiến (>= 3 năm)',
        category: 'Kinh nghiệm',
        mandatory: true,
        weight: 5,
        description: 'Đã có kinh nghiệm trong các dự án thực tế quy mô vừa và lớn.',
      },
      {
        id: `crit-${Date.now()}-2`,
        name: 'Kỹ năng chuyên môn cốt lõi',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Thành thạo các công cụ và quy trình tiêu chuẩn của vị trí.',
      },
    ]);
    setAiError(null);
    setShowCreateModal(true);
  };

  const handleOpenEditModal = (job: Job) => {
    setEditingJob(job);
    setFormTitle(job.title);
    setFormCode(job.code);
    setFormDept(job.department);
    setFormLocation(job.location);
    setFormType(job.type as any);
    setFormExperience(job.experienceRequired);
    setFormSalary(job.salaryRange);
    setFormDeadline(job.deadline);
    setFormDescription(job.description);
    setFormRequirements([...job.requirements]);
    setFormBenefits([...job.benefits]);
    setFormCriteria([...job.criteria]);
    setAiError(null);
    setShowCreateModal(true);
  };

  const handleGenerateAiJd = async () => {
    if (!aiTitleInput.trim()) {
      setAiError('Vui lòng nhập chức danh công việc');
      return;
    }
    setIsGeneratingAiJd(true);
    setAiError(null);

    try {
      const response = await fetch('/api/gemini/generate-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: aiTitleInput,
          department: formDept,
          level: 'Senior',
          location: formLocation,
          keyRequirements: aiKeyNotes,
        }),
      });

      const data = await response.json();
      if (!data.success || !data.jd) {
        throw new Error(data.error || 'Lỗi khi tạo JD từ AI');
      }

      const gen = data.jd;
      setFormTitle(gen.title);
      setFormCode(gen.code || `TECH-${Date.now().toString().slice(-4)}`);
      setFormDept(gen.department || formDept);
      setFormLocation(gen.location || formLocation);
      setFormType(gen.type || 'Full-time');
      setFormExperience(gen.experienceRequired || '3+ năm kinh nghiệm');
      setFormSalary(gen.salaryRange || 'Thoả thuận');
      setFormDescription(gen.description);
      setFormRequirements(gen.requirements || []);
      setFormBenefits(gen.benefits || []);
      setFormCriteria(
        (gen.criteria || []).map((c: any, idx: number) => ({
          id: c.id || `crit-${Date.now()}-${idx}`,
          name: c.name,
          category: c.category || 'Kỹ năng cứng',
          mandatory: c.mandatory ?? true,
          weight: c.weight || 4,
          description: c.description || '',
        }))
      );
    } catch (err: any) {
      setAiError(err.message || 'Không thể tạo JD bằng AI');
    } finally {
      setIsGeneratingAiJd(false);
    }
  };

  const handleAddCriterion = () => {
    const newCrit: JobCriterion = {
      id: `crit-${Date.now()}`,
      name: 'Tiêu chí đánh giá mới',
      category: 'Kỹ năng cứng',
      mandatory: false,
      weight: 3,
      description: 'Mô tả cụ thể yêu cầu cần đạt',
    };
    setFormCriteria((prev) => [...prev, newCrit]);
  };

  const handleRemoveCriterion = (critId: string) => {
    setFormCriteria((prev) => prev.filter((c) => c.id !== critId));
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Vui lòng nhập chức danh vị trí');
      return;
    }

    const jobData: Job = {
      id: editingJob ? editingJob.id : `job-${Date.now()}`,
      title: formTitle,
      code: formCode,
      department: formDept,
      location: formLocation,
      type: formType,
      experienceRequired: formExperience,
      salaryRange: formSalary,
      deadline: formDeadline,
      status: editingJob ? editingJob.status : 'Active',
      description: formDescription,
      requirements: formRequirements.filter((r) => r.trim().length > 0),
      benefits: formBenefits.filter((b) => b.trim().length > 0),
      criteria: formCriteria,
      applicantCount: editingJob ? editingJob.applicantCount : 0,
      createdAt: editingJob?.createdAt || new Date().toISOString().split('T')[0],
    };

    if (editingJob) {
      onUpdateJob(jobData);
    } else {
      onAddNewJob(jobData);
    }

    setSelectedPreviewJob(jobData);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 shadow-2xl border border-indigo-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Quản Lý Vị Trí & Thiết Lập Tiêu Chí JD</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Vị trí tuyển dụng & Tiêu chí thẩm định
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tạo vị trí mới với trợ lý AI hoặc tuỳ chỉnh tiêu chuẩn đối chiếu để AI chấm điểm ứng viên.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-bold text-xs sm:text-sm cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tạo Vị Trí Tuyển Dụng Mới</span>
        </button>
      </div>

      {/* Main Grid: Job Cards & Live JD Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Job Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Danh sách vị trí ({jobs.length})
            </span>
          </div>

          <div className="space-y-3">
            {jobs.map((job) => {
              const isSelected = selectedPreviewJob?.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedPreviewJob(job)}
                  className={`p-5 rounded-3xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'glass-card border-indigo-500/60 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                      : 'glass-card hover:border-indigo-500/40 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-indigo-400 border border-white/10 font-bold">
                          {job.code}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {job.status === 'Active' ? 'Đang tuyển' : 'Tạm dừng'}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white mt-2 hover:text-indigo-300 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{job.department}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditModal(job);
                        }}
                        className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer hover:scale-105 active:scale-95"
                        title="Chỉnh sửa vị trí"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Bạn có chắc muốn xóa vị trí "${job.title}" không?`)) {
                            onDeleteJob(job.id);
                          }
                        }}
                        className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition cursor-pointer hover:scale-105 active:scale-95"
                        title="Xóa vị trí"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-slate-400">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-300 font-medium truncate">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{job.salaryRange}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs">
                    <span className="text-slate-400">
                      Tiêu chí: <strong className="text-white">{job.criteria.length} tiêu chí</strong>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectJobForScreening(job.id);
                      }}
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer hover:translate-x-0.5 transition-transform"
                    >
                      <span>Lọc CV vị trí này</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed JD & Criteria Inspector */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 shadow-2xl border border-indigo-500/20 space-y-6">
          {selectedPreviewJob ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {selectedPreviewJob.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {selectedPreviewJob.type}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2 tracking-tight">
                    {selectedPreviewJob.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedPreviewJob.department} • Hạn nộp: {selectedPreviewJob.deadline}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => handleOpenEditModal(selectedPreviewJob)}
                    className="btn-secondary px-4 py-2 rounded-xl text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Sửa JD</span>
                  </button>
                  <button
                    onClick={() => onSelectJobForScreening(selectedPreviewJob.id)}
                    className="btn-primary px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>Lọc CV Ngay</span>
                  </button>
                </div>
              </div>

              {/* General details bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl glass-card">
                  <span className="text-slate-400 block">Kinh nghiệm</span>
                  <strong className="text-white mt-0.5 block">{selectedPreviewJob.experienceRequired}</strong>
                </div>
                <div className="p-3.5 rounded-2xl glass-card">
                  <span className="text-slate-400 block">Mức lương</span>
                  <strong className="text-amber-300 mt-0.5 block">{selectedPreviewJob.salaryRange}</strong>
                </div>
                <div className="p-3.5 rounded-2xl glass-card col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block">Địa điểm</span>
                  <strong className="text-slate-200 mt-0.5 block truncate">{selectedPreviewJob.location}</strong>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                  Mô tả công việc (Job Overview)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed glass-card p-4 rounded-2xl border border-white/5">
                  {selectedPreviewJob.description}
                </p>
              </div>

              {/* Requirements & Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <h4 className="font-bold uppercase tracking-wider text-slate-300">
                    Yêu cầu ứng viên (Requirements)
                  </h4>
                  <ul className="space-y-1.5 text-slate-300 glass-card p-4 rounded-2xl border border-white/5">
                    {selectedPreviewJob.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold uppercase tracking-wider text-slate-300">
                    Quyền lợi & Đãi ngộ (Benefits)
                  </h4>
                  <ul className="space-y-1.5 text-slate-300 glass-card p-4 rounded-2xl border border-white/5">
                    {selectedPreviewJob.benefits.map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Active Evaluation Criteria */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-indigo-400" />
                    Bộ tiêu chí đánh giá AI ({selectedPreviewJob.criteria.length})
                  </h4>
                </div>

                <div className="space-y-2">
                  {selectedPreviewJob.criteria.map((crit) => (
                    <div
                      key={crit.id}
                      className="p-3.5 rounded-2xl glass-card flex items-start justify-between gap-3 text-xs hover:border-indigo-500/30 transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-white">{crit.name}</strong>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              crit.mandatory
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-slate-800 text-slate-300 border border-white/10'
                            }`}
                          >
                            {crit.mandatory ? 'Bắt buộc' : 'Ưu tiên'}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
                            Trọng số: {crit.weight}/5
                          </span>
                        </div>
                        <p className="text-slate-400">{crit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400">Chọn một vị trí để xem chi tiết JD</div>
          )}
        </div>
      </div>

      {/* CREATE / EDIT JOB MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-indigo-500/30 rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl text-slate-100 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30 shadow-sm">
                  <Briefcase className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {editingJob ? 'Chỉnh Sửa Vị Trí Tuyển Dụng & JD' : 'Tạo Vị Trí Tuyển Dụng Mới'}
                  </h3>
                  <p className="text-xs text-slate-400">Thiết lập JD và các tiêu chí đối chiếu CV</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white font-bold p-1 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* AI Assistant Section */}
            <div className="p-4 rounded-2xl glass-card border border-indigo-500/30 space-y-3 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  Trợ lý AI Soạn Thảo JD & Tiêu Chí Tự Động
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Gemini 3.8 Flash</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input
                  type="text"
                  value={aiTitleInput}
                  onChange={(e) => setAiTitleInput(e.target.value)}
                  placeholder="Chức danh (VD: DevOps Engineer...)"
                  className="glass-input rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  value={aiKeyNotes}
                  onChange={(e) => setAiKeyNotes(e.target.value)}
                  placeholder="Kỹ năng chính (VD: AWS, Kubernetes...)"
                  className="glass-input rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  disabled={isGeneratingAiJd}
                  onClick={handleGenerateAiJd}
                  className="btn-primary px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isGeneratingAiJd ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>AI Đang Soạn JD...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>Soạn Thảo Tức Thì</span>
                    </>
                  )}
                </button>
              </div>

              {aiError && (
                <div className="text-xs text-rose-400 bg-rose-500/10 p-2 rounded-xl border border-rose-500/20">
                  {aiError}
                </div>
              )}
            </div>

            {/* Manual Form */}
            <form onSubmit={handleSaveJob} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Chức danh công việc:
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="VD: Senior Data Engineer"
                    className="w-full glass-input rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Mã vị trí (Code):
                  </label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Phòng ban:
                  </label>
                  <input
                    type="text"
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Kinh nghiệm:
                  </label>
                  <input
                    type="text"
                    value={formExperience}
                    onChange={(e) => setFormExperience(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Mức lương đề xuất:
                  </label>
                  <input
                    type="text"
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2 text-amber-300 font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Mô tả công việc (Job Description):
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full glass-input rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* CRITERIA BUILDER */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-indigo-400" />
                      Tiêu Chí Đánh Giá Cho Vị Trí ({formCriteria.length})
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCriterion}
                    className="btn-secondary px-3 py-1.5 rounded-xl text-indigo-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Thêm tiêu chí</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {formCriteria.map((crit) => (
                    <div
                      key={crit.id}
                      className="p-3.5 rounded-2xl glass-card space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={crit.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormCriteria((prev) =>
                              prev.map((c) => (c.id === crit.id ? { ...c, name: val } : c))
                            );
                          }}
                          className="flex-1 glass-input rounded-xl px-2.5 py-1 text-white focus:outline-none"
                          placeholder="Tên tiêu chí"
                        />

                        <select
                          value={crit.category}
                          onChange={(e) => {
                            const val = e.target.value as any;
                            setFormCriteria((prev) =>
                              prev.map((c) => (c.id === crit.id ? { ...c, category: val } : c))
                            );
                          }}
                          className="glass-input rounded-xl px-2 py-1 text-slate-300"
                        >
                          <option value="Kinh nghiệm" className="bg-slate-900 text-white">Kinh nghiệm</option>
                          <option value="Kỹ năng cứng" className="bg-slate-900 text-white">Kỹ năng cứng</option>
                          <option value="Kỹ năng mềm" className="bg-slate-900 text-white">Kỹ năng mềm</option>
                          <option value="Học vấn & Bằng cấp" className="bg-slate-900 text-white">Học vấn</option>
                          <option value="Ngôn ngữ" className="bg-slate-900 text-white">Ngôn ngữ</option>
                        </select>

                        <label className="flex items-center gap-1 text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={crit.mandatory}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFormCriteria((prev) =>
                                prev.map((c) => (c.id === crit.id ? { ...c, mandatory: checked } : c))
                              );
                            }}
                            className="rounded border-slate-700 text-indigo-600 focus:ring-0"
                          />
                          <span>Bắt buộc</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleRemoveCriterion(crit.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={crit.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormCriteria((prev) =>
                            prev.map((c) => (c.id === crit.id ? { ...c, description: val } : c))
                          );
                        }}
                        className="w-full glass-input rounded-xl px-2.5 py-1 text-slate-400"
                        placeholder="Mô tả cụ thể yêu cầu đạt tiêu chuẩn"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary px-4 py-2 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl text-white cursor-pointer"
                >
                  {editingJob ? 'Lưu Thay Đổi JD' : 'Tạo Vị Trí & Lưu JD Ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
