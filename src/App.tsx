import React, { useState } from 'react';
import './styles/css/style.css';
import Category from './components/Category/Category';
import { Routes, Route } from 'react-router-dom'
import Quiz from './components/Quiz/Quiz/Quiz';
import Difficulty from './components/Difficulty/Difficulty';

function App() {
  const [categoryApi, setCategoryApi] = useState<number | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(30);

  return (
    <>
        <div className="App">
          <Routes>
            <Route path='/' element={<Category setCategoryApi={setCategoryApi} setCategoryTitle={setCategoryTitle}/>}/>
            <Route path='/difficulty' element={<Difficulty setDifficulty={setDifficulty} setAmount={setAmount} setCountdown={setCountdown}/>}/>
            <Route path='/quiz' element={<Quiz categoryApi={categoryApi} difficulty={difficulty} categoryTitle={categoryTitle} amount={amount} countdown={countdown} setCountdown={setCountdown}/>}/>
          </Routes>
        </div>
    </>
  );
}

export default App;