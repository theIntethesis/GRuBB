"use client"

import Form from "next/form"

export default function InstitutionForm() {
    // server side this
    const onSubmitInst = (formData: FormData) => {
        // Create new institution
        // Get institutional ID
        // Go to default page for that institution.
    };
    return <div>
        <Form action={onSubmitInst}>
            <table>
                <tbody>
                    <tr>
                        <td className="leftside">Institution Name</td>
                        <td className="rightside">
                            <input type="text" name="name"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">Semester:</td>
                        <td className="rightside">
                            <select name="semester">
                                <option>Fall 2025</option>
                                <option>Spring 2025</option>
                                <option>Fall 2026</option>
                                <option>Spring 2026</option>
                                <option>Fall 2027</option>
                                <option>Spring 2027</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">Out-of-State Tuition Rate</td>
                        <td className="rightside">
                            $<input name="oosTuition" type="number"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">In-State Tuition Rate</td>
                        <td className="rightside">
                            $<input name="isTuition"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">Tuition Increase</td>
                        <td className="rightside">
                            $<input name="tuitIncrease"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">Faculty Fringe Benefit Rate</td>
                        <td className="rightside">
                            $<input name="facFBR"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">Post-Doctorate Fringe Benefit Rate</td>
                        <td className="rightside">
                            $<input name="pdFBR"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">Student Fringe Benefit Rate</td>
                        <td className="rightside">
                            $<input name="oosTuition"></input>
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