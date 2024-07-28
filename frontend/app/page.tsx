"use client";

import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";
// import TestuserProfile from "@/components/testuserProfile";

export default function Home() {
	return (
		// <SessionProvider>
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Link href="/worlds">room選択する</Link>
			<h1>みんなのTech広場</h1>
			<div>
				<p>みんなのTech広場とは？</p>
				<p>バーチャルで繋がるでエンジニア同士の交流の場!</p>
				<p>興味がある部屋に入ることで気軽にエンジニア同士交流できる</p>
			</div>
			{/* <TestuserProfile /> */}
		</main>
		// {/* </SessionProvider> */}
	);
}
