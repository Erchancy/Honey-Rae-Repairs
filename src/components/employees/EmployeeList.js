import { useEffect, useState } from "react"
import "./EmployeeList.css"
import { Employee } from "./Employee"
import { getEmployeeList } from "../ApiManager"

// This function creates the employees state as an empty array, observes its initial render, fetches the user data where isStaff property is true
// and changes the array using setEmployees to reflect the fetched data
// Then it returns JSX by mapping the employees array and invoking the Employee component, passing a key, id, fullName, and email as a prop
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
                getEmployeeList()
                .then((employees) => {
                    setEmployees(employees)
                })
        },
        []
    )

    return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id}
                fullName={employee.fullName}
                email={employee.email} />)
        }
    </article>
}