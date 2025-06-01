import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './Auth/AuthForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/authentication" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

export default App;
