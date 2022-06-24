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
                    <div className="getCentered">
                    <button onClick={() => navigate("/employeelounge")} >Employee Lounge</button>
                    </div>
                }
            </>
            :
            <>
                {
                    <div className="getCentered">
                    <button onClick={() => navigate("/create")} >Create Your Experience</button>
                    </div>
                }

            </>
        }
    </>
}


