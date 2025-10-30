import { Individual, Faculty } from "@/lib/models"

export default async function page({params}) {
    const { facultyID } = await params
    console.log(facultyID)



    const individual = await Individual
        .findById(facultyID)
        .lean()


    console.log(individual)

    const faculty = await Faculty
        .find({
            indID: individual._id
        })
        .lean()

    console.log(faculty)

    return <div>
        name: {individual.name}
        <br/>
    </div>
}