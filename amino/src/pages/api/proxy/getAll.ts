import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Livsmedelsida } from "~/lib/models/livsmedel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const url = 'https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?offset=0&limit=20&sprak=1';
    const config: AxiosRequestConfig = { method: 'get' };
    const response = await axios<Livsmedelsida>({ url, ...config });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}