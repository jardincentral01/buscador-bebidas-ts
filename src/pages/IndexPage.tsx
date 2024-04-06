import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"
import { Drinks } from "../types"

function IndexPage() {
    
    const drinks: Drinks = useAppStore(state => state.drinks)
    const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])
    
    return (
        <>
            <h1 className="text-6xl font-extrabold">Recetas</h1>

            {hasDrinks ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12 mt-10">
                    {drinks.drinks.map(drink => (
                        <DrinkCard
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center my-10 text-2xl">No hay resultados aún, utiliza el formulario para buscar recetas.</p>
            )}
        </>
    )
}

export default IndexPage
