import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import { Link } from 'react-router-dom';

// Placeholder data for lectures
const initialLectures = [
  { id: 'react-basics', title: 'React 기초 다지기', description: 'React의 기본 개념과 Hooks 사용법을 배웁니다.', completed: false },
  { id: 'typescript-intro', title: 'TypeScript 입문', description: '정적 타입을 활용한 안정적인 코드 작성을 시작합니다.', completed: false },
  { id: 'tailwind-css', title: 'Tailwind CSS 마스터', description: '유틸리티 우선 CSS 프레임워크 활용법을 익힙니다.', completed: false },
  { id: 'state-management', title: '상태 관리 전략', description: '다양한 React 상태 관리 라이브러리를 비교 분석합니다.', completed: false },
];

// Helper function to check completion status from localStorage
const checkCompletionStatus = (lectureId: string): boolean => {
  try {
    return localStorage.getItem(`lecture-${lectureId}-completed`) === 'true';
  } catch (error) {
    console.error("Failed to read completion status from localStorage:", error);
    return false; // Assume not completed if storage fails
  }
};

const ClassroomPage: React.FC = () => {
  // State to hold lectures with their completion status
  const [lectures, setLectures] = useState(initialLectures);

  // useEffect to check completion status when the component mounts or updates
  // This ensures the status is fresh if the user navigates back after completing a quiz
  useEffect(() => {
    const updatedLectures = initialLectures.map(lecture => ({
      ...lecture,
      completed: checkCompletionStatus(lecture.id)
    }));
    setLectures(updatedLectures);
  }, []); // Empty dependency array means this runs once on mount
          // In a real app with state management, dependencies might change

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-8">
        📚 My 강의실
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <div key={lecture.id} className={`relative p-6 bg-white rounded-lg shadow-md border border-secondary-100 ${lecture.completed ? 'opacity-70 bg-secondary-50' : 'hover:shadow-lg hover:border-primary-300 transition-shadow duration-300'}`}>
            {lecture.completed && (
              <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                수강완료
              </span>
            )}
            <Link
              to={`/lecture/${lecture.id}`}
              className={`block ${lecture.completed ? 'pointer-events-none' : ''}`} // Disable link if completed? Optional.
            >
              <h2 className="text-xl font-semibold text-primary-700 mb-2">{lecture.title}</h2>
              <p className="text-secondary-600 text-sm mb-4">{lecture.description}</p>
              {!lecture.completed && (
                <span className="inline-block text-sm font-medium text-primary-600 hover:text-primary-800">
                  강의 시청하기 &rarr;
                </span>
              )}
            </Link>
             {/* Optionally show a different message or button if completed */}
             {lecture.completed && (
                <p className="text-sm text-green-700 font-medium mt-4">
                  ✓ 학습 완료!
                </p>
             )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassroomPage;
