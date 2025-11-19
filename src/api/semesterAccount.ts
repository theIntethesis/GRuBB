"use server"
import dbConnect from "@/lib/mongodb";
import { SemesterAccount, OverheadCharge, TravelProfile} from "@/lib/models";
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";

export async function createSemesterAccount(
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

    const newacc = new SemesterAccount({
        semester: semester,
        year: year,
        budgetID,
        inStateTuitionRate,
        outOfStateTuitionRate,
        tuitionIncrease,
        facultyFBR,
        studentFBR,
        postDocFBR,
        studentAccounts: [],
        salaryAccounts: [],
        travelProfile: travelProfile._id,
        overheadCharge: oCharge._id
    });
    await newacc.save()

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${budgetID}/Rates/${year}/${semester}`)
}

export async function modifySemesterAccount(
    budgetID: string,
    semester: string,
    year: string,
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


    revalidatePath("/dashboard", "layout")
}

export async function deleteSemesterAccount(
    budgetID: string
) {

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${budgetID}/Rates`)
}


export async function getAllAccounts(budgetID: string) {
    const accs = await SemesterAccount
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

export async function getSemesterAccount(
    budgetID: string,
    semester: string,
    year: number
) {
    const acc = await (SemesterAccount.find({
        budgetID: budgetID,
        semester: semester,
        year: year
    }).lean())

    const curr = acc[0]

    console.log(curr)

    curr._id = curr._id.toJSON()
    curr.budgetID = curr.budgetID.toJSON()
    curr.travelProfile = curr.travelProfile.toJSON()
    curr.overheadCharge = curr.overheadCharge.toJSON()

    console.log(curr)

    return curr

    // stuff here
}
