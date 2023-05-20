import { spawn } from 'child_process';
const ytdl = require('ytdl-core');

// 获取YouTube视频的M3U8文件URL
export const getYtDlpM3u8Url1 = async (videoURL: string): Promise<string> => {
  try {
    const info = await ytdl.getInfo(videoURL);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    console.log("M3u8, format.url: ", format.url);

    return format.url;

  } catch (error) {
    throw error;
  }
};

// Deprecated
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
