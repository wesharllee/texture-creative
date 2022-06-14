import { CustomerNavBar } from "./CustomerNav"
import { EmployeeNavBar } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {

    const localTextureUser = localStorage.getItem("texture_user")
    const textureUserObject = JSON.parse(localTextureUser)

    if (textureUserObject.staff) {
        return <EmployeeNavBar />
    }
    else {
        return <CustomerNavBar />
    }
}