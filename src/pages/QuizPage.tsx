import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Placeholder O/X Quiz Data
const getQuizData = (lectureId: string | undefined) => {
  console.log("Fetching O/X quiz for lecture:", lectureId);
  // Replace with actual O/X questions based on lectureId
  let questions = [];
  switch (lectureId) {
    case 'react-basics':
      questions = [
        { id: 'q1', text: 'React는 JavaScript 라이브러리이다.', correctAnswer: 'O' },
        { id: 'q2', text: 'Virtual DOM은 실제 DOM보다 항상 빠르다.', correctAnswer: 'X' }, // Generally faster updates, but not *always* faster in every single scenario. Common misconception.
        { id: 'q3', text: 'React 컴포넌트의 이름은 소문자로 시작해야 한다.', correctAnswer: 'X' }, // Must start with uppercase
      ];
      break;
    case 'typescript-intro':
       questions = [
        { id: 'q1', text: 'TypeScript는 Microsoft가 개발했다.', correctAnswer: 'O' },
        { id: 'q2', text: 'TypeScript 파일은 브라우저에서 직접 실행될 수 있다.', correctAnswer: 'X' }, // Needs compilation to JS
        { id: 'q3', text: '`any` 타입을 사용하면 TypeScript의 장점을 살릴 수 있다.', correctAnswer: 'X' }, // Should be avoided
      ];
      break;
    // Add cases for other lecture IDs
    default:
      questions = [ // Default fallback questions
        { id: 'q1', text: '지구는 둥글다.', correctAnswer: 'O' },
        { id: 'q2', text: '물은 H3O이다.', correctAnswer: 'X' },
        { id: 'q3', text: '1 + 1 = 3 이다.', correctAnswer: 'X' },
      ];
  }

  return {
    title: `"${lectureId}" 강의 O/X 퀴즈`,
    questions: questions
  };
};

// Helper function to mark lecture as complete (remains the same)
const markLectureComplete = (lectureId: string | undefined) => {
  if (lectureId) {
    try {
      localStorage.setItem(`lecture-${lectureId}-completed`, 'true');
      console.log(`Lecture ${lectureId} marked as complete in localStorage.`);
    } catch (error) {
      console.error("Failed to save completion status to localStorage:", error);
    }
  }
};

const QuizPage: React.FC = () => {
  const { lectureId } = useParams<{ lectureId: string }>();
  const navigate = useNavigate();
  const quiz = getQuizData(lectureId);
  // Store answers as 'O' or 'X'
  const [answers, setAnswers] = useState<{ [key: string]: 'O' | 'X' | null }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  // Initialize answers state
  useEffect(() => {
    const initialAnswers: { [key: string]: 'O' | 'X' | null } = {};
    quiz.questions.forEach(q => {
      initialAnswers[q.id] = null;
    });
    setAnswers(initialAnswers);
    setSubmitted(false); // Reset submission status on lecture change
    setScore(null);      // Reset score on lecture change
  }, [lectureId, quiz.questions]); // Depend on lectureId and questions

  const handleAnswerSelect = (questionId: string, answer: 'O' | 'X') => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if all questions have been answered (not null)
    if (Object.values(answers).some(ans => ans === null)) {
      alert('모든 질문에 답해주세요.');
      return;
    }

    let correctCount = 0;
    quiz.questions.forEach(q => {
      // Ensure comparison is between 'O'/'X' strings
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = (correctCount / quiz.questions.length) * 100;
    setScore(calculatedScore);
    setSubmitted(true);

    if (calculatedScore === 100) {
      console.log(`Lecture ${lectureId} completed!`);
      markLectureComplete(lectureId);
      alert(`퀴즈 통과! ${correctCount}/${quiz.questions.length}개 정답입니다. 강의 수강이 완료되었습니다.`);
    } else {
       alert(`퀴즈 실패. ${correctCount}/${quiz.questions.length}개 정답입니다. 다시 시도해주세요.`);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-6">
        <Link to={`/lecture/${lectureId}`} className="text-sm text-primary-600 hover:underline">
          &larr; 강의로 돌아가기
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-8 text-center">
        {quiz.title}
      </h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8">
          {quiz.questions.map((q, index) => (
            <div key={q.id} className="border-b border-secondary-200 pb-6 last:border-b-0">
              <p className="text-lg font-semibold text-secondary-800 mb-4">
                {index + 1}. {q.text}
              </p>
              <div className="flex justify-center space-x-4">
                {/* O Button */}
                <button
                  type="button" // Prevent form submission on button click
                  onClick={() => handleAnswerSelect(q.id, 'O')}
                  className={`px-8 py-3 rounded-full border-2 text-xl font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${answers[q.id] === 'O'
                      ? 'bg-blue-500 border-blue-600 text-white focus:ring-blue-400'
                      : 'bg-white border-blue-400 text-blue-500 hover:bg-blue-50 focus:ring-blue-400'
                    }`}
                >
                  O
                </button>
                {/* X Button */}
                <button
                  type="button" // Prevent form submission on button click
                  onClick={() => handleAnswerSelect(q.id, 'X')}
                  className={`px-8 py-3 rounded-full border-2 text-xl font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${answers[q.id] === 'X'
                      ? 'bg-red-500 border-red-600 text-white focus:ring-red-400'
                      : 'bg-white border-red-400 text-red-500 hover:bg-red-50 focus:ring-red-400'
                    }`}
                >
                  X
                </button>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full btn btn-primary py-3 text-lg rounded-lg mt-8"
          >
            제출하기
          </button>
        </form>
      ) : (
        // Results Display (remains largely the same)
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">퀴즈 결과</h2>
          {score !== null && (
             <p className={`text-xl font-semibold mb-6 ${score === 100 ? 'text-green-600' : 'text-red-600'}`}>
               점수: {score.toFixed(0)}% ({quiz.questions.filter(q => answers[q.id] === q.correctAnswer).length} / {quiz.questions.length})
             </p>
          )}
          {score === 100 ? (
            <p className="text-green-700 mb-6">축하합니다! 퀴즈를 통과하여 강의 수강을 완료했습니다.</p>
          ) : (
            <p className="text-red-700 mb-6">아쉽지만 퀴즈를 통과하지 못했습니다. 강의 내용을 다시 확인하고 재응시해주세요.</p>
          )}
           <div className="flex justify-center gap-4 mt-6">
             <button
               onClick={() => {
                 // Reset state for retry
                 const initialAnswers: { [key: string]: 'O' | 'X' | null } = {};
                 quiz.questions.forEach(q => { initialAnswers[q.id] = null; });
                 setAnswers(initialAnswers);
                 setSubmitted(false);
                 setScore(null);
               }}
               className="btn btn-secondary"
             >
               다시 풀기
             </button>
             <Link to="/classroom" className="btn btn-primary">
               강의 목록으로
             </Link>
           </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
