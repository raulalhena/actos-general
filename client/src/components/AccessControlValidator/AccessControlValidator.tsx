import React, { useEffect, useState } from 'react';

type Props = {
    paramsURL: string;
}

const AccessControlValidator = ({ paramsURL }: Props) => {

    console.log('params in validator', paramsURL)

    const [ response, setResponse ] = useState<any>('');

    useEffect(() => {
        const attendanceRecord = async () => {
            const resp = await fetch(`http://localhost:8000/api/events/attendance/${paramsURL}`, {
                method: 'PUT'
            });
            const { message } = await resp.json();
            if(!resp.ok) alert( message )
            const result = await resp.json();
            console.log(result);
            if(result) setResponse('OK');
        };

        attendanceRecord();
    });

    return (
        <div>
            {response}
        </div>
    );
};

export default AccessControlValidator;