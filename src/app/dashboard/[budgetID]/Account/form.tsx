
"use client"

import Form from "next/form"

export default function AccountForm({budget}) {
    // these will be server side
    const onSubmit = (formData: FormData) => {
        console.log(formData.get('name'))
        console.log(formData.get('PI'))
        console.log(formData.get('type'))
    };
    const addPI = () => {
        console.log("Trying to add PI")
    }
    const removePI = () => {
        console.log("Trying to add PI")
    }

    console.log(budget)


    return <main>
        <div>
            <Form action={onSubmit}>
                <section className="account-form-table">

                        <label htmlFor="name">Budget Name:</label>
                        <input name="name" type="text" defaultValue={budget.name}></input>

                        <div>
                            <label htmlFor="type">Institutional Account Type:</label>
                        </div>
                        <div>
                            <select name="type" className="institution-dropdown">
                                <option>Primary</option>
                                <option>Secondary</option>
                                <option>Parallel</option>
                            </select>
                        </div>

                        <span/><span/>

                        <label htmlFor="PI">Principal Investigator:</label>
                        <input name="PI" type="text" defaultValue={budget.pi}></input>

                        <input name="add-co-pi" type="text"></input>
                        <button>Add</button>

                        {budget != null ?
                            budget.coPI.map((x, idx) => {

                                return <div className="co-pi-row" key={idx}>
                                    <input name="modify-co-pi" type="text" defaultValue={x}/>
                                    <button>Remove</button>
                                </div>
                            })
                        : null}
                        <span/><span/>
                        <button>Save</button>
                </section>


            </Form>
        </div>
    </main>
}