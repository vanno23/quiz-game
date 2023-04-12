export type CategoryTypes = {
    id: number;
    name: string;
}

export type CategoryApiResponse = {
    trivia_categories: CategoryTypes[];
}


export interface CategoryProps {
    setCategoryApi: React.Dispatch<React.SetStateAction<number | null>>;
    setCategoryTitle: React.Dispatch<React.SetStateAction<string | null>>;
}