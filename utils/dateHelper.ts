export function convertDate(date: string): string {
    let newDate = new Date(date).toLocaleDateString().split('/').join('-')

    return newDate
}
