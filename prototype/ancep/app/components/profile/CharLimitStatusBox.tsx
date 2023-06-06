import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import  SendTextToDb  from './SendTextToDb';
import {Badge} from "@/lib/models/badge";
import { AddBadge } from "../AddBadge";

class text {
}

// @ts-ignore
const CharLimitStatusBox = ({ limit }) => {
    const { data: session } = useSession();
    const [text, setText] = useState( '');
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState('');
    const { addBadgeToProfile } = AddBadge();

    useEffect(() => {
        (async() => {
            if(session?.user?.email) {
                const response = await fetch(`/api/users?email=${session?.user?.email}}`);

                if (!response.ok)
                    throw new Error('Failed to fetch users');
                const data = await response.json() as text[];
                // @ts-ignore
                const user = data.find((user) => user.email === session?.user?.email);
                if (user) {
                    // @ts-ignore
                    setStatus(user.status);
                }
            }
        })();
    }, [session?.user?.email]);

    const email = session?.user?.email;
    if (!email) {
        return <div>Not logged in</div>;
    }
    // @ts-ignore
    const handleChange = (e) => {

        const {value, key} = e.target;
        if (value.length <= limit) {
            setText(value);
        }
    };
    // @ts-ignore
    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsEditing(false);
            if (text.trim() !== '') {
                SendTextToDb(email, text).then(r => console.log(r));
                setText('');
                setStatus(text);
                addBadgeToProfile('2');
            }
        }
    };
    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleBlur = () => {
        setIsEditing(false);
    };
    return (
        <div className={`p-2 rounded ${isEditing ? 'bg-transparent' : 'bg-transparent'}`}>
            {isEditing ? (
                <div>
          <textarea
              value={text}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              onBlur={handleBlur}
              maxLength={limit}
              rows={1}
              className="border border-gray-300 rounded p-2 outline-none resize-none"
              autoFocus
          />
                    <p>{limit - text.length} characters remaining</p>
                </div>
            ) : (
                <div className="cursor-text" onClick={handleEdit}>
                    {status || 'Edit your status!'}
                </div>
            )}
        </div>
    );
};

export default CharLimitStatusBox;