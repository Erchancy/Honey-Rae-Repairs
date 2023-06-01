import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tickets.css"
import { Ticket } from "./Ticket"

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // This filters tickets according to what has been typed in the search bar
    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [searchTermState]
    )

    // This filters tickets on whether or not it is listed as ane mergency
    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    // This grabs the ticket data when the web app starts
    const getAllTickets = () => {
        fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
            .then(response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })
    }

    useEffect(
        () => {
            getAllTickets()
            fetch(`http://localhost:8088/employees?_expand=user`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        [] // When this array is empty, you are observing initial component state ONLY
    )

    // This checks if a user is staff, if they are it shows all tickets, if they aren't it only shows the customer's own tickets
    useEffect(
        () => {
            if (honeyUserObject.staff) {
                // For employees
                setFiltered(tickets)
            }
            else {
                // For customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    // This checks if openOnly(false by default, true when button is pressed) is true, if it is only shows uncompleted tickets, if not shows all of customer's own tickets
    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

    // This returns a React fragment with several JSX elements inside
    return <>
        {
            // This ternary checks if honeyUserObject's staff property is true and generates two buttons, if false it generates the other three buttons
            honeyUserObject.staff
                ? <>
                    <button onClick={() => { setEmergency(true) }} >Emergency Only</button>
                    <button onClick={() => { setEmergency(false) }} >Show All</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }

        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                // This uses the map method to convert the filteredTickets array into individual JSX representations of the ticket objects by invoking the Ticket component
                // It passes the individual ticket and the honeyUserObject staff property as props to Ticket
                filteredTickets.map(
                    (ticket) => <Ticket
                    ticketObject={ticket}
                    currentUser={honeyUserObject}
                    employees={employees}
                    getAllTickets={getAllTickets}
                    />
                )
            }
        </article>
    </>
}