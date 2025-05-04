const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const videos_file = path.join(__dirname, '../data/videos.json');

router.get('/new_video', (req, res) => {
  if (!req.session.user) {
    return res.render('login');
  }

  res.render('new_video');
});

router.post('/new', (req, res) => {
  if (!req.session.user) {
    return res.render('login');
  }

  const { url, title } = req.body;

  let video_embed_url = url;
  if (url.includes('watch?v=')) {
    let video_id = url.split('watch?v=')[1];
    if (video_id.includes('&')) {
      video_id = video_id.split('&')[0];
    }
    video_embed_url = `https://www.youtube.com/embed/${video_id}`;
  }

  const raw = JSON.parse(fs.readFileSync(videos_file));
  let videos = raw.videos;

  const new_video = {
    url: video_embed_url,
    title,
    email: req.session.user.email
  };

  videos.push(new_video);
  fs.writeFileSync(videos_file, JSON.stringify({ videos }, null, 2));

  res.render('new_video');
});

router.get('/dashboard/:videofilter', (req, res) => {
  if (!req.session.user) {
    return res.render('login');
  }

  const raw = JSON.parse(fs.readFileSync(videos_file));
  const videos = raw.videos;

  res.render('dashboard', { videos });
});

module.exports = router;
