import React, { useState } from 'react';
import Answers from '../Answers/Answers';
import ScoreSection from '../ScoreSection/ScoreSection';
import { QuestionProps } from '../QuizTypes';

function Question({ questionData, currentIndex, checkAnswer, activeAnswerIndex, handleNextQuestion, guessAnswer, quantityQuestion, correctAnswers, quizEnded, countdown, addTime, setCurrentIndex, buttonBorderColor }: QuestionProps) {
	const { question, correct_answer, all_answers } = questionData[currentIndex];
	const questionCircle = Array.from(Array(questionData.length).keys(), x => x + 1);
	const [getResults, setGetResults] = useState<boolean>(false);


	const getResult = () => {
		setGetResults(true);
	}

	return (
		<>
			<div className='questionContainer' key={currentIndex}>
				<div>
					<div className='question'>
						<div>
							<h3>Question: {currentIndex + 1}</h3>
							<p>{question}</p>
						</div>
						<div className={`countDown ${countdown === 0 ? 'red' : ''}`}>
							<div className='timer'>
								<p>{countdown}</p>
							</div>
							<div className={`addTime ${addTime === '- 2' ? 'red' : addTime === '+ 2' ? 'green' : ''}`}>
								<p>{addTime}</p>
							</div>
						</div>

					</div>
					<div className='answersContainer'>
						{all_answers.map((item, index) => (
							<Answers
								key={index}
								index={index}
								item={item}
								correct_answer={correct_answer}
								checkAnswer={checkAnswer}
								activeAnswerIndex={activeAnswerIndex}
								quizEnded={quizEnded}
								buttonBorderColor={buttonBorderColor}
								currentIndex={currentIndex}
							/>
						))}
					</div>
					<div className='next-question'>
						<button disabled={!quizEnded} onClick={() => getResult()}>Result</button>
						<button disabled={quizEnded} onClick={() => handleNextQuestion(all_answers, correct_answer)}>Next Question</button>
					</div>
				</div>
				<ScoreSection
					getResults={getResults}
					setGetResults={setGetResults}
					currentIndex={currentIndex}
					guessAnswer={guessAnswer}
					questionCircle={questionCircle}
					quantityQuestion={quantityQuestion}
					correctAnswers={correctAnswers}
					setCurrentIndex={setCurrentIndex}
					countdown={countdown}
				/>
			</div>
		</>
	);
}
export default Question;