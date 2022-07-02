import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"





export const MyDatesPage = () => {

    const localTextureUser = localStorage.getItem("texture_user")
    const textureUserObject = JSON.parse(localTextureUser)
    const navigate = useNavigate()

    const [rentalPackages, setPackages] = useState([])
    const [myFilteredPackages, setMyFiltered] = useState([])
    const [users, setUsers] = useState([])
    const [myUser, setMyUser] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8080/rentalPackages/?_expand=bookingDate&_expand=user`)
                .then(response => response.json())
                .then((packagesArray) => {
                    setPackages(packagesArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8080/users`)
                .then(response => response.json())
                .then((UsersArray) => {
                    setUsers(UsersArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const user = users.find(user => user?.id === textureUserObject?.id)
            setMyUser(user)
        },
        [users]
    )

    useEffect(
        () => {
            const myPackages = rentalPackages.filter(rentalPackage => rentalPackage?.user?.id === textureUserObject?.id)
            setMyFiltered(myPackages)
        },
        [rentalPackages]
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

    let name = myUser?.firstName
    console.log(users)

    return <>
        <h2>Upcoming Dates</h2>

        <section className="DatesPage">
            <article className="thanksTitleContainer">
                <div className="thanksTitle" key={myUser?.id}>Thanks {name}! Here are your current requests:</div>
            </article>

            <article>
                <div className="confirmation_dateBooked">

                    {myFilteredPackages?.reverse()?.map((rentalPackage) => {

                        let total = rentalPackage?.totalCost
                        let from = timeFormat(rentalPackage?.bookingDate?.startTime)
                        let until = timeFormat(rentalPackage?.bookingDate?.endTime)
                        let dateBooked = new Date(rentalPackage?.bookingDate?.date).toLocaleDateString('en-US', { timeZone: 'UTC' })
                        let startTime = timeFunc(rentalPackage?.bookingDate?.startTime)
                        let endTime = timeFunc(rentalPackage?.bookingDate?.endTime)



                        return <section className="requestsBox" key={rentalPackage?.id}>
                            <div value={rentalPackage.id} >
                                <div value={rentalPackage?.id}>
                                    {dateBooked} from {from}{startTime} until {until}{endTime}</div>
                                <div value={rentalPackage?.id}>Price: ${total}</div>
                            </div>
                        </section>
                    })}
                </div>

                <div className="ConfirmationButtonContainer">
                    <button className="buttonz" onClick={() => navigate("/home")} >home</button>
                    {/* <button className="buttonz" onClick={() => navigate("/mydates")} >my dates</button> */}
                </div>



            </article>
        </section>

    </>

}

