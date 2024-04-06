import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipesBySearchForm } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Search, Recipe } from "../types"
import { FavoritesSliceType } from "./favoritesSlice"

export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    drinkRecipe : Recipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (search: Search) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
    resetDrinkRecipe: () => void
}

export const createRecipesSlice: StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    drinkRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (search) => {
        const drinks = await getRecipesBySearchForm(search)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const drinkRecipe = await getRecipeById(id)
        set({
            drinkRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
        })
    },
    resetDrinkRecipe: () => {
        set({
            drinkRecipe: {} as Recipe,
        })
    }
})