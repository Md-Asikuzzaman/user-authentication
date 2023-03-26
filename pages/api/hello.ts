import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ message: 'my name is asik' });
}
