import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./pages/IndexPage"
import Layout from "./layouts/Layout"

const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route index path="/" element={<IndexPage/>}/>
                    <Route path="/favorites" element={
                        <Suspense fallback={'Cargando...'}>
                            <FavoritesPage/>
                        </Suspense>
                    }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
