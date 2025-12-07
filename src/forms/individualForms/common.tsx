"use client"
import { EmpolymentType, SemesterCombo, semesterEq } from "@/lib/common";
import { I_Individual } from "@/lib/models/_individual";
import { I_SalaryAccount } from "@/lib/models/salaryAccount";
import { SemesterAccountCombo } from "@/lib/models/semesterAccount";
import { I_StudentAccount } from "@/lib/models/studentAccount";
import { redirect } from "next/navigation";
import { Dispatch } from "react";

export function IndividualLine({individual}: {individual?: I_Individual}) {
    return <tr>
        <td colSpan={2} style={{
            textAlign: "center"
        }}>
            <input
                type="text"
                placeholder="Name"
                defaultValue={individual != null ? individual.name : ""}
                required={true}
                name="name"
                style={{
                    fontSize: "20pt",
                    fontWeight: "bold"
                }}
            />
        </td>

    </tr>
}

// select a semester for which the indiviudal has an account in
export function SelectSemesterDropdown(
    {basePath, semesters, currentSemester, displayAddNew}:
    {basePath: string, semesters?: SemesterCombo[], currentSemester?: SemesterCombo, displayAddNew: boolean}
) {
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // probably e.target.value or smth
        // console.log(e.target.id)
        // console.log(basePath + e.target.value)
        redirect(basePath + e.target.value)
    }

    return <td>
        <select
            onChange={handleOnChange}
            defaultValue={currentSemester == null ? "" : `${currentSemester.year}/${currentSemester.semester}`}
        >
            {semesters?.map(x => {
                return <option
                    value={`${x.year}/${x.semester}`}
                    key={`${x.year}/${x.semester}`}
                >
                    {x.semester} {x.year}
                </option>
            })}
            {displayAddNew ? <option value="">Add New Semester</option> : undefined}

        </select>
    </td>
}

// define a new semester
export function ChooseSemesterDropdown({semesters, setSemester} : {semesters: SemesterCombo[], setSemester: Dispatch<any>}) {
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log(e.target.value)
        setSemester(semesters[Number(e.target.value)])

    }

    return <td>
        <select onChange={handleOnChange}>
            {semesters?.map((x, idx) => {
                return <option value={idx} key={idx}>{x.semester} {x.year}</option>
            })}
        </select>
    </td>
}


export function SalaryAccountSection(
    {salaryAccounts, semesterAccounts, currentSemester, role}:
    {salaryAccounts?: I_SalaryAccount[], semesterAccounts: SemesterAccountCombo[], currentSemester: SemesterCombo, role: EmpolymentType}
) {
    const salaryAccount = salaryAccounts?.find((val) => semesterEq(val, currentSemester))

    return <>
        <tr>
            <td>
                <label htmlFor="rate">Rate:</label>
            </td>
            <td>
                <div className="inputOuterLeft" style={{width: "45%"}}>
                    $<input type="float" id="rate" name="rate" defaultValue={salaryAccount != null ? salaryAccount.rate : 0}/>
                </div>
                <div style={{display: "inline-block", width: "10%", textAlign: "center"}}>/</div>
                <div className="inputOuterRight"  style={{width: "45%", height: "100%", padding: "0.25em"}}>
                    <select name="rateTimeUnit" defaultValue={salaryAccount != null ? salaryAccount.rate : "hour"}><option value={"hour"}>Hour</option><option value={"year"}>Year</option></select>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="percentFTE">Percent of Full Time Equivalent:</label>
            </td>
            <td>
                <div className="inputOuterRight">
                    {/* this needs to be limited if they're a student */}
                    <input type="number" id="percentFTE" name="percentFTE" min={0} max={100} defaultValue={salaryAccount != null ? salaryAccount.percentFTE * 100 : 100}/>%
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="payment">Payment:</label>
            </td>
            <td>
                <div className="inputOuterLeft">
                    {/* TODO calculate this */}
                    $<input type="number" disabled={true}/>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="FBR">Fringe Benefits Rate:</label>
            </td>
            <td>
                {/* TODO fetch this */}
                <div className="inputOuterRight">
                <input type="number"/>%
                </div>
            </td>
        </tr>
    </>
}

export function getSemesterData(budgetID : string, semesterAccounts: SemesterAccountCombo[], salaryAccounts: I_SalaryAccount[], studentAccounts: I_StudentAccount[]): {semesters: SemesterCombo[], absentSemesters: SemesterCombo[]} {

    const allSemesters = semesterAccounts?.map(x => {
        return {
            semester: x.semesterAccount.semester,
            year: x.semesterAccount.year
        }
    }) || []

    if (allSemesters.length == 0) {
        redirect(`/dashboard/${budgetID}/SemesterRates/`)
    }

    const studentSemesters = studentAccounts?.map(x => {
        return {
            semester: x.semester,
            year: x.year
        }
    }) || []

    const salarySemesters = salaryAccounts?.map(x => {
        return {
            semester: x.semester,
            year: x.year
        }
    }) || []

    const semesters = studentSemesters

    // studentSemesters union salarySemesters
    salarySemesters.forEach((val) => {
        if (!semesters.find(x => semesterEq(val, x))) {
            semesters.push(val)
        }
    })

    // allSemesters intersection semesters
    const absentSemesters = allSemesters.filter((val) => {
        if (semesters.find(x => semesterEq(val, x))) {
            return false;
        }
        return true;
    })

    return {
        semesters: semesters,
        absentSemesters: absentSemesters
    }
}