import React, { useState } from 'react';
import { Spinner } from './Spinner';
import './BetSlipProcessor.css'

export const BetSlipProcessor = () => {
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
            setBetSlip(currentBetSlip);
        }

        setIsLoading(false);
    };

    function isTargetMet(responseItem: string): boolean {
        if (!responseItem) return false;
        const parts = responseItem.split(', ');
        const targetPart = parts[2];
        const valuePart = parts[3];

        if (!targetPart || !valuePart) return false;

        const targetValue = parseInt(targetPart.split(': ')[1]);
        const actualValue = parseInt(valuePart.split(': ')[1]);

        return actualValue > targetValue;
    }

    return (
        <div>
            {apiError && <p>Error: {apiError}</p>}
            {isLoading && <Spinner />}
            <div className='slip-example'>
                {showPreview && betSlipPreview ? (
                    <>
                        <h3>Example Slip: (NFL/CFB/NHL Only)</h3>
                        <div>David Pastrnak of the Boston Bruins will have over 1.5 points</div>
                        <div>Evan Engram of the Jacksonville Jaguars will have 42 or more receiving yards against the Tennessee T</div>
                        <div>Kyler Murray of the Arizona Cardinals will have 20 or more rushing yards against the Seattle Seahawk</div>
                        <div>Joe Mixon of the Cincinnati Bengals will have 40 or more rushing yards against the Cleveland Browns</div>
                        <div>Michael Penix Jr. of the Washington Huskies will have over 24.5 pass completions</div>
                        <div>J.J. McCarthy of the Michigan Wolverines will have 16 or more pass completions against the Washingto</div>
                        <div>J.J. McCarthy of the Michigan Wolverines will have over 1.5 passing TDs</div>
                    </>
                ) : (
                    <>
                        {/* TODO add button to resubmit slip */}
                        <h3>Submitted Slip: (NFL/CFB/NHL) Only</h3>
                        {betSlipPreview.map((item, index) => (
                            <div>{item}</div>
                        ))}
                    </>
                )}

            </div>
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
                            {/* Displaying the corresponding bet slip item in small text */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                <p style={{ fontSize: '10px', fontStyle: 'italic' }}>{betSlipPreview[index]}:</p>
                                <p style={item ? {} : { fontSize: '12px', color: 'red' }}>
                                    {item ? item : "Unable to process this stat. It may be that the game hasn't started yet, or is too far back in time."}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
