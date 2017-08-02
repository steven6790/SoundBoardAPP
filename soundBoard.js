/*jslint node: true */
/*jslint devel: true */
'use strict';

var CRSP = {};
CRSP.config = "";
CRSP.strmyTheme = "red";
CRSP.strmyView = "full";

//Create an XMLHttpRequest to retrieve the text file with our soundboard imgs,sound,and labels.
function createXHR() {
    try { return new XMLHttpRequest(); } catch (e) {}
    try { return new window.ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e1) {}
    try { return new window.ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e2) {}
    try { return new window.ActiveXObject("Msxml2.XMLHTTP"); } catch (e3) {}
    try { return new window.ActiveXObject("Microsoft.XMLHTTP"); } catch (e4) {}

    alert("XMLHttpRequest not supported");
    return null;
}

//creates the individual soundboard buttons for the full version using the the text file we fetched to obtain the correct soundboard theme and the correct sound board item; obtains sound name, sound url, and image url.
function createSoundBoard(sbName, j) {
    var str = "";
    str = "<div class='item'>" + sbName.name[j] + "<br><img src='" + sbName.imgURL[j] + "' alt='Mountain View' width='100' height='100'><audio ><source src='" + sbName.sndURL[j] + "' type='audio/wav'></audio></div>";
    return str;
}

//creates the individual soundboard buttons for the compact using the the text file we fetched to obtain the correct soundboard theme and the correct sound board item; only obtains the sound name and the sound url.
function createSoundBoardCompact(sbName, j) {
    var str = "";
    str = "<div class='item'>" + sbName.name[j] + "<br><audio controls><source src='" + sbName.sndURL[j] + "' type='audio/wav'></audio></div>";
    return str;
}

//Builds the compact and full soundboards for the two themes, calls createSoundBoard and createSoundBoardCompact.
function initializeBoard() {
    var i = 0, stringHtml = "";
    //Creates full version soundboard theme 1 
    for (i = 0; i < CRSP.config.soundBoard1.name.length; i + 1) {
        stringHtml += createSoundBoard(CRSP.config.soundBoard1, i);
    }
    document.getElementById('soundBoard').innerHTML = stringHtml;

    stringHtml = "";
    //creates compact verion of soundboard theme 1
    for (i = 0; i < CRSP.config.soundBoard1.name.length; i + 1) {
        stringHtml += createSoundBoardCompact(CRSP.config.soundBoard1, i);
    }
    document.getElementById('soundBoardCompact').innerHTML = stringHtml;

    stringHtml = "";
    //creates full version soundboard theme 2
    for (i = 0; i < CRSP.config.soundBoard2.name.length; i + 1) {
        stringHtml += createSoundBoard(CRSP.config.soundBoard2, i);
    }
    document.getElementById('soundBoard2').innerHTML = stringHtml;

    stringHtml = "";
    //creates compact version of soundboard theme 2
    for (i = 0; i < CRSP.config.soundBoard2.name.length; i + 1) {
        stringHtml += createSoundBoardCompact(CRSP.config.soundBoard2, i);
    }
    document.getElementById('soundBoardCompact2').innerHTML = stringHtml;
    //add the listeners to the soundboard for full effect
    addListenersToSoundBoard();
}

//determines if the XMLHttpRequest is ready and initializes the soundboard
function handleResponse(xhr) {
    if (xhr.readyState === 4  && xhr.status === 200) {
        CRSP.config = JSON.parse(xhr.responseText);
        initializeBoard();
    }
}

//sends the request for obtaining the text file with the soundboard material. calls on createXHR to create the request and handleResponse to parse the file fetched.
function sendRequest() {
    var xhr = createXHR();
    if (xhr) {
        xhr.open("GET", "https://website-8bbe4.firebaseapp.com/json/packet.txt", true);
        xhr.onreadystatechange = function () {handleResponse(xhr); };
        xhr.send(null);
    }
}

//itreates through the button array to add the ability to pause and play sound.
function addListenersToSoundBoard() {
    var i = 0, sound, buttonArray = document.querySelectorAll('.item');
    for (i = 0; i < buttonArray.length; i + 1) {
        buttonArray[i].addEventListener('click', function () {
            sound = this.getElementsByTagName('audio')[0];
            if (sound.paused) {
                sound.play();
            } else {
                sound.pause();
            }
        }, false);
    }
}
//initializes everything, sends the request to load the soundboard upon initial opening of the website.
window.onload = function () {
    sendRequest();
};

//called to change the view of the soundboard from compact to full and vice versa.
function changeView() {
    var i = 0, sound, buttonArray = document.querySelectorAll('.item');
    for (i = 0; i < buttonArray.length; i + 1) {
        sound = buttonArray[i].getElementsByTagName('audio')[0];
        sound.pause();
    }
    document.getElementById('soundBoardContainer').firstElementChild.style.display = "none";
    
    //if current view is full, switch to compact
    if (document.getElementById('view').value === 'full') {
        //determine the current theme to use for the switch
        if (document.getElementById('soundBoardChanger').value === 'jungle') {
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoard'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "flex";
        } else {
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoard2'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "flex";
        }
    //else if its compact, switch to full.
    } else {
        //determine the current theme to use for the switch
        if (document.getElementById('soundBoardChanger').value === 'jungle') {
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoardCompact'), document.getElementById('soundBoardContainer').firstChild);
        } else {
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoardCompact2'), document.getElementById('soundBoardContainer').firstChild);
        }
        document.getElementById('soundBoardContainer').firstElementChild.style.display = "inline";
    }
}

//called to change the theme of the soundboard, which changes the background color.
function changeTheme() {
    var bod;
    if (document.getElementById('theme').value === 'default') {
        bod = document.getElementsByTagName("body")[0];
        bod.style.backgroundColor = "darkolivegreen";
    } else {
        bod = document.getElementsByTagName("body")[0];
        bod.style.backgroundColor = "purple";
    }
}

//called to change the soundBoard from either jungle or ocean; changes sounds/images/names/color.
function changeSoundBoard() {
    var i = 0, sound, buttonArray = document.querySelectorAll('.item');
    for (i = 0; i < buttonArray.length; i + 1) {
        sound = buttonArray[i].getElementsByTagName('audio')[0];
        sound.pause();
    }
    document.getElementById('soundBoardContainer').firstElementChild.style.display = "none";
    //change to ocean if jungle theme
    if (document.getElementById('soundBoardChanger').value === 'jungle') {
        //check if compact or full to keep same layout with the the soundboard change.
        document.getElementById("title").textContent = CRSP.config.soundBoard1.title;
        if (document.getElementById('view').value === 'full') {
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoard'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "flex";
        } else {
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoardCompact'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "inline";
        }
    //change to jungle if ocean theme
    } else {
        document.getElementById("title").textContent = CRSP.config.soundBoard2.title;
        //check if compact or full to keep same layout with the the soundboard change.
        if (document.getElementById('view').value === 'full') {
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoard2'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "flex";
        } else {
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoardCompact2'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "inline";
        }
    }
}
