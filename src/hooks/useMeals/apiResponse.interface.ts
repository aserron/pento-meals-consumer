import {RecipeInterface} from "./Recipe.interface";

export interface ApiResponseInterface {
    meals?: RecipeInterface[];
    total?: number;
}
