import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function SessionLogin() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    function updateForm(jsonObj) {
        return setForm((prevJsonObj) => {
            return { ...prevJsonObj, ...jsonObj};
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        console.log("FORM BEFORE SESSION ASSIGNMENT: ");
        console.log(JSON.stringify(form));
        const response = await fetch(`http://localhost:5000/session_login`,
            {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form),
            }
        );
        if (!response.ok) {
            window.alert("Could not login, user is not registered or session already exists");
            return;
        }
        console.log("ran session_register, about to check response");
        console.log("status: " + response.status.toString() + " " +  response.statusText.toString());
        if(response.status.toString() === "200"){
            console.log("about to navigate");
            navigate("/account_summary/" + form.email.toString());
        } else {
            window.alert("Could not login, user is not registered or session already exists");
        }
    }
    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email: </label>
                    <input
                        type="text"
                        id="email"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="text"
                        id="password"
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                <br/>
                <div>
                    <input
                        type="submit"
                        value="Login"
                    />
                </div>
            </form>
        </div>
    );
}