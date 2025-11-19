"use client"

import { createBudget } from "@/api/budget"
import Form from "next/form"

export default function NewInstituionForm() {
    const onSubmit = async (formData: FormData) => {
        const id = await createBudget(
            formData.get("name")?.toString() || "Unnamed",
            formData.get("pi")?.toString() || "",
            "primary" // [todo]
        );

    }


    return <div>
        <Form action={onSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td className="leftside">Institution Name</td>
                        <td className="rightside">
                            <input type="text" name="name"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">Budget Type</td>
                        <td className="rightside">
                            <select name="budgetType">
                                <option>Primary</option>
                                <option>Secondary</option>
                                <option>Parallel</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">Principle Investigator</td>
                        <td className="rightside">
                            <input type="test" name="pi"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button>Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Form>
    </div>

}