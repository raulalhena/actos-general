import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DataList {
    name: string;
    description: string;
    _id: string;
}

const ConfigList = () => {
    const location = useLocation();
    const propsData = location.state;
    const [ dataList, setDataList ] = useState<DataList[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `http://localhost:8000/api/${propsData}`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Data not found');
                }
                const data = await response.json();
                setDataList(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [ propsData ]);

    const handleDelete = async (name: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/${propsData}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setDataList((prevDataList) =>
                prevDataList.filter((list) => list.name !== name)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                {dataList.map((list) => (
                    <div key={list._id}>
                        <p>{list.name}</p>
                        <button onClick={() => handleDelete(list.name)}>Eliminar</button>
                    </div>
                ))}
            </div>
            <div>
                <Link to={`/config/configform`} state={`${propsData}`}>
                    <div>
                        <h2>CREAR NUEVO</h2>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default ConfigList;
