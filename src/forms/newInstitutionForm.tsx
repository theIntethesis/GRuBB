"use client"

import { BudgetType } from "@/lib/common"
import { BudgetAPI, FacultyAPI, SalaryAccountAPI, SemesterAccountAPI, StudentAccountAPI, StudentAPI } from "@/lib/models"
import { castFormDataToObject } from "@/lib/utils"
import { useState } from 'react'
import { redirect } from "next/navigation"
import Form from "next/form"


export default function NewInstituionForm() {
    const onSubmit = async (formData: FormData) => {
        const vals = castFormDataToObject(formData)
        vals.airfare = parseInt(vals.airfare)
        vals.default_faculty = parseInt(vals.default_faculty)
        vals.default_length = parseInt(vals.default_length)
        vals.default_post_doc = parseInt(vals.default_post_doc)
        vals.default_students = parseInt(vals.default_students)
        vals.default_year = parseInt(vals.default_year)
        vals.facultyFBR = parseInt(vals.facultyFBR)
        vals.inStateTuitionRate = parseInt(vals.inStateTuitionRate)
        vals.lodging = parseInt(vals.lodging)
        vals.outOfStateTuitionRate = parseInt(vals.outOfStateTuitionRate)
        vals.overheadCharge = parseInt(vals.overheadCharge)
        vals.perdiem = parseInt(vals.perdiem)
        vals.postDocFBR = parseInt(vals.postDocFBR)
        vals.studentFBR = parseInt(vals.studentFBR)
        vals.tuitionIncrease = parseInt(vals.tuitionIncrease)
        console.log(vals)

        const budgetID = await BudgetAPI.createNR({
            name: vals.name,
            type: vals.budgetType as BudgetType,
            pi: vals.pi
        })
 
        console.log("got here")
        if (!showingDefaults) {
            let sem = vals.default_semester
            let year = vals.default_year
            console.log(`Creating ${vals.default_length} semesters starting in ${vals.default_semester} ${vals.default_year}`)
            for (let i = 0; i < vals.default_length; i++) {
                console.log(`Creating semester ${sem} ${year}`)
                SemesterAccountAPI.createNR(
                    {
                        semesterAccount: {
                            inStateTuitionRate: vals.inStateTuitionRate * (1 + vals.tuitionIncrease / 100),
                            outOfStateTuitionRate: vals.outOfStateTuitionRate * (1 + vals.tuitionIncrease / 100),
                            tuitionIncrease: vals.tuitionIncrease,
                            facultyFBR: vals.facultyFBR,
                            studentFBR: vals.studentFBR,
                            postDocFBR: vals.postDocFBR,
                            semester: sem,
                            year: year,
                            budgetID: budgetID
                        },
                        travelProfile: {
                            perDiem: vals.perdiem,
                            airfare: vals.airfare,
                            lodging: vals.lodging
                        },
                        overheadCharge: {
                            charge: vals.overheadCharge,
                            description: ""
                        }
                    },
                    {budgetID}
                )
                vals.inStateTuitionRate = Math.round(vals.inStateTuitionRate * (1 + vals.tuitionIncrease / 100));
                vals.outOfStateTuitionRate = Math.round(vals.outOfStateTuitionRate * (1 + vals.tuitionIncrease / 100));
                if (sem == "Fall") {
                    sem = "Spring";
                }
                else {
                    sem = "Fall";
                    year += 1;
                }
            }
            for (let i = 0; i < vals.default_students; i++) {
                console.log(`Creating student ${i+1}`)
                let indID = await StudentAPI.createNR({
                    student: {
                        outOfState: false
                    },
                    individual: {
                        name: `Student ${i+1}`
                    }  
                }, {budgetID});
                sem = vals.default_semester
                year = vals.default_year
                for (let sI = 0; sI < vals.default_length; sI++){
                    StudentAccountAPI.createNR(
                        {
                            aidRecieved: 0,
                            individualID: indID,
                            semester: sem,
                            year: year
                        },
                        {
                            individualID: indID
                        }
                    )
                    if (sem == "Fall") {
                        sem = "Spring";
                    }
                    else {
                        sem = "Fall";
                        year += 1;
                    }
                }
            }
            for (let i = 0; i < vals.default_post_doc; i++) {
                console.log(`Creating post doc ${i+1}`)
                let fID = await FacultyAPI.createNR({
                    faculty: {
                        role: "Post-Doc"
                    },
                    individual: {
                        name: `Post-Doc ${i+1}`
                    }
                }, {budgetID})
                sem = vals.default_semester
                year = vals.default_year
                for (let sI = 0; sI < vals.default_length; sI++){
                    SalaryAccountAPI.createNR(
                        {
                            rate: 20,
                            rateTimeUnit: "Hour",
                            percentFTE: 50,
                            individualID: fID,
                            semester: sem,
                            year: year
                        },
                        {
                            individualID: fID
                        }
                    )
                    if (sem == "Fall") {
                        sem = "Spring";
                    }
                    else {
                        sem = "Fall";
                        year += 1;
                    }
                }
            }
            for (let i = 0; i < vals.default_faculty; i++) {
                console.log(`Creating faculty ${i+1}`)
                let fID = await FacultyAPI.createNR({
                    faculty: {
                        role: "Faculty"
                    },
                    individual: {
                        name: `Faculty ${i+1}`
                    }
                }, {budgetID})
                sem = vals.default_semester
                year = vals.default_year
                for (let sI = 0; sI < vals.default_length; sI++){
                    SalaryAccountAPI.createNR(
                        {
                            rate: 50000,
                            rateTimeUnit: "Year",
                            percentFTE: 100,
                            individualID: fID,
                            semester: sem,
                            year: year
                        },
                        {
                            individualID: fID
                        }
                    )
                    if (sem == "Fall") {
                        sem = "Spring";
                    }
                    else {
                        sem = "Fall";
                        year += 1;
                    }
                }
            }
        }
        redirect(`/dashboard/${budgetID}`)
    }
    const [showingDefaults, setDefaults] = useState(true);
    const toggleDefaults = () => {
        setDefaults(!showingDefaults)
    }

    return <div>
        <Form action={onSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2} style={{
                                textAlign: "center"
                        }}>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                style={{
                                    fontSize: "20pt",
                                    fontWeight: "bold"
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">Budget Type</td>
                        <td className="rightside">
                            <select name="budgetType">
                                <option value="Primary">Primary</option>
                                <option value="Secondary">Secondary</option>
                                <option value="Parallel">Parallel</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">Principal Investigator</td>
                        <td className="rightside">
                            <input type="test" name="pi"></input>
                        </td>
                    </tr>
                    <tr><td colSpan={2}><hr></hr></td></tr>
                    <tr><td colSpan={2}><hr></hr></td></tr>
                    <tr>
                        <td colSpan={2}>
                            <button formAction={toggleDefaults}>{showingDefaults ? "Show" : "Hide"} Default Values</button>
                        </td>
                    </tr>
                    {showingDefaults ? <></> : <>
                    <tr><td colSpan={2}><hr></hr></td></tr>
                    <tr>
                        <td>Initial Semester: </td>
                        <td>
                            <div style={{display: 'inline-grid', gridTemplateColumns: "auto auto", columnGap: "0.5em"}}>
                                <select style={{height: "2em"}} name="default_semester">
                                    <option>Fall</option>
                                    <option>Spring</option>
                                </select>
                                <input type="number" min={2025} name="default_year"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Budget Length (Semsters)</td>
                        <td>
                            <div className="inputOuterLeft">
                                :<input type="number" name="default_length" min={1} defaultValue={1}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Students</td>
                        <td>
                            <div className="inputOuterLeft">
                                :<input type="number" name="default_students" min={0} defaultValue={0}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Post-Doctorates</td>
                        <td>
                            <div className="inputOuterLeft">
                                :<input type="number" name="default_post_doc" min={0} defaultValue={0}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Faculty</td>
                        <td>
                            <div className="inputOuterLeft">
                                :<input type="number" name="default_faculty" min={0} defaultValue={0}/>
                            </div>
                        </td>
                    </tr>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <tr><td colSpan={2}><h2>Rates</h2></td></tr>
                    <tr>
                        <td>
                            <label htmlFor="inStateTuitionRate">In-State Tuition Rate:</label>
                        </td>
                        <td>
                            <div className="inputOuterLeft">
                            $<input name="inStateTuitionRate" type="number" min="0"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="outOfStateTuitionRate">Out-of-State Tuition Rate:</label>
                        </td>
                        <td>
                            <div className="inputOuterLeft">
                            $<input name="outOfStateTuitionRate" type="number" min="0"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="tuitionIncrease">Tuition Increase:</label>
                        </td>
                        <td>
                            <div className="inputOuterRight">
                            <input name="tuitionIncrease" type="number" min="0" max="100"/>%
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="facultyFBR">Faculty Fringe Benefits Rate:</label>
                        </td>
                        <td>
                            <div className="inputOuterRight">
                            <input name="facultyFBR" type="number" min="0" max="100"/>%
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="studentFBR">Student Fringe Benefits Rate:</label>
                        </td>
                        <td>
                            <div className="inputOuterRight">
                            <input name="studentFBR" type="number" min="0" max="100"/>%
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>

                            <label htmlFor="postDocFBR">Post-Doc Fringe Benefits Rate:</label>

                        </td>
                        <td>
                            <div className="inputOuterRight">
                            <input name="postDocFBR" type="number" min="0" max="100"/>%
                            </div>
                        </td>
                    </tr>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <tr>
                        <td colSpan={2}>
                            <h2>Travel</h2>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="perdiem">Per Diem:</label>
                        </td>
                        <td>
                            <div className="inputOuterLeft">
                            $<input name="perdiem" type="number" min="0"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="airfare">Airfare:</label>
                        </td>
                        <td>
                            <div className="inputOuterLeft">
                            $<input name="airfare" type="number" min="0"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="lodging">Lodging:</label>
                        </td>
                        <td>
                            <div className="inputOuterLeft">
                            $<input name="lodging" type="number" min="0"/>
                            </div>
                        </td>
                    </tr>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <tr>
                        <td colSpan={2}>
                            <h2>Overhead Charges</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="overheadCharge">Charge Amount:</label>
                        </td>
                        <td>
                            <div className="inputOuterLeft">
                            $<input name="overheadCharge" type="number" min="0"/>
                            </div>
                        </td>
                    </tr></>}
                    <tr><td colSpan={2}><hr></hr></td></tr>
                    <tr>
                        <td>
                            <button className="actionButton submitButton">Submit</button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </Form>
    </div>

}