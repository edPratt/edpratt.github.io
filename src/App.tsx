import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Routes
import { BetSlipProcessor } from './components/BetSlipProcessor';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/betslip">Go to Bet Slip</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/betslip" element={<BetSlipProcessor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
