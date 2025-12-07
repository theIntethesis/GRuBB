import { DashboardSlugs } from "@/lib/common"
import { redirect } from "next/navigation"

export default async function Page({params}: {params: Promise<DashboardSlugs>}) {
    const {budgetID} = await params
    redirect(`/dashboard/${budgetID}/SemesterRates`)
}