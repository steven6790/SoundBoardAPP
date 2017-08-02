var config = "";
var outerConfig = "";
var myTheme = "red";
var myView = "full";

function createXHR() {
    try { return new XMLHttpRequest(); } catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}

    alert("XMLHttpRequest not supported");   
   return null;
}

function sendRequest()
{
    var xhr = createXHR();

    if (xhr)
     {
       xhr.open("GET","https://website-8bbe4.firebaseapp.com/json/packet.txt",true);
      xhr.onreadystatechange = function(){handleResponse(xhr);};
      xhr.send(null);
     }
}

function handleResponse(xhr)
{
  if (xhr.readyState == 4  && xhr.status == 200) {
        outerConfig = JSON.parse(xhr.responseText);
        config =  outerConfig;
        initializeBoard();
    }
}


function addListenersToSoundBoard(){
    var els = document.querySelectorAll('.item');
    for(var i = 0, len = els.length; i < len; i++){
        els[i].addEventListener('click', function (){
            var sound;
            sound = this.getElementsByTagName('audio')[0];
            if (sound.paused) {
                sound.play();
            } else {
                sound.pause();
            }
        }, false)
    }
}
window.onload = function () {
sendRequest();
}
function createSoundBoard(sbName, j){
var str = "";
str = "<div class='item'>" + sbName.name[j] + "<br><img src='" + sbName.imgURL[j] + "' alt='Mountain View' width='100' height='100'><audio ><source src='" + sbName.sndURL[j] + "' type='audio/wav'></audio></div>";


return str;
}

function createSoundBoardCompact(sbName, j){
var str = "";
str = "<div class='item'>" + sbName.name[j] + "<br><audio controls><source src='" + sbName.sndURL[j] + "' type='audio/wav'></audio></div>";


return str;
}

function initializeBoard() {
    var stringHtml = "";
    for(var i=0; i<config.soundBoard1.name.length; i++) {
        stringHtml += createSoundBoard(config.soundBoard1, i);
    }
     document.getElementById('soundBoard').innerHTML = stringHtml;

    stringHtml = "";
    for(var i=0; i<config.soundBoard1.name.length; i++) {
        stringHtml += createSoundBoardCompact(config.soundBoard1, i);
    }
    document.getElementById('soundBoardCompact').innerHTML = stringHtml;

    stringHtml = "";
    for(var i=0; i<config.soundBoard2.name.length; i++) {
        stringHtml += createSoundBoard(config.soundBoard2,i);
    }
     document.getElementById('soundBoard2').innerHTML = stringHtml;


    stringHtml = "";
    for(var i=0; i<config.soundBoard2.name.length; i++) {
        stringHtml += createSoundBoardCompact(config.soundBoard2,i);
    }
    document.getElementById('soundBoardCompact2').innerHTML = stringHtml;
    addListenersToSoundBoard();
}

function changeView(){
    var els = document.querySelectorAll('.item');
    for(var i = 0, len = els.length; i < len; i++){
            var sound;
            sound = els[i].getElementsByTagName('audio')[0];
            sound.pause();
    }
    document.getElementById('soundBoardContainer').firstElementChild.style.display = "none";
    if(document.getElementById('view').value == 'full'){
        if(document.getElementById('soundBoardChanger').value == 'jungle'){
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoard'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "flex";
            
        }
        else{
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoard2'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "flex";
            
        }

    }
    else{
        if(document.getElementById('soundBoardChanger').value == 'jungle'){
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoardCompact'), document.getElementById('soundBoardContainer').firstChild);
        }
        else{
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoardCompact2'), document.getElementById('soundBoardContainer').firstChild);
        }
        document.getElementById('soundBoardContainer').firstElementChild.style.display = "inline";
        
    }

}
function changeTheme(){
    if(document.getElementById('theme').value == 'default'){
            var bod = document.getElementsByTagName("body")[0];
            bod.style.backgroundColor = "darkolivegreen";

        }
        else{
            var bod = document.getElementsByTagName("body")[0];
            bod.style.backgroundColor = "red";
        }

}
function changeSoundBoard(){
    var els = document.querySelectorAll('.item');
    for(var i = 0, len = els.length; i < len; i++){
            var sound;
            sound = els[i].getElementsByTagName('audio')[0];
            sound.pause();
    }
    document.getElementById('soundBoardContainer').firstElementChild.style.display = "none";
    if(document.getElementById('soundBoardChanger').value == 'jungle'){
        document.getElementById("title").textContent = config.soundBoard1.title;
        if(document.getElementById('view').value == 'full'){
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoard'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "flex";

        }
        else{
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoardCompact'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "inline";

        }                     
    }
    else{
       document.getElementById("title").textContent = config.soundBoard2.title;
        if(document.getElementById('view').value == 'full'){
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoard2'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "flex";

        }
        else{
            document.getElementById('soundBoardContainer').insertBefore(document.getElementById('soundBoardCompact2'), document.getElementById('soundBoardContainer').firstChild);
            document.getElementById('soundBoardContainer').firstElementChild.style.display = "inline";


        }          
    }
}
