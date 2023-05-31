import { useEffect, useState } from "react"

export const CustomerForm = () => {
    // Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: 0,
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

    // Get customer profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                // This grabs the first object in the returned array, even though the array is only one object in length we want that object specifically and not the array itself
                const customerObject = data[0]
                updateProfile(customerObject)
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
        return fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("customer profile successfully saved")
            })
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
                        <label htmlFor="address">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.address}
                            onChange={
                                (evt) => {
                                    // Update address property
                                    const copy = { ...profile }
                                    copy.address = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Phone Number:</label>
                        <input type="text"
                            className="form-control"
                            value={profile.phoneNumber}
                            onChange={
                                (evt) => {
                                    // Update phoneNumber property
                                    const copy = { ...profile }
                                    copy.phoneNumber = evt.target.value
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