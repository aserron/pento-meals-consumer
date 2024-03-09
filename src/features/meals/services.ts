import {Meals} from "../../hooks/meals/Meal.types";

const urls = [
    "www.themealdb.com/api/json/v1/1/list.php?c=list",
    "www.themealdb.com/api/json/v1/1/list.php?a=list",
    "www.themealdb.com/api/json/v1/1/list.php?i=list",
]

export async function fetchFilterData() {
    Promise
        .all(urls.map(url => fetch(url)))
        .then(data => data.map(d => d.json()))
        .catch(error => alert('Error'+error.message))
}

export const fetchMealsByName: (word?: string, page?: number) => Promise<Meals> = async (word = '', page = 0) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
    return fetch(url + `&page=${page}`).then((res) => res.json())
}
