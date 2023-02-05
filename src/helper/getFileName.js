export const getFileName = (string) => {
  const newString = string.split("_");
  const fileName = newString[1];
  return fileName;
};
