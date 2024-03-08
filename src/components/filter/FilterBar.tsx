import React, {useEffect, useState} from "react";
import './filter-bar.css'


type Category = { strCategory: string; strCategoryDescription: string; idCategory: string; strCategoryThumb: string };

const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const url2 = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

const cat: { strCategory: string; strCategoryDescription: string; idCategory: string; strCategoryThumb: string } = {
    "idCategory": "1",
    "strCategory": "Beef",
    "strCategoryThumb": "https://www.themealdb.com/images/category/beef.png",
    "strCategoryDescription": "Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]"
}

export const FilterSelect: React.FC<{
    name: string, url: string
}> = ({name, url}) => {
    const [options, setOptions] = useState([])
    useEffect(() => {
        fetch(url, {mode: 'cors',})
            .then(data => data.json())
            .then(result => {
                let o: any;
                console.log(result);
                if (name === 'area') {                    
                    o = result.meals.map((it: any, key: number) => ({id: `${key}`, name: it.strArea}));                    
                } else {
                    o = result.categories.map(
                        (cat: Category, key: number) => ({
                            id: `${cat.idCategory}`,
                            name: cat.strCategory
                        })
                    );
                }
                setOptions(o);
                return o;
            })
    }, []);

    return <>
        <fieldset className={`meals-filter-set`}>
            <legend>{name}</legend>
            <select name={`${name}`}>
                {options.map((it: any) => <option key={`${it.name}-${it.id}`}>{it.name}</option>)}
            </select>
        </fieldset>
    </>;
}

export const FilterBar: React.FC<{}> = () => {
    return <>
        <h2>Filter</h2>
        <FilterSelect name={`area`} url={url2}></FilterSelect>
        <FilterSelect name={`cat`} url={url}></FilterSelect>
    </>
}
