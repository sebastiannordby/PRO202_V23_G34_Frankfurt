import { useSession } from 'next-auth/react';

const SendTextToDb = async (email: string, text: string) => {

    try {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, status: text })
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

export default SendTextToDb;