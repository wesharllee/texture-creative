import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const [chosenBackdrops, setChosenBackdrops] = useState([])
const [chosenProps, setChosenProps] = useState([])
const [chosenFurnitures, setChosenFurnitures] = useState([])
const [chosenLights, setChosenLights] = useState([])
const [foundPackages, setFoundPackages] = useState([])
const [filteredBackdrops, setFilteredBackdrops] = useState([])
const [backdropPackages, setBackdropPackages] = useState([])

export const DeleteButton = ({ rentalPackage, rentalBookingPackage }) => {
    const navigate = useNavigate()


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
            fetch(`http://localhost:8080/backdropPackages/?rentalPackageId=${rentalPackage.id}`)
                .then(response => response.json())
                .then((packagesArray) => {
                    setChosenBackdrops(packagesArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/propPackages/?rentalPackageId=${rentalPackage.id}`)
                .then(response => response.json())
                .then((packagesArray) => {
                    setChosenProps(packagesArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/furniturePackages/?rentalPackageId=${rentalPackage.id}`)
                .then(response => response.json())
                .then((packagesArray) => {
                    setChosenFurnitures(packagesArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/backdropPackages/?rentalPackageId=${rentalPackage.id}`)
                .then(response => response.json())
                .then((packagesArray) => {
                    setChosenLights(packagesArray)
                })
        },
        []
    )

    const deleteFunc = (packs) => {
        for (const pack of packs) {
            if (pack.rentalPackageId === 4/*rentalPackage.id*/) {
                // fetch(`http://localhost:8080/backdropPackages/${pack.id}`, {
                //     method: "DELETE"
                // })
                console.log(taco)
            }
        }
    }

    const backdropPackageFunc = (pack) => {
        let backdropPack = pack.filter(pack => pack.rentalPackageId === rentalPackage.id)
        setFilteredBackdrops(backdropPack)
    }

    const packageOptionFunc = (chosenPackages) => {
        let foundPackage = chosenPackages.filter(chosenPackage => chosenPackage.rentalPackageId === rentalPackage.id)
        setFoundPackages(foundPackage)
    }


    let backdropDelete = deleteFunc(backdropPackages)

    let propDelete = fetch(`http://localhost:8080/propPackages/${packageOptionFunc(chosenProps)}`, {
        method: "DELETE"
    })

    let furnitureDelete = fetch(`http://localhost:8080/furniturePackages/${packageOptionFunc(chosenFurnitures)}`, {
        method: "DELETE"
    })

    let lightDelete = fetch(`http://localhost:8080/lightPackages/${packageOptionFunc(chosenLights)}`, {
        method: "DELETE"
    })

    let deleteArray = [backdropDelete]//, propDelete, furnitureDelete, lightDelete//]


    return <button onClick={() => {
        Promise.all(deleteArray)
        fetch(`http://localhost:8080/bookingDates/${rentalBookingPackage.id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8080/rentalPackages/${rentalPackage.id}`, {
                    method: "DELETE"
                })
            })
            .then(() => navigate(`/create`))

    }} className="package__delete">Delete</button>
}

