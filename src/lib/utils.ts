
export function castFormDataToObject(formData: FormData) {
    const obj: Object =  Object.fromEntries(formData.entries())

    return JSON.parse(JSON.stringify(obj))
}