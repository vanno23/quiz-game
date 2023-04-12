export interface DifficultyDataProps {
	difficulty: string,
}

export interface setDifficultyProps {
	setDifficulty: React.Dispatch<React.SetStateAction<string | null>>
	setCountdown: React.Dispatch<React.SetStateAction<number>>;
	setAmount: React.Dispatch<React.SetStateAction<number | null>>;
}