
"use client"

import { BudgetAPI } from "@/lib/models";
import { castFormDataToObject } from "@/lib/utils";
import Form from "next/form"
import { useState } from "react";

export default function AccountForm({ budget } : {budget: any}) {

    const [coPIs, setCoPIs] = useState<string[]>(budget.coPI)

    // these will be server side
    const onSubmit = async (formData: FormData) => {
        const vals = castFormDataToObject(formData)

        await BudgetAPI.modify({
            name: vals.name,
            type: budget.type,
            pi: vals.pi,
            coPI: coPIs
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
                <section className="account-form-table">

                    <label htmlFor="name">Budget Name:</label>
                    <input name="name" type="text" defaultValue={budget.name}></input>

                    <span/><span/>

                    <label htmlFor="pi">Principal Investigator:</label>
                    <input name="pi" type="text" defaultValue={budget.pi}></input>

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
                        {/* make span 2 */}
                        <button>Save</button>

                </section>
            </Form>
        </div>
    </main>
}