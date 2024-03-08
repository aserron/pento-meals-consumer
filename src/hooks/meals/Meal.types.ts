export type Meal = {
    idMeal: string;
    strImageSource: null;
    strTags: string;
    strIngredient10: string;
    strIngredient12: string;
    strIngredient11: string;
    strIngredient14: string;
    strCategory: string;
    strIngredient13: string;
    strIngredient16: string;
    strIngredient15: string;
    strIngredient18: string;
    strIngredient17: string;
    strArea: string;
    strCreativeCommonsConfirmed: null;
    strIngredient19: string;
    strInstructions: string;
    strIngredient1: string;
    strIngredient3: string;
    strIngredient2: string;
    strIngredient20: string;
    strIngredient5: string;
    strIngredient4: string;
    strIngredient7: string;
    strIngredient6: string;
    strIngredient9: string;
    strIngredient8: string;
    strMealThumb: string;
    strMeasure20: string;
    strYoutube: string;
    strMeal: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure10: string;
    strMeasure11: string;
    dateModified: null;
    strDrinkAlternate: null;
    strSource: string;
    strMeasure9: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure1: string;
    strMeasure18: string;
    strMeasure2: string;
    strMeasure19: string;
    strMeasure16: string;
    strMeasure17: string;
    strMeasure14: string;
    strMeasure15: string
}
export type Meals= Meal[];
export interface MealsResult {
    meals: Meals | null
}
