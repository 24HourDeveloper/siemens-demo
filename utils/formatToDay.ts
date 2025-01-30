export const formatToDay = (date: string) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('en-US', { weekday: 'short' })
}