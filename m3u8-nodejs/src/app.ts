import express, { Express, Request, Response, Router } from 'express';
import { getYtDlpM3u8Url } from './ytDlp';
import { getRequestContext, conver2MyUrl, getM3u8Body, getSegmentTs, SegmentTsData } from './appAuxiliary';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Express = express();

const router: Router = Router();
//app.use(bodyParser());
//app.use(bodyParser.urlencoded());
const appContent: string = "/app";


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

    getRequestContext(req, appContent);
    conver2MyUrl(req,m3u8Url);

    res.send({ m3u8Url });
});

// return m3u8 body
router.use('/getM3u8Body/master.m3u8', async (req: Request, res: Response): Promise<void> => {
    let data = await getM3u8Body();
    console.log("/getM3u8Body/master.m3u8:", data)
    res.send(data);
});

// return segment.ts
router.use('/getM3u8Body/segment.ts', async (req: Request, res: Response): Promise<void> => {


    const rangeValue: string = req.headers.range as string;

    let segmentTsData: SegmentTsData = await getSegmentTs(rangeValue);

    console.log("data: ", segmentTsData.data.length);
    console.log('segmentTsData is::: ', segmentTsData['Content-Length'], segmentTsData['Content-Range'], segmentTsData.data.length);

    res.set({
        "Content-Length": segmentTsData["Content-Length"],
        "Content-Range": segmentTsData["Content-Range"],
        "content-type": "video/MP2T",
        "access-control-allow-credentials": true,
        "access-control-allow-headers": "origin,range,hdntl,hdnts,CMCD-Request,CMCD-Object,CMCD-Status,CMCD-Session",
        "access-control-allow-methods": "GET,POST,OPTIONS",
        "access-control-expose-headers": "Server,range,hdntl,hdnts,Akamai-Mon-Iucid-Ing,Akamai-Mon-Iucid-Del,Akamai-Request-BC",
        "testHeader":"testHeaderValue"
    })

    res.send(segmentTsData.data);
});

router.use('/', (req: Request, res: Response): void => {
    console.log("/", req.body);
    res.send('Hello world!');
});

app.use(appContent, router);

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});

const getUrlFromResponse = () => {

}