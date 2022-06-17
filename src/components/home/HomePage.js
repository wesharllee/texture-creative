import { useNavigate } from "react-router-dom"


export const HomePage = () => {
    const navigate = useNavigate()
    const localTextureUser = localStorage.getItem("texture_user")
    const textureUserObject = JSON.parse(localTextureUser)


    return <>
        <h2>This will be home</h2>
        {textureUserObject.staff === true ?
            <>
                {
                    <button onClick={() => navigate("/employeelounge")} >Employee Lounge</button>
                }
            </>
            :
            <>
                {
                    <button onClick={() => navigate("/create")} >Create Your Experience</button>

                }

            </>
        }
    </>
}


