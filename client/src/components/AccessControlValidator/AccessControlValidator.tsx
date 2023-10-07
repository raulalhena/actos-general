import React, { useEffect, useState } from 'react';
import { FcHighPriority } from 'react-icons/fc';
import { FcCheckmark } from 'react-icons/fc';

type Props = {
    paramsURL: string;
}

const AccessControlValidator = ({ paramsURL }: Props) => {

    console.log('params in validator', paramsURL);

    const [ message, setMessage ] = useState<string>('');
    const [ status, setStatus ] = useState<boolean>();

    useEffect(() => {
        const attendanceRecord = async () => {
            const resp = await fetch(`http://localhost:8000/api/events/attendance/${paramsURL}`, {
                method: 'PUT'
            });
            
            const { message, status } = await resp.json();
            setMessage(message);
            
            if(!resp.ok) setStatus(status);
            
        };

        attendanceRecord();
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
            <div>
                {status ? <FcCheckmark /> : <FcHighPriority />}
            </div>
            {message}
        </div>
    );
};

export default AccessControlValidator;