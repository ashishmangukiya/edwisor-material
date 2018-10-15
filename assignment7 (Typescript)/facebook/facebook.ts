class Facebook{

userName:string="ashish mangukiya";
PhoneNumber:number=9999999999;
birthday:string="24-08-1997"
familyMembers:string="sherul,dhumal,purvi,ankita";
profilePhoto:string;
coverPhoto:string;
collegeName:string="";
livesIn:string="";
relationship:string="";
facebookJoining:string="";
work:string="";
schoolName:string="";
fromWhichPlace:string="";
profilePicLikes:number;
newPost:string="good mornig";
checkIns:string="surat city,d.y.patil, pratapgad,aquamagica";
sports:string="cricket,mumbai indians,football";
music:string="arjit singh,bapa sita ram,shreya ghoshal";
movies:string="chennai express,dhoom 3, krish 3";
tvShow:string="the flash";
facebookGroup:string="dugad ki palttan,india show,m.m.d shool";

    constructor(profilePhoto:string,coverPhoto:string,profilePicLikes:number)
    {
        this.profilePhoto=profilePhoto;
        this.coverPhoto=coverPhoto;
        this.profilePicLikes=profilePicLikes;   
    }
getCheck_ins=()=>
    {
    return this.checkIns;
    }
getBirthDayDate=()=>
    {
    return this.birthday;
    }
getProfilePic=()=>
    {
    return this.profilePhoto;
    }
getCoverPic=()=>
    {
    return this.coverPhoto;
    }
get_favourite_sports=()=>
    {
    return this.sports;
    }
get_favourite_TvShow=()=>
    {
    return this.tvShow;
    }
get_favourite_Music=()=>
    {
    return this.music;
    }
get_favourite_Movies=()=>
    {
    return this.movies;
    }
get_Facebook_group=()=>
    {
    return this.facebookGroup;
    }
getIntroduction=()=>
    {
    console.log(this.livesIn="lives in :virar")
    console.log(this.fromWhichPlace="from which place :surat, gujarat")
    console.log(this.collegeName="college name :d.y.patil college of engineering")
    console.log(this.relationship="relationship : single")
    console.log(this.facebookJoining="facebook joining :may 2012")
    console.log(this.work="work :fresher")
    console.log(this.schoolName="school name :dugad high school")
    }
getNotification=()=>{}
getRecentPost=()=>{}
getActiveFriendsName=()=>{}
getsavedpages=()=>{} 
viewPhoto=()=>{}
uploadPhoto=()=>{}
getUpdateInfo=()=>{}
makePost=()=>
    {
    return this.newPost;
    }
getFriendList=()=>{}
getphotos=()=>{}
}
let information=new Facebook("ashish.jpg","cover.jpg",200);
console.log("User Name :"+information.userName);
console.log("phone number :"+information.PhoneNumber);
console.log("birthday date :"+information.getBirthDayDate());
console.log("profile pic likes :"+information.profilePicLikes);
console.log("family members :"+information.familyMembers);
console.log("profile pic :"+information.getProfilePic());
console.log("cover pic :"+information.getCoverPic());
information.getIntroduction();
console.log("check ins :"+information.getCheck_ins());
console.log("favourite sports :"+information.get_favourite_sports());
console.log("favourite movies :"+information.get_favourite_Movies());
console.log("favourite TvShow :"+information.get_favourite_TvShow());
console.log("favourite Music :"+information.get_favourite_Music());
console.log("chat group :"+information.get_Facebook_group());
console.log("new Post :"+information.makePost());

