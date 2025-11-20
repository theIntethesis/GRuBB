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
    console.log(year)
    const acc = (await SemesterAccount.findOneAndUpdate({budgetID: budgetID, semester: semester, year: Number(year)}, {
        inStateTuitionRate,
        outOfStateTuitionRate,
        tuitionIncrease,
        facultyFBR,
        studentFBR,
        postDocFBR,
    }))


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

export async function deleteSemesterAccount(
    budgetID: string,
    semester: string,
    year: string
) {

    const acc = await (SemesterAccount.find({
        budgetID: budgetID,
        semester: semester,
        year: Number(year)
    }).lean())

    const curr = acc[0]


    await(TravelProfile.findByIdAndDelete(curr.travelProfile))
    await(OverheadCharge.findByIdAndDelete(curr.overheadCharge))
    await(SemesterAccount.findByIdAndDelete(curr._id))


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


    const travelProfile = await(TravelProfile.findById(curr.travelProfile))
    const overheadCharge = await(OverheadCharge.findById(curr.overheadCharge))
    //console.log(curr)

    curr.budgetID = curr.budgetID.toJSON()

    curr.overheadCharge = curr.overheadCharge.toJSON()

    //console.log(curr)

    return {
        inStateTuitionRate: curr.inStateTuitionRate,
        outOfStateTuitionRate: curr.outOfStateTuitionRate,
        tuitionIncrease: curr.tuitionIncrease,
        year: curr.year,
        semester: curr.semester,
        facultyFBR: curr.facultyFBR,
        studentFBR: curr.studentFBR,
        postDocFBR: curr.postDocFBR,
        perDiem: travelProfile.perDiem,
        airfare: travelProfile.airfare,
        lodging: travelProfile.lodging,
        overheadCharge: overheadCharge.charge
    }


}
