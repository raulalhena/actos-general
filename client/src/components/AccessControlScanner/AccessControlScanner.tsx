import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const previewStyle = {
    height: 240,
    width: 320,
};

const AccessControlScanner = () => {

    const [ scan, setScan ] = useState<string>('No result');

    const attendanceRecord = async (data) => {
        const bodyData = {
            eventId: '65212279b09ebf43a9489c61',
            userId: '651af4362d789f0364a6cc65'
        };

        const resp = await fetch(`http://localhost:8000/api/events/attendance`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });
        const result = await resp.json();
        console.log(result);
        if(result) setScan('Registro OK');
    };

    const handleScan = (data) => {
        if(data) attendanceRecord(data);
        console.log(data);
        // setScan(data);
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div>
            <div>hola</div>
            <QrReader
                delay={100}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
            <p>{scan}</p>
        </div>
    );
};

export default AccessControlScanner;
