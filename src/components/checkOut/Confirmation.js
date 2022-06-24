import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


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
    let name = rentalPackage?.user?.name
    let startTime = timeFunc(rentalPackage?.bookingDate?.startTime)
    let endTime = timeFunc(rentalPackage?.bookingDate?.endTime)



    return <>
        <h2>This will be confirmation</h2>

        <article>
            <div className="confirmation_dateBooked">

                <section key={rentalPackage.id}>
                    <div value={rentalPackage.id}>
                        {name} has requested to book Texture Creative Studio for {dateBooked} from {from}{startTime} until {until}{endTime}</div>
                    <div value={rentalPackage.id}>Price: ${total}</div>
                </section>

            </div>
            <div>We Will Confirm Within 24 Hours</div>
            <div>Thank You</div>


            <button onClick={() => navigate("/home")} >Home</button>
            <button onClick={() => navigate("/mydates")} >My Dates</button>





        </article>


    </>

}

