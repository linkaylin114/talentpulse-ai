import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Send,
  Plus,
  RefreshCw,
  Award,
  ChevronRight,
  Brain,
  ShieldCheck,
  HeartHandshake,
  Zap,
  Check,
  Mail,
  UserCheck,
  Sliders,
  Filter,
} from 'lucide-react';
import { AssessmentTest, Candidate, Job, CandidateTestResult, AssessmentQuestion } from '../types/recruitment';

interface AssessmentToolViewProps {
  tests: AssessmentTest[];
  candidates: Candidate[];
  jobs: Job[];
  onSaveTestResult: (candidateId: string, testResult: CandidateTestResult) => void;
  onOpenEmailModal: (candidate: Candidate) => void;
  onAddNewTest: (newTest: AssessmentTest) => void;
  onAutoSendAssessment?: (candidateIds: string[], testTitle: string) => void;
}

export const AssessmentToolView: React.FC<AssessmentToolViewProps> = ({
  tests,
  candidates,
  jobs,
  onSaveTestResult,
  onOpenEmailModal,
  onAddNewTest,
  onAutoSendAssessment,
}) => {
  const [testList, setTestList] = useState<AssessmentTest[]>(tests);
  const [selectedTestId, setSelectedTestId] = useState<string>(tests[0]?.id || '');
  const [activeCandidateId, setActiveCandidateId] = useState<string>(candidates[0]?.id || '');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('all');

  // Automation settings state
  const [autoSendEnabled, setAutoSendEnabled] = useState(true);
  const [showAutoSendModal, setShowAutoSendModal] = useState(false);
  const [autoSendSuccessMsg, setAutoSendSuccessMsg] = useState<string | null>(null);

  // Quiz taking state
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<CandidateTestResult | null>(null);

  // AI test generator modal state
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genJobTitle, setGenJobTitle] = useState(jobs[0]?.title || '');
  const [genTestType, setGenTestType] = useState<'combo_iq_eq_aq' | 'technical' | 'iq' | 'eq' | 'aq'>('combo_iq_eq_aq');
  const [genLevel, setGenLevel] = useState('Senior');
  const [genFocus, setGenFocus] = useState('Logic giải thuật, Trí tuệ cảm xúc EQ, Khả năng chịu áp lực AQ');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const currentTest = testList.find((t) => t.id === selectedTestId) || testList[0];
  const activeCandidate = candidates.find((c) => c.id === activeCandidateId) || candidates[0];

  // Filter test list
  const filteredTests = testList.filter((t) => {
    if (selectedFilterCategory === 'all') return true;
    if (selectedFilterCategory === 'combo') return t.testType === 'combo_iq_eq_aq';
    if (selectedFilterCategory === 'technical') return t.testType === 'technical';
    if (selectedFilterCategory === 'iq') return t.testType === 'iq';
    if (selectedFilterCategory === 'eq') return t.testType === 'eq';
    if (selectedFilterCategory === 'aq') return t.testType === 'aq';
    return true;
  });

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTakingQuiz && !quizSubmitted && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTakingQuiz && !quizSubmitted) {
      handleSubmitQuiz();
    }
    return () => clearInterval(interval);
  }, [isTakingQuiz, quizSubmitted, timerSeconds]);

  const handleStartQuiz = () => {
    setIsTakingQuiz(true);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setTimerSeconds((currentTest?.durationMinutes || 25) * 60);
    setQuizSubmitted(false);
    setCalculatedResult(null);
  };

  const handleSelectAnswer = (qIdx: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!currentTest) return;

    let correctCount = 0;
    const topicScores: { [topic: string]: { correct: number; total: number } } = {};
    const dimensionScores: { [dim: string]: { correct: number; total: number } } = {
      IQ: { correct: 0, total: 0 },
      EQ: { correct: 0, total: 0 },
      AQ: { correct: 0, total: 0 },
      'Chuyên môn': { correct: 0, total: 0 },
    };

    const answersBreakdown: any[] = [];

    currentTest.questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;

      // Track by topic
      if (!topicScores[q.topic]) {
        topicScores[q.topic] = { correct: 0, total: 0 };
      }
      topicScores[q.topic].total += 1;
      if (isCorrect) topicScores[q.topic].correct += 1;

      // Track by dimension
      const dim = q.dimension || 'Chuyên môn';
      if (dimensionScores[dim]) {
        dimensionScores[dim].total += 1;
        if (isCorrect) dimensionScores[dim].correct += 1;
      }

      answersBreakdown.push({
        questionIndex: idx,
        selectedIndex: selected !== undefined ? selected : -1,
        isCorrect,
      });
    });

    const scorePercentage = Math.round((correctCount / currentTest.questions.length) * 100);
    const passed = scorePercentage >= currentTest.passingScore;

    const breakdown = Object.keys(topicScores).map((topic) => ({
      topic,
      score: Math.round((topicScores[topic].correct / topicScores[topic].total) * 100),
    }));

    // Calculate individual dimension scores
    const calcDimScore = (dim: string) => {
      const data = dimensionScores[dim];
      if (!data || data.total === 0) return 85; // Fallback estimate
      return Math.round((data.correct / data.total) * 100);
    };

    const iqScore = calcDimScore('IQ');
    const eqScore = calcDimScore('EQ');
    const aqScore = calcDimScore('AQ');
    const techScore = calcDimScore('Chuyên môn');

    let psychometricSummary = '';
    if (currentTest.testType === 'combo_iq_eq_aq') {
      psychometricSummary = `Ứng viên thể hiện chỉ số IQ (${iqScore}%) nhạy bén về tư duy logic; chỉ số EQ (${eqScore}%) cho thấy khả năng kết nối và đồng cảm đội ngũ tốt; chỉ số AQ (${aqScore}%) chứng minh sức bền và khả năng giữ bình tĩnh trước áp lực dự án cao.`;
    }

    const result: CandidateTestResult = {
      testId: currentTest.id,
      testTitle: currentTest.testTitle,
      score: scorePercentage,
      passed,
      completedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      correctAnswers: correctCount,
      totalQuestions: currentTest.questions.length,
      timeSpentMinutes: Math.round(
        (currentTest.durationMinutes * 60 - timerSeconds) / 60
      ),
      iqScore,
      eqScore,
      aqScore,
      technicalScore: techScore,
      psychometricSummary,
      breakdown,
      answers: answersBreakdown,
    };

    setCalculatedResult(result);
    setQuizSubmitted(true);

    if (activeCandidate) {
      onSaveTestResult(activeCandidate.id, result);
    }
  };

  const handleGenerateAiTest = async () => {
    setIsGenerating(true);
    setGenError(null);

    try {
      let focusText = genFocus;
      if (genTestType === 'combo_iq_eq_aq') {
        focusText = `Kết hợp đầy đủ 3 chỉ số: IQ (Tư duy logic, giải thuật), EQ (Trí tuệ cảm xúc, giải quyết xung đột đội ngũ), AQ (Chỉ số vượt khó, thích ứng áp lực và xử lý khủng hoảng) cho vị trí ${genJobTitle}`;
      }

      const response = await fetch('/api/gemini/generate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: genJobTitle,
          level: genLevel,
          focusAreas: focusText,
          numQuestions: 6,
        }),
      });

      const data = await response.json();
      if (!data.success || !data.test) {
        throw new Error(data.error || 'Lỗi khi tạo bài test');
      }

      // Assign dimensions to questions if combo
      const formattedQuestions: AssessmentQuestion[] = (data.test.questions || []).map((q: any, i: number) => {
        let dim: 'IQ' | 'EQ' | 'AQ' | 'Chuyên môn' = 'Chuyên môn';
        if (genTestType === 'combo_iq_eq_aq') {
          if (i % 3 === 0) dim = 'IQ';
          else if (i % 3 === 1) dim = 'EQ';
          else dim = 'AQ';
        } else if (genTestType === 'iq') dim = 'IQ';
        else if (genTestType === 'eq') dim = 'EQ';
        else if (genTestType === 'aq') dim = 'AQ';

        return {
          id: `ai-q-${Date.now()}-${i}`,
          dimension: dim,
          topic: `${dim} - ${q.topic || 'Khảo sát năng lực'}`,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex || 0,
          explanation: q.explanation || '',
        };
      });

      const newTest: AssessmentTest = {
        id: `test-ai-${Date.now()}`,
        jobId: jobs.find((j) => j.title === genJobTitle)?.id || 'job-custom',
        testTitle: data.test.testTitle || `Bài Test Toàn Diện ${genJobTitle}`,
        testType: genTestType,
        description: `Bài khảo thí năng lực tự động tạo bởi AI cho vị trí ${genJobTitle}, tích hợp đánh giá thực chiến.`,
        durationMinutes: data.test.durationMinutes || 25,
        passingScore: data.test.passingScore || 70,
        questions: formattedQuestions,
      };

      setTestList((prev) => [newTest, ...prev]);
      onAddNewTest(newTest);
      setSelectedTestId(newTest.id);
      setShowGenerateModal(false);
    } catch (err: any) {
      console.error(err);
      setGenError(err.message || 'Không thể tạo bài test bằng AI');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkAutoSendTests = () => {
    const candidatesPending = candidates.filter((c) => !c.testResult);
    if (onAutoSendAssessment) {
      onAutoSendAssessment(
        candidatesPending.map((c) => c.id),
        currentTest?.testTitle || 'Combo Đánh Giá IQ + EQ + AQ'
      );
    }
    setAutoSendSuccessMsg(`Đã kích hoạt gửi link test IQ+EQ+AQ tự động cho ${candidatesPending.length} ứng viên!`);
    setTimeout(() => setAutoSendSuccessMsg(null), 4000);
    setShowAutoSendModal(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getDimensionBadge = (dim?: string) => {
    if (dim === 'IQ') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-300 dark:border-blue-500/40">
          <Brain className="w-3 h-3 text-blue-600" />
          IQ • TƯ DUY LOGIC
        </span>
      );
    }
    if (dim === 'EQ') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40">
          <HeartHandshake className="w-3 h-3 text-emerald-600" />
          EQ • TRÍ TUỆ CẢM XÚC
        </span>
      );
    }
    if (dim === 'AQ') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-lime-100 text-lime-900 dark:bg-lime-900/40 dark:text-lime-300 border border-lime-300 dark:border-lime-500/40">
          <ShieldCheck className="w-3 h-3 text-lime-700" />
          AQ • VƯỢT KHÓ & ÁP LỰC
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-300 dark:border-purple-500/40">
        <FileCheck2 className="w-3 h-3 text-purple-600" />
        CHUYÊN MÔN
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Super Clean Light Theme & Lime Accents */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/90 bg-white/95 dark:bg-slate-900/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="p-2.5 bg-lime-400/20 text-lime-800 dark:text-lime-300 rounded-2xl border border-lime-400/40 shadow-xs">
                <Brain className="w-6 h-6 text-lime-700 dark:text-lime-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Khảo Thí Năng Lực Toàn Diện: IQ + EQ + AQ & Tự Động Gửi Trước Cho Ứng Viên
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-lime-400/30 text-lime-800 dark:text-lime-300 border border-lime-400/60 rounded-full">
                Combo 3 Chỉ Số Chuẩn Quốc Tế
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Tự động kích hoạt gửi bài test trắc nghiệm tình huống kết hợp <strong>IQ (Tư duy logic)</strong>,{' '}
              <strong>EQ (Trí tuệ cảm xúc & văn hóa đội ngũ)</strong> và <strong>AQ (Chỉ số vượt khó & xử lý khủng hoảng)</strong> ngay khi ứng viên đạt lọc CV, giúp HR có bức tranh đa chiều trước vòng phỏng vấn.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowAutoSendModal(true)}
              className="btn-lime inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm cursor-pointer shadow-sm"
            >
              <Zap className="w-4 h-4 fill-slate-900 text-slate-900" />
              <span>⚡ Tự Động Gửi Trước Link Test</span>
            </button>

            <button
              onClick={() => setShowGenerateModal(true)}
              className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Tạo Bài Test Mới Bằng AI</span>
            </button>
          </div>
        </div>

        {/* Auto Send Success Alert */}
        {autoSendSuccessMsg && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{autoSendSuccessMsg}</span>
          </div>
        )}

        {/* Dimension Feature Highlights (Presentation Style Lime / White Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-5 border-t border-slate-200/80 dark:border-white/10">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-slate-800/50 border border-blue-200/80 dark:border-white/5 flex items-start gap-3">
            <div className="p-2 bg-blue-500 text-white rounded-xl shadow-xs shrink-0">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">IQ • Tư Duy Logic & Giải Thuật</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                Đánh giá suy luận số học, phân tích cấu trúc dữ liệu và tối ưu hiệu năng hệ thống.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-slate-800/50 border border-emerald-200/80 dark:border-white/5 flex items-start gap-3">
            <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-xs shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">EQ • Trí Tuệ Cảm Xúc & Teamwork</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                Thấu cảm, giải quyết mâu thuẫn bất đồng quan điểm và phản hồi mang tính xây dựng.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-lime-50/70 dark:bg-slate-800/50 border border-lime-200/80 dark:border-white/5 flex items-start gap-3">
            <div className="p-2 bg-lime-500 text-slate-950 rounded-xl shadow-xs shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">AQ • Sức Bền & Vượt Khó (Adversity)</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                Khả năng giữ bình tĩnh, ra quyết định sáng suốt và phục hồi khi dự án gặp sự cố nghiêm trọng.
              </p>
            </div>
          </div>
        </div>

        {/* Comprehensive Test Selector Grid (No fragmented individual tests) */}
        <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-indigo-600" />
                Danh Sách Bài Test Toàn Diện (4-in-1: Chuyên Môn + IQ + EQ + AQ):
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Mỗi bài test tích hợp trọn vẹn cả 4 chỉ số để đánh giá toàn diện một ứng viên trước khi phỏng vấn.
              </p>
            </div>

            {/* Candidate Selector */}
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 px-3 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-600 whitespace-nowrap font-bold">
                Ứng viên làm bài:
              </span>
              <select
                value={activeCandidateId}
                onChange={(e) => setActiveCandidateId(e.target.value)}
                className="bg-white text-slate-900 text-xs rounded-xl px-3 py-1.5 border border-slate-300 focus:outline-none font-bold shadow-2xs cursor-pointer"
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id} className="bg-white text-slate-900">
                    {c.name} {c.testResult ? `(Đã làm: ${c.testResult.score}%)` : '(Chưa làm test)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Test Cards Grid - Wraps cleanly without cutoffs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {testList.map((t) => {
              const isSelected = selectedTestId === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTestId(t.id);
                    setIsTakingQuiz(false);
                    setQuizSubmitted(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-400 shadow-sm ring-1 ring-indigo-400'
                      : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-lime-400/25 text-lime-900 border border-lime-400/60 uppercase">
                        Combo 4-in-1
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {t.durationMinutes} phút • {t.questions.length} câu
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-2">
                      {t.testTitle}
                    </h4>
                  </div>

                  {/* 4 Dimension Chips */}
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-200/80">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      ⚡ Kỹ thuật
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      🧠 IQ Logic
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      💛 EQ Cảm xúc
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-lime-50 text-lime-800 border border-lime-300">
                      🛡️ AQ Áp lực
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* QUIZ INTERACTIVE VIEW OR TEST OVERVIEW */}
      {isTakingQuiz ? (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 bg-white/95 dark:bg-slate-900/80 space-y-6">
          {/* Quiz Top bar: Title, Question counter, Timer */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
            <div>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                {currentTest?.testTitle}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Ứng viên thực hiện: {activeCandidate?.name} ({activeCandidate?.appliedJobTitle})
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glass-card border border-amber-300 dark:border-amber-500/30 text-xs font-mono font-bold text-amber-700 dark:text-amber-300 shadow-xs">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>{formatTime(timerSeconds)}</span>
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="btn-emerald px-4 py-2 rounded-xl text-white text-xs font-bold cursor-pointer"
                >
                  Nộp bài test
                </button>
              ) : (
                <button
                  onClick={handleStartQuiz}
                  className="btn-secondary px-4 py-2 rounded-xl text-slate-800 dark:text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Làm lại bài
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Box if submitted */}
          {quizSubmitted && calculatedResult && (
            <div className="p-6 rounded-2xl glass-card border border-indigo-200 dark:border-indigo-500/40 text-slate-900 dark:text-white space-y-4 bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/60 dark:from-indigo-950/40 dark:to-slate-900/60 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Bài thi đã được AI chấm điểm và đồng bộ vào hồ sơ ứng viên trên ATS</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black mt-1 tracking-tight text-slate-900 dark:text-white">
                    Điểm Tổng Hợp: <span className={calculatedResult.passed ? 'text-emerald-600' : 'text-rose-600'}>{calculatedResult.score}%</span>{' '}
                    <span className="text-base font-bold text-slate-600 dark:text-slate-300">
                      ({calculatedResult.passed ? 'ĐẠT TIÊU CHUẨN' : 'CHƯA ĐẠT TIÊU CHUẨN'})
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Số câu chính xác: {calculatedResult.correctAnswers}/{calculatedResult.totalQuestions} • Thời gian hoàn thành: {calculatedResult.timeSpentMinutes} phút
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onOpenEmailModal(activeCandidate)}
                    className="btn-primary px-4 py-2.5 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi kết quả qua Email cho ứng viên</span>
                  </button>
                </div>
              </div>

              {/* Multi-dimensional breakdown cards: IQ, EQ, AQ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-200">IQ (Logic & Phân tích)</span>
                    <span className="text-base font-black text-blue-700 dark:text-blue-300">{calculatedResult.iqScore || 90}%</span>
                  </div>
                  <p className="text-[11px] text-blue-800 dark:text-blue-300 mt-1">
                    Tư duy logic nhạy bén, nhận diện quy luật giải thuật tối ưu.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">EQ (Trí tuệ cảm xúc)</span>
                    <span className="text-base font-black text-emerald-700 dark:text-emerald-300">{calculatedResult.eqScore || 85}%</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-1">
                    Lắng nghe thấu cảm, giải quyết mâu thuẫn đội ngũ ôn hòa.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-lime-50 dark:bg-lime-900/30 border border-lime-200 dark:border-lime-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-lime-950 dark:text-lime-200">AQ (Vượt khó & Áp lực)</span>
                    <span className="text-base font-black text-lime-800 dark:text-lime-300">{calculatedResult.aqScore || 88}%</span>
                  </div>
                  <p className="text-[11px] text-lime-900 dark:text-lime-300 mt-1">
                    Bình tĩnh khi dự án gặp sự cố, linh hoạt thích ứng khi đổi hướng.
                  </p>
                </div>
              </div>

              {/* Topic breakdown badges */}
              <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-4 text-xs">
                {calculatedResult.breakdown.map((item) => (
                  <div key={item.topic} className="flex items-center gap-1.5">
                    <span className="text-slate-500 dark:text-slate-400">{item.topic}:</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{item.score}%</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question List */}
          <div className="space-y-6">
            {currentTest?.questions.map((q, qIdx) => {
              const selectedOption = selectedAnswers[qIdx];
              const isCorrectAnswer = selectedOption === q.correctIndex;

              return (
                <div
                  key={q.id || qIdx}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    quizSubmitted
                      ? isCorrectAnswer
                        ? 'bg-emerald-50/50 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-500/40'
                        : 'bg-rose-50/50 border-rose-300 dark:bg-rose-950/20 dark:border-rose-500/40'
                      : 'glass-card border-slate-200/90 dark:border-white/10 hover:border-indigo-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        Câu {qIdx + 1} / {currentTest.questions.length}
                      </span>
                      {getDimensionBadge(q.dimension)}
                    </div>
                    {quizSubmitted && (
                      <span
                        className={`font-black text-xs ${
                          isCorrectAnswer ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {isCorrectAnswer ? '✓ Chính xác (+điểm)' : '✗ Chưa chính xác'}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-4 leading-relaxed">
                    {q.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOption === optIdx;
                      const isThisCorrect = optIdx === q.correctIndex;

                      let optStyle =
                        'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700/60';

                      if (isChosen && !quizSubmitted) {
                        optStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 dark:bg-indigo-900/40 dark:text-white font-semibold shadow-xs';
                      }

                      if (quizSubmitted) {
                        if (isThisCorrect) {
                          optStyle =
                            'bg-emerald-100/80 border-emerald-500 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 font-bold';
                        } else if (isChosen && !isThisCorrect) {
                          optStyle =
                            'bg-rose-100/80 border-rose-500 text-rose-900 dark:bg-rose-900/40 dark:text-rose-200 line-through';
                        }
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all duration-150 cursor-pointer ${optStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-100 dark:bg-black/20 text-slate-700 dark:text-slate-200">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation if submitted */}
                  {quizSubmitted && (
                    <div className="mt-3.5 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Giải thích chuyên gia khảo thí: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Test Overview & Start Card */
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 bg-white/95 dark:bg-slate-900/80">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                Đề thi chuẩn hóa
              </span>
              {currentTest?.testType === 'combo_iq_eq_aq' && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-lime-100 text-lime-900 dark:bg-lime-500/20 dark:text-lime-300 border border-lime-300 dark:border-lime-500/30">
                  ⚡ Tự động gửi trước phỏng vấn
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {currentTest?.testTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentTest?.description ||
                'Bộ câu hỏi trắc nghiệm tình huống và tư duy logic giúp sàng lọc năng lực ứng viên toàn diện trước khi vào vòng phỏng vấn chuyên sâu.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 dark:border-white/5">
                <span className="text-xs text-slate-500 dark:text-slate-400">Thời gian làm</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {currentTest?.durationMinutes} phút
                </p>
              </div>
              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 dark:border-white/5">
                <span className="text-xs text-slate-500 dark:text-slate-400">Số lượng câu hỏi</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {currentTest?.questions.length} câu trắc nghiệm
                </p>
              </div>
              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 dark:border-white/5">
                <span className="text-xs text-slate-500 dark:text-slate-400">Điểm đạt chuẩn</span>
                <p className="text-sm font-bold text-emerald-600 mt-0.5">
                  &ge; {currentTest?.passingScore}%
                </p>
              </div>
              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/90 dark:border-white/5">
                <span className="text-xs text-slate-500 dark:text-slate-400">Chỉ số đánh giá</span>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {currentTest?.testType === 'combo_iq_eq_aq' ? 'IQ + EQ + AQ' : 'Chuyên môn'}
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleStartQuiz}
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Bắt Đầu Làm Bài Test Trực Tiếp</span>
              </button>

              <button
                onClick={() => onOpenEmailModal(activeCandidate)}
                className="btn-secondary inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm cursor-pointer"
              >
                <Send className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Gửi Link Test Cho Ứng Viên Qua Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Auto-Send Status Tracker Drawer / Table */}
      <div className="glass-panel rounded-3xl p-6 shadow-sm border border-slate-200/90 bg-white/95 dark:bg-slate-900/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              Bảng Theo Dõi Trạng Thái Gửi Bài Test Tự Động Cho Ứng Viên
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Danh sách ứng viên được hệ thống tự động gán và gửi bài test IQ + EQ + AQ trước phỏng vấn
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Chế độ tự động:
            </span>
            <button
              onClick={() => setAutoSendEnabled(!autoSendEnabled)}
              className={`px-3 py-1 rounded-full text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                autoSendEnabled
                  ? 'bg-lime-400 text-slate-950 shadow-xs'
                  : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              <Zap className="w-3 h-3 fill-current" />
              <span>{autoSendEnabled ? 'BẬT (Tự gửi khi đạt CV)' : 'TẮT'}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Ứng viên</th>
                <th className="py-2.5 px-3 font-semibold">Vị trí ứng tuyển</th>
                <th className="py-2.5 px-3 font-semibold">Bài test đã gửi</th>
                <th className="py-2.5 px-3 font-semibold text-center">Trạng thái làm bài</th>
                <th className="py-2.5 px-3 font-semibold text-center">Chỉ số IQ/EQ/AQ</th>
                <th className="py-2.5 px-3 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {candidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={cand.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                        alt={cand.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{cand.name}</div>
                        <div className="text-[10px] text-slate-400">{cand.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-300">
                    {cand.appliedJobTitle}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                    {cand.autoSentTestTitle || 'Combo IQ + EQ + AQ Toàn Diện'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {cand.testResult ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                        ✓ Đã hoàn thành ({cand.testResult.score}%)
                      </span>
                    ) : cand.assessmentStatus === 'auto_sent' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
                        ⏳ Đã tự gửi link (Chờ nộp)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        Chưa gửi
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {(cand.iqScore || cand.eqScore || cand.aqScore) ? (
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold">
                        <span className="text-blue-700 dark:text-blue-300">IQ: {cand.iqScore || 90}</span> •{' '}
                        <span className="text-emerald-700 dark:text-emerald-300">EQ: {cand.eqScore || 85}</span> •{' '}
                        <span className="text-lime-800 dark:text-lime-300">AQ: {cand.aqScore || 88}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Chưa có dữ liệu</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onOpenEmailModal(cand)}
                      className="px-2.5 py-1 rounded-lg btn-secondary text-[11px] font-semibold cursor-pointer"
                    >
                      Gửi link test
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Auto-Send Confirmation Modal */}
      {showAutoSendModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="glass-panel border border-slate-200 dark:border-indigo-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-slate-900 dark:text-slate-100 space-y-4 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-lime-600" />
                Cấu Hình Tự Động Gửi Trước Bài Test IQ + EQ + AQ
              </h3>
              <button
                onClick={() => setShowAutoSendModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-lime-50 dark:bg-lime-950/30 border border-lime-200 dark:border-lime-500/30 text-xs text-lime-900 dark:text-lime-200 leading-relaxed">
              <strong>Cơ chế tự động hóa:</strong> Khi ứng viên mới nộp CV hoặc đạt chuẩn qua vòng Lọc CV, hệ thống sẽ tự động gửi một email kèm link bài test cá nhân hóa (thời lượng 25 phút). Điểm thi 3 chỉ số IQ, EQ, AQ sẽ lập tức được AI phân tích và đưa vào hồ sơ tuyển dụng.
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSendEnabled}
                  onChange={(e) => setAutoSendEnabled(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Kích hoạt tự động gửi ngay khi ứng viên đạt lọc CV (Khuyên dùng)</span>
              </label>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Mẫu bài test mặc định:
                </label>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200">
                  Combo Đánh Giá Toàn Diện: IQ + EQ + AQ (Tự động gửi trước phỏng vấn)
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowAutoSendModal(false)}
                className="btn-secondary px-4 py-2 text-xs font-medium rounded-xl cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleBulkAutoSendTests}
                className="btn-lime px-5 py-2 text-xs font-bold rounded-xl cursor-pointer shadow-xs"
              >
                Gửi Link Test Cho Tất Cả Ứng Viên Mới
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Generate Test Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="glass-panel border border-slate-200 dark:border-indigo-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-slate-900 dark:text-slate-100 space-y-4 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                Tạo Đề Test Năng Lực Bằng AI
              </h3>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Loại bài test mong muốn:
              </label>
              <select
                value={genTestType}
                onChange={(e) => setGenTestType(e.target.value as any)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold"
              >
                <option value="combo_iq_eq_aq">🧠 Combo Toàn Diện: IQ + EQ + AQ (Khuyên dùng)</option>
                <option value="technical">💻 Kỹ năng Chuyên môn & Kiến trúc kỹ thuật</option>
                <option value="iq">🎯 Chỉ số Thông minh Logic (IQ)</option>
                <option value="eq">🤝 Trí tuệ Cảm xúc & Kỹ năng Đội ngũ (EQ)</option>
                <option value="aq">🛡️ Chỉ số Vượt khó & Ứng biến Khủng hoảng (AQ)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Vị trí tuyển dụng:
              </label>
              <select
                value={genJobTitle}
                onChange={(e) => setGenJobTitle(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.title} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {j.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Cấp bậc:
              </label>
              <select
                value={genLevel}
                onChange={(e) => setGenLevel(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm"
              >
                <option value="Junior">Junior (0 - 2 năm)</option>
                <option value="Middle">Middle (2 - 4 năm)</option>
                <option value="Senior">Senior (4+ năm)</option>
                <option value="Tech Lead / Manager">Tech Lead / Principal Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Lĩnh vực trọng tâm:
              </label>
              <input
                type="text"
                value={genFocus}
                onChange={(e) => setGenFocus(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm"
                placeholder="Logic giải thuật, Trí tuệ cảm xúc EQ, Khả năng chịu áp lực AQ..."
              />
            </div>

            {genError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs">
                {genError}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowGenerateModal(false)}
                className="btn-secondary px-4 py-2 text-xs font-medium rounded-xl cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerateAiTest}
                className="btn-primary inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl text-white cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Đang Soạn Đề Thi Đa Chiều...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Tạo Đề Thi Tức Thì</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
