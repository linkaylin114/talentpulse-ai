export type RecruitmentStage =
  | 'cv_filter'        // Lọc CV & Đối chiếu JD
  | 'assessment'       // Test năng lực
  | 'interview_1'      // Phỏng vấn vòng 1
  | 'interview_2'      // Phỏng vấn chuyên sâu
  | 'offer'            // Đề xuất Offer
  | 'hired'            // Đã tuyển dụng
  | 'rejected'         // Từ chối
  | 'talent_pool';     // Lưu trữ Talent Pool

export type CandidateSource = 'Email' | 'Tải lên CV (File Upload)' | 'Portal Website' | 'Nội bộ Giới thiệu';

export type MatchLevel = 'Cao' | 'Trung bình' | 'Thấp';

export type Recommendation =
  | 'Tuyển dụng ngay'
  | 'Rất tiềm năng'
  | 'Cân nhắc phỏng vấn'
  | 'Không phù hợp';

export interface JobCriterion {
  id: string;
  name: string;
  category: 'Kinh nghiệm' | 'Kỹ năng cứng' | 'Kỹ năng mềm' | 'Học vấn & Bằng cấp' | 'Ngôn ngữ' | 'Khác';
  mandatory: boolean; // Tiêu chí bắt buộc hay ưu tiên
  weight: number; // 1 - 5
  description: string;
}

export interface Job {
  id: string;
  title: string;
  code: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Hybrid' | 'Remote';
  experienceRequired: string;
  salaryRange: string;
  deadline: string;
  status: 'Active' | 'Paused' | 'Closed';
  description: string;
  requirements: string[];
  benefits: string[];
  criteria: JobCriterion[];
  applicantCount: number;
  createdAt?: string;
}

export interface CriterionEvaluation {
  criterionId?: string;
  criterionName: string;
  status: 'Đạt' | 'Đạt một phần' | 'Chưa đạt';
  score: number; // 0 - 100
  evidence: string; // Dẫn chứng trích từ CV
  notes: string; // Phân tích của AI
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  description?: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface ExtractedCvInfo {
  fullName: string;
  email: string;
  phone: string;
  currentRole: string;
  yearsOfExperience: number;
  summary: string;
  skills: string[];
  softSkills: string[];
  languages: string[];
  certifications: string[];
  education: Education[];
  workExperience: WorkExperience[];
}

export interface AiAnalysis {
  overallScore: number; // 0 - 100
  matchLevel: MatchLevel;
  recommendation: Recommendation;
  summaryAssessment: string;
  strengths: string[];
  gapsOrConcerns: string[];
  suggestedInterviewQuestions: string[];
  criteriaEvaluations: CriterionEvaluation[];
}

export interface AssessmentQuestion {
  id: string;
  topic: string;
  dimension?: 'IQ' | 'EQ' | 'AQ' | 'Chuyên môn';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AssessmentTest {
  id: string;
  jobId: string;
  testTitle: string;
  testType?: 'combo_iq_eq_aq' | 'technical' | 'iq' | 'eq' | 'aq';
  description?: string;
  durationMinutes: number;
  passingScore: number;
  iqCount?: number;
  eqCount?: number;
  aqCount?: number;
  questions: AssessmentQuestion[];
}

export interface CandidateTestResult {
  testId: string;
  testTitle?: string;
  score: number; // 0 - 100
  passed: boolean;
  completedAt: string;
  correctAnswers: number;
  totalQuestions: number;
  timeSpentMinutes: number;
  iqScore?: number;
  eqScore?: number;
  aqScore?: number;
  technicalScore?: number;
  psychometricSummary?: string;
  breakdown: { topic: string; score: number }[];
  answers: { questionIndex: number; selectedIndex: number; isCorrect: boolean }[];
}

export interface InterviewSchedule {
  id: string;
  date: string;
  time: string;
  round: string;
  interviewer: string;
  meetingLink: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface TalentPoolData {
  isSaved: boolean;
  tags: string[];
  rating: number; // 1 - 5 stars
  savedDate: string;
  notes: string;
  category: string;
}

export interface EmailLog {
  id: string;
  type: 'interview_invite' | 'assessment_invite' | 'offer' | 'rejection' | 'custom';
  subject: string;
  sentAt: string;
  recipient: string;
  status: 'delivered' | 'opened' | 'pending';
  htmlPreview: string;
}

export interface CandidateNote {
  id: string;
  author: string;
  createdAt: string;
  content: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  appliedJobId: string;
  appliedJobTitle: string;
  appliedDate: string;
  source: CandidateSource;
  rawCvText?: string;
  sourceFileName?: string;
  extractedInfo: ExtractedCvInfo;
  aiAnalysis: AiAnalysis;
  stage: RecruitmentStage;
  testResult?: CandidateTestResult;
  assessmentStatus?: 'not_sent' | 'auto_sent' | 'completed';
  assessmentInviteDate?: string;
  autoSentTestTitle?: string;
  iqScore?: number;
  eqScore?: number;
  aqScore?: number;
  interviewSchedule?: InterviewSchedule;
  talentPoolData?: TalentPoolData;
  emailLogs: EmailLog[];
  notes: CandidateNote[];
  expectedSalary?: string;
  noticePeriod?: string;
}

export interface EmailInboxItem {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  receivedAt: string;
  hasAttachment: boolean;
  attachmentFileName?: string;
  cvContentSample?: string;
  predictedJobId?: string;
  predictedJobTitle?: string;
  status: 'unread' | 'read' | 'processed' | 'imported';
  emailBody: string;
}
