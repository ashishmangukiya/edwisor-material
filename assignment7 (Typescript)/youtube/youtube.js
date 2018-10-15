var Youtube = /** @class */ (function () {
    function Youtube(video_title, video_Duration, video_Views, video_likes, video_dislikes, number_of_subscriber, channel_Name, category_of_file, name_of_artist, number_of_comments, subtitle, published_on, trending_number) {
        var _this = this;
        this.video_Quality = ["144p", "240p", "360p", "480p", "720p", "1080p"];
        this.sharing_options = ["whatsapp", "facebook", "Google+", "pinterest"];
        this.up_next_video = "Ellie Goulding - Love Me Like You Do";
        this.trending_number = 10;
        this.speed_of_video = [0.25, 0.50, 0.75, 1, 1.25, 1.50, 1.75, 2];
        this.subscribed_or_not = ["yes", "no"];
        this.viewmode = ["full screen mode", "theater mode"];
        this.addToLater = ["yes", "no"];
        this.setdescriptionOfVideo = function (x) {
            _this.description_of_video = x;
        };
        this.getdescriptionOfVideo = function () {
            return _this.description_of_video;
        };
        this.setLicensedBy = function (x) {
            _this.licensed_by = x;
        };
        this.getLicensedBy = function () {
            return _this.licensed_by;
        };
        this.setautoplay = function (x) {
            _this.autoplay = x;
        };
        this.getautoplay = function () {
            return _this.autoplay;
        };
        this.getVideoQuality = function (x) {
            return _this.video_Quality[x];
        };
        this.videoshareoption = function (x) {
            return _this.sharing_options[x];
        };
        this.getViewmode = function (x) {
            return _this.viewmode[x];
        };
        this.getSubscribed = function (x) {
            return _this.subscribed_or_not[x];
        };
        this.getSpeedOfVideo = function (x) {
            return _this.speed_of_video[x];
        };
        this.upNextVideo = function () {
            return _this.up_next_video;
        };
        this.getRelatedVideo = function () { };
        this.getNotification = function () { };
        this.addToWatchLater = function (x) {
            return _this.addToLater[x];
        };
        this.getAllComments = function () { };
        this.video_title = video_title;
        this.video_Duration = video_Duration;
        this.video_Views = video_Views;
        this.video_likes = video_likes;
        this.video_dislikes = video_dislikes;
        this.number_of_subscriber = number_of_subscriber;
        this.channel_Name = channel_Name;
        this.category_of_file = category_of_file;
        this.name_of_artist = name_of_artist;
        this.number_of_comments = number_of_comments;
        this.subtitle = subtitle;
        this.published_on = published_on;
        this.trending_number = trending_number;
    }
    return Youtube;
}());
var newobject = new Youtube("Akon - Right Now (Na Na Na)", "5:02 minutes", 350531954, "1.7 M", "66 K", "4.2 M", "Akon", "Music", "Akon", 65000, "english", "Dec 13, 2009", 5);
console.log("Video Title :" + newobject.video_title);
console.log("video duration :" + newobject.video_Duration);
console.log("selected video quality :" + newobject.getVideoQuality(4));
console.log("views :" + newobject.video_Views);
console.log("likes :" + newobject.video_likes);
console.log("dislikes :" + newobject.video_dislikes);
console.log("number of subscriber:" + newobject.number_of_subscriber);
console.log("channel name:" + newobject.channel_Name);
console.log("category:" + newobject.category_of_file);
console.log("artist :" + newobject.name_of_artist);
console.log("number of comments :" + newobject.number_of_comments);
console.log("subtitle :" + newobject.subtitle);
console.log("Published on :" + newobject.published_on);
console.log("video share selected option :" + newobject.videoshareoption(0));
console.log("up next video :" + newobject.upNextVideo());
newobject.setautoplay(true);
console.log("autoplay :" + newobject.getautoplay());
console.log("#trending :" + newobject.trending_number);
console.log("selected speed of video :" + newobject.getSpeedOfVideo(4));
console.log("Subscribed or not :" + newobject.getSubscribed(0));
console.log("selected View mode :" + newobject.getViewmode(0));
console.log("add to watch later :" + newobject.addToWatchLater(1));
newobject.setdescriptionOfVideo("Music video by Akon performing Right Now (Na Na Na). YouTube view counts pre-VEVO: 14,832,412. (C) 2008 Universal Records, a Division of UMG Recordings, Inc. and SRC Records, Inc.");
console.log("Description :" + newobject.getdescriptionOfVideo());
newobject.setLicensedBy("UMG (on behalf of Music India  (MIL)); UMPI, SODRAC, SOLAR Music Rights Management, The Royalty Network (Publishing), CMRRA, Sony ATV Publishing, EMI Music Publishing, Broma 16, ASCAP, and 28 Music Rights Societies");
console.log("Licensed By :" + newobject.getLicensedBy());
