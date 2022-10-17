export default function StartScreen({ handleStart }) {
    return (
        <div className="start-container">
            <h1 className="ff-primary fw-bold clr-primary start-text">
                Quizzical
            </h1>
            <button
                className="bg-btn ff-secondary fw-medium clr-btn-text start-btn"
                onClick={handleStart}
            >
                Start
            </button>
        </div>
    );
}
