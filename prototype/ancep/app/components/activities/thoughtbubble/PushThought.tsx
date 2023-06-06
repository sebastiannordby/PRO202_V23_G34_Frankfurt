import { useSession } from 'next-auth/react';
import { POST } from "@/app/api/users/thoughts/route";

export const PushThought = () => {
    const {data: session} = useSession();

    const pushThoughtToProfile = async (thought: string) => {
        if (!session?.user?.email || !thought) {
            return;
        }
        console.log('Email: ', session.user.email);
        console.log('Thought: ', thought);

        const email = session.user.email;

        try {
                const res = await fetch('/api/users/thoughts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email, thought: thought})
            });
            const result = await res.json();
            if (!res.ok) {
                console.error(result);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return {pushThoughtToProfile};
}