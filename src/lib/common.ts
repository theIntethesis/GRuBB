
export type Semester = "Fall" | "Spring"
export type FacultyRole = "Faculty" | "Staff" | "Post-Doc"
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

export function semesterEq(a: SemesterCombo, b: SemesterCombo): boolean {
    return a.semester == b.semester && a.year == b.year
}

export function getNextSemester(a: SemesterCombo): SemesterCombo {
    let nextSem: SemesterCombo = a

    if (nextSem.semester == "Fall") {
        nextSem.semester = "Spring"
        nextSem.year += 1
    }
    else {
        nextSem.semester = "Fall"
    }

    return nextSem
}

export function sortBySemester(a: SemesterCombo[]): SemesterCombo[] {
    return a.sort((a, b) => {
        if (a.year > b.year) return 1
        else if (b.year > a.year) return -1
        else if (a.semester == "Fall" && b.semester == "Spring") return 1
        else if (b.semester == "Fall" && a.semester == "Spring") return -1
        else return 0
    })
}