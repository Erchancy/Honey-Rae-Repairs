import { useEffect, useState } from "react"
import "./Tickets.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])

    useEffect(
        () => {
            console.log("Initial state of tickets", tickets) // View the initial state of tickets
            fetch(`http://localhost:8088/serviceTickets`)
            .then(response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )
    return <>
        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                tickets.map(
                    (ticket) => {
                        return <section className="ticket">
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "Yes" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
        </>
}