import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Checkout.css"





export const CheckOutPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [lights, setLights] = useState({})
    const [fullInfoRentalPackage, setFullInfoRentalPackage] = useState({})
    const [rentalPackage, setPackage] = useState({})
    const [isShown, setIsShown] = useState(false)

    const sendRequest = (rentalPackage) => {
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
        return <button className="buttonz"
            onClick={() => {
                fetch(`http://localhost:8080/rentalPackages/${id}`, {
                    method: "DELETE"
                })
                    .then(() => navigate(`/create`))
            }}>delete
        </button>
    }


    const lightPriceFunc = (lightPackages) => {
        let lightArray = []
        for (const lightPackage of lightPackages) {
            let newLightObj = lights.find(light => light.id === lightPackage.lightId)
            lightArray.push(newLightObj)
        }
        let price = 0
        for (const lightObj of lightArray) {
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
    let first = rentalPackage?.user?.firstName
    let last = rentalPackage?.user?.lastName
    let startTime = timeFunc(rentalPackage?.bookingDate?.startTime)
    let endTime = timeFunc(rentalPackage?.bookingDate?.endTime)

    return <>
        {/* <h2>Checkout</h2> */}
        <section className="CheckoutPage">
            <article>
                <div className="checkout_dateBooked">

                    <section className="RequestInfo" key={rentalPackage.id}>
                        <h3>Hey {first} {last}! <br/> <br/>Here are your booking details</h3>
                        <div className="requestify">
                            <div className="requestify1" value={rentalPackage.id}>Date: {dateBooked} <br /> Time: {from}{startTime} - {until}{endTime}  </div>
                            <div className="requestify2" value={rentalPackage.id}>Venue Rental: ${hourPrice} <br />Light Rental: ${lightPrice} </div>
                        </div>
                        <div className="requestTotal" value={rentalPackage.id}>Total: ${total} </div>
                    </section>
                    <div className="liability_form">
                        <div className="LiabilityBox">

                            <h6>I understand that I am financially responsible <br />
                                for any damage done at Texture Creative Studio <br />
                                including but not limited to any equipment
                                lost, <br />stolen or damaged.<br /><br />
                                By clicking "I Agree", I accept full liability.
                            </h6>
                            <div className="LiableButtonContainer">
                                <button className="LiableButton"
                                    onClick={
                                        () => {
                                            const copy = { ...rentalPackage }
                                            copy.eSign = true
                                            copy.totalCost = total
                                            setPackage(copy)
                                        }
                                    }>I Agree
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </article>
            <article className="CheckoutButtonContainer">

                <button className="buttonz" onClick={(evt) => {
                    if (rentalPackage.totalCost > 0) {
                        sendRequest(rentalPackage)
                            .then(() => navigate(`/confirmation/${id}`))
                    }
                    else {
                        window.alert("Please Agree to Terms of Service")
                    }
                }}>confirm</button>

                <button className="buttonz" onClick={(evt) => {
                    navigate(`/edit/${id}`)
                }}>edit</button>

                {DeleteButton()}

            </article>
        </section>

    </>

}


/* <div>Price: {requestObj?.diveSite?.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div> */