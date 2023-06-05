import { useEffect, useState } from "react"
import { getCurrentEmployee, updateEmployeeProfile } from "../ApiManager"

export const EmployeeForm = () => {
    // Provide initial state for profile
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })

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

    // Grabs honey_user from local storage and parses it into a JavaScript object
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // Get employee profile info from API and update state
    useEffect(() => {
        getCurrentEmployee(honeyUserObject)
            .then((currentEmployee) => {
                updateProfile(currentEmployee)
            })

    },
        []
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            Perform the PUT fetch() call here to update the profile.
            Invoke setFeedback in order to display save message
        */
        updateEmployeeProfile(profile, setFeedback)
    }

    // Line 64 first asks if feedback includes error, if it does it displays error, otherwise the class is feedback
    // Then it asks if feedback is an empty string, if it is then feedback is invisible, if not then it becomes class visible
    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="profile">
                <h2 className="profile__title">Update Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="specialty">Specialty:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.specialty}
                            onChange={
                                (evt) => {
                                    // Update specialty property
                                    const copy = { ...profile }
                                    copy.specialty = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Hourly rate:</label>
                        <input type="number"
                            className="form-control"
                            value={profile.rate}
                            onChange={
                                (evt) => {
                                    // Update rate property
                                    const copy = { ...profile }
                                    copy.rate = parseFloat(evt.target.value, 2)
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={
                        (evt) => {
                            handleSaveButtonClick(evt)
                        }
                    }
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    )
}
