export type fieldValidatorType = (value: string) => string | undefined

export const required: fieldValidatorType = (value) => {
    if (value) return undefined
    return "empty field!"
}

export const maxLength = (maxLength: number): fieldValidatorType => (value) => {
    if (value.length > maxLength) return `max length is ${maxLength} symbols`
    return undefined
}