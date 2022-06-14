import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {
	
	const localTextureUser = localStorage.getItem("texture_user")
    const textureUserObject = JSON.parse(localTextureUser)

    if (textureUserObject.staff) {
        return <EmployeeViews />
    }
    else {
        return <CustomerViews />
    }
}

