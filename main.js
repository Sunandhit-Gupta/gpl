apiUrl ='https://script.google.com/macros/s/AKfycbwzB485KOkl6YDhix5XRMOhxt91uun1uIc8ICIotN4MLqO-VR3PVx0eIzykZ11VVM4w/exec'

let i ;
let haveIusedTodaysDate = false;
let inputDay;
let inputMonth;
let found = false;



// Getting form inputs :
let frm = document.getElementById("form");
frm.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let inptformdate = document.getElementById("inpt").value;
    let inputformmonth = document.getElementById("inptformmonth").value;
    inputDay = String(inptformdate);
    inputMonth = String(inputformmonth);
    // console.log(inputDay);
    // console.log(inputMonth);
    frm.reset();
    getDates();
})


function getDates(){
    fetch(apiUrl, { method: 'GET'}).then(response => response.json()).then(response =>{
        console.log(response);
        found = false;

        let today = new Date();
        todayday = today.getDate();
        todaymonth = today.getMonth()+1;
        let todayDate = today.getDate() +"-"+[today.getMonth()+1] + "-"+ today.getFullYear();
        todayYear = today.getFullYear();

        upcomingBoyName = document.getElementById("upcomingName");
        upcomingBoyName.innerHTML = `Date : ${inputDay}-${inputMonth}-${todayYear}`;


        for(j=1 ; j<266 ; j++){
            birthdate = response.data[j].date;

            birthday = parseInt(birthdate.slice(0,2));
            birthmonth = parseInt(birthdate.slice(3,5));
            //  console.log(birthmonth);


            if(birthday == todayday&&birthmonth == todaymonth&&haveIusedTodaysDate==false){
                nameOfPerson = response.data[j].Name;
                roomNo = response.data[j].Room;
                branch = response.data[j].Branch;
                state = response.data[j].State;
                todayBoyName = document.getElementById("name");
                todayBoyName.innerHTML += `<li>Name: ${nameOfPerson} , Room No: ${roomNo}</li>`;
                console.log(nameOfPerson);
                console.log(roomNo);
                console.log(branch);
                console.log(state);
                found = true;

            }

            if(inputDay == birthday && inputMonth == birthmonth){
                nameOfUpcomingPerson = response.data[j].Name;
                upcomingRoomNo = response.data[j].Room;
                upcomingBranch = response.data[j].Branch;
                upcomingState = response.data[j].State;
                upcomingBoyName = document.getElementById("upcomingName");
                upcomingBoyName.innerHTML += `<li>Name: ${nameOfUpcomingPerson} , Branch: ${upcomingBranch} </li>`;
                console.log(nameOfUpcomingPerson);
                console.log(upcomingRoomNo);
                console.log(upcomingBranch);
                console.log(upcomingState);
                found = true;
            }else{

            }

            showTodayDate = document.getElementById("date");
            showTodayDate.innerHTML = `Todays Date : ${todayDate}`


        }
        if(found == true){
            console.log("Found");
        }else if(found == false){
            console.log("Not found");
        }
        haveIusedTodaysDate = true;

    })
}

getDates();