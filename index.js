const express = require('express');
const dylux = require('api-dylux');
const app = express();
const port = 3000;

app.get('/download', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ message: 'URL TikTok tidak ditemukan!' });
  }

  try {
    const result = await dylux.tiktok(url);
    const videoUrl = result.result.play;
    const title = result.result.title;
    res.json({
      message: 'Video berhasil diambil!',
      video_url: videoUrl,
      title: title
    });
  } catch (error) {
    console.error('Error mengambil video:', error);
    res.status(500).json({ message: 'Gagal mengambil video TikTok!' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
