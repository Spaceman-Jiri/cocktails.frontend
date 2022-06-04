import { Ingredient } from "./ingredient";

export class Cocktail{
    cocktailId: number;
    name: string;
    canMake: boolean;
    ingredients: Ingredient[];
}