import { NextApiRequest, NextApiResponse } from 'next';

import { upsertUniqueSlugForUrl } from 'modules/urlShortener';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const slug = await upsertUniqueSlugForUrl(JSON.parse(req.body).url);
  res.status(200).json(JSON.stringify(slug));
};

export default handler;
