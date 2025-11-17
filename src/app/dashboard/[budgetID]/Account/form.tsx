
"use client"

import Form from "next/form"
import { createRoot } from "react-dom/client";

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
        while (document.getElementById(i.toString()) != null) i++;
        console.log(`Adding PI ${name} at index ${i}`);
        
        const Element = (
            <div className="co-pi-row" id={i.toString()}>
                {name}
                <button formAction={() => removePI(i.toString())}>Remove</button>
            </div>
        );
        const ElementString = <div className='co-pi-row' id={i.toString()}>{name}<button formAction={() => removePI(i)}>Remove</button></div>;

        document.getElementById("addhere")!.insertAdjacentHTML('beforebegin', ElementString);
    }
    const removePI = (index: string | number) => {
        console.log(`Trying to remove PI ${index}`)
        document.getElementById(index.toString())?.remove();
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
                        <div id="addhere"></div><div/>
                            
                        <button>Save</button>

                </section>


            </Form>
        </div>
    </main>
}