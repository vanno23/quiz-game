import React, { useState, useEffect, useCallback } from 'react'
import Loading from '../../Loading/Loading';
import he from 'he';
import './Question.css'
import Question from '../Question/Question';
import { categoryApiProps, QuestionItem} from '../QuizTypes';

function Quiz({ categoryApi, difficulty, categoryTitle, amount, countdown, setCountdown }: categoryApiProps) {
  const [questionData, setQuestionData] = useState<QuestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [quantityQuestion, setQuantityQuestion] = useState<number>(0);
  const [activeAnswerIndex, setActiveAnswerIndex] = useState<number>(-1);
  const [guessAnswer, setGuessAnswer] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [quizEnded, setQuizEnded] = useState(false);
  const [addTime, setAddTime] = useState<string>('');
  const [buttonBorderColor, setButtonBorderColor] = useState<boolean[]>([])


  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categoryApi}&difficulty=${difficulty}&type=multiple`);
      const data = await response.json();
      const decodedData = data.results.map((result: QuestionItem) => {
        const decodedQuestion = he.decode(result.question);
        const decodedCorrectAnswer = he.decode(result.correct_answer);
        const decodedIncorrectAnswers = result.incorrect_answers.map((answer) => he.decode(answer));
        const allAnswers = [decodedCorrectAnswer, ...decodedIncorrectAnswers];
        allAnswers.sort(() => Math.random() - 0.5);
        return {
          ...result,
          question: decodedQuestion,
          correct_answer: decodedCorrectAnswer,
          incorrect_answers: decodedIncorrectAnswers,
          all_answers: allAnswers
        };
      });
      setQuestionData(decodedData)
      setQuantityQuestion(decodedData.length);
    } catch (error) {
      setErrorMessage('Error fetching Question data.');
    }
    setIsLoading(false);
  }


  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    setCorrectAnswers(new Array(questionData.length).fill(2));
    setButtonBorderColor(new Array(questionData.length).fill(false));
  }, [questionData]);

  const handleNextQuestion = useCallback((all_answers: string[], correct_answer: string) => {
    if (activeAnswerIndex >= 0) {
      if (currentIndex < quantityQuestion - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setQuizEnded(true);
      }
      setActiveAnswerIndex(-1);
      setCorrectAnswers(prevState => {
        const newState = [...prevState];
        newState[currentIndex] = 0;
        return newState;
      });

      if (all_answers[activeAnswerIndex] === correct_answer) {
        setCorrectAnswers(prevState => {
          const newState = [...prevState];
          newState[currentIndex] = 1;
          return newState;
        });
        setGuessAnswer(guessAnswer + 1);
        setCountdown(countdown + 2);
        setAddTime('+ 2');
      } else{
        if(countdown <= 2){
          setCountdown(0);
          setQuizEnded(true);
        } else{
          setCountdown(countdown - 2);
          setAddTime('- 2');
        }
      }
      setButtonBorderColor(prevState => {
        const newState = [...prevState];
        newState[currentIndex] = true;
        return newState;
      });
    }
  }, [activeAnswerIndex, currentIndex, quantityQuestion, correctAnswers, guessAnswer, countdown, buttonBorderColor]);



  const checkAnswer = (index: number) => {
    setActiveAnswerIndex(index);
  }

  useEffect(() => {
    if (countdown > 0 && !quizEnded) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        setAddTime('');
      }, 1000);
      return () => clearTimeout(timer);
  
    } else if (countdown === 0) {
      setAddTime('');
      setQuizEnded(true);
    } else if(quizEnded) {
      setTimeout(() => setAddTime(''), 1000);
    }
  }, [countdown, quizEnded]);

  return (
    <>
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : isLoading ? (
        <Loading />
      ) : questionData.length > 0 ? (
        <>
          <h1 className='quizTitle'>Quiz</h1>
          <div className='questionSection'>
            <p className='quizDescription'>{categoryTitle} - {difficulty}</p>
            <Question
              questionData={questionData}
              currentIndex={currentIndex}
              checkAnswer={checkAnswer}
              activeAnswerIndex={activeAnswerIndex}
              handleNextQuestion={handleNextQuestion}
              guessAnswer={guessAnswer}
              quantityQuestion={quantityQuestion}
              correctAnswers={correctAnswers}
              quizEnded={quizEnded}
              countdown={countdown}
              addTime={addTime}
              setCurrentIndex={setCurrentIndex}
              buttonBorderColor={buttonBorderColor}
            />
          </div>
        </>
      ) : null}
    </>
  );
}

export default Quiz