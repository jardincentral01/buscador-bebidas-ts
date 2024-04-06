import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./pages/IndexPage"
import FavoritesPage from "./pages/FavoritesPage"
import Layout from "./layouts/Layout"

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route index path="/" element={<IndexPage/>}/>
                    <Route path="/favorites" element={<FavoritesPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
