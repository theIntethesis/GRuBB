
"use client"

import { BudgetAPI } from "@/lib/models";
import { I_Budget } from "@/lib/models/budget";
import { castFormDataToObject } from "@/lib/utils";
import Form from "next/form"
import { useState } from "react";

export default function AccountForm({ budget } : {budget: I_Budget}) {
    if (budget.coPI == undefined) {
        return
    }

    const [coPIs, setCoPIs] = useState<string[]>(budget.coPI)

    // these will be server side
    const onSubmit = async (formData: FormData) => {
        const vals = castFormDataToObject(formData)

        await BudgetAPI.modify({
            name: vals.name,
            type: budget.type,
            pi: vals.pi,
            coPI: coPIs,
            _id: budget._id
        })
    };

    const addPI = () => {
        const name = (document.getElementById("add-co-pi") as HTMLInputElement).value
        setCoPIs([...coPIs, name])
    }
    const removePI = (coPIName: string) => {
        setCoPIs(coPIs.filter(x => x != coPIName))
    }

    return <main>
        <div>
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
                                    defaultValue={budget.name}
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
                            <td><label htmlFor="pi">Principal Investigator:</label></td>
                            <td><input name="pi" type="text" defaultValue={budget.pi}></input></td>
                        </tr>
                        <tr><td colSpan={2}><hr/></td></tr>
                            <tr>
                                <td><input id="add-co-pi" type="text" placeholder="Name"></input></td>
                                <td><button onClick={addPI} className="actionButton submitButton">Add</button></td>
                            </tr>
                            {budget != null ?
                                coPIs.map((x, idx) => {
                                    return <tr key={idx} id={idx.toString()}>
                                        <td><input disabled={true} value={x}/></td>
                                        <td><button onClick={() => removePI(x)} className="actionButton warning">Remove</button></td>
                                    </tr>
                                })
                            : null}

                            <tr><td><button className="actionButton submitButton">Save</button></td></tr>

                    </tbody>

                </table>
            </Form>
        </div>
    </main>
}