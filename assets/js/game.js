var word ="";
var hiddenword="";
var keyList=[];

function startGame(){
    var wordsList = ["Pinky and the Brain","Rugrats","The Powerpuff Girls","Dexter's Laboratory","SpongeBob SquarePants","Ed, Edd n Eddy","X-Men","The Simpsons","Futurama","Animaniacs"];
    word = wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase();
    //word = "SpongeBob SquarePants".toUpperCase();
    console.log(word);


    for (let i = 0; i < word.length; i++) {
        const element = word[i];

        if (/^[a-zA-Z]+$/.test(element)) {
            hiddenword += "_ ";
        }else if(element == " "){
            hiddenword += "&nbsp ";
            if((hiddenword.length/17)>1 && (hiddenword.length/17)<2){
                hiddenword += "<br />";
            }
        }else{
            hiddenword += element + " ";
        }
        console.log(hiddenword);
    }
    
    var winword = document.getElementById("word");
    winword.innerHTML = hiddenword;


}



document.onkeyup = function(event) {
    var userText ="";
    userText  = event.key;
    userText = userText.trim().toUpperCase();
    var livesTag = document.getElementById("liveTag");
    var lives = parseInt(livesTag.innerText);
    var keycode = event.keyCode ? event.keyCode : event.charCode;
    var image = document.getElementById("imageletter");
    if(keycode>=65 && keycode<=90){
        image.src="./assets/images/"+(userText)+".png";
        image.style="display:inline;"
        setTimeout(function(){
            image.style="display:none;";
        },500);
    }
    
    var lettersTag = document.getElementById("letters");
    var arrayLength  = lettersTag.innerText.length; 

    var values = lettersTag.innerText;
    var valid=false;

    var imagesrc = "live"+lives;
    var skull = document.getElementById(imagesrc);

    if(lives>0 && hiddenword.indexOf("_") >-1){
        if( arrayLength== 0){
            if(keycode>=65 && keycode<=90){
                values = userText;
                keyList.push(userText);
                valid=true;
            }else{
                valid=false;
            }
        }else if (keycode>=65 && keycode<=90) {
            if(values.indexOf(userText) <0){
                values+=","+userText;
                var valList = values.split(",");
                valList.sort();
                values = valList;
                keyList.push(userText);
                valid=true;
            }else{
                valid=false;
            }
        }else{
            valid=false;
        }
        lettersTag.textContent = values;
    
        if(valid){
            hiddenword ="";
            var count =0;
            for (var i = 0;  i < word.length; i++){
                var element =word[i]; 
                if(element==userText){
                    hiddenword += userText + " ";
                    count++;
                }else{
                    if (/^[a-zA-Z]+$/.test(element)) {
                        if(keyList.indexOf(element)>-1){
                            hiddenword += element + " ";
                        }else{
                            hiddenword += "_ ";
                        }
                    }else if(element == " "){
                        hiddenword += "&nbsp ";
                        if((hiddenword.length/17)>1 && (hiddenword.length/17)<2){
                            hiddenword += "<br />";
                        }
                    }else{
                        count++;
                        hiddenword += element + " ";
                    }
                }
            }   
            var winword = document.getElementById("word");
            winword.innerHTML = hiddenword; 
        }
        if(count>0){
            var audio = document.getElementById("answer");
            audio.play();
        }
        if(count==0){
            skull.style="display:inline;"
            lives--;
            livesTag.textContent = lives;
            
            $("#liveTagDiv").fadeOut("fast");
            $("#liveTagDiv").fadeIn("fast");
            var audio = document.getElementById("wrong-answer");
            audio.play();
        }
        
        if(hiddenword.indexOf("_") <0){
            var win = document.getElementById("win");
            win.style="display:inline;"
        }
        if(lives<1){
            var gameover = document.getElementById("gameover");
            gameover.style="display:inline;"
            var audio = document.getElementById("lose");
            audio.play();
        }else if(lives <3){
            liveTagDiv.style="color:red;";
        }
    }
    
    console.log(word);  
}