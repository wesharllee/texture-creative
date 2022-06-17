import { useNavigate } from "react-router-dom"
export const DeleteButton = ({ rentalPackage, rentalBookingPackage }) => {
    const navigate = useNavigate()
    
   

    return <button onClick={() => {
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