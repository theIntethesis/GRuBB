// Rates
"use client"
import Form from 'next/form'

export default function Page() {
    const onSubmit = () => {

    }
    return <main className="two">
        <div className='two-column'>
            <Form action={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td style={{
                                fontSize: "15pt",
                                textAlign: "center"
                            }}>
                                Travel
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="semester">Semester:</label>
                            </td>
                            <td>
                                <select name="semester" className="rightside" style={{
                                    width:"100%"
                                }}>
                                    <option>Fall</option>
                                    <option>Spring</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="year">Year:</label>
                            </td>
                            <td>
                                <select name="year" className="rightside" style={{
                                    width:"100%"
                                }}>
                                    <option>2025</option>
                                    <option>2026</option>
                                    <option>2027</option>
                                    <option>2028</option>
                                    <option>2029</option>
                                    <option>2030</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="perdiem">Per Diem:</label>
                            </td>
                            <td>
                                $<input name="perdiem" type="number" min="0" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="airfare">Airfare:</label>
                            </td>
                            <td>
                                $<input name="airfare" type="number" min="0" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="lodging">Lodging:</label>
                            </td>
                            <td>
                                $<input name="lodging" type="number" min="0" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td><button className='px-2 py-1 rounded' style={{
                                width: '100%'
                            }}>Submit</button></td>
                        </tr>
                    </tbody>
                </table>
            </Form>
            <hr/>
            <Form action={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td style={{
                                fontSize: "15pt",
                                textAlign: "center"
                            }}>
                                Overhead Charges
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="description">Description:</label>
                            </td>
                            <td>
                                <input name="description" type="text" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="charge">Charge Amount:</label>
                            </td>
                            <td>
                                $<input name="charge" type="number" min="0" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className='px-2 py-1 rounded' style={{
                                    width: '100%'
                                }}>Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
            <hr/>
        </div>


    </main>
}