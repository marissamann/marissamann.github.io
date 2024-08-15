import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//one React component for records table
//  another react component for each row of records table results
//USE IN THIS FILE TO CALL BACKEND ROUTES FROM record.js
const Record = (props) => (
    <tr>
        <td>{props.record.first_name}</td>
        <td>{props.record.last_name}</td>
        <td>{props.record.email}</td>
        <td>{props.record.role}</td>
        <td>{props.record.checking}</td>
        <td>{props.record.savings}</td>
        <td><Link to={`/edit/${props.record._id}`}>Edit</Link></td>
    </tr>
);

export default function Records() {
    const [records, setRecords] = useState([]);
    console.log("inside Records!");
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record`);
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const responseRecords = await response.json();
            console.log("response records: " + responseRecords);
            setRecords(responseRecords);
            return;
        }
        getRecords();
        return;
    }, [records.length]);

    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    key={record.id}
                />
            );
        });
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
                        <th>Role</th>
                        <th>Checking</th>
                        <th>Savings</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}