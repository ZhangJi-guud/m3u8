import express, { Express, Request, Response, Router } from 'express';
import { URL } from 'url';
import axios from 'axios';

export const getM3u8Body = async() => {
    let str = "https://media4-us-west.cloudokyo.cloud/video/v5/5b/e1/4e/5be14e89-1c4d-4108-a0b4-899f3e3ab089/v720p/index.m3u8";

    const { data, status } = await axios.get(
        str
      );

    console.log("data", data);

    // 👇️ "response status is: 200"
    console.log('response status is: ', status);
    
    return data;
}

export const conver2MyUrl = (req: Request, ganjingUrl: string) => {
    let url: URL = new URL(ganjingUrl);
    console.log(url);
}

export const getRequestContext = (req: Request, appContent: string) => {
    const protocol = req.protocol;
    const hostname = req.hostname;
    const url = req.url;
    const originalUrl = req.originalUrl;
    const headers = req.headers;
    const host = req.headers.host;

    console.log(protocol, hostname, url, originalUrl, headers, host);
    // return http://localhost:3000/app
    return `${req.headers.origin}${appContent}`;
}