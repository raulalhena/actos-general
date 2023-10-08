import { useEffect, useState } from 'react';
import { FcHighPriority } from 'react-icons/fc';
import { FcCheckmark } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

type Props = {
    paramsURL: string;
}

const AccessControlValidator = ({ paramsURL }: Props) => {

    const navigate = useNavigate();

    const [ message, setMessage ] = useState<string>('');
    const [ status, setStatus ] = useState<boolean>(true);

    useEffect(() => {
        const attendanceRecord = async () => {
            const resp = await fetch(`http://localhost:8000/api/events/attendance/${paramsURL}`, {
                method: 'PUT'
            });
            
            const data = await resp.json();
            console.log('mesg sta', message, resp.status);
            
            if(!resp.ok) {
                setStatus(false);
            }

            setMessage(data.message);
            
        };

        attendanceRecord();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/accesscontrol');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
            <div>
                {status ? <FcCheckmark /> : <FcHighPriority />}
            </div>
            {message}
            <div>
                <button onClick={handleClick}>Volver</button>
            </div>
        </div>
    );
};

export default AccessControlValidator;