"use server"
import dbConnect from "@/lib/mongodb";
import { Budget, InstitutionalAccount, OverheadCharge, SalaryAccount, TravelProfile} from "@/lib/models";

export async function getBudget(budgetID: string) {
    await dbConnect()
    try {
        const budget = await Budget.findById(budgetID).lean()
        if (budget != null) {
            budget._id = budget._id.toJSON()
        }
        return budget
    }
    catch (e) {
        console.log(e)
        return null
    }
}

export async function getAllBudgets() {
    await dbConnect()
    const allBudgets = await Budget.find({}).lean()
    allBudgets.forEach(x => {
        x._id = x._id.toJSON()
    })

    return allBudgets
}


export async function createBudget(
    name: string,
    pi: string,
    type: "primary" | "secondary" | "parallel"
){
    await dbConnect()

    const newBudget = new Budget({
        name: name,
        pi,
        coPI: [],
        type: type
    })
    await newBudget.save()

    return newBudget._id.toJSON()
}

export async function createInstitutionalAccount(
    budgetID: string,
    semester: "Fall" | "Spring",
    year: number,
    inStateTuitionRate: number,
    outOfStateTuitionRate: number,
    tuitionIncrease: number,
    facultyFBR: number,
    studentFBR: number,
    postDocFBR: number,
    perDiem: number,
    airfare: number,
    lodging: number,
    overheadCharge: number
) {
    const travelProfile = new TravelProfile({
        perDiem,
        airfare,
        lodging
    })
    await travelProfile.save()

    const oCharge = new OverheadCharge({
        charge: overheadCharge,
        description: ""
    })
    await oCharge.save()

    const newacc = new InstitutionalAccount({
        semester: `${semester} ${year}`,
        budgetID,
        inStateTuitionRate,
        outOfStateTuitionRate,
        tuitionIncrease,
        facultyFBR,
        studentFBR,
        postDocFBR,
        studentAccounts: [],
        salaryAccounts: [],
        travelProfile: [travelProfile._id],
        overheadCharge: oCharge._id
    });
    await newacc.save()

    return newacc._id.toJSON()
}

export async function deleteInstitutionalAccount(
    budgetID: string,
    semesterID: string
) {
    const acc = await InstitutionalAccount.findById(semesterID).lean()

    const travelProfileIDs = acc.travelProfile

    for (let i = 0; i < travelProfileIDs.length; i++) {
        const id = travelProfileIDs[i].toJSON();
        await TravelProfile.findByIdAndDelete(id)
    }
    await OverheadCharge.findByIdAndDelete(acc.overheadCharge)

    await InstitutionalAccount.findByIdAndDelete(semesterID)
}

export async function getInstitutionalAccount(
    budgetID: string,
    semesterID: string
) {
    const acc = await InstitutionalAccount.findById(semesterID).lean()

    let ret = {
        semester: acc.semester,
        _id: acc._id.toJSON(),
        inStateTuitionRate: acc.inStateTuitionRate,
        outOfStateTuitionRate: acc.outOfStateTuitionRate,
        tuitionIncrease: acc.tuitionIncrease,
        facultyFBR: acc.facultyFBR,
        studentFBR: acc.studentFBR,
        postDocFBR: acc.postDocFBR
    }

    return ret
}

export async function modifyBudget(
    budgetID: string,
    modifiedBudget: any
) {
    await dbConnect()
    const res = await Budget.findByIdAndUpdate(budgetID, {
        name: modifiedBudget.name,
        pi: modifiedBudget.pi,
        coPI: modifiedBudget.coPI
    })
}
