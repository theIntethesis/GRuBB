// Rates
"use client"
import Form from 'next/form'

export default function Page() {
    const onSubmit = () => {

    }
    return <main className="two">
        <div className='two-column'>
            <label>[Student / Faculty Selector]</label>
            <Form action={onSubmit}>
                <table>
                    <tr>
                        <label>[STUDENT NAME CENTERED]</label>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="rate">Rate per Hour:</label>
                        </td>
                        <td>
                            <input name="rate" type="number" min="0"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="time">Hours per Week:</label>
                        </td>
                        <td>
                            <input name="time" type="number" min="0"/>
                        </td>
                    </tr>
                </table>
                <button className='px-2 py-1 rounded'>Submit</button>
            </Form>
            <hr/>
            <Form action={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <label>Travel [CENTER THIS]</label>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="semester">Semester:</label>
                            </td>
                            <td>
                                <select name="semester">
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
                                <select name="year">
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
                                <input name="perdiem" type="number"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="airfare">Airfare:</label>
                            </td>
                            <td>
                                <input name="airfare" type="number"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="lodging">Lodging:</label>
                            </td>
                            <td>
                                <input name="lodging" type="number" min="0"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='px-2 py-1 rounded'>Submit</button>
            </Form>
            <hr/>
            <Form action={onSubmit}> 
                <table>
                    <tbody>
                        <tr>
                            <label>Overhead Charges [CENTER THIS]</label>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="description">Description:</label>
                            </td>
                            <td>
                                <input name="description" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="charge">Charge Amount:</label>
                            </td>
                            <td>
                                <input name="charge" type="number" min="0"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='px-2 py-1 rounded'>Submit</button>
            </Form>
            <hr/>
        </div>
        <div>
        </div>

    </main>
}