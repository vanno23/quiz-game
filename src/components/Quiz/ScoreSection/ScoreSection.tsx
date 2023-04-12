import React from 'react'
import CircleContainer from '../CircleContainer/CircleContainer'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ScoreSectionProps } from '../QuizTypes';

function ScoreSection({ getResults, setGetResults, currentIndex, guessAnswer, questionCircle, quantityQuestion, correctAnswers, setCurrentIndex, countdown }: ScoreSectionProps) {

	return (
		<div className={`quantityQuestion ${getResults ? 'results' : ''}`}>
			{
				getResults && (
					<div className='closeResult'>
						<button onClick={() => setGetResults(false)}><AiOutlineCloseCircle /></button>
					</div>
				)
			}
			<div className='quantityQuestionBoard'>
				<div className='correctAnswerBoard'>
					<p>{currentIndex + 1}/{quantityQuestion}</p>
					{
						getResults && (
							<p>Time Left: {countdown}</p>
						)
					}
				</div>
				<div className='score'>
					<p>Score</p>
					<p>{guessAnswer}</p>
				</div>
			</div>
			{
				getResults && (
					<div className='checkAnswers'>
						<h3>Check the correct answers:</h3>
					</div>
				)
			}

			<div className="circleContainer">
				{questionCircle.map((item, index) => (
					<CircleContainer
						key={index}
						correctAnswers={correctAnswers}
						index={index}
						item={item}
						currentIndex={currentIndex}
						setCurrentIndex={setCurrentIndex}
						setGetResults={setGetResults}
						getResults={getResults}
					/>

				))}
			</div>

		</div>
	)
}

export default ScoreSection