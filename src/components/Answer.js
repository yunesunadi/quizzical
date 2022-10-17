export default function Answer(props) {
    const { answers, isCheckedAnswers, chooseAnswer } = props;

    return answers.map(({ value, isSelected, isCorrect }) => {
        const selected = !isCheckedAnswers && isSelected ? "bg-selected" : "";
        const correct = isCheckedAnswers && isCorrect ? "bg-correct" : "";
        const selectedAndCorrect =
            isCheckedAnswers && isCorrect && isSelected ? "bg-correct" : "";
        const selectedAndWrong =
            isCheckedAnswers && !isCorrect && isSelected ? "bg-wrong fade" : "";
        const fade =
            isCheckedAnswers && !isSelected && !isCorrect ? "fade" : "";
        const defaultCursor = isCheckedAnswers ? "default-cursor" : "";

        const classNames = `bg-body ff-secondary fw-medium clr-primary quiz-answer ${selected} ${correct} ${selectedAndCorrect} ${selectedAndWrong}  ${fade} ${defaultCursor}`;

        return (
            <button
                key={value}
                className={classNames}
                onClick={!isCheckedAnswers ? chooseAnswer : undefined}
            >
                {value}
            </button>
        );
    });
}
