import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const CreatePage = () => {
    const localTextureUser = localStorage.getItem("texture_user")
    const textureUserObject = JSON.parse(localTextureUser)
    const Navigate = useNavigate()
    
    const [newRental, updateRental] = useState({

        userId: textureUserObject.id,
        bookingDateId: 0,
        backdropId: 0,
        propId: 0,
        furnitureId: 0,
        lightId: 0,
        totalcost: 0

    })

    const [newBooking, updateBooking] = useState({

        date: "",
        startTime: "00:00",
        endTime: "00:00",
        totalHours: 0
    })
    const [backdrops, setBackdrops] = useState([])
    const [props, setProps] = useState([])
    const [furnitures, setFurnitures] = useState([])
    const [lights, setLights] = useState([])
   


    const minus = (startHour, endHour) => { 
        let result = endHour - startHour
        return result
    }


    const bookButtonClick = (event) => {
        event.preventDefault()



        return fetch(`http://localhost:8080/bookingDates`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBooking)
        })
            .then(response => response.json())
            .then((newRentalObj) => {
                const RentalPackage = {
                    userId: textureUserObject.id,
                    bookingDateId: newRentalObj.id,
                    backdropId: newRental.backdropId,
                    propId: newRental.propId,
                    furnitureId: newRental.furnitureId,
                    lightId: newRental.lightId,
                    totalCost: 0,
                    eSign: false
                }
                fetch(`http://localhost:8080/rentalPackages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(RentalPackage)
                })
                    .then(response => response.json())
                    .then((response) => {
                        Navigate(`/checkout/${response.id}`)
                    })
            })
    }




    useEffect(
        () => {
            fetch(`http://localhost:8080/backdrops`)
                .then(response => response.json())
                .then((backdropsArray) => {
                    setBackdrops(backdropsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/props`)
                .then(response => response.json())
                .then((propsArray) => {
                    setProps(propsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/furnitures`)
                .then(response => response.json())
                .then((FurnituresArray) => {
                    setFurnitures(FurnituresArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/lights`)
                .then(response => response.json())
                .then((lightsArray) => {
                    setLights(lightsArray)
                })
        },
        []
    )

    



    return (
        <form className="createPage">
            <h2 className="createPage__title">This will be create</h2>
            <fieldset>
                <div className="create-group">
                    <label htmlFor="backdrops">Choose Backdrops:</label>
                    <select value={newRental.backdropId}
                        onChange={
                            (event) => {
                                const copy = { ...newRental }
                                copy.backdropId = parseInt(event.target.value)
                                updateRental(copy)
                            }
                        }>
                        <option value="0">Please Select Backdrops</option>
                        {backdrops.map((backdrop) => {
                            return <option value={backdrop.id}> {backdrop.name} {backdrop.image} </option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="create-group">
                    <label htmlFor="props">Choose Props:</label>
                    <select value={newRental.propId}
                        onChange={
                            (event) => {
                                const copy = { ...newRental }
                                copy.propId = parseInt(event.target.value)
                                updateRental(copy)
                            }
                        }>
                        <option value="0">Please Select Props</option>
                        {props.map((prop) => {
                            return <option value={prop.id}> {prop.name} {prop.image} </option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="create-group">
                    <label htmlFor="furnitures">Choose Furniture:</label>
                    <select value={newRental.furnitureId}
                        onChange={
                            (event) => {
                                const copy = { ...newRental }
                                copy.furnitureId = parseInt(event.target.value)
                                updateRental(copy)
                            }
                        }>
                        <option value="0">Please Select Furniture</option>
                        {furnitures.map((furniture) => {
                            return <option value={furniture.id}> {furniture.name} {furniture.image} </option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="create-group">
                    <label htmlFor="lights">Choose Lights:</label>
                    <select value={newRental.lightId}
                        onChange={
                            (event) => {
                                const copy = { ...newRental }
                                copy.lightId = parseInt(event.target.value)
                                updateRental(copy)
                            }
                        }>
                        <option value="0">Please Select Lights</option>
                        {lights.map((light) => {
                            return <option value={light.id}> {light.name} {light.image} </option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="book__date">Book Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        value={newBooking.date}
                        onChange={
                            (evt) => {
                                const copy = { ...newBooking }
                                copy.date = evt.target.value
                                updateBooking(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="book__startTime">Start Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        value={newBooking.startTime}
                        onChange={
                            (evt) => {
                                const copy = { ...newBooking }
                                copy.startTime = evt.target.value
                                updateBooking(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="book__endTime">End Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        value={newBooking.endTime}
                        onChange={
                            (evt) => {
                                const copy = { ...newBooking }
                                copy.endTime = evt.target.value
                                copy.totalHours = minus(parseFloat(copy.startTime, 2), parseFloat(copy.endTime, 2))
                                updateBooking(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => bookButtonClick(clickEvent)}
                className="btn btn-primary">
                Book Your Session
            </button>
        </form >
    )
}


