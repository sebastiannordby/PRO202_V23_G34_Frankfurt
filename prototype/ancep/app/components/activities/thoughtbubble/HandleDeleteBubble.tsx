import {useSession} from "next-auth/react";

// @ts-ignore
export const HandleDeleteBubble = ({ thought, setThoughts }) => {
    const {data: session} = useSession();
    const handleDeleteThought = async (thoughtToDelete: string) => {
        if (!session?.user?.email) {
            console.log("No session or user email found, not proceeding with deletion.");
            return;
        }

        // @ts-ignore
        const updatedThoughts = thought.filter(t => t !== thoughtToDelete);
        console.log('Updated Thoughts Array: ', updatedThoughts);
        setThoughts(updatedThoughts);

        const email = session?.user?.email;
        console.log('Email: ', email, ' Thought to delete: ', thoughtToDelete);

        const bodyData = {email: email, thoughtToDelete: thoughtToDelete};
        console.log('Data to send: ', bodyData);
        const bodyJson = JSON.stringify(bodyData);
        console.log('JSON stringified data: ', bodyJson);

        try {
            console.log("Preparing to fetch /api/users/thoughts with DELETE method.");
            const res = await fetch('/api/users/thoughts/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: bodyJson,
            });

            console.log('Fetch Response: ', res);

            if (!res.ok) {
                console.error(`Fetch Error: ${res.status}`);
                return;
            }

            const result = await res.json();
            console.log('Fetch Result: ', result);
        } catch (error) {
            console.error("Caught error during fetch operation:", error);
        }
    };
    return {handleDeleteThought};
};

