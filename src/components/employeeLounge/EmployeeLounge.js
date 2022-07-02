import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./EmployeeLounge.css"


export const EmployeeLoungePage = () => {
    // const { id } = useParams

    const localTextureUser = localStorage.getItem("texture_user")
    const textureUserObject = JSON.parse(localTextureUser)


    const navigate = useNavigate()
    const [rentalPackages, setPackages] = useState([])
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
            const user = textureUserObject?.id ? users.find(user => user?.id === textureUserObject?.id) : 0
            setMyUser(user)
        },
        [users]
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
            return "PM"
        }
        else return "AM"
    }

    let hasSigned = (signature) => {
        if (signature === true) {
            return "Yes"
        }
        else {
            return "No"
        }
    }

    

    // let firstName = textureUserObject?.id ? getFirstName(myUser?.name) : 0

    // let currentUserArray = getFirstName(myUser)

    // // let firstName = currentUserArray.firstName
    // console.log(currentUserArray)




    return <>
        <h2 className="personal" >Hey {myUser?.firstName},    <br />These People Want Stuff</h2>
        <h3></h3>

        <article>
            <div className="confirmation_dateBooked">

                {rentalPackages.reverse().map((rentalPackage) => {
                    let price = rentalPackage?.totalCost
                    let from = timeFormat(rentalPackage?.bookingDate?.startTime)
                    let until = timeFormat(rentalPackage?.bookingDate?.endTime)
                    let dateBooked = new Date(rentalPackage?.bookingDate?.date).toLocaleDateString('en-US', { timeZone: 'UTC' })
                    let first = rentalPackage.user.firstName
                    let last = rentalPackage.user.lastName
                    let email = rentalPackage.user.email
                    let phone = rentalPackage.user.phoneNumber
                    let signed = hasSigned(rentalPackage?.eSign)
                    let startTime = timeFunc(rentalPackage?.bookingDate?.startTime)
                    let endTime = timeFunc(rentalPackage?.bookingDate?.endTime)



                    return <section className="requestsBox" key={rentalPackage.id}>
                        <article>
                            <h4 value={rentalPackage.id}>
                                {first} {last} has requested to book:</h4>
                            <div value={rentalPackage.id}>Date: {dateBooked} from {from}{startTime} until {until}{endTime}</div>
                            <div value={rentalPackage.id}>Price: ${price}</div>
                            <div value={rentalPackage.id}>Phone Number: {phone}</div>
                            <div value={rentalPackage.id}>Email: {email}</div>
                            <div value={rentalPackage.id}>Has Signed Liability Form? {signed} </div>
                        </article>
                        <div className="employeeLoungeButtons">
                            <button className="buttonz" onClick={() => navigate(`/requests/${rentalPackage.id}`)} >See Request</button>
                            <button className="buttonz"
                                onClick={() => {
                                    fetch(`http://localhost:8080/rentalPackages/${rentalPackage.id}`, {
                                        method: "DELETE"
                                    })
                                        .then(() => window.location.reload())
                                }}>Delete
                            </button>

                        </div>
                    </section>


                })}
            </div>




        </article>


    </>

}

