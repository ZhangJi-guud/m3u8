import express, { Express, Request, Response } from 'express';
import { getYtDlpM3u8Url } from './ytDlp';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Express = express();
//app.use(bodyParser());
//app.use(bodyParser.urlencoded());


app.use(cors({ allowedHeaders: 'Content-Type, Cache-Control' }));
app.options('*', cors());  // enable pre-flight

app.use(bodyParser.json());
//app.use(cors);

const PORT: number = 3001;

app.post('/getM3u8', (req: Request, res: Response): void => {

    //let videoId: string = "E0CvY6GLy3g";
    console.log(req.body);
    const ganJingUrl = req.body?.ganJingUrl;
    let m3u8Url: string = "";

    getYtDlpM3u8Url(ganJingUrl)
        .then((url) => {
            console.log(`M3U8 URL: ${url}`);
            m3u8Url = url;
        })
        .catch((error) => {
            console.error(error);
        });

    res.send({ m3u8Url });
});


app.use('/', (req: Request, res: Response): void => {
    console.log("/", req.body);
    res.send('Hello world!');
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});

const getUrlFromResponse = () => {

}