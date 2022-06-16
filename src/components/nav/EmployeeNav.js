import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">home</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/create">create</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/employeelounge">employeelounge</Link>
            </li>
            
            {
                localStorage.getItem("texture_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("texture_user")
                            navigate("/landing", {replace: true})
                        }}>logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

