import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface myDataDTO {
	nickname: string,
	imgURL: string
}

const ProfileGet = (props:{inputData: Dispatch<SetStateAction<myDataDTO>>}) => {

    const {inputData} = props

    const [userData, setUserData] = useState<myDataDTO>()
    const { status, data } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
        },
    })

    // if (status === "loading") {
    //     console.log("Loading or not authenticated...")
    //     // return "Loading or not authenticated..."
    // }else{
    //     // inputData({nickname:data.user.name||"",imgURL:data.user.image||""})
    //     console.log(data.user.name)
    //     console.log(data.user.image)
    //     setUserData({nickname:data.user.name||"",imgURL:data.user.image||""})
    // }
    // if (status != "loading"){
    // }

    let name = ""
    let img = ""
    let userDataNameElement = document.getElementById("userDataName")
    let userDataImageElement = document.getElementById("userDataImage")

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
        console.log(data.user.image)
        name = data.user.name||""
        img = data.user.image||""
        if (name!="" && img!="" && userDataImageElement && userDataNameElement){
            // userDataDiv.remove()
            userDataNameElement.innerText=name
            userDataImageElement.innerText=img
        }
        // setUserData({nickname:data.user.name||"",imgURL:data.user.image||""})
        // inputData({nickname:data.user.name||"",imgURL:data.user.image||""})
        // if (name != ""){
        //     setUserData({nickname:name,imgURL:img})
        // }
        return "User is logged in"
    }

    return (
        <>
            <div>testuserProfile</div>
            <div className='flex'>
                <h5>ログイン状態：</h5>
                <h5 className='text-lime-500'>{Admin()}</h5>
            </div>
            <div id="userDataName"></div>
            <div id="userDataImage"></div>
        </>
    )
}

export default ProfileGet