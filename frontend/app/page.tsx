"use client"

import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react"
import TestuserProfile from "@/components/TestuserProfile";

export default function Home() {
	
	return (
		<SessionProvider>
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<Link href="/rooms">room選択する</Link>
				<TestuserProfile />
			</main>
		</SessionProvider>
	);
}
