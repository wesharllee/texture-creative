import { useEffect, useState } from "react"



export const EmployeeLoungePage = () => {
    const [rentalPackages, setPackages] = useState([])
   

    


    useEffect(
        () => {
            fetch(`http://localhost:8080/rentalPackages/?_expand=bookingDate&_expand=light&_expand=user`)
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

    let hourlyCost = (hours) => {
        let costOfHours = parseInt(hours) * 75
        return costOfHours
    }



    let totalCost = (lightCost, hourCost) => {
        let totalPrice = lightCost + hourCost
        return totalPrice

    }

    let hasSigned = (signature) => {
        if (signature === true) {
            return "Yes"
        }
        else {
            return "No"
        }
    }




    return <>
        <h2>This will be Employee Lounge</h2>

        <article>
            <div className="confirmation_dateBooked">

                {rentalPackages.reverse().map((rentalPackage) => {
                    let price = totalCost(rentalPackage?.light?.lightCost, hourlyCost(rentalPackage?.bookingDate?.totalHours))
                    let from = timeFormat(rentalPackage?.bookingDate?.startTime)
                    let until = timeFormat(rentalPackage?.bookingDate?.endTime)
                    let dateBooked = new Date(rentalPackage?.bookingDate?.date).toLocaleDateString('en-US', { timeZone: 'UTC' })
                    let name = rentalPackage.user.name
                    let email = rentalPackage.user.email
                    let phone = rentalPackage.user.phoneNumber
                    let signed = hasSigned(rentalPackage?.eSign)
                    let startTime = timeFunc(rentalPackage?.bookingDate?.startTime)
                    let endTime = timeFunc(rentalPackage?.bookingDate?.endTime)

                    

                    return <section key={rentalPackage.id}>
                        <div value={rentalPackage.id}>
                            {name} has requested to book Texture Creative Studio for {dateBooked} from {from}{startTime} until {until}{endTime}</div>
                        <div value={rentalPackage.id}>Price: ${price}</div>
                        <div value={rentalPackage.id}>Phone Number: {phone}</div>
                        <div value={rentalPackage.id}>Email: {email}</div>
                        <div value={rentalPackage.id}>Has Signed Liability Form? {signed} </div>
                    </section>
                })}
            </div>
                
           


        </article>


    </>

}

