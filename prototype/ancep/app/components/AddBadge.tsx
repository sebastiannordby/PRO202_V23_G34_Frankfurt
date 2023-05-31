import { useSession } from 'next-auth/react';
import { POST } from "@/app/api/badges/route";

export const AddBadge = () => {
    const  { data: session } = useSession();

    const addBadgeToProfile = async (badgeId: string) => {
        if (!session?.user?.email || !badgeId) {
            console.error('A user must be logged in and badgeData must be set');
            return;
        }

        console.log('Email: ', session.user.email);
        console.log('Badge Data: ', badgeId);

        const email = session.user.email;


        try {
            const res = await fetch('/api/badges', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, badges: [badgeId] })

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

    return { addBadgeToProfile };
};


