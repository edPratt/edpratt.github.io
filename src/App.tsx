import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BetSlipProcessor } from './components/BetSlipProcessor';
import { HomePage } from './components/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <p style={{ fontStyle: 'italic' }}>epsolo.xyz</p>
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prop-parlay-tools" element={<BetSlipProcessor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
