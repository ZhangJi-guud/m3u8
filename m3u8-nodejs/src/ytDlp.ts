import { spawn } from 'child_process';

export const getYtDlpM3u8Url = async (videoUrl: string): Promise<string> => {
  //const ytDlp = spawn('yt-dlp', ['--format', 'best', '-g', `https://www.youtube.com/watch?v=${videoId}`]);
  //const ganJingUrl = 'https://www.ganjing.com/zh-CN/video/1fjl7ane6q61FURYeoDjgsGaf1lf1c?playlistID=1fjl7emkv9o6SCgnv2aBuH51l30p';
  const ytDlp = spawn('yt-dlp', ['--format', 'best', '-g', videoUrl]);

  let m3u8Url: string = "";

  ytDlp.stdout.on('data', (data) => {
    console.log(`data: ${data}`);
    m3u8Url = data.toString().trim();
  });

  ytDlp.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  await new Promise<void>((resolve, reject) => {
    ytDlp.on('close', (code) => {
      console.log(`yt-dlp exited with code ${code}`);
      if (m3u8Url) {
        resolve();
      } else {
        reject(new Error('Failed to get M3U8 URL'));
      }
    });
  });

  console.log(`return m3u8Url: ${m3u8Url}`);
  return m3u8Url;
};
