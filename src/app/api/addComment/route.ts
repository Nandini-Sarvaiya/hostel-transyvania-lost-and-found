import { commentsDB } from '@/utils/commentsDB'; // Assume you have a commentsDB for storage

export default function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const { imageId, comment } = req.body;
    // Here, you would add the comment to your database/storage
    commentsDB.push({ imageId, text: comment }); // Example of adding comment
    res.status(200).json({ message: 'Comment added' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
