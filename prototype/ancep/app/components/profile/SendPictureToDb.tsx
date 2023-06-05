const SendPictureToDb = async (email: string, picture: string) => {

    try {
        const res = await fetch('/api/users/profilepicture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, picture: picture })
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

export default SendPictureToDb;