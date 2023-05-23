

export function convertStrDateToVieStringDate(dateString : string | undefined){
  if (dateString !== undefined) {
    const date = new Date(dateString);
    return `${date?.getUTCDate()}-${date?.getUTCMonth()}-${date?.getUTCFullYear()}`
  }
}

export function convertStrDateToMonthDayString(dateString : string | undefined){
  if (dateString !== undefined) {
    const date = new Date(dateString);
    const month = date.toLocaleString('EN', { month: 'long' });
    return `${month.toUpperCase()}  ${date.getUTCDate()}`
  }
}