import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"




export const CheckOutPage = () => {
    const { id } = useParams()
    
    
    const [rentalPackage, setPackage] = useState({})
    const navigate = useNavigate()
    
    const updateSignature = (rentalPackage) => {
        return fetch(`http://localhost:8080/rentalPackages/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rentalPackage)
        })
            
    }

    useEffect(
        () => {
            fetch(`http://localhost:8080/rentalPackages/${id}?_expand=bookingDate&_expand=light&_expand=user`)
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

    let hourlyCost = (hours) => {
        let costOfHours = parseInt(hours) * 75
        return costOfHours
    }



    let totalCost = (lightCost, hourCost) => {
        let totalPrice = lightCost + hourCost
        return totalPrice

    }


    let price = totalCost(rentalPackage?.light?.lightCost, hourlyCost(rentalPackage?.bookingDate?.totalHours))
    let from = timeFormat(rentalPackage?.bookingDate?.startTime)
    let until = timeFormat(rentalPackage?.bookingDate?.endTime)
    let dateBooked = new Date(rentalPackage?.bookingDate?.date).toLocaleDateString()
    let name = rentalPackage?.user?.name

    return <>
        <h2>This will be checkout</h2>

        <article>
            <div className="checkout_dateBooked">

                <section key={rentalPackage.id}>
                    <div value={rentalPackage.id}>
                        {name} has requested to book Texture Creative Studio for {dateBooked} from {from} until {until}</div>
                    <div value={rentalPackage.id}>Price: ${price}</div>
                </section>




            </div>
            <div className="liability_form">
                I Won't Break Your Shiz

                <button onClick={
                    () => {
                        const copy = { ...rentalPackage }
                        copy.eSign = true
                        setPackage(copy)
                        
                    }
                }>I'm Liable</button>

            </div>


        </article>

        <button onClick={(evt) => {
            updateSignature(rentalPackage)
            .then( () => navigate("/confirmation"))
            } }>Send Request</button>
        

    </>

}


/* <div>Price: {requestObj?.diveSite?.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div> */