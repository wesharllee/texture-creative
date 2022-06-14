import { Outlet, Route, Routes } from "react-router-dom"
import { CheckOutPage } from "../auth/checkOut/CheckOut"
import { ConfirmationPage } from "../auth/checkOut/Confirmation"
import { CreatePage } from "../create/Create"
import { HomePage } from "../home/HomePage"
import { LandingPage } from "../landing/LandingPage"

export const CustomerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Texture Creative</h1>
                    <div>insert logo here</div>

                    <Outlet />
                </>
            }>
                <Route path="landing" element={<LandingPage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="create" element={<CreatePage />} />
                <Route path="checkout" element={<CheckOutPage />} />
                <Route path="confirmation" element={<ConfirmationPage />} />



            </Route>

        </Routes>
    )
}