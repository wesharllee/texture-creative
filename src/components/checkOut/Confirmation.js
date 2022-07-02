import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Confirmation.css"


export const ConfirmationPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()


    const [rentalPackage, setPackage] = useState({})


    useEffect(
        () => {
            fetch(`http://localhost:8080/rentalPackages/${id}?_expand=bookingDate&_expand=user`)
                .then(response => response.json())
                .then((packageObj) => {
                    setPackage(packageObj)
                })
        },
        [id]
    )

    let timeFormat = (time) => {
        if (parseFloat(time, 2) > 12) {
            let newTime = parseFloat(time, 2) - 12
            return newTime
        }
        else {
            let newTime = parseFloat(time, 2)
            return newTime
        }
    }

    let timeFunc = (time) => {
        if (parseFloat(time, 2) > 12) {
            return " PM"
        }
        else return " AM"
    }

    let total = rentalPackage?.totalCost
    let from = timeFormat(rentalPackage?.bookingDate?.startTime)
    let until = timeFormat(rentalPackage?.bookingDate?.endTime)
    let dateBooked = new Date(rentalPackage?.bookingDate?.date).toLocaleDateString('en-US', { timeZone: 'UTC' })
    let name = rentalPackage?.user?.firstName
    let startTime = timeFunc(rentalPackage?.bookingDate?.startTime)
    let endTime = timeFunc(rentalPackage?.bookingDate?.endTime)



    return <>
        <h2>Your Request Has Been Sent!</h2>

        <article className="confirmationPage">
            <div className="confirmation">

                <section className="RequestsBox" key={rentalPackage.id}>
                    <div className="MarginBuffer">
                        <div className="NameValue" value={rentalPackage.id}>
                            Hey {name}! Thanks for your request.</div>
                        <div value={rentalPackage.id}>Date: {dateBooked}</div>
                        <div value={rentalPackage.id}>Time: {from}{startTime} - {until}{endTime}</div>
                        <div value={rentalPackage.id}>Total: ${total}</div>
                    </div>
                    <div className="ThanksContainer">
                        <div>We Will Confirm Within 24 Hours</div>
                    </div>
                    <div className="ConfirmationButtonContainer">
                        <button className="buttonz" onClick={() => navigate("/home")} >home</button>
                        <button className="buttonz" onClick={() => navigate("/mydates")} >my dates</button>
                    </div>
                </section>

            </div>
        </article>



    </>

}

