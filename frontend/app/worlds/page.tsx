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

	// const router = useRouter()
	// const [myData, setMyData] = useState<myDataDTO>()
	// const [button, setButton] = useState("")
	
	// function nextPage(roomId:string){
	// 	let name = document.getElementById('userDataName')?.innerHTML
	// 	let img = document.getElementById('userDataImage')?.innerHTML
	// 	if (name==null || img==null){
	// 		return "no user data"
	// 	}
	// 	router.push(`worlds/${roomId}?nickname=${name}&img=${img}`)
	// }

	// useEffect (()=>{
	// 	nextPage(button);
	// },[button])

	// return (
	// 	<SessionProvider>
	// 		<ProfileGet inputData={useState} />
	// 		<h2>{myData?.nickname}</h2>
	// 		<img src={myData?.imgURL}></img>
	// 		<div>
	// 			<button 
	// 				onClick={()=>setButton("hiroba")}
	// 				className="m-5 w-20 h-10 rounded-lg border border-slate-950 bg-slate-300"
	// 			>広場</button>
	// 			<button 
	// 				onClick={()=>setButton("parck")}
	// 				className="m-5 w-20 h-10 rounded-lg border border-slate-950 bg-slate-300"
	// 			>公園</button>
	// 		</div>
		// </SessionProvider>




	return (
		<div className="grid grid-cols-6 gap-10 p-10">
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/python">
					<img src="./tech-icons/python.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">Python</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/javascript">
					<img src="./tech-icons/javascript.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">
						JavaScript
					</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/typascript">
					<img src="./tech-icons/typescript.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">
						TypeScript
					</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/rust">
					<img src="./tech-icons/rust.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">Rust</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/next">
					<img src="./tech-icons/next.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">next.js</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/fastapi">
					<img src="./tech-icons/fastapi.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">FastApi</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/github">
					<img src="./tech-icons/github.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">Github</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/docker">
					<img src="./tech-icons/docker.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">Docker</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
		</div>

	);
}
