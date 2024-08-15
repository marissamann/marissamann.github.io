import React, { useState } from "react";

export default function SessionDelete() {
    const [status, setStatus] = useState("");

    async function onSubmit(e) {
        console.log("inside onSubmit");
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/session_logout`,
            {
                method: "GET",
                credentials: 'include'
            }
        );
        if (!response.ok) {
            const message = `error occured: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const statusResponse = await response.json();
        setStatus(statusResponse.status);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
            <div>
                    <input
                        type="submit"
                        value="Logout"
                    />
                </div>
            </form>
        </div>
    );
}