import { useNavigate } from "react-router-dom"


export const LandingPage = () => {
    const navigate = useNavigate()

    const mainImage = require("./Images/mainImage.png")
    return <>
        <h1>Texture Creative</h1>
        <img src={mainImage} alt="mainphoto" className="mainPhoto" />
        <div className="getCentered">
            <button className="buttonz" onClick={() => navigate("/login")} >Book Texture Creative</button>
        </div>
    </>
}

