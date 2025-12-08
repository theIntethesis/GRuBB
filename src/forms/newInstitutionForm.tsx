"use client"

import { BudgetType } from "@/lib/common"
import {BudgetAPI} from "@/lib/models"
import { castFormDataToObject } from "@/lib/utils"
import Form from "next/form"


export default function NewInstituionForm() {
    const onSubmit = async (formData: FormData) => {

        const vals = castFormDataToObject(formData)

        await BudgetAPI.create({
            name: vals.name,
            type: vals.budgetType as BudgetType,
            pi: vals.pi
        })
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

                                required={true}
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