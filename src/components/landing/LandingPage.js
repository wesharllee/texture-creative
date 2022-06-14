import { useNavigate } from "react-router-dom"


export const LandingPage = () => {
const navigate = useNavigate()

    return <> 
    <h2>This will be landing</h2>

    <button onClick={() => navigate("/login")} >Book Texture Creative</button>
    </>
}

