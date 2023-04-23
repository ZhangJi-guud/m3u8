import express, { Express, Request, Response, Router } from 'express';
import { getYtDlpM3u8Url } from './ytDlp';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Express = express();

const router:Router = Router();
//app.use(bodyParser());
//app.use(bodyParser.urlencoded());


app.use(cors({ allowedHeaders: 'Content-Type, Cache-Control' }));
app.options('*', cors());  // enable pre-flight

app.use(bodyParser.json());
//app.use(cors);

const PORT: number = 3001;

router.post('/getM3u8', async (req: Request, res: Response): Promise<void> => {

    //let videoId: string = "E0CvY6GLy3g";
    console.log(req.body);
    const ganJingUrl = req.body?.ganJingUrl;
    let m3u8Url: string = "";

    await getYtDlpM3u8Url(ganJingUrl)
        .then((url) => {
            console.log(`M3U8 URL: ${url}`);
            m3u8Url = url;
        })
        .catch((error) => {
            console.error(error);
        });

    res.send({ m3u8Url });
});


router.use('/', (req: Request, res: Response): void => {
    console.log("/", req.body);
    res.send('Hello world!');
});

app.use("/app", router);

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});

const getUrlFromResponse = () => {

}