// Rates
"use client"
import Form from 'next/form'

export default function Page() {
    const onSubmit = () => {

    }
    return <main className="two">
        <div className='two-column'>

        </div>
        <div>
            <Form action={onSubmit}>
                <label htmlFor="username">Username:</label>
                <input name="username" type="number"/>
            </Form>
        </div>

    </main>
}