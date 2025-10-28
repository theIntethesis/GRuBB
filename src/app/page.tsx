"use client"
import { redirect } from "next/navigation";
export default function Index() {
    // Turn this into a start page, but for now redirect to Student tab
    redirect(`/Student`)
}