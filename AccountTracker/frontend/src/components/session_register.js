import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function SessionRegister() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        checking: 0,
        savings: 0,
    });

    const navigate = useNavigate();

    function updateForm(jsonObj) {
        return setForm((prevJsonObj) => {
            return { ...prevJsonObj, ...jsonObj};
        });
    }

    async function onSubmit(e) {
        console.log("inside onSubmit");
        e.preventDefault();
        console.log("FORM BEFORE SESSION ASSIGNMENT: ");
        console.log(JSON.stringify(form));
        const response = await fetch(`http://localhost:5000/session_register`,
            {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form),
            }
        );
        console.log("ran session_register, about to check response");
        console.log("status: " + response.status.toString() + " " +  response.statusText.toString());
        if (!response.ok) {
            const message = `error occured: ${response.statusText}`;
            console.log("error calling session_register: " + message);
            window.alert(message);
            return;
        }
        if(response.status.toString() === "200"){
            console.log("backend evaluated to 200 success");
            const newPerson = {first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                role: "",
                checking: 0,
                savings: 0};
            console.log("newperson email: " + form.email);
            await fetch("http://localhost:5000/record/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            })
            .catch(error => {
                window.alert(error);
                return;
            });
            console.log("about to navigate");
            navigate("/account_summary/" + form.email.toString());
        }
        else if (response.status.toString() === "500") {
            console.log("backend evaluated to 500 not success");
            window.alert("session not set, already exists");
        }
        else {
            console.log("UNEXPECTED BACKEND RESULT RETURN");
            window.alert("session not set, already exists");
        }
    }
    return (
        <div>
            <h3>Register New Account</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label>First Name: </label>
                    <input
                        type="text"
                        id="first_name"
                        value={form.first_name}
                        onChange={(e) => updateForm({ first_name: e.target.value })}
                    />
                </div>
                <div>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        id="last_name"
                        value={form.last_name}
                        onChange={(e) => updateForm({ last_name: e.target.value })}
                    />
                </div>
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
                    <label>Phone Number: </label>
                    <input
                        type="text"
                        id="phone"
                        value={form.phone}
                        onChange={(e) => updateForm({ phone: e.target.value })}
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
                        value="Create Record"
                    />
                </div>
            </form>
        </div>
    );
}