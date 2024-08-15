import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
//one React component for records table
//  another react component for each row of records table results
//USE IN THIS FILE TO CALL BACKEND ROUTES FROM record.js
const Record = (props) => (
    <>
    {console.log("in Record component")}
    <tr>
        <td>{props.record.first_name}</td>
        <td>{props.record.last_name}</td>
        <td>{props.record.email}</td>
        <td>{props.record.phone}</td>
    </tr>
    </>
);

export default function AccountSummary() {
    const [record, setRecord] = useState();
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
            async function getRecord() {
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
                    const responseRecord = await response2.json();
                    console.log("response records: " + responseRecord.toString());
                    setRecord(responseRecord);
                    //return;
                }
                else {
                    window.alert("session not active, cannot show page");
                    return;
                }
            }
            getRecord();
            return;
        }
    }, [navigate]);

    function recordList() {
        console.log("in recordList");
        if (!record) {
            return "";
        }
        return (
            <Record
                record={record}
            />
        );
    }
    return (
        <div>
            <h3>Record List</h3>
            <table style={{marginTop: 20}}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}