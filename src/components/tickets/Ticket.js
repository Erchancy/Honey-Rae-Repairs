import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, isStaff, employees }) => {

    // Declare variable and set it as null
    let assignedEmployee = null

    // A conditional statement that checks if the employeeTickets array isn't empty
    if(ticketObject.employeeTickets.length > 0) {
        // Declare a variable and set it as the first(and only) object in the array
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        // Re-declaring assignedEmployee as the employee whose id matches the above object's employeeId property using the find method
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }
    
    // This generates JSX representations of the tickets in TicketList
    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
        {
            // This ternary checks if isStaff is true, if it is it creates a normal header, if false it creates a link header
            isStaff
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
                    ? `Currrently being worked on ${assignedEmployee !== null ? assignedEmployee?.user.fullName : ""}`
                // If it is false then it displays this button
                    : <button>Claim</button>
            }
        </footer>
    </section>
}