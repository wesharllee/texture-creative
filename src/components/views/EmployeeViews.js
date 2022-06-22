import { Outlet, Route, Routes } from "react-router-dom"
import { CheckOutPage } from "../checkOut/CheckOut"
import { ConfirmationPage } from "../checkOut/Confirmation"
import { CreatePage } from "../create/Create"
import { EditPage } from "../create/Edit"
import { EmployeeLoungePage } from "../employeeLounge/EmployeeLounge"
import { HomePage } from "../home/HomePage"
import { LightsPage } from "../lights/Lights"



export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Texture Creative</h1>
                    <div>insert logo here</div>

                    <Outlet />
                </>
            }>

                <Route path="home" element={<HomePage />} />
                <Route path="create" element={<CreatePage />} />
                <Route path="checkout/:id" element={<CheckOutPage />} />
                <Route path="confirmation/:id" element={<ConfirmationPage />} />
                <Route path="edit/:id" element={<EditPage />} />
                <Route path="employeelounge" element={<EmployeeLoungePage />} />
                <Route path="lights" element={<LightsPage />} />


                

                
                


            </Route>

        </Routes>
    )
}