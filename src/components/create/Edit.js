import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Select from 'react-select'
import "./Create.css"




export const EditPage = () => {
    const { id } = useParams()


    const [rentalPackage, updatePackage] = useState({
        id: "",
        userId: "",
        bookingDateId: "",
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

    const [backdropChoices, setBackdropChoices] = useState([])
    const [propChoices, setPropChoices] = useState([])
    const [furnitureChoices, setFurnitureChoices] = useState([])
    const [lightChoices, setLightChoices] = useState([])

    const [selectedBackdropOptions, setSelectedBackdropOption] = useState([])
    const [selectedPropOptions, setSelectedPropOption] = useState([])
    const [selectedFurnitureOptions, setSelectedFurnitureOption] = useState([])
    const [selectedLightOptions, setSelectedLightOption] = useState([])

    const [backdropPackages, setBackdropPackages] = useState([])
    const [propPackages, setPropPackages] = useState([])
    const [furniturePackages, setFurniturePackages] = useState([])
    const [lightPackages, setLightPackages] = useState([])

    const [backdropsArray, setBackdropsArray] = useState([])
    const [propsArray, setPropsArray] = useState([])
    const [furnituresArray, setFurnituresArray] = useState([])
    const [lightsArray, setLightsArray] = useState([])

    const handleBackdropChange = evt => {
        setSelectedBackdropOption(evt)
    }
    const handlePropChange = evt => {
        setSelectedPropOption(evt)
    }
    const handleFurnitureChange = evt => {
        setSelectedFurnitureOption(evt)
    }
    const handleLightChange = evt => {
        setSelectedLightOption(evt)
    }

    const minus = (startHour, endHour) => {
        let result = endHour - startHour
        return result
    }

    useEffect(
        () => {
            fetch(`http://localhost:8080/backdropPackages`)
                .then(response => response.json())
                .then((packagesArray) => {
                    setBackdropPackages(packagesArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/propPackages`)
                .then(response => response.json())
                .then((packagesArray) => {
                    setPropPackages(packagesArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/furniturePackages`)
                .then(response => response.json())
                .then((packagesArray) => {
                    setFurniturePackages(packagesArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/lightPackages`)
                .then(response => response.json())
                .then((packagesArray) => {
                    setLightPackages(packagesArray)
                })
        },
        []
    )

    const editButtonClick = (clickEvent, rentalPackage, rentalBookingPackage) => {
        clickEvent.preventDefault()

        const backdropPutFunc = (packs) => {
            for (const pack of packs) {
                if (pack.rentalPackageId === rentalPackage.id) {
                    fetch(`http://localhost:8080/backdropPackages/${pack.id}`, {
                        method: "DELETE"
                    })
                }
            }
        }
        const backdropDelete = backdropPutFunc(backdropPackages)

        const propPutFunc = (packs) => {
            for (const pack of packs) {
                if (pack.rentalPackageId === rentalPackage.id) {
                    fetch(`http://localhost:8080/propPackages/${pack.id}`, {
                        method: "DELETE"
                    })
                }
            }
        }
        const propDelete = propPutFunc(propPackages)

        const furniturePutFunc = (packs) => {
            for (const pack of packs) {
                if (pack.rentalPackageId === rentalPackage.id) {
                    fetch(`http://localhost:8080/furniturePackages/${pack.id}`, {
                        method: "DELETE"
                    })
                }
            }
        }
        const furnitureDelete = furniturePutFunc(furniturePackages)

        const lightPutFunc = (packs) => {
            for (const pack of packs) {
                if (pack.rentalPackageId === rentalPackage.id) {
                    fetch(`http://localhost:8080/lightPackages/${pack.id}`, {
                        method: "DELETE"
                    })
                }
            }
        }
        const lightDelete = lightPutFunc(lightPackages)




        let deleteArray = [backdropDelete, propDelete, furnitureDelete, lightDelete]

        const createBackdropPackagePost = (backdropPackageObj) => {
            return fetch(`http://localhost:8080/backdroppackages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(backdropPackageObj)
            })
        }

        const createPropPackagePost = (propPackageObj) => {
            return fetch(`http://localhost:8080/proppackages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(propPackageObj)
            })
        }

        const createFurniturePackagePost = (furniturePackageObj) => {
            return fetch(`http://localhost:8080/furniturepackages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(furniturePackageObj)
            })
        }

        const createLightPackagePost = (lightPackageObj) => {
            return fetch(`http://localhost:8080/lightpackages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(lightPackageObj)
            })
        }



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
                    .then((newRentalPackage) => {
                        Promise.all(deleteArray)

                        let promArray = []
                        //iterate through each option of options
                        for (const selectedBackdropOption of selectedBackdropOptions) {
                            //create new object for optionPackage
                            const backdropPackage = {
                                //get rentalPackageId from json newRentalPackage variable Id
                                rentalPackageId: newRentalPackage.id,
                                //get backdropId from iterated option
                                backdropId: selectedBackdropOption.id
                            }
                            //create new variable to hold fetch post function and pass new optionPackage object
                            const backdropPost = createBackdropPackagePost(backdropPackage)
                            //push to promise array
                            promArray.push(backdropPost)
                        }

                        for (const selectedPropOption of selectedPropOptions) {
                            const propPackage = {
                                rentalPackageId: newRentalPackage.id,
                                propId: selectedPropOption.id
                            }
                            const propPost = createPropPackagePost(propPackage)
                            promArray.push(propPost)
                        }

                        for (const selectedFurnitureOption of selectedFurnitureOptions) {
                            const furniturePackage = {
                                rentalPackageId: newRentalPackage.id,
                                furnitureId: selectedFurnitureOption.id
                            }
                            const furniturePost = createFurniturePackagePost(furniturePackage)
                            promArray.push(furniturePost)
                        }

                        for (const selectedLightOption of selectedLightOptions) {
                            const lightPackage = {
                                rentalPackageId: newRentalPackage.id,
                                lightId: selectedLightOption.id
                            }
                            const lightPost = createLightPackagePost(lightPackage)
                            promArray.push(lightPost)
                        }

                        //create a promise.all function and pass promise array through it
                        Promise.all(promArray)
                            //call back function containing Navigate (useNavigate())
                            .then(() => {
                                //navigate to the checkout page for current rental package
                                navigate(`/checkout/${newRentalPackage.id}`)
                            })
                    })

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
            fetch(`http://localhost:8080/backdrops/?rentalPackageId=${id}`)
                .then(response => response.json())
                .then((backdropsArray) => {
                    setBackdrops(backdropsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/props?rentalPackageId=${id}`)
                .then(response => response.json())
                .then((propsArray) => {
                    setProps(propsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/furnitures?rentalPackageId=${id}`)
                .then(response => response.json())
                .then((FurnituresArray) => {
                    setFurnitures(FurnituresArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/lights?rentalPackageId=${id}`)
                .then(response => response.json())
                .then((lightsArray) => {
                    setLights(lightsArray)
                })
        },
        []
    )

    const backdropFind = () => {
        let array = []
        for (const selectedBackdropOption of selectedBackdropOptions) {
            const newBackdropObj = backdrops.find(backdrop => backdrop?.id === selectedBackdropOption?.id)
            array.push(newBackdropObj)
        }
        setBackdropsArray(array)
    }

    useEffect(
        () => {
            backdropFind()
        }, [selectedBackdropOptions]
    )

    const propFind = () => {
        let array = []
        for (const selectedPropOption of selectedPropOptions) {
            const newpropObj = props.find(prop => prop?.id === selectedPropOption?.id)
            array.push(newpropObj)
        }
        setPropsArray(array)
    }

    useEffect(
        () => {
            propFind()
        }, [selectedPropOptions]
    )

    const furnitureFind = () => {
        let array = []
        for (const selectedFurnitureOption of selectedFurnitureOptions) {
            const newfurnitureObj = furnitures.find(furniture => furniture?.id === selectedFurnitureOption?.id)
            array.push(newfurnitureObj)
        }
        setFurnituresArray(array)
    }

    useEffect(
        () => {
            furnitureFind()
        }, [selectedFurnitureOptions]
    )

    const lightFind = () => {
        let array = []
        for (const selectedLightOption of selectedLightOptions) {
            const newlightObj = lights.find(light => light?.id === selectedLightOption?.id)
            array.push(newlightObj)
        }
        setLightsArray(array)
    }

    useEffect(
        () => {
            lightFind()
        }, [selectedLightOptions]
    )

    const backdropRename = () => {
        let options = []
        for (const backdrop of backdrops) {
            backdrop.label = backdrop.name
            backdrop.value = backdrop.id
            options.push(backdrop)
        }
        setBackdropChoices(options)
    }

    useEffect(
        () => {
            backdropRename()
        }, [backdrops]
    )

    const propRename = () => {
        let options = []
        for (const prop of props) {
            prop.label = prop.name
            prop.value = prop.id
            options.push(prop)
        }
        setPropChoices(options)
    }

    useEffect(
        () => {
            propRename()
        },
        [props]
    )

    const furnitureRename = () => {
        let options = []
        for (const furniture of furnitures) {
            furniture.label = furniture.name
            furniture.value = furniture.id
            options.push(furniture)
        }
        setFurnitureChoices(options)
    }

    useEffect(
        () => {
            furnitureRename()
        },
        [furnitures]
    )

    const lightRename = () => {
        let options = []
        for (const light of lights) {
            light.label = light.name
            light.value = light.id
            options.push(light)
        }
        setLightChoices(options)
    }

    useEffect(
        () => {
            lightRename()
        },
        [lights]
    )

    return (
        <form className="CreatePage">

            <h2 className="createPage__title">Edit Your Experience</h2>

            <section className='CreateOptions'>

                <article className='CreateSelections'>
                    <fieldset className="MultiSelect">
                        <div className="content">
                            <Select
                                isMulti
                                placeholder="Backdrop Options"
                                //capture selected option
                                value={selectedBackdropOptions}
                                //use the variable option that has been copied w/ added value and label
                                options={backdropChoices}
                                //onChange create a function to call setter function for selected option
                                onChange={handleBackdropChange}
                            />
                            {/* display selected option inside of multi-select dropdown menu */}
                            {selectedBackdropOptions && <div style={{ marginTop: 20, lineHeight: '25px' }}>
                            </div>}
                        </div>
                    </fieldset>

                    <fieldset className="MultiSelect">
                        <div>
                            <Select
                                isMulti
                                placeholder="Prop Options"
                                value={selectedPropOptions}
                                options={propChoices}
                                onChange={handlePropChange}
                            />

                            {selectedPropOptions && <div style={{ marginTop: 20, lineHeight: '25px' }}>
                            </div>}
                        </div>
                    </fieldset>

                    <fieldset className="MultiSelect">
                        <div>
                            <Select
                                isMulti
                                placeholder="Furniture Options"
                                value={selectedFurnitureOptions}
                                options={furnitureChoices}
                                onChange={handleFurnitureChange}
                            />

                            {selectedFurnitureOptions && <div style={{ marginTop: 20, lineHeight: '25px' }}>
                            </div>}
                        </div>
                    </fieldset>

                    <fieldset className="MultiSelect">
                        <div>
                            <Select
                                isMulti
                                placeholder="Light Options($50)"
                                value={selectedLightOptions}
                                options={lightChoices}
                                onChange={handleLightChange}
                            />

                            {selectedLightOptions && <div style={{ marginTop: 20, lineHeight: '25px' }}>
                            </div>}
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
                </article>
                <article className='CreateImages'>
                    <div className='imageContainer'>

                        {backdropsArray.map(backdropObj =>
                            <img className="pic" src={backdropObj.image} alt="image" />
                        )}
                        {propsArray.map(propObj =>
                            <img className="pic" src={propObj.image} alt="image" />
                        )}
                        {furnituresArray.map(furnitureObj =>
                            <img className="pic" src={furnitureObj.image} alt="image" />
                        )}
                        {lightsArray.map(lightObj =>
                            <img className="pic" src={lightObj.image} alt="image" />
                        )}

                    </div>
                </article>
            </section>
            <div className='getCentered'>
                <button 
                    onClick={(clickEvent) => editButtonClick(clickEvent, rentalPackage, rentalBookingPackage)}
                    className="buttonz">
                    Confirm Edits
                </button>
            </div>
        </form >
    )
}

