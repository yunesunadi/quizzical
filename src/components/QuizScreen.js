export default function QuizScreen(props) {
    const {
        isLoading,
        quizElements,
        isCheckedAnswers,
        handleCheckedAnswers,
        isDisabled,
        countCorrectAnswers,
        playAgain,
    } = props;

    return (
        <div className="quiz-container">
            {isLoading && <p className="quiz-loading">Loading...</p>}
            {!isLoading && quizElements}
            {!isLoading && !isCheckedAnswers && (
                <button
                    className={`bg-btn ff-secondary fw-semi-bold clr-btn-text quiz-btn quiz-btn-check ${
                        isDisabled ? "fade disable-cursor" : ""
                    }`}
                    onClick={handleCheckedAnswers}
                    disabled={isDisabled}
                >
                    Check Answers
                </button>
            )}
            {isCheckedAnswers && (
                <div className="quiz-info">
                    <p className="ff-secondary fw-bold clr-primary quiz-score">
                        You scored {countCorrectAnswers()}/5 correct answers.
                    </p>
                    <button
                        className="bg-btn ff-secondary fw-semi-bold clr-btn-text quiz-btn quiz-btn-play"
                        onClick={playAgain}
                    >
                        Play again
                    </button>
                </div>
            )}
        </div>
    );
}
