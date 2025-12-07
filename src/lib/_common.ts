import dbConnect from "mongodb"
import { revalidatePath } from "next/cache"

export type Semester = "Fall" | "Spring"
export type FacultyRole = "Faculty" | "Staff" | "Postdoc"
export type BudgetType = "Primary" | "Secondary" | "Parallel"
export type RateTimeUnit = "Hour" | "Year"

export interface DashboardSlugs {
    budgetID: string,
    individualID: string
    year: number,
    semester: Semester
}

export interface SemesterCombo {
    semester: Semester,
    year: number
}
