import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    // Provides initial state for email, uses a default employee email
    const [email, set] = useState("hpassfield7@netvibes.com")
    // Initialize navigate
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        // fetches the user with email equal to email on line 8
        const res = await fetch(`http://localhost:8088/users?email=${email}`);
        const foundUsers = await res.json();
        if (foundUsers.length === 1) {
            const user = foundUsers[0];
            // Creates localStorage item honey_user
            localStorage.setItem("honey_user", JSON.stringify({
                id: user.id,
                staff: user.isStaff
            }));

            // Brings the user to the default "/" path
            navigate("/");
        }
        else {
            window.alert("Invalid login");
        }
    }

    // Creates the JSX of the login page
    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Honey Rae Repairs</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

