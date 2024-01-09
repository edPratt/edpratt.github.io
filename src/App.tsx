import React, { useState } from 'react';
import Spinner from './Spinner';

import './App.css';

function App() {
  const [betSlip, setBetSlip] = useState<string>('');
  const [betSlipPreview, setBetSlipPreview] = useState<string[]>([]);
  const [apiResponse, setApiResponse] = useState<string[]>([]); // Assuming API response is an array of strings, TODO change, parse string on frontend send strcutre to backend, get back structured data
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError('');
    setIsLoading(true);

    const currentBetSlip = betSlip;
    setBetSlipPreview(currentBetSlip.split(/\r?\n/));
    setShowPreview(false);
    setBetSlip('');

    try {
      const apiEndpoint = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiEndpoint}/parse-betslip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bet_slip: currentBetSlip })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApiResponse(data); // Set the response
    } catch (error: any) {
      console.error('Error fetching data: ', error);
      setApiError('Error fetching data: ' + error.message);

      // Optionally, restore the betSlip state if there's an error
      setBetSlip(currentBetSlip);
    }

    setIsLoading(false);
  };

  function isTargetMet(responseItem: string): boolean {
    const parts = responseItem.split(', ');
    const targetPart = parts[2]; // "Target: X"
    const valuePart = parts[3]; // "Value: Y"

    const targetValue = parseInt(targetPart.split(': ')[1]);
    const actualValue = parseInt(valuePart.split(': ')[1]);

    return actualValue > targetValue;
  }

  return (
    <div className="App">
      <header className="App-header">
        {apiError && <p>Error: {apiError}</p>}
        {isLoading && <Spinner />} {/* Display spinner when loading */}
      </header>
      <div className='slip-example'>
        {showPreview && betSlipPreview ? (
          <>
            <h3>Example Slip:</h3>
            <div>Chigoziem Okonkwo of the Tennessee Titans will have 27 or more receiving yards against the Jacksonvi</div>
            <div>Evan Engram of the Jacksonville Jaguars will have 42 or more receiving yards against the Tennessee T</div>
            <div>Kyler Murray of the Arizona Cardinals will have 20 or more rushing yards against the Seattle Seahawk</div>
            <div>Joe Mixon of the Cincinnati Bengals will have 40 or more rushing yards against the Cleveland Browns</div>
            <div>Trevor Lawrence of the Jacksonville Jaguars will have 224 or more passing yards against the Tennesse</div>
            <div>Jared Goff of the Detroit Lions will have 211 or more passing yards against the Minnesota Vikings</div>
            <div>Baker Mayfield of the Tampa Bay Buccaneers will have over 221.5 passing yards</div>
            <div>Trevor Lawrence of the Jacksonville Jaguars will have 20 or more pass completions against the Tennes</div>
            <div>Baker Mayfield of the Tampa Bay Buccaneers will have 19 or more pass completions against the Carolin </div>
          </>
        ) : (
          <>
            {/* TODO add button to resubmit slip */}
            <h3>Submitted Slip:</h3>
            {betSlipPreview.map((item, index) => (
              <div>{item}</div>
            ))}
          </>
        )}

      </div>

      <div></div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={betSlip}
          onChange={(e) => setBetSlip(e.target.value)}
          placeholder="Paste your bet slip here"
          rows={10}
          cols={50}
        />
        <button type="submit">Submit Bet Slip</button>
      </form>
      {apiResponse.length > 0 && (
        <div className="response-container">
          {apiResponse.map((item, index) => (
            <div className={`response-card ${isTargetMet(item) ? 'success' : 'failure'}`} key={index}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
