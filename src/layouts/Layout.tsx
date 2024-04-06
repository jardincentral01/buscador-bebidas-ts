import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { useAppStore } from "../stores/useAppStore"
import { useEffect } from "react"
import Notification from "../components/Notification"

function Layout() {
    
    const loadFromStorage = useAppStore((state) => state.loadFromStorage)
    const modal = useAppStore(state => state.modal)
    const resetDrinkRecipe = useAppStore(state => state.resetDrinkRecipe)

    useEffect(() => {
        loadFromStorage()
    }, [])

    useEffect(() => {
        if(modal == false){
            setTimeout(() => {
                resetDrinkRecipe()
            }, 300)
        }
    }, [modal])

    return (
        <>
            <Header/>

            <main className="container mx-auto py-16 px-5 md:px-0">
                <Outlet/>
            </main>

            <Modal/>
            <Notification/>
        </>
    )
}

export default Layout
