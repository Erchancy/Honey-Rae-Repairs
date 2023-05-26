import { useEffect, useState } from "react"
import "./EmployeeList.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            const getEmployeeList = async() => {
                const response = await fetch("http://localhost:8088/users?isStaff=true")
                const employees = await response.json()
                setEmployees(employees)
            }
            getEmployeeList()
        },
        []
    )

    return <article className="employees">
        {
            employees.map(employee => {
                return <section className="employee" key={`employee--${employee.id}`}>
                    <div>Name: {employee.fullName}</div>
                    <div>Email: {employee.email}</div>
                </section>
            })
        }
    </article>
}