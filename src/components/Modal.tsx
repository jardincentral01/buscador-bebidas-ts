import { Dialog, Transition } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { Fragment, useMemo } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {

    const modal = useAppStore(state => state.modal)
    const closeModal = useAppStore(state => state.closeModal)
    const drinkRecipe = useAppStore(state => state.drinkRecipe)
    const handleClickFavorite = useAppStore(state => state.handleClickFavorite)
    const favorites = useAppStore(state => state.favorites)
    const inFavorites = useAppStore(state => state.inFavorites)
    const favoriteExists = useMemo(() => inFavorites(drinkRecipe.idDrink), [drinkRecipe, favorites])

    const renderIngredients = () => {
        let ingredients: JSX.Element[] = [];
        for(let i = 1; i<=6; i++){
            const ingredient = drinkRecipe[`strIngredient${i}` as keyof Recipe]
            const measure = drinkRecipe[`strMeasure${i}` as keyof Recipe]
            if(ingredient &&  measure){
                ingredients.push(
                    <li key={i} className='text-lg font-normal'>
                        {ingredient} - {measure}
                    </li>
                ) 
            }  
        }
        return ingredients
    }

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                            <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                {drinkRecipe.strDrink}
                            </Dialog.Title>
                            <img className='w-96 mx-auto' src={drinkRecipe.strDrinkThumb} alt={`Imagen de ${drinkRecipe.strDrink}`}/>

                            <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                Ingredientes y Cantidades
                            </Dialog.Title>
                            <ul>
                                {renderIngredients()}
                            </ul>

                            <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                Instrucciones
                            </Dialog.Title>
                            <p className='text-lg'>{drinkRecipe.strInstructions}</p>

                            <div className='mt-5 flex justify-between gap-4'>
                                <button onClick={closeModal} type='button' className='w-full rounded bg-slate-800 p-3 font-bold uppercase text-white shadow hover:bg-slate-700'>Cerrar</button>

                                <button onClick={() => handleClickFavorite(drinkRecipe)} type='button' className='w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500 transition-all flex items-center justify-center gap-3'>
                                    {favoriteExists ? <><StarSolid className='w-5 h-5'/> Quitar de Favoritos</> : <><StarIcon className="w-5 h-5"/> Agregar a Favoritos</> }
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}