import { Outlet, Route, Routes } from "react-router-dom"
import { CheckOutPage } from "../checkOut/CheckOut"
import { ConfirmationPage } from "../checkOut/Confirmation"
import { CreatePage } from "../create/Create"
import { EditPage } from "../create/Edit"
import { MyDatesPage } from "../create/myDates/MyDates"
import { HomePage } from "../home/HomePage"



export const CustomerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Texture Creative</h1>
                    {/* <div>insert logo here</div> */}

                    <Outlet />
                </>
            }>
                
                <Route path="home" element={<HomePage />} />
                <Route path="create" element={<CreatePage />} />
                <Route path="checkout/:id" element={<CheckOutPage />} />
                <Route path="confirmation/:id" element={<ConfirmationPage />} />
                <Route path="edit/:id" element={<EditPage />} />
                <Route path="mydates" element={<MyDatesPage />} />
                



            </Route>

        </Routes>
    )
}