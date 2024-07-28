"use client";

import TestuserProfile from "@/components/TestuserProfile";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ProfileGet from "./ProfileGet";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface myDataDTO {
	nickname: string,
	imgURL: string
}

export default function Page() {

	const router = useRouter()
	const [myData, setMyData] = useState<myDataDTO>()
	const [button, setButton] = useState("")
	
	function nextPage(roomId:string){
		let name = document.getElementById('userDataName')?.innerHTML
		let img = document.getElementById('userDataImage')?.innerHTML
		if (name==null || img==null){
			return "no user data"
		}
		router.push(`worlds/${roomId}?nickname=${name}&img=${img}`)
	}

	useEffect (()=>{
		nextPage(button);
	},[button])

	return (
		<SessionProvider>
			<ProfileGet inputData={useState} />
			<h2>{myData?.nickname}</h2>
			<img src={myData?.imgURL}></img>
			<div>
				<button 
					onClick={()=>setButton("hiroba")}
					className="m-5 w-20 h-10 rounded-lg border border-slate-950 bg-slate-300"
				>広場</button>
				<button 
					onClick={()=>setButton("parck")}
					className="m-5 w-20 h-10 rounded-lg border border-slate-950 bg-slate-300"
				>公園</button>
			</div>
		</SessionProvider>
	);
}
