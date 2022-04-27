function getDiffDays(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1)
  const date2 = new Date(dateStr2)
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  return Math.floor(Math.abs(d1 - d2) / 86400000)
}


export { getDiffDays }