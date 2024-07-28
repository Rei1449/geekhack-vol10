import React from 'react'
import { useSession } from "next-auth/react"

const TestGetProfile = () => {

    function Admin() {
        const { status, data } = useSession({
            required: true,
            onUnauthenticated() {
                // The user is not authenticated, handle it here.
            },
        })
        if (status === "loading") {
            return "Loading or not authenticated..."
        }
        console.log(data.user.name)
        const userData = data.user.name
        return "User is logged in"
    }

    return (
        <>
            <div>TestGetProfile</div>
            <div>{Admin()}</div>
        </>
    )
}

export default TestGetProfile