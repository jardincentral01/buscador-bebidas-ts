import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { RecipesSliceType } from "./recipeSlice";
import { NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    inFavorites: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().inFavorites(recipe.idDrink)){
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink != recipe.idDrink)
            }))
            get().showNotification({text: 'Bebida eliminada de favoritos', error: false})
        }else{
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            get().showNotification({text: 'Bebida agregada a favoritos', error: false})
        }
        /* createRecipesSlice(set, get, api).closeModal() */
        get().closeModal()
        localStorage.setItem("favorites", JSON.stringify(get().favorites))
    },
    inFavorites: (id) => {
        return get().favorites.some(fav => fav.idDrink == id)
    },
    loadFromStorage: () => {
        const favoritesLocal = localStorage.getItem("favorites");
        set({
            favorites: favoritesLocal ? JSON.parse(favoritesLocal) : []
        })
    }
})