import { useState } from 'react';

export function HandleBubbleInput(initialValue: string, thought: string[], setThoughts: React.Dispatch<React.SetStateAction<string[]>>, pushThoughtToProfile: (thought: string) => Promise<void>) {
    const [inputValue, setInputValue] = useState(initialValue);

    const handleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleInputChange = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            const newThought = inputValue;
            const updatedThoughts = [...thought, newThought];
            if (updatedThoughts.length > 10) {
                alert("Du kan ikke ha mer enn 10 tanker");
            }
            else {
                setThoughts(updatedThoughts);
                await pushThoughtToProfile(newThought);
            }
            setInputValue('');
        }
    }

    return {
        inputValue,
        handleInputChange,
        handleInputValueChange
    }
}