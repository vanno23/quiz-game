import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { DifficultyDataProps, setDifficultyProps } from './DifficultyTypes';

function Difficulty({ setDifficulty, setAmount, setCountdown }: setDifficultyProps) {


	const [difficultyData, setDifficultyData] = useState<any[]>([]);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchDifficultyData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('https://opentdb.com/api.php?amount=20');
			const data = await response.json();
			const difficultySet = new Set(data.results.map((item: DifficultyDataProps) => item.difficulty));
			const difficultyArray = Array.from(difficultySet);
			const sortedDifficultyArray = difficultyArray.sort(
				(a: any, b: any) =>
					["easy", "medium", "hard"].indexOf(a) -
					["easy", "medium", "hard"].indexOf(b)
			);
			setDifficultyData(sortedDifficultyArray);
		}

		catch (error) {
			setErrorMessage('Error fetching difficulty data.')
		}
		setIsLoading(false);
	}

	useEffect(() => {
		fetchDifficultyData();
	}, []);


	const setActive = useCallback((item: string, index: number) => {
		setActiveIndex(index);
		setDifficulty(item);
	
		if (item === "easy") {
		  setAmount(5);
		  setCountdown(30);
		} else if (item === "medium") {
		  setAmount(7);
		  setCountdown(45);
		} else if (item === "hard") {
		  setAmount(10);
		  setCountdown(60);
		}
	  }, [setDifficulty, setAmount, setCountdown]);

	return (
		<>
			{isLoading ? <Loading /> : (
				<div className='difficulty'>
					{errorMessage ? <div>{errorMessage}</div> : (
						<>
							<div className='difficultyContainer'>
								{difficultyData && difficultyData.map((item, index) => (
									<div key={index} className='difficultyItem'>
										<button
											className={activeIndex === index ? 'active' : ''}
											onClick={() => setActive(item, index)}
										>{item}</button>
									</div>
								))}
							</div>

							<div className='nextContainer'>
								{activeIndex !== null && activeIndex >= 0 ? (
									<Link to="/quiz" className='next'>Next</Link>
								) : (
									<span className='next'>Next</span>
								)}
							</div>
						</>
					)}
				</div>

			)
			}
		</>
	)
}

export default Difficulty;