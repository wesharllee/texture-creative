import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeLoungePage } from "../employeeLounge/EmployeeLounge"
import { RequestsPage } from "../employeeLounge/Request"
import { HomePage } from "../home/HomePage"
import "../Texture.css"




export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="title">Texture Creative</h1>
                    {/* <div>insert logo here</div> */}

                    <Outlet />
                </>
            }>

                <Route path="home" element={<HomePage />} />
                <Route path="employeelounge" element={<EmployeeLoungePage />} />
                <Route path="requests/:id" element={<RequestsPage />} />
                


                

                
                


            </Route>

        </Routes>
    )
}