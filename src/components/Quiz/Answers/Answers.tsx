import React from 'react'
import { AnswerItem } from '../QuizTypes';

function Answers({item, correct_answer, index, checkAnswer, activeAnswerIndex, quizEnded, buttonBorderColor, currentIndex}: AnswerItem) {

  return (
    <button disabled={quizEnded} onClick={() => checkAnswer(index)} className={`answer${ activeAnswerIndex === index ? ' active' : ''} ${item === correct_answer && buttonBorderColor[currentIndex] ? 'green' : ''}`}>{item}</button>
  )
}

export default Answers;