
export type Semester = "Fall" | "Spring"
export type FacultyRole = "Faculty" | "Staff" | "Postdoc"
export type EmpolymentType = FacultyRole | "Student"

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

export function semesterEq(a: SemesterCombo, b: SemesterCombo) {
    return a.semester == b.semester && a.year == b.year
}