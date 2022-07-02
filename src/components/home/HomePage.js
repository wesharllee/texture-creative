import { useNavigate } from "react-router-dom"
import "./Home.css"


export const HomePage = () => {
    const navigate = useNavigate()
    const localTextureUser = localStorage.getItem("texture_user")
    const textureUserObject = JSON.parse(localTextureUser)

    const homeImage = require("./Images/homeImage.png")

    return <section className="HomePage">
        <article className="homeContainer">
            
            <img src={homeImage} alt="homephoto" className="homePhoto" />
            <div className="bio">
                <h1>A DIY Photo Studio</h1>
                <div className="paragraph">
                We wanted to create a studio space for all of Music City’s misfits. 
                This is a studio where the sky is the limit on the images you can create 
                for your portfolio or your next album cover. <br/>
                Shoot in our pre-styled, rotating sets or allow us to build you something custom. 
                Unique and vintage props and decor to pull from so that you can always create 
                photos with texture.
                </div>
            </div>
        </article>
   
        {textureUserObject.staff === true ?
            <>
                {
                    <div className="getCentered">
                        <button className="buttonz" onClick={() => navigate("/employeelounge")} >employee lounge</button>
                    </div>
                }
            </>
            :
            <>
                {
                    <div className="getCentered">
                        <button className="buttonz" onClick={() => navigate("/create")} >create your experience</button>
                    </div>
                }

            </>
        }
    </section>
}


