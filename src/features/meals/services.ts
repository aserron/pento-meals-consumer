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
