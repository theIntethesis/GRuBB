"use server"
import dbConnect from "@/lib/mongodb";
import { Budget, InstitutionalAccount, OverheadCharge, SalaryAccount, TravelProfile} from "@/lib/models";
import { revalidatePath} from 'next/cache'
import { redirect } from "next/navigation";

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

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${budgetID}/Rates/${newacc._id.toJSON()}`)
}

export async function modifyInstitutionalAccount(
    budgetID: string,
    semesterID: string,
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
    await dbConnect()
    await InstitutionalAccount.findByIdAndUpdate(semesterID, {
        inStateTuitionRate,
        outOfStateTuitionRate,
        tuitionIncrease,
        facultyFBR,
        studentFBR,
        postDocFBR,
    })

    const acc = await InstitutionalAccount.findById(semesterID).select("travelProfile overheadCharge").lean()

    console.log(acc)


    await TravelProfile.findByIdAndUpdate(acc.travelProfile, {
        perDiem,
        airfare,
        lodging
    })

    await OverheadCharge.findByIdAndUpdate(acc.overheadCharge, {
        charge: overheadCharge
    })


    revalidatePath("/dashboard", "layout")
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

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${budgetID}/Rates`)
}



export async function getAllAccounts(budgetID: string) {
    const accs = await InstitutionalAccount
        .find({budgetID: budgetID})
        .lean()

    accs.forEach(x => {
        x._id = x._id.toJSON()
        x.budgetID = x.budgetID.toJSON()
        x.travelProfile = ""
        x.overheadCharge = x.overheadCharge?.toJSON() || null
    })

    return accs

}

export async function getInstitutionalAccount(
    budgetID: string,
    semesterID: string
) {
    const acc = await InstitutionalAccount.findById(semesterID).lean()

    const travelProfiles = await TravelProfile.findById(acc.travelProfile).lean()
    const overheadCharges = await OverheadCharge.findById(acc.overheadCharge).lean()

    let ret = {
        semester: acc.semester,
        _id: acc._id.toJSON(),
        inStateTuitionRate: acc.inStateTuitionRate,
        outOfStateTuitionRate: acc.outOfStateTuitionRate,
        tuitionIncrease: acc.tuitionIncrease,
        facultyFBR: acc.facultyFBR,
        studentFBR: acc.studentFBR,
        postDocFBR: acc.postDocFBR,
        perDiem: travelProfiles.perDiem,
        airfare: travelProfiles.airfare,
        lodging: travelProfiles.lodging,
        overheadCharge: overheadCharges.charge
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
