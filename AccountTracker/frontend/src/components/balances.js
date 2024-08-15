import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
//one React component for records table
//  another react component for each row of records table results
//USE IN THIS FILE TO CALL BACKEND ROUTES FROM record.js
const Record = (props) => (
    <tr>
        <td>{props.record.first_name}</td>
        <td>{props.record.last_name}</td>
        <td>{props.record.email}</td>
        <td>{props.record.checking}</td>
        <td>{props.record.savings}</td>
    </tr>
);

export default function Balances() {
    const [record, setRecord] = useState([]);
    const [form, setForm] = useState({
        account: "",
        type: "",
        amount: 0,
    });

    function updateForm(jsonObj) {
        return setForm((prevJsonObj) => {
            return { ...prevJsonObj, ...jsonObj};
        });
    }

    const params = useParams();
    const navigate = useNavigate();
    console.log("inside AccountSummary!");
    useEffect(() => {
        console.log("inside use effect");
        const email = params.email.toString();
        console.log("params recieved email: " + email);
        if (email != null && email != "") {
            const user = {
                email: params.email.toString(),
            }
            async function getRecords() {
                const response1 = await fetch(`http://localhost:5000/session_check`,
                    {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(user),
                    }
                );
                console.log("ran session_check, about to check response");
                console.log("status: " + response1.status.toString() + " " +  response1.statusText.toString());
                if (!response1.ok) {
                    const message = `An error occured: ${response1.statusText}`;
                    window.alert(message);
                    navigate("/");
                }
                if(response1.status.toString() === "200"){
                    console.log("backend evaluated to 200 success");
                    const response2 = await fetch(`http://localhost:5000/record/${email}`);
                    if (!response2.ok) {
                        const message = `An error occured: ${response2.statusText}`;
                        window.alert(message);
                        navigate("/");
                    }
                    const responseRecords = await response2.json();
                    console.log("response records: " + responseRecords.toString());
                    setRecord(responseRecords);
                    //return;
                }
                else {
                    window.alert("session not active, cannot show page");
                    return;
                }
            }
            getRecords();
            return;
        }
    }, [navigate]);

    function recordList() {
        if (!record) {
            return "";
        }
        return (
            <Record
                record={record}
            />
        );
    }

    async function onSubmit(e) {
        console.log("inside onSubmit");
        e.preventDefault();
        //check session with email
        const user = {
            email: params.email.toString(),
        }
        const response1 = await fetch(`http://localhost:5000/session_check`,
            {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user),
            }
        );
        console.log("ran session_check, about to check response");
        console.log("status: " + response1.status.toString() + " " +  response1.statusText.toString());
        if (!response1.ok) {
            const message = `An error occured: ${response1.statusText}`;
            window.alert(message);
            navigate("/");
        }
        if(response1.status.toString() === "200"){
            console.log("backend evaluated to 200 success");
            //if not savings or checking error
            if ((form.account.toString().toUpperCase() != "SAVINGS") && 
                (form.account.toString().toUpperCase() != "CHECKING")) {
                    window.alert("invalid account try again");
                    navigate("/");
            }
            //if deposit...
            const form_email = params.email.toString();
            const form_account = form.account;
            const form_amount = form.amount;
            if (form.type.toString().toUpperCase() == "DEPOSIT") {
                console.log("is deposit");
                const response2 = await fetch(`http://localhost:5000/deposit/${form_email}-${form_account}/${form_amount}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .catch(error => {
                    console.log("error with deposit");
                    window.alert(error);
                    return;
                });
                console.log("status: " + response2.status.toString() + " " +  response2.statusText.toString());
                if(response2.status.toString() === "200"){
                    console.log("deposit successful");
                    navigate("/");
                }
                else {
                    window.alert("cannot complete transaction, verify amounts");
                    return;
                }
            }
            //if withdrawl...
            else if (form.type.toString().toUpperCase() == "WITHDRAWL") {
                const response3 = await fetch(`http://localhost:5000/withdrawl/${form_email}-${form_account}/${form_amount}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: "",
                })
                .catch(error => {
                    window.alert(error);
                    return;
                });
                if(response3.status.toString() === "200"){
                    navigate("/");
                }
                else {
                    window.alert("cannot complete transaction, verify amounts");
                    return;
                }
            }
            //else error
            else {
                window.alert("invalid type try again");
                navigate("/");
            }
        }
        else {
            navigate("/session_login");
        }
    }
    return (
        <div>
            <h3>Balances</h3>
            <table style={{marginTop: 20}}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Checking</th>
                        <th>Savings</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Account savings or checking: </label>
                    <input
                        type="text"
                        id="account"
                        value={form.account}
                        onChange={(e) => updateForm({ account: e.target.value })}
                    />
                </div>
                <div>
                    <label>Transaction Type deposit or withdrawl: </label>
                    <input
                        type="text"
                        id="type"
                        value={form.last_name}
                        onChange={(e) => updateForm({ type: e.target.value })}
                    />
                </div>
                <div>
                    <label>Amount in cents: </label>
                    <input
                        type="text"
                        id="amount"
                        value={form.email}
                        onChange={(e) => updateForm({ amount: e.target.value })}
                    />
                </div>
                <br/>
                <div>
                    <input
                        type="submit"
                        value="Complete Transaction"
                    />
                </div>
            </form>
        </div>
    );
}