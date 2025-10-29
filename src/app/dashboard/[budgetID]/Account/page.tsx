// Account
"use client"
import Form from "next/form"
export default function Page() {
    var numCoPIs = 0;
    const onSubmit = () => {
        console.log("Submitted with some params.")
    };
    return <main className='two'>
        <div className='two-column'>
            <Form action={onSubmit}>
                <label htmlFor="name">Budget Name:</label>
                <input name="name" type="text"/>
                <br></br>
                <label htmlFor="PI">Principal Investigator:</label>
                <input name="PI" type="text"></input>
                <br></br>
                <div id="coPIs"> 
                    <button></button>
                </div>
                <label htmlFor=""></label>
                <input name="" type=""></input>
                <label htmlFor="type">Institutional Account Type:</label>
                <select name="type">
                    <option>Primary</option>
                    <option>Secondary</option>
                    <option>Parallel</option>
                </select>
            </Form>
        </div>
        <div>

        </div>
    </main>
}