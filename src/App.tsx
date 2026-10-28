import React, { useState } from 'react';
import {
  INITIAL_JOBS,
  INITIAL_CANDIDATES,
  INITIAL_EMAIL_INBOX,
  INITIAL_ASSESSMENTS,
} from './data/mockData';
import {
  Candidate,
  Job,
  EmailInboxItem,
  AssessmentTest,
  RecruitmentStage,
  InterviewSchedule,
  EmailLog,
  CandidateTestResult,
} from './types/recruitment';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { JobManagementView } from './components/JobManagementView';
import { CvFilterView } from './components/CvFilterView';
import { EmailInboxView } from './components/EmailInboxView';
import { PipelineKanbanView } from './components/PipelineKanbanView';
import { CandidateComparisonView } from './components/CandidateComparisonView';
import { AssessmentToolView } from './components/AssessmentToolView';
import { TalentPoolView } from './components/TalentPoolView';
import { SettingsView } from './components/SettingsView';
import { CandidateDetailModal } from './components/CandidateDetailModal';
import { InterviewScheduleModal } from './components/InterviewScheduleModal';
import { EmailSenderModal } from './components/EmailSenderModal';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [emails, setEmails] = useState<EmailInboxItem[]>(INITIAL_EMAIL_INBOX);
  const [assessments, setAssessments] = useState<AssessmentTest[]>(INITIAL_ASSESSMENTS);

  const [selectedJobId, setSelectedJobId] = useState<string>('all');

  // Modals
  const [activeCandidateDetail, setActiveCandidateDetail] = useState<Candidate | null>(null);
  const [scheduleModalCandidate, setScheduleModalCandidate] = useState<Candidate | null>(null);
  const [emailModalCandidate, setEmailModalCandidate] = useState<Candidate | null>(null);

  // Global Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(
    null
  );

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Automated assessment dispatcher for candidates
  const handleAutoSendAssessment = (targetCandidateIds?: string[], testTitle = 'Combo Đánh Giá Toàn Diện: IQ + EQ + AQ') => {
    const inviteTime = new Date().toISOString().replace('T', ' ').slice(0, 16);
    let affectedCount = 0;

    setCandidates((prev) =>
      prev.map((c) => {
        const isTarget = !targetCandidateIds || targetCandidateIds.length === 0 || targetCandidateIds.includes(c.id);
        if (isTarget && !c.testResult) {
          affectedCount++;
          const autoInviteLog: EmailLog = {
            id: `email-invite-${Date.now()}-${c.id}`,
            type: 'assessment_invite',
            subject: `[TalentPulse] Thư mời làm bài test năng lực IQ + EQ + AQ - Vị trí ${c.appliedJobTitle}`,
            sentAt: inviteTime,
            recipient: c.email,
            status: 'delivered',
            htmlPreview: `<p>Kính gửi <strong>${c.name}</strong>, chúc mừng hồ sơ của bạn đã vượt qua vòng Lọc CV. Mời bạn thực hiện bài khảo sát kết hợp IQ + EQ + AQ trước phỏng vấn...</p>`,
          };
          return {
            ...c,
            assessmentStatus: 'auto_sent',
            assessmentInviteDate: inviteTime,
            autoSentTestTitle: testTitle,
            emailLogs: [autoInviteLog, ...c.emailLogs],
          };
        }
        return c;
      })
    );

    showToast(`Đã tự động gửi link bài test IQ/EQ/AQ cho ${affectedCount > 0 ? affectedCount : 1} ứng viên qua email!`);
  };

  // Job Management Handlers
  const handleAddNewJob = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev]);
    setSelectedJobId(newJob.id);
    showToast(`Đã tạo thành công vị trí mới "${newJob.title}" với ${newJob.criteria.length} tiêu chí!`);
  };

  const handleUpdateJob = (updatedJob: Job) => {
    setJobs((prev) => prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
    showToast(`Đã cập nhật bản mô tả công việc (JD) cho "${updatedJob.title}"`);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    if (selectedJobId === jobId) {
      setSelectedJobId('all');
    }
    showToast('Đã xóa vị trí tuyển dụng.');
  };

  const handleSelectJobForScreening = (jobId: string) => {
    setSelectedJobId(jobId);
    setActiveTab('cv_filter');
    showToast(`Đang lọc CV theo tiêu chuẩn vị trí đã chọn.`);
  };

  // Stage update handler
  const handleUpdateCandidateStage = (candidateId: string, newStage: RecruitmentStage) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const updated = { ...c, stage: newStage };
          if (newStage === 'talent_pool') {
            updated.talentPoolData = {
              isSaved: true,
              tags: updated.talentPoolData?.tags || ['Saved from ATS', 'High Potential'],
              rating: updated.talentPoolData?.rating || 4,
              savedDate: new Date().toISOString().split('T')[0],
              notes: 'Đã lưu vào kho ứng viên tiềm năng.',
              category: updated.appliedJobTitle,
            };
          }
          return updated;
        }
        return c;
      })
    );

    const stageNames: { [key in RecruitmentStage]: string } = {
      cv_filter: 'Lọc CV',
      assessment: 'Test Năng Lực',
      interview_1: 'Phỏng Vấn Vòng 1',
      interview_2: 'Phỏng Vấn Vòng 2',
      offer: 'Đề Xuất Offer',
      hired: 'Đã Tuyển Dụng',
      rejected: 'Từ Chối',
      talent_pool: 'Talent Pool',
    };

    showToast(`Đã chuyển ứng viên sang giai đoạn "${stageNames[newStage]}"`);
  };

  // Save to Talent Pool
  const handleSaveToTalentPool = (candidateId: string, tags: string[], rating: number) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          return {
            ...c,
            stage: 'talent_pool',
            talentPoolData: {
              isSaved: true,
              tags: tags.length > 0 ? tags : ['Top Candidate'],
              rating,
              savedDate: new Date().toISOString().split('T')[0],
              notes: `Đã lưu đánh giá ${rating} sao vào Talent Pool.`,
              category: c.appliedJobTitle,
            },
          };
        }
        return c;
      })
    );
    showToast(`Đã lưu ứng viên vào Talent Pool thành công!`);
  };

  // Save Interview Schedule
  const handleSaveSchedule = (candidateId: string, schedule: InterviewSchedule) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const newStage: RecruitmentStage =
            schedule.round.includes('Vòng 2') || schedule.round.includes('CTO')
              ? 'interview_2'
              : 'interview_1';
          return {
            ...c,
            interviewSchedule: schedule,
            stage: newStage,
          };
        }
        return c;
      })
    );
    showToast(
      `Đã lên lịch phỏng vấn (${schedule.date} ${schedule.time}) và sinh link Google Meet!`
    );
  };

  // Save Test Result
  const handleSaveTestResult = (candidateId: string, testResult: CandidateTestResult) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          return {
            ...c,
            testResult,
            stage: testResult.passed ? 'interview_1' : c.stage,
          };
        }
        return c;
      })
    );
    showToast(
      `Đã chấm điểm tự động: ${testResult.score}% (${testResult.passed ? 'Đạt' : 'Chưa đạt'})!`
    );
  };

  // Send Email
  const handleSendEmail = (candidateId: string, emailLog: EmailLog) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          return {
            ...c,
            emailLogs: [emailLog, ...c.emailLogs],
          };
        }
        return c;
      })
    );
    showToast(`Đã gửi email thông báo thành công tới ${emailLog.recipient}!`);
  };

  // Add Note
  const handleAddNote = (candidateId: string, content: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      author: 'HR Recruitment Specialist',
      createdAt: 'Hôm nay, vừa xong',
      content,
    };
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, notes: [newNote, ...c.notes] } : c))
    );
    if (activeCandidateDetail && activeCandidateDetail.id === candidateId) {
      setActiveCandidateDetail((prev) =>
        prev ? { ...prev, notes: [newNote, ...prev.notes] } : null
      );
    }
    showToast('Đã lưu ghi chú đánh giá của HR.');
  };

  // Add new parsed candidate
  const handleAddNewCandidate = (candidate: Candidate) => {
    setCandidates((prev) => [candidate, ...prev]);
    showToast(`Đã phân tích tệp và thêm ứng viên "${candidate.name}" vào hệ thống!`);
  };

  // Import Candidate from Email
  const handleImportEmailCandidate = async (
    emailItem: EmailInboxItem,
    targetJob: Job
  ): Promise<Candidate | null> => {
    const cvText = emailItem.cvContentSample || emailItem.emailBody;

    try {
      const response = await fetch('/api/gemini/parse-and-evaluate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvText,
          jobTitle: targetJob.title,
          jobRequirements: targetJob.description + '\n' + targetJob.requirements.join('\n'),
          criteriaList: targetJob.criteria,
        }),
      });

      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Lỗi trích xuất');
      }

      const { extractedInfo, aiAnalysis } = result.data;

      const newCand: Candidate = {
        id: `cand-${Date.now()}`,
        name: extractedInfo.fullName || emailItem.senderName,
        email: extractedInfo.email || emailItem.senderEmail,
        phone: extractedInfo.phone || '0900 000 000',
        avatar: `https://images.unsplash.com/photo-${1534528741775 + (candidates.length % 5)}?w=150&auto=format&fit=crop&q=80`,
        appliedJobId: targetJob.id,
        appliedJobTitle: targetJob.title,
        appliedDate: new Date().toISOString().split('T')[0],
        source: 'Email',
        sourceFileName: emailItem.attachmentFileName || 'Email_Attachment.pdf',
        rawCvText: cvText,
        extractedInfo: {
          fullName: extractedInfo.fullName || emailItem.senderName,
          email: extractedInfo.email || emailItem.senderEmail,
          phone: extractedInfo.phone || '0900 000 000',
          currentRole: extractedInfo.currentRole || targetJob.title,
          yearsOfExperience: extractedInfo.yearsOfExperience || 4,
          summary: extractedInfo.summary || 'Trích xuất tự động từ tệp đính kèm email.',
          skills: extractedInfo.skills || [],
          softSkills: extractedInfo.softSkills || [],
          languages: extractedInfo.languages || ['Tiếng Việt'],
          certifications: extractedInfo.certifications || [],
          education: extractedInfo.education || [],
          workExperience: extractedInfo.workExperience || [],
        },
        aiAnalysis: {
          overallScore: aiAnalysis.overallScore || 85,
          matchLevel: (aiAnalysis.matchLevel as any) || 'Cao',
          recommendation: (aiAnalysis.recommendation as any) || 'Rất tiềm năng',
          summaryAssessment: aiAnalysis.summaryAssessment || 'Đã phân tích đối chiếu JD.',
          strengths: aiAnalysis.strengths || [],
          gapsOrConcerns: aiAnalysis.gapsOrConcerns || [],
          suggestedInterviewQuestions: aiAnalysis.suggestedInterviewQuestions || [],
          criteriaEvaluations: aiAnalysis.criteriaEvaluations || [],
        },
        stage: 'cv_filter',
        emailLogs: [],
        notes: [
          {
            id: `note-${Date.now()}`,
            author: 'AI Mailbox Sync Agent',
            createdAt: 'Vừa xong',
            content: `Tự động phân loại từ email "${emailItem.subject}". Điểm AI: ${aiAnalysis.overallScore}/100`,
          },
        ],
      };

      setCandidates((prev) => [newCand, ...prev]);
      return newCand;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const unreadEmailCount = emails.filter((e) => e.status !== 'imported').length;

  return (
    <div className="h-screen w-screen flex bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Ambient Background Orbs */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />
        <div className="ambient-orb-3" />
      </div>

      {/* Collapsible Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        jobs={jobs}
        selectedJobId={selectedJobId}
        setSelectedJobId={setSelectedJobId}
        onOpenUploadModal={() => setActiveTab('cv_filter')}
        onOpenNewJobModal={() => setActiveTab('jobs_management')}
        unreadEmailCount={unreadEmailCount}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Area - Fluid full width without wide side margins */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden relative z-10">
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-10 py-6 w-full">
        {activeTab === 'dashboard' && (
          <DashboardView
            candidates={candidates}
            jobs={jobs}
            selectedJobId={selectedJobId}
            onSelectCandidate={(cand) => setActiveCandidateDetail(cand)}
            onNavigateTab={setActiveTab}
            onOpenEmailModal={(cand) => setEmailModalCandidate(cand)}
            onOpenScheduleModal={(cand) => setScheduleModalCandidate(cand)}
          />
        )}

        {activeTab === 'jobs_management' && (
          <JobManagementView
            jobs={jobs}
            onAddNewJob={handleAddNewJob}
            onUpdateJob={handleUpdateJob}
            onDeleteJob={handleDeleteJob}
            onSelectJobForScreening={handleSelectJobForScreening}
          />
        )}

        {activeTab === 'cv_filter' && (
          <CvFilterView
            candidates={candidates}
            jobs={jobs}
            selectedJobId={selectedJobId}
            onUpdateCandidateStage={handleUpdateCandidateStage}
            onSaveToTalentPool={handleSaveToTalentPool}
            onOpenScheduleModal={(cand) => setScheduleModalCandidate(cand)}
            onOpenEmailModal={(cand) => setEmailModalCandidate(cand)}
            onAddNewCandidate={handleAddNewCandidate}
          />
        )}

        {activeTab === 'email_inbox' && (
          <EmailInboxView
            emails={emails}
            jobs={jobs}
            onImportEmailCandidate={handleImportEmailCandidate}
            onNavigateToCandidate={(cand) => {
              setActiveCandidateDetail(cand);
              setActiveTab('cv_filter');
            }}
          />
        )}

        {activeTab === 'kanban' && (
          <PipelineKanbanView
            candidates={candidates}
            jobs={jobs}
            selectedJobId={selectedJobId}
            onUpdateCandidateStage={handleUpdateCandidateStage}
            onSelectCandidate={(cand) => setActiveCandidateDetail(cand)}
            onOpenScheduleModal={(cand) => setScheduleModalCandidate(cand)}
            onOpenEmailModal={(cand) => setEmailModalCandidate(cand)}
          />
        )}

        {activeTab === 'comparison' && (
          <CandidateComparisonView
            candidates={candidates}
            jobs={jobs}
            selectedJobId={selectedJobId}
            onOpenScheduleModal={(cand) => setScheduleModalCandidate(cand)}
            onOpenEmailModal={(cand) => setEmailModalCandidate(cand)}
            onSelectCandidate={(cand) => setActiveCandidateDetail(cand)}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentToolView
            tests={assessments}
            candidates={candidates}
            jobs={jobs}
            onSaveTestResult={handleSaveTestResult}
            onOpenEmailModal={(cand) => setEmailModalCandidate(cand)}
            onAddNewTest={(newTest) => setAssessments((prev) => [newTest, ...prev])}
            onAutoSendAssessment={handleAutoSendAssessment}
          />
        )}

        {activeTab === 'talent_pool' && (
          <TalentPoolView
            candidates={candidates}
            onSelectCandidate={(cand) => setActiveCandidateDetail(cand)}
            onOpenEmailModal={(cand) => setEmailModalCandidate(cand)}
            onOpenScheduleModal={(cand) => setScheduleModalCandidate(cand)}
            onReactivateCandidate={handleUpdateCandidateStage}
            onRemoveFromTalentPool={(candId) => {
              setCandidates((prev) =>
                prev.map((c) =>
                  c.id === candId ? { ...c, talentPoolData: undefined } : c
                )
              );
              showToast('Đã gỡ hồ sơ khỏi Talent Pool.');
            }}
          />
        )}

        {activeTab === 'settings' && <SettingsView />}
      </main>
    </div>

      {/* Global Modals */}
      {activeCandidateDetail && (
        <CandidateDetailModal
          candidate={activeCandidateDetail}
          onClose={() => setActiveCandidateDetail(null)}
          onUpdateStage={handleUpdateCandidateStage}
          onOpenScheduleModal={(cand) => setScheduleModalCandidate(cand)}
          onOpenEmailModal={(cand) => setEmailModalCandidate(cand)}
          onAddNote={handleAddNote}
        />
      )}

      {scheduleModalCandidate && (
        <InterviewScheduleModal
          candidate={scheduleModalCandidate}
          onClose={() => setScheduleModalCandidate(null)}
          onSaveSchedule={handleSaveSchedule}
        />
      )}

      {emailModalCandidate && (
        <EmailSenderModal
          candidate={emailModalCandidate}
          onClose={() => setEmailModalCandidate(null)}
          onSendEmail={handleSendEmail}
        />
      )}

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 border border-indigo-500/40 text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
