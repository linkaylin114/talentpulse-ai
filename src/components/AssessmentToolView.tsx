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
  BookOpen,
} from 'lucide-react';
import { AssessmentTest, Candidate, Job, CandidateTestResult } from '../types/recruitment';

interface AssessmentToolViewProps {
  tests: AssessmentTest[];
  candidates: Candidate[];
  jobs: Job[];
  onSaveTestResult: (candidateId: string, testResult: CandidateTestResult) => void;
  onOpenEmailModal: (candidate: Candidate) => void;
  onAddNewTest: (newTest: AssessmentTest) => void;
}

export const AssessmentToolView: React.FC<AssessmentToolViewProps> = ({
  tests,
  candidates,
  jobs,
  onSaveTestResult,
  onOpenEmailModal,
  onAddNewTest,
}) => {
  const [testList, setTestList] = useState<AssessmentTest[]>(tests);
  const [selectedTestId, setSelectedTestId] = useState<string>(tests[0]?.id || '');
  const [activeCandidateId, setActiveCandidateId] = useState<string>(candidates[0]?.id || '');

  // Quiz taking state
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [timerSeconds, setTimerSeconds] = useState(20 * 60);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<CandidateTestResult | null>(null);

  // AI test generator modal state
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genJobTitle, setGenJobTitle] = useState(jobs[0]?.title || '');
  const [genLevel, setGenLevel] = useState('Senior');
  const [genFocus, setGenFocus] = useState('Kiến trúc hệ thống, Performance, Case study thực tế');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const currentTest = testList.find((t) => t.id === selectedTestId) || testList[0];
  const activeCandidate = candidates.find((c) => c.id === activeCandidateId) || candidates[0];

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
    setTimerSeconds((currentTest?.durationMinutes || 20) * 60);
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
    const answersBreakdown: any[] = [];

    currentTest.questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;

      if (!topicScores[q.topic]) {
        topicScores[q.topic] = { correct: 0, total: 0 };
      }
      topicScores[q.topic].total += 1;
      if (isCorrect) topicScores[q.topic].correct += 1;

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

    const result: CandidateTestResult = {
      testId: currentTest.id,
      score: scorePercentage,
      passed,
      completedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      correctAnswers: correctCount,
      totalQuestions: currentTest.questions.length,
      timeSpentMinutes: Math.round(
        (currentTest.durationMinutes * 60 - timerSeconds) / 60
      ),
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
      const response = await fetch('/api/gemini/generate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: genJobTitle,
          level: genLevel,
          focusAreas: genFocus,
          numQuestions: 5,
        }),
      });

      const data = await response.json();
      if (!data.success || !data.test) {
        throw new Error(data.error || 'Lỗi khi tạo bài test');
      }

      const newTest: AssessmentTest = {
        id: `test-ai-${Date.now()}`,
        jobId: jobs.find((j) => j.title === genJobTitle)?.id || 'job-custom',
        testTitle: data.test.testTitle || `Bài Test Năng Lực ${genJobTitle}`,
        durationMinutes: data.test.durationMinutes || 20,
        passingScore: data.test.passingScore || 75,
        questions: data.test.questions,
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

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-violet-600/20 text-violet-400 rounded-xl border border-violet-500/30">
                <FileCheck2 className="w-5 h-5 text-violet-300" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Công Cụ Test Năng Lực Trực Tuyến & Chấm Điểm Tự Động
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Khảo sát kỹ năng chuyên môn ứng viên, tạo đề thi tự động bằng AI từ JD, chấm điểm tức thì và đồng bộ vào hồ sơ ATS.
            </p>
          </div>

          <button
            onClick={() => setShowGenerateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-violet-600/30 transition cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Tạo Bài Test Mới Bằng AI</span>
          </button>
        </div>

        {/* Test Selector Tabs & Candidate Select */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {testList.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTestId(t.id);
                  setIsTakingQuiz(false);
                  setQuizSubmitted(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedTestId === t.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.testTitle}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Ứng viên làm bài:</span>
            <select
              value={activeCandidateId}
              onChange={(e) => setActiveCandidateId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.testResult ? `(Đã thi: ${c.testResult.score}%)` : '(Chưa thi)'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* QUIZ INTERACTIVE VIEW OR TEST OVERVIEW */}
      {isTakingQuiz ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Quiz Top bar: Title, Question counter, Timer */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-violet-400 font-semibold uppercase">
                {currentTest?.testTitle}
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Ứng viên: {activeCandidate?.name}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-amber-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{formatTime(timerSeconds)}</span>
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Nộp bài test
                </button>
              ) : (
                <button
                  onClick={handleStartQuiz}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Làm lại bài
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Box if submitted */}
          {quizSubmitted && calculatedResult && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-indigo-500/30 text-white space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Bài thi đã được chấm điểm tự động và lưu vào ATS</span>
                  </div>
                  <h4 className="text-xl font-bold mt-1">
                    Kết quả: {calculatedResult.score}% (
                    {calculatedResult.passed ? 'ĐẠT TIÊU CHUẨN' : 'CHƯA ĐẠT'})
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Số câu đúng: {calculatedResult.correctAnswers}/{calculatedResult.totalQuestions} • Thời gian hoàn thành: {calculatedResult.timeSpentMinutes} phút
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onOpenEmailModal(activeCandidate)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi kết quả qua Email</span>
                  </button>
                </div>
              </div>

              {/* Breakdown per topic */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-4 text-xs">
                {calculatedResult.breakdown.map((item) => (
                  <div key={item.topic} className="flex items-center gap-1.5">
                    <span className="text-slate-400">{item.topic}:</span>
                    <strong className="text-white">{item.score}%</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question List or Navigator */}
          <div className="space-y-6">
            {currentTest?.questions.map((q, qIdx) => {
              const selectedOption = selectedAnswers[qIdx];
              const isCorrectAnswer = selectedOption === q.correctIndex;

              return (
                <div
                  key={q.id || qIdx}
                  className={`p-5 rounded-2xl border transition ${
                    quizSubmitted
                      ? isCorrectAnswer
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-rose-950/20 border-rose-500/40'
                      : 'bg-slate-800/40 border-slate-700/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-indigo-400">
                      Câu {qIdx + 1} / {currentTest.questions.length} • {q.topic}
                    </span>
                    {quizSubmitted && (
                      <span
                        className={`font-bold ${
                          isCorrectAnswer ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isCorrectAnswer ? '✓ Chính xác (+20đ)' : '✗ Sai'}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-semibold text-white mb-4 leading-relaxed">
                    {q.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOption === optIdx;
                      const isThisCorrect = optIdx === q.correctIndex;

                      let optStyle =
                        'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700';

                      if (isChosen && !quizSubmitted) {
                        optStyle = 'bg-violet-600/30 border-violet-500 text-white font-medium';
                      }

                      if (quizSubmitted) {
                        if (isThisCorrect) {
                          optStyle =
                            'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-semibold';
                        } else if (isChosen && !isThisCorrect) {
                          optStyle =
                            'bg-rose-500/20 border-rose-500/50 text-rose-200 line-through';
                        }
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition cursor-pointer ${optStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation if submitted */}
                  {quizSubmitted && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-indigo-300">Giải thích chi tiết: </strong>
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
              Đề thi năng lực chuẩn hóa
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {currentTest?.testTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bộ câu hỏi kiểm tra kỹ năng thực chiến, tư duy kiến trúc và khả năng xử lý tình huống
              trong môi trường doanh nghiệp thực tế.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-xs text-slate-400">Thời gian làm bài</span>
                <p className="text-sm font-bold text-white mt-0.5">
                  {currentTest?.durationMinutes} phút
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-xs text-slate-400">Số lượng câu hỏi</span>
                <p className="text-sm font-bold text-white mt-0.5">
                  {currentTest?.questions.length} câu trắc nghiệm
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-xs text-slate-400">Điểm đạt chuẩn</span>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">
                  &gt;= {currentTest?.passingScore}%
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleStartQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-violet-600/30 transition cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Bắt Đầu Làm Bài Test Trực Tiếp</span>
              </button>

              <button
                onClick={() => onOpenEmailModal(activeCandidate)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition cursor-pointer"
              >
                <Send className="w-4 h-4 text-violet-400" />
                <span>Gửi Link Test Cho Ứng Viên Qua Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Generate Test Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                Tạo Đề Test Năng Lực Bằng AI
              </h3>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Vị trí tuyển dụng:
              </label>
              <select
                value={genJobTitle}
                onChange={(e) => setGenJobTitle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.title}>
                    {j.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Cấp bậc mong muốn:
              </label>
              <select
                value={genLevel}
                onChange={(e) => setGenLevel(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white"
              >
                <option value="Junior">Junior (0 - 2 năm)</option>
                <option value="Middle">Middle (2 - 4 năm)</option>
                <option value="Senior">Senior (4+ năm)</option>
                <option value="Tech Lead / Manager">Tech Lead / Principal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Lĩnh vực trọng tâm:
              </label>
              <input
                type="text"
                value={genFocus}
                onChange={(e) => setGenFocus(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white"
                placeholder="Kiến trúc hệ thống, Concurrency, Tối ưu hiệu năng..."
              />
            </div>

            {genError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {genError}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowGenerateModal(false)}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerateAiTest}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-violet-600 hover:bg-violet-700 text-white shadow-lg disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Đang Soạn Đề Thi...</span>
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
