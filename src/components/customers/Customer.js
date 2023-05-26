import { Link } from "react-router-dom"

// This function takes the object with properties id, fullname, address, and phone number as a parameter and returns JSX containing the customer fullName, address, and phone number
export const Customer = ({ id, fullName, address, phoneNumber }) => {
    return <section className="customer">
                    <Link to={`/customers/${id}`}>Name: {fullName}</Link>
                    <div>Address: {address}</div>
                    <div>Phone #: {phoneNumber}</div>
                </section>
}