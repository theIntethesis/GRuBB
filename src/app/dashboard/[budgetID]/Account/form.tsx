
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
        const name = (document.getElementById("add-co-pi") as HTMLInputElement).value
        let i = 0;
        let validIndex;
        do {
            validIndex = document.getElementById(i.toString())
            console.log(`Trying to add PI ${name} at index ${i}`)
            i++;
        } while (validIndex);
        let addhere = document.getElementById("addhere")
        addhere.innerHTML = `<div className="co-pi-row" key={${i}} id={${i}}>
        ${name}
        <button formAction={() => removePI(idx)}>Remove</button></div>
        <div id="addhere"/>`
    }
    const removePI = (index: string) => {
        console.log(`Trying to remove PI ${index}`)
        document.getElementById(index)?.remove();
    }

    console.log(budget)


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
                            budget.coPI.map((x, idx) => {

                                return <div className="co-pi-row" key={idx} id={idx}>
                                    {x}
                                    <button formAction={() => removePI(idx)}>Remove</button>
                                </div>
                            })
                        : null}
                        <div id="addhere"/><div/>

                        <button>Save</button>

                </section>


            </Form>
        </div>
    </main>
}