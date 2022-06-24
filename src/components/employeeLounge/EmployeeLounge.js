import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./EmployeeLounge.css"


export const EmployeeLoungePage = () => {
    const { id } = useParams

    const localTextureUser = localStorage.getItem("texture_user")
    const textureUserObject = JSON.parse(localTextureUser)


    const navigate = useNavigate()
    const [rentalPackages, setPackages] = useState([])
    const [users, setUsers] = useState([])
    const [myUser, setMyUser] = useState({})

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
    console.log(rentalPackages)


    useEffect(
        () => {
            const user = textureUserObject?.id ? users.find(user => user?.id === textureUserObject?.id) : 0
            setMyUser(user)
        },
        [users]
    )

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


    const DeleteButton = () => {
        return <button
            onClick={() => {
                fetch(`http://localhost:8080/rentalPackages/${id}`, {
                    method: "DELETE"
                })
                    .then(() => navigate(`/employeelounge`))
            }}>Delete
        </button>
    }

    // let fullName = myUser ? myUser?.name : 0
    // const [first, last] = fullName.split(" ")
    // console.log(first)
    // console.log(last)

    return <>
        <h2>Hey {myUser?.name}, <br/> New Bookings</h2>
        <h3></h3>

        <article>
            <div className="confirmation_dateBooked">

                {rentalPackages.reverse().map((rentalPackage) => {
                    let price = rentalPackage?.totalCost
                    let from = timeFormat(rentalPackage?.bookingDate?.startTime)
                    let until = timeFormat(rentalPackage?.bookingDate?.endTime)
                    let dateBooked = new Date(rentalPackage?.bookingDate?.date).toLocaleDateString('en-US', { timeZone: 'UTC' })
                    let name = rentalPackage.user.name
                    let email = rentalPackage.user.email
                    let phone = rentalPackage.user.phoneNumber
                    let signed = hasSigned(rentalPackage?.eSign)
                    let startTime = timeFunc(rentalPackage?.bookingDate?.startTime)
                    let endTime = timeFunc(rentalPackage?.bookingDate?.endTime)



                    return <section className="requestsBox" key={rentalPackage.id}>
                        <div value={rentalPackage.id}>
                            {name} has requested to book Texture Creative Studio</div>
                        <div value={rentalPackage.id}>Date: {dateBooked} from {from}{startTime} until {until}{endTime}</div>
                        <div value={rentalPackage.id}>Price: ${price}</div>
                        <div value={rentalPackage.id}>Phone Number: {phone}</div>
                        <div value={rentalPackage.id}>Email: {email}</div>
                        <div value={rentalPackage.id}>Has Signed Liability Form? {signed} </div>
                        <div className="employeeLoungeButtons">
                            <button onClick={() => navigate(`/requests/${rentalPackage.id}`)} >See Request</button>
                            {DeleteButton()}
                        </div>
                    </section>


                })}
            </div>




        </article>


    </>

}

