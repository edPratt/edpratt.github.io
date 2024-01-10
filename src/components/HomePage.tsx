import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div style={{
      textAlign: 'center', 
      padding: '50px', 
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        marginBottom: '30px', 
        color: '#333' 
      }}>projects/etc. WIP</h1>

      <nav style={{ 
        marginBottom: '20px', 
        display: 'inline-block'
      }}>
        <Link to="http://nts.social/" style={{
          textDecoration: 'none',
          color: '#28a745',
          padding: '10px 15px',
          margin: '5px',
          borderRadius: '5px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #ddd'
        }}>NTS</Link>
      </nav>

      <nav style={{ 
        display: 'inline-block'
      }}>
        <Link to="/prop-parlay-tools" style={{
          textDecoration: 'none',
          color: '#007bff',
          padding: '10px 15px',
          margin: '5px',
          borderRadius: '5px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #ddd'
        }}>Prop Parlay Tool(s)</Link>
      </nav>
    </div>
  );
};
