db = db.getSiblingDB("grubb")


// Student that is an individual
const sInd = db.individual.insertOne({
    name: "Joe Smith"
})
const stu = db.student.insertOne({
    outOfState: false,
    indID: sInd.insertedId
})


// Faculty that is a student
const fInd = db.individual.insertOne({
    name: "Joe Vandal"
})
const fac = db.faculty.insertOne({
    role: "faculty",
    indID: fInd.insertedId
})

// Student Accounts for student.
const studAccts = db.student_accounts.insertMany([
    {
        semester: "Fall 2025",
        tuition: 2500,
        aid_received: 1500,
        student_id: stu.insertedId
    },
    {
        semester: "Fall 2025",
        tuition: 3000,
        aid_received: 1000,
        student_id: stu.insertedId
    }
])

// Salary for faculty.
const salary = db.salary.insertOne({
    rate: 17,
    rateTimeUnit: "hour",
    percentFTE: .5,
    payment: 340,
    fringeRate: 20,
    semester: "Fall 2025",
    id: fac.insertedId
})

// Salary for faculty.
const salary2 = db.salary.insertOne({
    rate: 18.5,
    rateTimeUnit: "hour",
    percentFTE: .5,
    payment: 370,
    fringe_rate: 20,
    semester: "Spring 2025",
    id: fac.insertedId
})

const overs = db.overhead_charges.insertMany([
    {
        charge: 100.27,
        description: "Vandal Swag"
    },
    {
        charge: 99.95,
        description: "Vandal Swag"
    }
])

const travel_profiles = db.travel_profiles.insertOne({
    perDiem: 52,
    airfare: 120,
    lodging: 55
})

const budget = db.budgets.insertOne({
    pi: "Joe Vandal",
    type: "Primary",
    Co_PI: ["Jane Vandal"]
})

const acct = db.institutional_account.insertOne({
    semester: "Fall 2025",
    name: "University of Idaho",
    budgetID: budget.insertedId,
    incoming: 0,
    outgoing: 0,
    outOfStateTuitionRate: 4000,
    inStateTuitionRate: 2500,
    tuitionIncrease: 1,
    facultyFBR: 20,
    studentFBR: 15,
    postDocFBR: 22,
    incoming_tuition: 15000,
    aid_allocated: 4700,
    overheadCharges: overs.insertedId,
    travelProfile: travel_profiles.insertedId,
    studentAccounts: [studAcct.insertedId, studAcct2.insertedId],
    salaryAccounts: [salary.insertedId, salary2.insertedId]
})