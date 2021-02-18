export const toSentence = (text) => {
  const result = text.replace(/([A-Z])/g, " $1")
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const toKeysAndValues = (object) => {
  const arr = []
  Object.keys(object).forEach((key) => {
    if (key !== '_id') {
      arr.push({ key, value: object[key] })
    }
  });
  return arr;
}

export const toUpperSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();