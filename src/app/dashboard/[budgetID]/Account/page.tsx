// Account
"use client"
import Form from "next/form"
export default function Page() {
    var numCoPIs = 0;
    const PISection = `<tr><td><label htmlFor="CoPI${numCoPIs}">Co-PI:</label></td><td><input name="CoPI${numCoPIs}" type="text"></input></td></tr>`
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
    return <main className='two'>
        <div className='two-column'>
            <Form action={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td className="left-align">
                                <label htmlFor="name">Budget Name:</label>
                            </td>
                            <td className="right-align">
                                <input name="name" type="text" className="px-2 py-1 rounded"></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="PI">Principal Investigator:</label></td>
                            <td><input name="PI" type="text" className="px-2 py-1 rounded"></input></td>                        
                        </tr>
                        <tr id="coPIs">
                            <td>
                                <button className="px-2 py-1 rounded" onClick={addPI}>Add Co-PI</button>
                            </td>
                            <td>
                                <button className="px-2 py-1 rounded" onClick={removePI}>Remove Co-PI</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="type">Institutional Account Type:</label>
                            </td>
                            <td>
                                <select name="type" className="institution-dropdown">
                                    <option>Primary</option>
                                    <option>Secondary</option>
                                    <option>Parallel</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="px-2 py-1 rounded">Submit</button>
            </Form>
        </div>
        <div>

        </div>
    </main>
}