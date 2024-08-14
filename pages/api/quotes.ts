import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://favqs.com/api/qotd');
    const data = await response.json();
    const quote: Quote = {
      body: data.quote.body,
      author: data.quote.author,
      url: data.quote.url,
      tags: data.quote.tags,
    };
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
}
