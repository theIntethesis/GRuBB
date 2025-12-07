
export function castFormDataToObject(formData: FormData) {
    const obj: Object =  Object.fromEntries(formData.entries())
    const str = JSON.stringify(obj)
    return JSON.parse(str)
}