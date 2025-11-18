import {StudentSetupForm, StudentForm} from "./form"
export default function page({studentID} : {studentID?: string}) {
    if (studentID) return <StudentForm studentID={studentID}/>
    else return <StudentSetupForm/>
}