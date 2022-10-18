import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { decode } from "html-entities";
import Quiz from "./components/Quiz";
import QuizScreen from "./components/QuizScreen";
import StartScreen from "./components/StartScreen";
import blobTop from "./images/bg-blob-top.svg";
import blobBottom from "./images/bg-blob-bottom.svg";
import "./sass/main.scss";

export default function App() {
    const [quiz, setQuiz] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isCheckedAnswers, setIsCheckedAnswers] = useState(false);
    const [isPlayedAgain, setIsPlayedAgain] = useState(false);

    useEffect(() => {
        const getQuizzes = async () => {
            try {
                const response = await fetch(
                    "https://opentdb.com/api.php?amount=5&category=9&type=multiple"
                );

                if (!response.ok) throw new Error("Something went wrong.");

                const data = await response.json();

                const quizzes = data.results.map((result) => {
                    const { question, incorrect_answers, correct_answer } =
                        result;

                    let answers = incorrect_answers.map((answer) => ({
                        value: decode(answer),
                        isSelected: false,
                        isCorrect: false,
                    }));

                    answers.splice(
                        Math.floor(
                            Math.random() * incorrect_answers.length + 1
                        ),
                        0,
                        {
                            value: decode(correct_answer),
                            isSelected: false,
                            isCorrect: true,
                        }
                    );

                    return {
                        id: uuid(),
                        question: decode(question),
                        answers,
                    };
                });

                setQuiz(quizzes);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getQuizzes();
    }, [isPlayedAgain]);

    useEffect(() => {
        const allSelectedAnswers = quiz
            .map(({ answers }) => answers.some((answer) => answer.isSelected))
            .every((ans) => ans);

        setIsDisabled(allSelectedAnswers ? false : true);
    }, [quiz]);

    const chooseAnswer = (e, id) => {
        const targetContent = e.target.textContent;

        setQuiz((prevQuizzes) =>
            prevQuizzes.map((prevQuiz) => {
                const newQuizAnswers = prevQuiz.answers.map((answer) => {
                    return targetContent === answer.value
                        ? {
                              ...answer,
                              isSelected: !answer.isSelected,
                          }
                        : {
                              ...answer,
                              isSelected: false,
                          };
                });

                return id === prevQuiz.id
                    ? {
                          ...prevQuiz,
                          answers: newQuizAnswers,
                      }
                    : prevQuiz;
            })
        );
    };

    const countCorrectAnswers = () => {
        const correctAnswers = quiz
            .map(({ answers }) =>
                answers.filter(
                    (answer) => answer.isSelected && answer.isCorrect
                )
            )
            .filter((answer) => answer.length !== 0);

        return correctAnswers.length;
    };

    const playAgain = () => {
        setIsLoading(true);
        setIsPlayedAgain((isPlayedAgain) => !isPlayedAgain);
        setIsCheckedAnswers(false);
    };

    const quizElements = quiz.map(({ id, question, answers }) => (
        <Quiz
            key={id}
            question={question}
            answers={answers}
            isCheckedAnswers={isCheckedAnswers}
            chooseAnswer={(e) => chooseAnswer(e, id)}
        />
    ));

    return (
        <main className="bg-body main">
            {!isStarted && (
                <StartScreen handleStart={() => setIsStarted(true)} />
            )}
            {isStarted && (
                <QuizScreen
                    quizElements={quizElements}
                    isLoading={isLoading}
                    isCheckedAnswers={isCheckedAnswers}
                    isDisabled={isDisabled}
                    countCorrectAnswers={countCorrectAnswers}
                    playAgain={playAgain}
                    handleCheckedAnswers={() => setIsCheckedAnswers(true)}
                />
            )}
            <img src={blobTop} alt="Blob" className="blob blob-top" />
            <img src={blobBottom} alt="Blob" className="blob blob-bottom" />
        </main>
    );
}
