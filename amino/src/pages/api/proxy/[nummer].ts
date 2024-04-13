import axios, { AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { type Naringsvarden } from '~/lib/models/livsmedel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { nummer } = req.query;

  if (!nummer || typeof nummer !== 'string') {
    res.status(400).json({ error: 'Invalid nummer parameter' });
    return;
  }

  try {
    const url = `https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${nummer}/naringsvarden`;
    const config: AxiosRequestConfig = { method: 'get' };
    const response = await axios.get<Naringsvarden[]>(url, config);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}