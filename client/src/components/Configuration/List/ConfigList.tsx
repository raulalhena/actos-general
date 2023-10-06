// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const ListConfig = () => {

//     const location = useLocation();
//     const propsData = location.state;
//     const [ dataList , setDataList ] = useState([]);
//     console.log(propsData);

//     useEffect(() =>{
//         fetch(`http://localhost:8000/api/misc/${propsData}`)
//             .then((response)=>response.json())
//             .then((data)=> {
//                 console.log(data);
//                 setDataList(data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });

//     });

//     return (
//         <div>{dataList.map((list, index)=>{
//             <p>{List.name}</p>;
//         })}</div>
//     );
// };

// export default ListConfig;

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
                const response = await fetch(`http://localhost:8000/api/misc/${propsData}`);
                if (!response.ok) {
                    throw new Error('data not found');
                }
                const data = await response.json();
                console.log(data);
                console.log(propsData);
                setDataList(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [ propsData ]);

    const handleDelete = async (Id: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/${propsData}/${Id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setDataList((prevDataList) =>
                prevDataList.filter((list) => list._id !== Id)
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
                        <button onClick={() => handleDelete(list._id)}>Eliminar</button>
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
