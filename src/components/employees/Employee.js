import { Link } from "react-router-dom"

// This function takes the object with properties id, fullname, and email as a parameter and returns JSX containing the employee name as a link and the employee email
export const Employee = ({ id, fullName, email }) => {
    return <section className="employee">
                    <div>
                        <Link to={`/employees/${id}`}>Name: {fullName}</Link>
                    </div>
                    <div>Email: {email}</div>
                </section>
}