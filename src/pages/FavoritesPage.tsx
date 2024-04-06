import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"


function FavoritesPage() {

    const favorites = useAppStore(state => state.favorites)
    const hasFavorites = useMemo(() => favorites.length, [favorites])

    return (
        <>
            <h1 className="text-6xl font-extrabold">Favoritos</h1>

            {!hasFavorites ? (
                <p className="text-center text-2xl my-10">Aún no hay bebidas añadidas a favoritos</p>
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12 mt-10">
                    {favorites.map(fav => (
                        <DrinkCard
                            key={fav.idDrink}
                            drink={fav}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default FavoritesPage
