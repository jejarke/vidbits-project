const router = require('express').Router();

const Video = require('../models/video');

router.get('/', (req, res) => {
  res.redirect('/videos');
})

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  let messageEmtpy = ''
  if(videos.length === 0){
    messageEmtpy = 'There is no videos yet';
  }
  res.render('videos/index', {videos,messageEmtpy});
});

router.post('/videos', async (req, res, next) => {
  const { title, description, url } = req.body;
  const video = new Video({ title, description, url });

  const errors = video.validateSync();

  if(errors) {
    res.status(400).render('videos/new', {video});
  } else {
    await video.save();
    res.redirect(`/videos/${video._id}`);
  }
});

router.get('/videos/new', async (req, res, next) => {
  res.render('videos/new');
});

router.get('/videos/:id', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.render('videos/show', {video});
});

router.get('/videos/:id/edit', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  const id = req.params.id;
  res.render('videos/update', {video, id});
});

router.post('/videos/:id/updates', async (req, res, next) => {
  const { title, description, url } = req.body;
  const Video = new Video({ title, description, url });

  const errors = Video.validateSync();
  if(errors) {
    res.status(400).render('videos/update', {video});
  } else {
    const video = await Video.findOneAndUpdate({ _id: req.params.id }, { title, description, url }, { upsert: true });
    if (!video) res.status(400).render('videos/update', {video: doc});
    res.redirect(`/videos/${req.params.id}`);
  }
});

router.post('/videos/:id/deletions', async (req, res, next) => {
  await Video.findByIdAndRemove(req.params.id);
  res.redirect('/videos');
});

module.exports = router;