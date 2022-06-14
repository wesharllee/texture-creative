import { useNavigate } from "react-router-dom"


export const HomePage = () => {
const navigate = useNavigate()

    return <> 
    <h2>This will be home</h2>

    <button onClick={() => navigate("/create")} >Create Your Experience</button>
    </>
}

