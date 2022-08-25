/*Date&Time*/
setInterval(function() {
    let myDate = new Date();
    //convert hours to 12
    let hours = myDate.getHours();
    hours > 12 ? hours -= 12 : hours;
    //concat Date & Time
    let newDate = `${myDate.getDate()}/${myDate.getMonth() + 1}/${myDate.getFullYear()}
    , ${hours}:${myDate.getMinutes()}:${myDate.getSeconds()}`;
    //add am & pm
    myDate.getHours() > 12 ? newDate += ' PM' : newDate += ' AM';
    //display in htm;
    document.getElementById('date').innerHTML = newDate;
}, 1000);


//get local storage
let myLocalstoragename = localStorage.getItem('sitesname');
let myLocalstorageurl = localStorage.getItem('sitesurl');

//array of sites to name and url
let namejson = []
let urljson = []

//input
var siteName = document.getElementById('sitename');
var siteurl = document.getElementById('siteurl');

/*when reload page*/
window.onload = function() {
    siteName.focus();
    
    namejson = JSON.parse(myLocalstoragename) || [];
    urljson = JSON.parse(myLocalstorageurl) || [];
    for (let i in namejson, urljson) {
        //console.log("in local", namejson, urljson);
        //display list
        DisplaySite(namejson, urljson);
    }
}

/* to Delete_msg_req*/
function Delete_msg_req() {
    document.querySelector('.dublicatedname').style.display = 'none'
    document.querySelector('.reqname').style.display = 'none'
    document.querySelector('.requrl').style.display = 'none';
}

/*click on submit*/
function submit() {
    let siteNameval = siteName.value;
    let siteurlval = siteurl.value;
    Delete_msg_req()
    validation(siteNameval, siteurlval)
        //DisplaySite(siteNameval, siteurlval);
}

function validation(name, url) {
    if (name.length == 0) {
        document.querySelector('.reqname').style.display = 'block'
    }
    if (url.length <= 5) {
        document.querySelector('.requrl').style.display = 'block';
    }

    if (checkDublicateName(name)) {
        document.querySelector('.dublicatedname').style.display = 'block'
    } else if (name.length >= 3 && url.length > 5) {
        namejson.push(name);
        urljson.push(url);
        localStorage.setItem('sitesname', JSON.stringify(namejson));
        localStorage.setItem('sitesurl', JSON.stringify(urljson));
        DisplaySite();
    }
}

/* check dublicate name */
function checkDublicateName(namesite) {
    if (namejson.includes(namesite))
        return true;
    return false;
}


/*display site*/
function DisplaySite() {
    //reset sites
    document.querySelector('.listsites').innerHTML = ''

    //display again with update
    for (let i in namejson, urljson) {
        let div = document.createElement('div');
        div.className = "site";
        div.innerHTML = `<span class="style">${namejson[i]}</span>
        <a class="btn btn-primary" href="${urljson[i]}" target="_blank">Visit </a>
        <a class="btn btn-danger btndel" onclick="deleteSite(${i})">Delete</a>`

        document.querySelector('.listsites').appendChild(div);
    }

}

/*delete*/
function deleteSite(indx) {
    //select all btn del
    //let btn_del = document.querySelectorAll('.btndel')
    //console.log(btn_del.length)
    // for (let i = 0; i < btn_del.length; i++) {
    //btn_del[i].addEventListener("click", (e) => {
    //get name of site
    //     let namesite = e.target.previousElementSibling.previousElementSibling.innerHTML;
    //     console.log(namesite)
    //     for (var i = 0; i < namejson.length; i++) {
    //         if (namesite == namejson[i]) {
    //             namejson.splice(i, 1);
    //             urljson.splice(i, 1);
    //             localStorage.setItem('sitesname', JSON.stringify(namejson));
    //             localStorage.setItem('sitesurl', JSON.stringify(urljson));
    //             DisplaySite();
    //         }

    //     }
    // })
    //}
    namejson.splice(indx, 1);
    urljson.splice(indx, 1);
    localStorage.setItem('sitesname', JSON.stringify(namejson));
    localStorage.setItem('sitesurl', JSON.stringify(urljson));
    DisplaySite();

}