import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
import SelectCategory from "./SelectCategory"
import { Search } from "../types"

function Header() {

    const [search, setSearch] = useState<Search>({
        ingredient: "",
        category: ""
    })
    const fetchCategories = useAppStore(state => state.fetchCategories)
    const searchRecipes = useAppStore(state => state.searchRecipes)
    const showNotification = useAppStore(state => state.showNotification)

    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname == '/', [pathname])

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch({
            ...search,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes("")) return showNotification({error: true, text: "Todos los campos son obligatorios"})

        //Consultar recetas
        searchRecipes(search)
        
    }

    return (
        <header className={`${isHome ? "bg-header bg-no-repeat bg-cover bg-center min-h-screen" : "bg-slate-800"} `}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg"/>
                    </div>

                   <nav className="text-white uppercase font-bold flex gap-3 ">
                        <NavLink className={({isActive}) => isActive ? "text-orange-500 transition-all" : "text-white transition-all"} to={"/"}>Inicio</NavLink>
                        <NavLink className={({isActive}) => isActive ? "text-orange-500 transition-all" : "text-white transition-all"} to={"/favorites"}>Favoritos</NavLink>
                   </nav> 
                </div>

                {isHome && (
                    <form onSubmit={handleSubmit} className="md:w-1/2 2xl:1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                        <div className="space-y-4">
                            <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">Nombre o Ingrediente</label>
                            <input
                                onChange={handleChange}
                                id="ingredient"
                                type="text"
                                value={search.ingredient}
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none bg-white"
                                placeholder="Nombre del platillo o ingrediente"
                            />
                        </div>

                        <div className="space-y-4 relative">
                            <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">Categoría</label>
                            <SelectCategory
                                search={search}
                                setSearch={setSearch}
                            />
                        </div>

                        <input type="submit" className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full rounded-lg p-2 uppercase" value={"Buscar Recetas"}/>
                    </form>
                )}
            </div>
        </header>
    )
}

export default Header
