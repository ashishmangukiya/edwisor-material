var Facebook = /** @class */ (function () {
    function Facebook(profilePhoto, coverPhoto, profilePicLikes) {
        var _this = this;
        this.userName = "ashish mangukiya";
        this.PhoneNumber = 9999999999;
        this.birthday = "24-08-1997";
        this.familyMembers = "sherul,dhumal,purvi,ankita";
        this.collegeName = "";
        this.livesIn = "";
        this.relationship = "";
        this.facebookJoining = "";
        this.work = "";
        this.schoolName = "";
        this.fromWhichPlace = "";
        this.newPost = "good mornig";
        this.checkIns = "surat city,d.y.patil, pratapgad,aquamagica";
        this.sports = "cricket,mumbai indians,football";
        this.music = "arjit singh,bapa sita ram,shreya ghoshal";
        this.movies = "chennai express,dhoom 3, krish 3";
        this.tvShow = "the flash";
        this.facebookGroup = "dugad ki palttan,india show,m.m.d shool";
        this.getCheck_ins = function () {
            return _this.checkIns;
        };
        this.getBirthDayDate = function () {
            return _this.birthday;
        };
        this.getProfilePic = function () {
            return _this.profilePhoto;
        };
        this.getCoverPic = function () {
            return _this.coverPhoto;
        };
        this.get_favourite_sports = function () {
            return _this.sports;
        };
        this.get_favourite_TvShow = function () {
            return _this.tvShow;
        };
        this.get_favourite_Music = function () {
            return _this.music;
        };
        this.get_favourite_Movies = function () {
            return _this.movies;
        };
        this.get_Facebook_group = function () {
            return _this.facebookGroup;
        };
        this.getIntroduction = function () {
            console.log(_this.livesIn = "lives in :virar");
            console.log(_this.fromWhichPlace = "from which place :surat, gujarat");
            console.log(_this.collegeName = "college name :d.y.patil college of engineering");
            console.log(_this.relationship = "relationship : single");
            console.log(_this.facebookJoining = "facebook joining :may 2012");
            console.log(_this.work = "work :fresher");
            console.log(_this.schoolName = "school name :dugad high school");
        };
        this.getNotification = function () { };
        this.getRecentPost = function () { };
        this.getActiveFriendsName = function () { };
        this.getsavedpages = function () { };
        this.viewPhoto = function () { };
        this.uploadPhoto = function () { };
        this.getUpdateInfo = function () { };
        this.makePost = function () {
            return _this.newPost;
        };
        this.getFriendList = function () { };
        this.getphotos = function () { };
        this.profilePhoto = profilePhoto;
        this.coverPhoto = coverPhoto;
        this.profilePicLikes = profilePicLikes;
    }
    return Facebook;
}());
var information = new Facebook("ashish.jpg", "cover.jpg", 200);
console.log("User Name :" + information.userName);
console.log("phone number :" + information.PhoneNumber);
console.log("birthday date :" + information.getBirthDayDate());
console.log("profile pic likes :" + information.profilePicLikes);
console.log("family members :" + information.familyMembers);
console.log("profile pic :" + information.getProfilePic());
console.log("cover pic :" + information.getCoverPic());
information.getIntroduction();
console.log("check ins :" + information.getCheck_ins());
console.log("favourite sports :" + information.get_favourite_sports());
console.log("favourite movies :" + information.get_favourite_Movies());
console.log("favourite TvShow :" + information.get_favourite_TvShow());
console.log("favourite Music :" + information.get_favourite_Music());
console.log("chat group :" + information.get_Facebook_group());
console.log("new Post :" + information.makePost());
