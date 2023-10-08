import { useEffect, useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const AccessControlScanner = () => {

    const navigate = useNavigate();
    const [ qrReader, setQrReader ] = useState<boolean>(true);
    const [ paramsURL, setParamsURL ] = useState<string>('');

    useEffect(() => {
        if(!qrReader) navigate('/accessvalidation', { state: { paramsURL: paramsURL } });
    }, [ qrReader ]);

    const container = {
        margin: '100 0',
        height: 400,
        resizeMode: 'crop-and-scale',
        width: 400
    };

    const handleScan = (data: string) => {
        if(data !== null){
            setParamsURL(data);
            setQrReader(false);
        }
        
    };

    const handleError = (err: Error) => {
        console.error(err);
    };

    console.log('params', paramsURL);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', maxHeight: '500px',  width: '400', margin: 'auto' }}>
            <div>ACTOS QR ESCANER</div>
            {qrReader ? (
                <div style={{ maxHeight: '500px',  width: '400', margin: 'auto', overflow: 'hidden' }}>
                    <QrScanner
                        scanDelay={1000}
                        containerStyle={container}
                        onError={handleError}
                        onDecode={handleScan}
                        tracker={true}
                        hideCount={true}
                        constraints={container}
                    />
                </div>
            ) : null }
            
        </div>

    );
};

export default AccessControlScanner;
