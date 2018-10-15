const allusers=
[
	{
		"emailId":"ashishmangukiya97@gmail.com",
		"password":"123456789"

	},
	{
		"emailId":"dannydude59@gmail.com",
		"password":"12345678910"

	}

]

checkLogin =(allusers,...detailOfUsers) => 
{	
	let usersdetails=detailOfUsers;
	let isUserFound= false;
	let passwordCorrect=false;



for(currentUser of allusers)
{
	console.log(currentUser);

	if(currentUser["emailId"]==usersdetails[0])
	{
		if(currentUser["password"]==usersdetails[1])
		{
			isUserFound=true;
			passwordCorrect=true;
			break;
		}
		else
		{
			isUserFound=true;
			passwordCorrect=false;
			break;
		}
	}
	else
	{
		isUserFound=false;

	}
}
if(isUserFound==true && passwordCorrect==true)
{
	alert("you are logged in");

}
else if(isUserFound==true && passwordCorrect==false)
{
	alert("you have provided incorrect password");
}
else
	alert("no user with this email found");
}

let username=window.prompt("enter email-id");
let password=window.prompt("enter password");
checkLogin(allusers,username,password);