import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SubcategoryProps } from '../../../interfaces/subcategoryProps';
import styles from './ConfigListSubcategories.module.css';
import Preloader from '../../Preloader/Preloader';

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
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `http://localhost:8000/api/categories`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Data not found');
                }
                const data = await response.json();
                setIsLoading(false);
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
        <div className={styles.page}>
            <div className={styles.pageContainer}>
                <div className={styles.title}>
                    <h1 className={styles.dash}>—</h1>
                    <h1>Configuracion</h1>
                </div>
                <div>{ isLoading && <Preloader />}</div>
                <div className={styles.eventList} data-testid="eventsList-page">
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value=''>Selecciona una categoría</option>
                        {dataList.map((category) => (
                            <option  key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {subcategories.length > 0 && (
                <div className={styles.eventItem}> 
                    <h2 className={styles.eventTitle}>Subcategorias:</h2>
                    <ul>
                        {subcategories.map((subcategory) => (
                            <li key={subcategory.name} className={styles.eventChips}>
                                {subcategory.name}
                                <button className={styles.eventItem} onClick={() =>handleSubcategoryDelete(selectedCategory,subcategory)}>Eliminar</button>
                        
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <Link className={styles.eventItem} to={`/config/configform`} state={`${propsData}`}>
                    <div>
                        <h2>CREAR NUEVO</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ConfigListSubcategories;
