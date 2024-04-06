import { z } from "zod"
import { CategoriesAPIResponseSchema, CategoryAPIResponseSchema, DrinkAPIResponseSchema, DrinksAPIResponseSchema, SearchSchema, RecipeAPIResponseSchema } from "../schemas/recipes-schema"

export type Category = z.infer<typeof CategoryAPIResponseSchema>
export type Categories = z.infer<typeof CategoriesAPIResponseSchema>

export type Search = z.infer<typeof SearchSchema>

export type Drink = z.infer<typeof DrinkAPIResponseSchema>
export type Drinks = z.infer<typeof DrinksAPIResponseSchema>

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>