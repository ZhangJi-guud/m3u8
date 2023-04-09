import ReactPlayer from 'react-player'

const PlayerYouTubeDirectly: any = ({ videoUrl, videoType }: { videoUrl: string, videoType: string }) => {

    //let url = "https://www.youtube.com/watch?v=E0CvY6GLy3g";

    console.log("url1:", videoUrl);

    return (
        <div>
            <ReactPlayer
                url={videoUrl}
                controls={true} 
                config={{
                    youtube: {
                        playerVars: { showinfo: 1 }
                    }
                }}
            />
        </div>
    );
}

export default PlayerYouTubeDirectly;
