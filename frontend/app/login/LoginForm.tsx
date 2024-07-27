"use client";
import React from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
	return (
		<div>
			<button
				onClick={() => {
					// setIsGoogleLoading(true);
					signIn("google");
				}}>
				google
			</button>
			{/* {isGitHubLoading ? <>loading</> : <>github</>} */}
			<button
				onClick={() => {
					// setIsGitHubLoading(true);
					signIn("github");
				}}>
				github
			</button>
		</div>
	);
}
