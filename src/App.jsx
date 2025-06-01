import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './Auth/AuthForm';
import MainBackground from './Components/MainBackground';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm/>}/>
        <Route path="/authentication" element={<AuthForm />} />
        <Route path="/mainbackground" element={<MainBackground />} />

      </Routes>
    </Router>
  );
}

export default App;
