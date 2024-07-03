import { HandlerData } from "./types";

export const defineResponse = (data: HandlerData) => {
  return {
    status: "success",
    message: data.message ?? "success",
    data: data.data,
  };
};
