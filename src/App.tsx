import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { BetSlipProcessor } from './components/BetSlipProcessor';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/betslip" element={<BetSlipProcessor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
