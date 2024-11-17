export const convertToCapitalCase = (str: string) => {
  return str.replace(/[A-Z]/g, (char) => ` + ${char}`).toUpperCase()
}
