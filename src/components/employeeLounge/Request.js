import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Request.css"


export const RequestsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [backdrops, setBackdrops] = useState([])
    const [props, setProps] = useState([])
    const [furnitures, setFurnitures] = useState([])
    const [lights, setLights] = useState([])
    const [rentalPackage, setPackage] = useState({})
    const [fullInfoRentalPackage, setFullInfoRentalPackage] = useState({})

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
                .then((lights) => {
                    setLights(lights)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/rentalPackages/${id}?_expand=user`)
                .then(response => response.json())
                .then((packageObj) => {
                    setPackage(packageObj)
                })
        },
        [id]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/rentalPackages/${id}?_embed=backdropPackages&_embed=propPackages&_embed=furniturePackages&_embed=lightPackages`)
                .then(response => response.json())
                .then((rentalPackage) => {
                    setFullInfoRentalPackage(rentalPackage)
                })
        },
        [id]
    )

    const backdropArrayFunc = (backdropPackages) => {
        let packageArray = []
        for (const backdropPackage of backdropPackages) {
            let newBackdropObj = backdrops.find(backdrop => backdrop.id === backdropPackage.backdropId)
            packageArray.push(newBackdropObj)
        }
        let nameString = ""
        for (let i = 0; i < packageArray.length; i++) {
            if ((packageArray.length - i) === 2) {
                nameString += `${packageArray[i].name} and `
            } else if (packageArray.length === (i + 1)) {
                nameString += `${packageArray[i].name}.`
            } else {
                nameString += `${packageArray[i].name}, `
            }
        }
        return nameString
    }

    const propArrayFunc = (propPackages) => {
        let packageArray = []
        for (const propPackage of propPackages) {
            let newPropObj = props.find(prop => prop.id === propPackage.propId)
            packageArray.push(newPropObj)
        }
        let nameString = ""
        for (let i = 0; i < packageArray.length; i++) {
            if ((packageArray.length - i) === 2) {
                nameString += `${packageArray[i].name} and `
            } else if (packageArray.length === (i + 1)) {
                nameString += `${packageArray[i].name}.`
            } else {
                nameString += `${packageArray[i].name}, `
            }
        }
        return nameString
    }

    const furnitureArrayFunc = (furniturePackages) => {
        let packageArray = []
        for (const furniturePackage of furniturePackages) {
            let newFurnitureObj = furnitures.find(furniture => furniture.id === furniturePackage.furnitureId)
            packageArray.push(newFurnitureObj)
        }
        let nameString = ""
        for (let i = 0; i < packageArray.length; i++) {
            if ((packageArray.length - i) === 2) {
                nameString += `${packageArray[i].name} and `
            } else if (packageArray.length === (i + 1)) {
                nameString += `${packageArray[i].name}.`
            } else {
                nameString += `${packageArray[i].name}, `
            }
        }
        return nameString
    }


    const lightArrayFunc = (lightPackages) => {
        let packageArray = []
        for (const lightPackage of lightPackages) {
            let newLightObj = lights.find(light => light.id === lightPackage.lightId)
            packageArray.push(newLightObj)
        }
        let nameString = ""
        for (let i = 0; i < packageArray.length; i++) {
            if ((packageArray.length - i) === 2) {
                nameString += `${packageArray[i].name} and `
            } else if (packageArray.length === (i + 1)) {
                nameString += `${packageArray[i].name}.`
            } else {
                nameString += `${packageArray[i].name}, `
            }
        }
        return nameString
    }


    const DeleteButton = () => {
        return <button className="buttonz"
            onClick={() => {
                fetch(`http://localhost:8080/rentalPackages/${id}`, {
                    method: "DELETE"
                })
                    .then(() => navigate(`/employeelounge`))
            }}>Delete
        </button>
    }


    let total = rentalPackage?.totalCost
    let backdropChoices = fullInfoRentalPackage.backdropPackages ? backdropArrayFunc(fullInfoRentalPackage?.backdropPackages) : 0
    let propChoices = fullInfoRentalPackage.propPackages ? propArrayFunc(fullInfoRentalPackage?.propPackages) : 0
    let furnitureChoices = fullInfoRentalPackage.furniturePackages ? furnitureArrayFunc(fullInfoRentalPackage?.furniturePackages) : 0
    let lightChoices = fullInfoRentalPackage.lightPackages ? lightArrayFunc(fullInfoRentalPackage?.lightPackages) : 0
    let first = rentalPackage?.user?.firstName
    let last = rentalPackage?.user?.lastName



    return <>
        <h2>{first} {last}'s Choices</h2>

<section className="RequestPage">
        <article>
            <div className="confirmation_dateBooked">

                <section className="Request" key={rentalPackage.id}>
                    {/* <div value={rentalPackage.id}>{first} {last}'s Choices</div> */}
                    <div value={rentalPackage.id}>
                        Backdrop Choices: {backdropChoices}
                    </div>
                    <div value={rentalPackage.id}>
                        Prop Choices: {propChoices}
                    </div>
                    <div value={rentalPackage.id}>
                        Furniture Choices: {furnitureChoices}
                    </div>
                    <div value={rentalPackage.id}>
                        Light Choices: {lightChoices}
                    </div>
                    {/* <div value={rentalPackage.id}>Price: ${total}</div> */}
                </section>

            </div>
        </article>
        <article className="getRightish">
            <button className="buttonz" onClick={() => navigate("/employeelounge")} >Employee Lounge</button>
            {DeleteButton()}
        </article>
</section>






    </>

}

