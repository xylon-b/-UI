import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Find lecture data based on ID (replace with actual data fetching later)
const getLectureData = (id: string | undefined) => {
    const lectures = [
        { id: 'react-basics', title: 'React 기초 다지기', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }, // Placeholder video
        { id: 'typescript-intro', title: 'TypeScript 입문', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 'tailwind-css', title: 'Tailwind CSS 마스터', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 'state-management', title: '상태 관리 전략', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ];
    return lectures.find(l => l.id === id);
}

const LecturePage: React.FC = () => {
  const { lectureId } = useParams<{ lectureId: string }>(); // Get lectureId from URL
  const lecture = getLectureData(lectureId);

  if (!lecture) {
    return (
        <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">강의를 찾을 수 없습니다.</h1>
            <Link to="/classroom" className="text-primary-600 hover:underline">
                강의 목록으로 돌아가기
            </Link>
        </div>
    );
  }

  // TODO: Add logic to show quiz button only after video completion
  const showQuizButton = true; // Placeholder: Always show for now

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-6">
        <Link to="/classroom" className="text-sm text-primary-600 hover:underline">
          &larr; 강의 목록으로 돌아가기
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
        {lecture.title}
      </h1>

      {/* Video Player Area */}
      <div className="aspect-video bg-secondary-200 rounded-lg overflow-hidden shadow-lg mb-8">
        {/* Replace with a proper video player component later (e.g., react-player) */}
        <video
            key={lecture.videoUrl} // Add key to force re-render on URL change
            controls
            width="100%"
            className="w-full h-full object-cover"
            // onEnded={() => setShowQuizButton(true)} // Example: Event to trigger button visibility
        >
            <source src={lecture.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      </div>

      {/* Lecture Info */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">강의 정보</h2>
        <p className="text-secondary-700 mb-6">
            이 강의에서는 {lecture.title}에 대해 학습합니다. 비디오 시청을 완료하고 퀴즈를 풀어 학습을 완료하세요.
        </p>

        {/* Quiz Button Area */}
        {showQuizButton && (
          <div className="mt-6 text-center">
            <Link
              to={`/lecture/${lectureId}/quiz`} // Link to the quiz page for this lecture
              className="btn btn-primary px-8 py-3 text-lg rounded-lg"
            >
              퀴즈 풀러가기
            </Link>
          </div>
        )}
      </div>

      {/* Optional: Add resources, Q&A section below */}
      {/* <div className="mt-8"> ... </div> */}
    </div>
  );
};

export default LecturePage;
