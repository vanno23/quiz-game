import React from 'react'
import { CircleContainerProps } from '../QuizTypes';

function CircleContainer({correctAnswers, index, item, currentIndex, setCurrentIndex, setGetResults, getResults }: CircleContainerProps) {
    const checkAnswers = (index: number) => {
        if(getResults) {
            setCurrentIndex(index);
            setGetResults(false);
        }
    }
    return (
        <div className={`pieceCircle ${correctAnswers[index] === 1 ? 'circleGreen' : correctAnswers[index] === 0 ? 'circleRed' : currentIndex === index && 'gray'}`} key={index}>
            <button onClick={() => checkAnswers(index)}>{item}</button>
        </div>
    )
}

export default CircleContainer;