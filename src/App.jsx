import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './Auth/AuthForm';
import Dashboard from './Pages/Dashboard';
import TableSearch from './Components/TableSearch'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm/>}/>
        <Route path="/authentication" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tablesearch" element={<TableSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
