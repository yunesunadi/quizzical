import Answer from "./Answer";
import Question from "./Question";

export default function Quiz(props) {
    const { question, answers, chooseAnswer, isCheckedAnswers } = props;

    return (
        <div className="quiz-item">
            <Question question={question} />
            <div className="quiz-answers">
                <Answer
                    answers={answers}
                    isCheckedAnswers={isCheckedAnswers}
                    chooseAnswer={chooseAnswer}
                />
            </div>
        </div>
    );
}
