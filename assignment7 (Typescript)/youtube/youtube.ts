class Youtube{

    video_title:string;
    video_Duration:string;
    video_Quality:string[]=["144p","240p","360p","480p","720p","1080p"];
    video_Views:number;
    video_likes:string;
    video_dislikes:string;
    number_of_subscriber:string;
    channel_Name:string;
    description_of_video:any;
    category_of_file:string;
    name_of_artist:string;
    licensed_by:any;
    number_of_comments:number;
    subtitle:string;
    published_on:string;
    sharing_options:string[]=["whatsapp","facebook","Google+","pinterest"];
    up_next_video:string="Ellie Goulding - Love Me Like You Do";
    autoplay:any;
    trending_number:number=10;
    speed_of_video:number[]=[0.25,0.50,0.75,1,1.25,1.50,1.75,2];
    subscribed_or_not:string[]=["yes","no"];
    viewmode:string[]=["full screen mode","theater mode"]
    addToLater:string[]=["yes","no"];
    constructor(video_title:string ,video_Duration:string ,video_Views:number,video_likes:string,video_dislikes:string,number_of_subscriber:string, channel_Name:string,category_of_file:string,name_of_artist:string,number_of_comments:number, subtitle:string, published_on:string,trending_number:number)
        {

            this.video_title=video_title;
            this.video_Duration=video_Duration;
            this.video_Views=video_Views;
            this.video_likes=video_likes;
            this.video_dislikes=video_dislikes;
            this.number_of_subscriber=number_of_subscriber;
            this.channel_Name=channel_Name;
            this.category_of_file=category_of_file;
            this.name_of_artist=name_of_artist;
            this.number_of_comments=number_of_comments;
            this.subtitle=subtitle;
            this.published_on=published_on;
            this.trending_number=trending_number;
        }
    setdescriptionOfVideo=(x:string)=>
    {
        this.description_of_video=x;
    }
    getdescriptionOfVideo=()=>
    {
        return this.description_of_video;
    }
    setLicensedBy=(x:string)=>
    {
        this.licensed_by=x;
    }
    getLicensedBy=()=>
    {
        return this.licensed_by;
    }
    setautoplay=(x:boolean)=>
    {
        this.autoplay=x;
    }
    getautoplay=()=>
    {
        return this.autoplay;
    }
    getVideoQuality=(x:number)=>
    {
        return this.video_Quality[x];
    }
    videoshareoption=(x:number):string=>
    {
        return this.sharing_options[x];
    } 
    getViewmode=(x:number)=>
    {
        return this.viewmode[x];
    }
    getSubscribed=(x:number)=>
    {
        return this.subscribed_or_not[x];
    }
    getSpeedOfVideo=(x:number)=>
    {
        return this.speed_of_video[x];
    }
    upNextVideo=()=>
    {
        return this.up_next_video;
    }
    getRelatedVideo=()=>{}
    getNotification=()=>{}
    addToWatchLater=(x:number)=>
    {
        return this.addToLater[x];
    }
    getAllComments=()=>{}
}

let newobject=new Youtube("Akon - Right Now (Na Na Na)","5:02 minutes",350531954,"1.7 M","66 K","4.2 M","Akon","Music","Akon",65000,"english","Dec 13, 2009",5);

console.log("Video Title :"+newobject.video_title);
console.log("video duration :"+newobject.video_Duration);
console.log("selected video quality :"+newobject.getVideoQuality(4));
console.log("views :"+newobject.video_Views);
console.log("likes :"+newobject.video_likes);
console.log("dislikes :"+newobject.video_dislikes);
console.log("number of subscriber:"+newobject.number_of_subscriber);
console.log("channel name:"+newobject.channel_Name);
console.log("category:"+newobject.category_of_file);
console.log("artist :"+newobject.name_of_artist);
console.log("number of comments :"+newobject.number_of_comments);
console.log("subtitle :"+newobject.subtitle);
console.log("Published on :"+newobject.published_on);
console.log("video share selected option :"+newobject.videoshareoption(0));
console.log("up next video :"+newobject.upNextVideo());
newobject.setautoplay(true);
console.log("autoplay :"+newobject.getautoplay());
console.log("#trending :"+newobject.trending_number);
console.log("selected speed of video :"+newobject.getSpeedOfVideo(4));
console.log("Subscribed or not :"+newobject.getSubscribed(0));
console.log("selected View mode :"+newobject.getViewmode(0));
console.log("add to watch later :"+newobject.addToWatchLater(1));
newobject.setdescriptionOfVideo("Music video by Akon performing Right Now (Na Na Na). YouTube view counts pre-VEVO: 14,832,412. (C) 2008 Universal Records, a Division of UMG Recordings, Inc. and SRC Records, Inc.");
console.log("Description :"+newobject.getdescriptionOfVideo());
newobject.setLicensedBy("UMG (on behalf of Music India  (MIL)); UMPI, SODRAC, SOLAR Music Rights Management, The Royalty Network (Publishing), CMRRA, Sony ATV Publishing, EMI Music Publishing, Broma 16, ASCAP, and 28 Music Rights Societies");
console.log("Licensed By :"+newobject.getLicensedBy());











