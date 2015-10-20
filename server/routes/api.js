import express from 'express';
import MapRenderer from '../lib/map-renderer'

const router = express.Router();

router.get('/render', (req, res) => {
  const renderer = new MapRenderer(960, 500, 1000);

  renderer
    .render()
    .then((svg) => {
      res.send(svg);
    })

  console.log(req.query);
});

export default router;
