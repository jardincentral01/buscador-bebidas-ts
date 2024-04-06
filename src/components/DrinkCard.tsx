import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps ={
    drink: Drink
}

function DrinkCard({drink}: DrinkCardProps) {

    const selectRecipe = useAppStore(state => state.selectRecipe)

    return (
        <div className="group rounded-2xl">
            <div className="overflow-hidden rounded-2xl">
                <img className="mx-auto rounded-2xl shadow group-hover:scale-110 transition-all" src={drink.strDrinkThumb} alt={`Imagen de ${drink.strDrink}`}/>
            </div>

            <div className="py-5">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button type="button" onClick={() => selectRecipe(drink.idDrink)} className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg rounded-lg transition-all">Ver Receta</button>
            </div>
        </div>
    )
}

export default DrinkCard
