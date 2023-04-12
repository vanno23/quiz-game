//Quiz Types

export interface categoryApiProps {
    categoryApi: number | null,
    difficulty: string | null
    categoryTitle: string | null,
    amount: number | null;
    countdown: number;
    setCountdown: React.Dispatch<React.SetStateAction<number>>;
}


export type QuestionItem = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    all_answers: string[];
}


export type QuestionProps = {
	questionData: QuestionItem[];
	currentIndex: number;
	checkAnswer: (number: number) => void;
	activeAnswerIndex: number;
	handleNextQuestion: (all_answers: string[], correct_answer: string) => void;
	guessAnswer: number;
	quantityQuestion: number;
	correctAnswers: number[];
	quizEnded: boolean;
	countdown: number;
	addTime: string;
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
	buttonBorderColor: boolean[];
};

//GetResults Types

export interface getResultsProps {
    questionCircle: number[];
    getResults: boolean;
    correctAnswers: number[];
    currentIndex: number;
    guessAnswer: number;
    quantityQuestion: number;
    setGetResults: React.Dispatch<React.SetStateAction<boolean>>;
}


// CircleContainerProps

export interface CircleContainerProps {
	correctAnswers: number[];
    index: number;
    item: number;
    currentIndex: number;
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setGetResults: React.Dispatch<React.SetStateAction<boolean>>;
    getResults: boolean;
}


//QuestionItem

export type AnswerItem = {
    correct_answer: string;
    item: string;
    index: number;
    checkAnswer: (number: number) => void;
    activeAnswerIndex: number;
    quizEnded: boolean;
    buttonBorderColor: boolean[];
    currentIndex: number;
}


// ScoreSectionProps

export interface ScoreSectionProps {
	getResults: boolean;
	setGetResults: React.Dispatch<React.SetStateAction<boolean>>;
	currentIndex: number;
	guessAnswer: number;
	questionCircle: number[];
	quantityQuestion: number;
	correctAnswers: number[];
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
	countdown: number;
}