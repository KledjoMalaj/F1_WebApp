import './ResultPupUp.css'
function ResultPupUp({ results, onClose, times , number, points, positions, constructors,}) {
    return (
        <div className="ResultPupUp-container">
        <div className="BigDady">
            <div className="Card">
            <div className="input">
                <a>Results</a>
            <button onClick={onClose} style={{ float: 'right', cursor: 'pointer' }}>
                Close
            </button>
            </div>
            <div className="heading1">
                <li>Position</li>
                <li>Driver</li>
                <li>Number</li>
                <li>Times</li>
                <li>Points</li>
                <li>Constructors</li>
            </div>

            <div className="Lists">
            <li className="positions" >
                {positions && positions.map((position, index) => (
                    <li key={index}>{position}</li>
                ))}
            </li>
            <li className="driver">
                {results && results.map((driver, index) => (
                    <li key={index}>{driver}</li>
                ))}
            </li>
            <li className="number">
                {number && number.map((number, index) => (
                    <li key={index}>{number}</li>
                ))}
            </li>
            <li className="time">
            {times && times.map((time, index) => (
                <li key={index}>{time}</li>
            ))}
            </li>
            <li className="points">
                {points && points.map((points, index) => (
                    <li key={index}>{points}</li>
                ))}
            </li>
            <li className="constructors">
                {constructors && constructors.map((constructor, index) => (
                    <li key={index}>{constructor}</li>
                ))}
            </li>
            </div>

            </div>
        </div>
        </div>
    );
}

export default ResultPupUp;
