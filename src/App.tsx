import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout'; // Keep Layout for authenticated area
import LoginPage from './pages/LoginPage';
import ClassroomPage from './pages/ClassroomPage';
import LecturePage from './pages/LecturePage';
import QuizPage from './pages/QuizPage'; // Import the new QuizPage

// Simple authentication check placeholder
const isAuthenticated = () => {
  return sessionStorage.getItem('isAuthenticated') === 'true';
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Routes requiring authentication */}
      <Route element={<Layout />}> {/* Wrap protected routes in Layout */}
        <Route
          path="/classroom"
          element={
            <ProtectedRoute>
              <ClassroomPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecture/:lectureId" // Dynamic route for specific lectures
          element={
            <ProtectedRoute>
              <LecturePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecture/:lectureId/quiz" // Nested route for the quiz
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Default route */}
      <Route
        path="/"
        element={isAuthenticated() ? <Navigate to="/classroom" replace /> : <Navigate to="/login" replace />}
      />

      {/* Optional: Add a 404 Not Found route */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;
