import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SubcategoryProps } from '../../../interfaces/subcategoryProps';

interface DataList {
    name: string;
    description: string;
    _id: string;
    subcategories: SubcategoryProps[];
}

const ConfigListSubcategories = () => {
    const location = useLocation();
    const propsData = location.state;
    const [ selectedCategory, setSelectedCategory ] = useState<string>('');
    const [ dataList, setDataList ] = useState<DataList[]>([]);
    const [ subcategories, setSubcategories ] = useState<SubcategoryProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `http://localhost:8000/api/categories`;

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

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);

        const selectedCategoryData = dataList.find((category) => category._id === categoryId);
        if (selectedCategoryData) {
            setSubcategories(selectedCategoryData.subcategories);
        } else {
            setSubcategories([]); 
        }
    };

    const handleSubcategoryDelete = async (categoryId: string, subcategory: SubcategoryProps) => {
        console.log(subcategory.name);
        try {
            const response = await fetch(`http://localhost:8000/api/categories/${categoryId}/subcategory`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subcategoryName: subcategory.name }),
            });
      
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
      
            setSubcategories((prevSubcategories) =>
                prevSubcategories.filter((sub) => sub.name !== subcategory.name)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <div>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value=''>Selecciona una categoría</option>
                        {dataList.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {subcategories.length > 0 && (
                <div>
                    <h2>Subcategorias:</h2>
                    <ul>
                        {subcategories.map((subcategory) => (
                            <li key={subcategory.name}>
                                {subcategory.name}
                                <button onClick={() =>handleSubcategoryDelete(selectedCategory,subcategory)}>Eliminar</button>
                         
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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

export default ConfigListSubcategories;
