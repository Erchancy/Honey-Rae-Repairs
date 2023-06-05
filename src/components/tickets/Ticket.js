import { Link } from "react-router-dom"
import { claimTicket, completeTicket, deleteTicket } from "../ApiManager"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    // Find the assigned employee for the current ticket

    // Declare variable and set it as null
    let assignedEmployee = {
        id: null
    }

    // A conditional statement that checks if the employeeTickets array isn't empty
    if (ticketObject.employeeTickets.length > 0) {
        // Declare a variable and set it as the first(and only) object in the array
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        // Re-declaring assignedEmployee as the employee whose id matches the above object's employeeId property using the find method
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    // Find the employee profile object for the current user
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket_finish">Finish</button>
        }
        else {
            return ""
        }
    }

    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                deleteTicket(ticketObject, getAllTickets)
            }} className="ticket_delete">Delete</button>
        }
        else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObject.id,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }
        completeTicket(ticketObject, getAllTickets, copy)
    }

    // Displays a button if current user is an employee which, when clicked, POSTs a new employeeTicket to the database and re-fetches the ticket list
    const buttonConditional = () => {
        if (currentUser.staff) {
            return <button
                onClick={() => {
                    claimTicket(userEmployee, ticketObject, getAllTickets)
                }}
            >Claim</button>
        }
        else {
            return ""
        }
    }

    // This generates JSX representations of the tickets in TicketList
    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
        {
            // This ternary checks if currentUser is true, if it is it creates a normal header, if false it creates a link header
            currentUser.staff
                ? <>
                    <header>Ticket {ticketObject.id}</header>
                </>
                : <>
                    <header>
                        <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
                    </header>
                </>
        }
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
        <footer>
            {
                // This ternary asks if the length is truthy, in other words if it is not 0 which is inherently falsy
                ticketObject.employeeTickets.length
                    // If it is then it displays this text with a second ternary checking that assignedEmployee is not null
                    // If true then it displays the fullName property of the embedded user, if false it displays nothing
                    ? `Currrently being worked on ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    // If it is false then it invokes the button function
                    : buttonConditional()
            }
            {
                canClose()
            }
            {
                deleteButton()
            }
        </footer>
    </section>
}