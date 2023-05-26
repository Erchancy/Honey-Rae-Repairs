import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


// This function creates CustomerId state through useParam to dynamically fill the object depending on the currrent url route?
// Then it creates Customer state and sets it as an empty object
// It then observes the CustomerId state and whenever it changes fetches the Customer, CustomerTickets, and user data of the Customer with CustomerId matching the userId
// Finally it returns JSX of the Customer name, email, specialty, rate, and number of active tickets using the optional chaining operator to avoid null/undefined errors
export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            const getCustomer = async() => {
                const response = await fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                const data = await response.json()
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            }
            getCustomer()
        },
        [customerId]
    )

    return <section className="customer">
    <header className="customer__header">{customer?.user?.fullName}</header>
    <div>Email: {customer?.user?.email}</div>
    <div>Phone #: {customer.phoneNumber}</div>
    <div>Address: {customer.address}</div>
    <footer></footer>
</section>
}