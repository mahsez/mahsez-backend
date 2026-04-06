export const errorMessageTernary = (prodMsg: string, devMsg: string) => {
  return process.env.NODE_ENV === "development" ? devMsg : prodMsg;
};
