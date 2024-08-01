"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<div>{children}</div>
		</SessionProvider>
	);
}
