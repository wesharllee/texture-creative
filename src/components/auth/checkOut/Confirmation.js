import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ConfirmationPage = () => {
    const [rentalPackages, setPackages] = useState([])
    const navigate = useNavigate

    


    useEffect(
        () => {
            fetch(`http://localhost:8080/rentalPackages/?_expand=bookingDate&_expand=light&_expand=user`)
                .then(response => response.json())
                .then((packagesArray) => {
                    setPackages(packagesArray)
                })
        },
        []
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

    let hourlyCost = (hours) => {
        let costOfHours = parseInt(hours) * 75
        return costOfHours
    }



    let totalCost = (lightCost, hourCost) => {
        let totalPrice = lightCost + hourCost
        return totalPrice

    }




    return <>
        <h2>This will be confirmation</h2>

        <article>
            <div className="confirmation_dateBooked">

                {rentalPackages.map((rentalPackage) => {
                    let price = totalCost(rentalPackage?.light?.lightCost, hourlyCost(rentalPackage?.bookingDate?.totalHours))
                    let from = timeFormat(rentalPackage?.bookingDate?.startTime)
                    let until = timeFormat(rentalPackage?.bookingDate?.endTime)
                    let dateBooked = new Date(rentalPackage?.bookingDate?.date).toLocaleDateString()
                    let name = rentalPackage.user.name

                    return <section key={rentalPackage.id}>
                        <div value={rentalPackage.id}>
                            {name} has requested to book Texture Creative Studio for {dateBooked} from {from} until {until}</div>
                        <div value={rentalPackage.id}>Price: ${price}</div>
                    </section>
                })}
            </div>
                <div>We Will Confirm Within 24 Hours</div>
                <div>Thank You</div>
            <div className="liability_form">
                I Won't Break Your Shiz
                <button onClick={() => navigate("/home")} >Home</button>


            </div>


        </article>


    </>

}

