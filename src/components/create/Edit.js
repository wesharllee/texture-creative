import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"




export const EditPage = () => {
    const { id } = useParams()


    const [rentalPackage, updatePackage] = useState({
        id: "",
        userId: "",
        bookingDateId: "",
        backdropId: "",
        propId: "",
        furnitureId: "",
        lightId: "",
        totalCost: "",
        eSign: ""

    })
    const [rentalBookingPackage, updateRentalBooking] = useState({
        id: "",
        date: "",
        startTime: "",
        endTime: "",
        totalHours: ""
    })
    const navigate = useNavigate()

    const [backdrops, setBackdrops] = useState([])
    const [props, setProps] = useState([])
    const [furnitures, setFurnitures] = useState([])
    const [lights, setLights] = useState([])

    const minus = (startHour, endHour) => {
        let result = endHour - startHour
        return result
    }

    const editButtonClick = (clickEvent, rentalPackage, rentalBookingPackage) => {
        clickEvent.preventDefault()

        fetch(`http://localhost:8080/bookingDates/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rentalBookingPackage)
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:8080/rentalPackages/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(rentalPackage)
                })
                    .then(response => response.json())
                    .then(() => { navigate(`/checkout/${id}`) })
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8080/rentalPackages/${id}`)
                .then(response => response.json())
                .then((packageObj) => {
                    updatePackage(packageObj)
                })

        },
        [id]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8080/bookingDates/${id}`)
                .then(response => response.json())
                .then((packageObj) => {
                    updateRentalBooking(packageObj)
                })

        },
        [id]
    )
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
                    <select value={rentalPackage.backdropId}
                        onChange={
                            (event) => {
                                const copy = { ...rentalPackage }
                                copy.backdropId = parseInt(event.target.value)
                                updatePackage(copy)
                            }
                        }>
                        <option value="0">Please Select Backdrops</option>
                        {backdrops.map((backdrop) => {
                            return <option key={backdrop.id} value={backdrop.id}> {backdrop.name} {backdrop.image} </option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="create-group">
                    <label htmlFor="props">Choose Props:</label>
                    <select value={rentalPackage.propId}
                        onChange={
                            (event) => {
                                const copy = { ...rentalPackage }
                                copy.propId = parseInt(event.target.value)
                                updatePackage(copy)
                            }
                        }>
                        <option value="0">Please Select Props</option>
                        {props.map((prop) => {
                            return <option key={prop.id} value={prop.id}> {prop.name} {prop.image} </option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="create-group">
                    <label htmlFor="furnitures">Choose Furniture:</label>
                    <select value={rentalPackage.furnitureId}
                        onChange={
                            (event) => {
                                const copy = { ...rentalPackage }
                                copy.furnitureId = parseInt(event.target.value)
                                updatePackage(copy)
                            }
                        }>
                        <option value="0" >Please Select Furniture</option>
                        {furnitures.map((furniture) => {
                            return <option key={furniture.id} value={furniture.id}> {furniture.name} {furniture.image} </option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="create-group">
                    <label htmlFor="lights">Choose Lights:</label>
                    <select value={rentalPackage.lightId}
                        onChange={
                            (event) => {
                                const copy = { ...rentalPackage }
                                copy.lightId = parseInt(event.target.value)
                                updatePackage(copy)
                            }
                        }>
                        <option value="0">Please Select Lights</option>
                        {lights.map((light) => {
                            return <option key={light.id} value={light.id}> {light.name} {light.image} </option>
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
                        value={rentalBookingPackage.date}
                        onChange={
                            (evt) => {
                                const copy = { ...rentalBookingPackage }
                                copy.date = evt.target.value
                                updateRentalBooking(copy)
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
                        value={rentalBookingPackage.startTime}
                        onChange={
                            (evt) => {
                                const copy = { ...rentalBookingPackage }
                                copy.startTime = evt.target.value
                                updateRentalBooking(copy)
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
                        value={rentalBookingPackage.endTime}
                        onChange={
                            (evt) => {
                                const copy = { ...rentalBookingPackage }
                                copy.endTime = evt.target.value
                                copy.totalHours = minus(parseFloat(copy.startTime, 2), parseFloat(copy.endTime, 2))
                                updateRentalBooking(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => editButtonClick(clickEvent, rentalPackage, rentalBookingPackage)}
                className="package__edit">
                Confirm Edits
            </button>
        </form >
    )



}

