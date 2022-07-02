import { useState } from "react"
import { useNavigate } from "react-router-dom"



export const LandingPage = () => {
    const navigate = useNavigate()

    const [isShown, setIsShown] = useState(false)




    const mainImage = require("./Images/mainImage.png")
    return <>
        <h1 className="mainTitle">Texture Creative</h1>

        <section className="wrapper grain-overlay" onMouseEnter={() => setIsShown(true)} /*onMouseLeave={() => setIsShown(false)}*/ onClick={() => navigate("/login")}>
            <div className="content">
                <img onMouseEnter={() => setIsShown(true)} /*onMouseLeave={() => setIsShown(false)}*/ onClick={() => navigate("/login")} src={mainImage} alt="mainphoto" className="mainPhoto" />

            </div>

        </section>
        {isShown && (
            <div className="getRight">
                <button className="buttonz" onClick={() => navigate("/login")} >book texture creative</button>
            </div>
        )}
        {/* <div className="getCentered">
            <button className="buttonz" onClick={() => navigate("/login")} >Book Texture Creative</button>
        </div> */}
    </>
}
