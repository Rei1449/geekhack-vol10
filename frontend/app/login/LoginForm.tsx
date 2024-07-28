"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
	return (
		<div className="bg-gray-100 min-h-screen">
			{/* <button
				onClick={() => {
					// setIsGoogleLoading(true);
					signIn("google");
				}}>
				google
			</button> */}
			{/* {isGitHubLoading ? <>loading</> : <>github</>} */}
			<div className="justify-between flex items-center md:w-[75%] w-[92%] flex-wrap m-auto md:pt-40 pt-10 original-font">
				<div className="md:w-[40%] w-full">
					<h1 className="md:text-[130px] text-[80px] font-bold text-gray-900">
						<span className="text-xl block">みんなの</span>Tech
						<span className="text-4xl "> 広場</span>
					</h1>
					<div className="grid grid-cols-6 md:w-[100%] w-[90%] mt-10 m-auto gap-10">
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/javascript.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/typescript.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/python.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/next.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/fastapi.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/rust.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/github.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/supabase.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px] mt-[10px]">
							<img src="./tech-icons/tailwindcss.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/googlerun.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/vercel.svg" alt="js" />
						</div>
						<div className="md:w-[40px] w-[30px]">
							<img src="./tech-icons/docker.svg" alt="js" />
						</div>
					</div>
				</div>

				<div className="border border-gray-300 p-10 rounded-[20px] m-auto md:w-[45%] w-full min-h-[400px]">
					<div className="w-[300px] m-auto">
						<p className="font-bold text-2xl mt-5">ログイン</p>
						<button
							className=" mt-10 w-full border px-10 bg-gray-200 py-[8px] border-gray-400 font-bold rounded-md"
							onClick={() => {
								// setIsGitHubLoading(true);
								signIn("github");
							}}>
							<div className="m-auto w-fit flex">
								<img className="w-[20px]" src="./tech-icons/github.svg" />
								<div className="ml-1">github</div>
							</div>
						</button>

						<div className=" mt-10 w-full border px-10 bg-gray-100 py-[8px] border-gray-400 font-bold rounded-md">
							<Link href="/" className="m-auto w-fit flex">
								{/* <img className="w-[20px]" src="./tech-icons/github.svg" /> */}
								<div className="ml-1">みんなのtech広場とは→</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
