"use client"
import Form from "next/form"

const calculatePayment = () => {
    // Calculation logic here
    const rate = (document.getElementById("rate") as HTMLInputElement).valueAsNumber;
    const rateUnit = (document.getElementById("rateUnit") as HTMLSelectElement).value;
    const percentFTE = (document.getElementById("percentFTE") as HTMLInputElement).valueAsNumber;
    console.log("Rate:", rate, "Rate Unit:", rateUnit, "Percent FTE:", percentFTE);
    (document.getElementById("payment") as HTMLInputElement).value = (Number(rate) * (rateUnit === "Hour" ? 2080 : 1) * (Number(percentFTE) / 100)).toString()
}
const getFBR = () => {
    // Fetch FBR logic here
    (document.getElementById("FBR") as HTMLInputElement).value = "30" // Example static value
}
export function FacultySetupForm() {
    const onSubmit = () => {

    }
    return <div>
        <Form action={onSubmit}>
            <table style={{
                margin: "auto",
            }}>
                <tbody>
                    <tr>
                        <td colSpan={2} style={{
                            textAlign: "center"
                        }}>
                            <input type="text" placeholder="Faculty Name" style={{
                                fontSize: "20pt",
                                fontWeight: "bold"
                            }}/>
                            <hr/>
                            <select>
                                <option>Fall</option>
                                <option>Spring</option>
                            </select>
                            <input type="number" placeholder="Year" min="2024" max="2040"/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>
                            <select>
                                <option>Faculty</option>
                                <option>Staff</option>
                                <option>Post-Doc</option>
                            </select>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="rate">Rate:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="rate" name="rate" onChange={calculatePayment}/> / <select id="rateUnit" onChange={calculatePayment}><option>Hour</option><option>Year</option></select>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="percentFTE">Percent of Full Time Equivalent:</label>
                        </td>
                        <td className="rightside">
                            <input type="number" id="percentFTE" name="percentFTE" min={0} max={100} onChange={calculatePayment}/>%
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="payment">Payment:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="payment" name="payment" disabled={true}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="FBR">Fringe Benefits Rate:</label>
                        </td>
                        <td className="rightside">
                            <input type="number" id="FBR" name="FBR" min={0} max={100} disabled={true}/>%
                        </td>
                    </tr>
                    <tr><td colSpan={2} style={{textAlign: "center"}}>
                        <button style={{width: "100%"}}>Submit</button>
                    </td></tr>
                </tbody>
            </table>
        </Form>
    </div>  
}

export function FacultyForm({facultyID} : {facultyID?: string}) {
    const onSubmit = () => {

    }
    return <div>
        <Form action={onSubmit}>
            <table style={{
                margin: "auto",
            }}>
                <tbody>
                    <tr>
                        <td colSpan={2} style={{
                            textAlign: "center"
                        }}>
                            <input type="text" placeholder="Faculty Name" style={{
                                fontSize: "20pt",
                                fontWeight: "bold"
                            }}>{/* Faculty Name */}</input>
                            <hr/>
                            <select>
                                <option>Fall</option>
                                <option>Spring</option>
                            </select>
                            <input type="number" placeholder="Year" min="2024" max="2040"/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>
                            <select>
                                <option>Faculty</option>
                                <option>Staff</option>
                                <option>Post-Doc</option>
                            </select>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="rate">Rate:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="rate" name="rate" onChange={calculatePayment}/> / <select id="rateUnit" onChange={calculatePayment}><option>Hour</option><option>Year</option></select>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="percentFTE">Percent of Full Time Equivalent:</label>
                        </td>
                        <td className="rightside">
                            <input type="number" id="percentFTE" name="percentFTE" min={0} max={100} onChange={calculatePayment}/>%
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="payment">Payment:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="payment" name="payment" disabled={true}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="FBR">Fringe Benefits Rate:</label>
                        </td>
                        <td className="rightside">
                            <input type="number" id="FBR" name="FBR" min={0} max={100} disabled={true}/>%
                        </td>
                    </tr>
                    <tr><td colSpan={2} style={{textAlign: "center"}}>
                        <button style={{width: "100%"}}>Submit</button>
                    </td></tr>
                </tbody>
            </table>
        </Form>
    </div> 
}