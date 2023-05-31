import { useEffect, useState } from "react"
import "./CustomerList.css"
import { Customer } from "./Customer"

// This function creates the customers state as an empty array, observes its initial render, fetches the user data
// and changes the array using setcustomers to reflect the fetched data
// Then it returns JSX by mapping the customers array and invoking the customer component, passing a key, id, fullName, and email as a prop

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            const getCustomerList = async() => {
                const response = await fetch("http://localhost:8088/customers?_expand=user")
                const customers = await response.json()
                setCustomers(customers)
            }
            getCustomerList()
        },
        []
    )

    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.userId}
                fullName={customer?.user?.fullName}
                address={customer.address}
                phoneNumber={customer.phoneNumber}  />)
        }
    </article>
}