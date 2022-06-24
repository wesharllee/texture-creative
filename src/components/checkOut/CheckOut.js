import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"





export const CheckOutPage = () => {
    const { id } = useParams()

    const [lights, setLights] = useState({})
    // const [lightPackage, setLightPackage] = useState({})
    const [fullInfoRentalPackage, setFullInfoRentalPackage] = useState({})
    const [rentalPackage, setPackage] = useState({})
    // const [rentalBookingPackage, setRentalBooking] = useState({})
    const navigate = useNavigate()

    const sendRequest = (rentalPackage) => {
        return fetch(`http://localhost:8080/rentalPackages/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rentalPackage)
        })

    }

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8080/bookingDates/${id}`)
    //             .then(response => response.json())
    //             .then((bookingPackageObj) => {
    //                 setRentalBooking(bookingPackageObj)
    //             })
    //     },
    //     [id]
    // )

    useEffect(
        () => {
            fetch(`http://localhost:8080/lights`)
                .then(response => response.json())
                .then((lights) => {
                    setLights(lights)
                })
        },
        []
    )

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

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8080/lightpackages/?rentalPackageId=${id}&_expand=rentalPackage&_expand=bookingdate`)
    //             .then(response => response.json())
    //             .then((lightPackageObj) => {
    //                 setLightPackage(lightPackageObj)
    //             })

    //     },
    //     [id]
    // )

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8080/rentalPackages/${id}?_embed=backdropPackages&_embed=propPackages&_embed=furniturePackages&_embed=lightPackages`)
    //             .then(response => response.json())
    //             .then((rentalPackage) => {
    //                 setFullInfoRentalPackage(rentalPackage)
    //             })
    //     },
    //     [id]
    // )

    useEffect(
        () => {
            fetch(`http://localhost:8080/rentalPackages/${id}?_embed=lightPackages`)
                .then(response => response.json())
                .then((rentalPackage) => {
                    setFullInfoRentalPackage(rentalPackage)
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

    let timeFunc = (time) => {
        if (parseFloat(time, 2) > 12) {
            return " PM"
        }
        else return " AM"
    }

    const DeleteButton = () => {
        return <button
            onClick={() => {
                fetch(`http://localhost:8080/rentalPackages/${id}`, {
                    method: "DELETE"
                })
                    .then(() => navigate(`/create`))
            }}>Delete
        </button>
    }

    
    const lightPriceFunc = (lightPackages) => {
        let lightArray = []
        for (const lightPackage of lightPackages) {
            let newLightObj = lights.find(light => light.id === lightPackage.lightId)
            lightArray.push(newLightObj)
        }
        let price = 0
        for(const lightObj of lightArray) {
            price += lightObj.lightCost
        }
        return price
    }

    

    let hourPrice = hourlyCost(rentalPackage?.bookingDate?.totalHours)
    let lightPrice = fullInfoRentalPackage.lightPackages ? lightPriceFunc(fullInfoRentalPackage?.lightPackages) : 0 
    let total = totalCost(lightPrice, hourPrice)
    let from = timeFormat(rentalPackage?.bookingDate?.startTime)
    let until = timeFormat(rentalPackage?.bookingDate?.endTime)
    let dateBooked = new Date(rentalPackage?.bookingDate?.date).toLocaleDateString('en-US', { timeZone: 'UTC' })
    let name = rentalPackage?.user?.name
    let startTime = timeFunc(rentalPackage?.bookingDate?.startTime)
    let endTime = timeFunc(rentalPackage?.bookingDate?.endTime)

    return <>
        <h2>This will be checkout</h2>

        <article>
            <div className="checkout_dateBooked">

                <section key={rentalPackage.id}>
                    <div value={rentalPackage.id}>
                        {name} has requested to book Texture Creative Studio for {dateBooked} from {from}{startTime} until {until}{endTime}</div>
                    <div value={rentalPackage.id}>Venue Rental: ${hourPrice} </div>
                    <div value={rentalPackage.id}>Light Rental: ${lightPrice} </div>
                    <div value={rentalPackage.id}>Total: ${total} </div>
                </section>




            </div>
            <div className="liability_form">
                I Won't Break Your Shiz

                <button onClick={
                    () => {
                        const copy = { ...rentalPackage }
                        copy.eSign = true
                        copy.totalCost = total
                        setPackage(copy)

                    }
                }>I'm Liable</button>

            </div>


        </article>

        <button onClick={(evt) => {
            navigate(`/edit/${id}`)
        }}>Edit</button>

        <button onClick={(evt) => {
            sendRequest(rentalPackage)
                .then(() => navigate(`/confirmation/${id}`))
        }}>Send Request</button>

        {DeleteButton()}



    </>

}


/* <div>Price: {requestObj?.diveSite?.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div> */