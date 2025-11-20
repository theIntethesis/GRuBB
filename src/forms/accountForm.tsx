
"use client"

import Form from "next/form"
import { useState } from "react";
import { modifyBudget } from "@/api/budget";

export default function AccountForm({ budget } : {budget: any}) {

    const [coPIs, setCoPIs] = useState<string[]>(budget.coPI)

    // these will be server side
    const onSubmit = async (formData: FormData) => {

        await modifyBudget(budget._id, {
            name: formData.get("name") != "" ? formData.get("name") : budget.name,
            pi: formData.get("PI") != "" ? formData.get("PI") : budget.pi,
            coPI: coPIs
        })
    };
    const addPI = () => {
        // reload budget
        const name = (document.getElementById("add-co-pi") as HTMLInputElement).value

        setCoPIs([...coPIs, name])
    }
    const removePI = (coPIName: string) => {
        // reload budget

        setCoPIs(coPIs.filter(x => x != coPIName))
    }

    return <main>
        <div>
            <Form action={onSubmit}>
                <section className="account-form-table">

                        <label htmlFor="name">Budget Name:</label>
                        <input name="name" type="text" defaultValue={budget.name}></input>

                        <span/><span/>

                        <label htmlFor="PI">Principal Investigator:</label>
                        <input name="PI" type="text" defaultValue={budget.pi}></input>

                        <input id="add-co-pi" type="text"></input>
                        <button formAction={addPI}>Add</button>
                        {budget != null ?
                            coPIs.map((x, idx) => {
                                return <div className="co-pi-row" key={idx} id={idx.toString()}>
                                    {x}
                                    <button formAction={() => removePI(x)}>Remove</button>
                                </div>
                            })
                        : null}
                        <div id="addhere"/><div/>

                        <button className="actionButton updateButton">Save</button>

                </section>
            </Form>
        </div>
    </main>
}