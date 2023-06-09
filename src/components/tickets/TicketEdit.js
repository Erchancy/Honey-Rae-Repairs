import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editTicket, getTicketToEdit } from "../ApiManager"

export const TicketEdit = () => {

    // Create ticketId state through useParam to dynamically fill the object depending on the currrent url route?
    const { ticketId } = useParams()
    // Create ticket state and set it as an empty object
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false
    })

    // Use the useNavigation() hook so you can redirect the user to the ticket list
    const navigate = useNavigate()

    // Activates on Save Button Click, saves the edits to the database and returns the user to the tickets page
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // Perform the fetch() PUT to alter the object in the database
        editTicket(ticketId, ticket, setFeedback, setTimeout, navigate)
    }

    // Provide initial state for feedback
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    },
        // Monitors feedback for changes and executes the above
        [feedback])

    useEffect(
        () => {
            getTicketToEdit(ticketId)
                .then((ticketToEdit) => {
                    updateTicket(ticketToEdit)
                })
        },
        [ticketId]
    )

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="ticketForm">
                <h2 className="ticketForm__title">Edit Service Ticket</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={ticket.description}
                            onChange={
                                (evt) => {
                                    const copy = { ...ticket }
                                    copy.description = evt.target.value
                                    updateTicket(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Emergency:</label>
                        <input type="checkbox"
                            checked={ticket.emergency}
                            onChange={
                                (evt) => {
                                    const copy = { ...ticket }
                                    copy.emergency = evt.target.checked
                                    updateTicket(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Ticket
                </button>
            </form>
        </>
    )
}
