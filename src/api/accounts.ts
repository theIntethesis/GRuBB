"use server"
export async function getAllStudentAccounts(individual_id: string) {

}

export async function getSalaryAccount(individual_id: string, semester: "Fall" | "Spring", year: number) {

}

export async function createSalaryAccount(
    individual_id: string,
    semester: "Fall" | "Spring",
    year: number,
    rate: number,
    rateTimeUnit: "hour" | "year",
    percentFTE: number
) {

}

export async function getAllSalaryAccounts(individual_id: string) {

}

export async function getStudentAccount(individual_id: string, semester: "Fall" | "Spring", year: number) {

}

export async function createStudentAccount(
    individual_id: string,
    semester: "Fall" | "Spring",
    year: number,
    aidRecieved: number
) {

}