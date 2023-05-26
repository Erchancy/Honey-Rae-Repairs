import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


// This function creates employeeId state through useParam to dynamically fill the object depending on the currrent url route?
// Then it creates employee state and sets it as an empty object
// It then observes the employeeId state and whenever it changes fetches the employee, employeeTickets, and user data of the employee with employeeId matching the userId
// Finally it returns JSX of the employee name, email, specialty, rate, and number of actiive tickets using the optional chaining operator to avoid null/undefined errors
export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState({})

    useEffect(
        () => {
            const getEmployee = async() => {
                const response = await fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
                const data = await response.json()
                const singleEmployee = data[0]
                updateEmployee(singleEmployee)
            }
            getEmployee()
        },
        [employeeId]
    )

    return <section className="employee">
    <header className="employee__header">{employee?.user?.fullName}</header>
    <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Rate: {employee.rate}</div>
    <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
</section>
}