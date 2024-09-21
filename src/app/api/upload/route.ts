import multer from 'multer';
import nextConnect from 'next-connect';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // Local storage for uploads
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  res.status(200).json({ filename: req.file.filename });
});

export { apiRoute as default };
