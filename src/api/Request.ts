import React from "react";
import SachModel from "../models/SachModel";
async function my_request(duongDan: string) {
  const response = await fetch(duongDan);
  if (!response.ok) {
    throw new Error(`Không thể truy cập ${duongDan}`);
  }
  return response.json();
}
export default my_request;
