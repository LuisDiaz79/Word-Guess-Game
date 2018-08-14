var word ="";
var hiddenword="";


function startGame(){
    var wordsList = ["Pinky and the Brain","Rugrats","The Powerpuff Girls","Dexter's Laboratory","SpongeBob SquarePants","Ed, Edd n Eddy","X-Men","The Simpsons","Futurama","Animaniacs"];
    //word = wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase();
    word = "SpongeBob SquarePants".toUpperCase();
    console.log(word);


    for (let i = 0; i < word.length; i++) {
        const element = word[i];

        if (/^[a-zA-Z]+$/.test(element)) {
            hiddenword += "_ ";
        }else if(element == " "){
            hiddenword += "&nbsp ";
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
    console.log(userText);
    var keycode = event.keyCode ? event.keyCode : event.charCode;
    var image = document.getElementById("imageletter");
    if(keycode>=65 && keycode<=90){
        image.src="./assets/images/"+(userText)+".png";
        image.style="display:inline;"
        setTimeout(function(){
            image.style="display:none;";
        },800);
    }
    
    var lettersTag = document.getElementById("letters");
    var arrayLength  = lettersTag.innerText.length; 

    var values = lettersTag.innerText;
    var valid=false;

    var imagesrc = "live"+lives;
    var skull = document.getElementById(imagesrc);

    if( arrayLength== 0){
        if(keycode>=65 && keycode<=90){
            values = userText;
            valid=true;
        }else{
            skull.style="display:inline;"
            lives--;
            livesTag.textContent = lives;
            valid=false;
        }
    }else if (keycode>=65 && keycode<=90) {
        if(values.indexOf(userText) <0){
            values+=","+userText;
            var valList = values.split(",");
            valList.sort();
            values = valList;
            valid=true;
        }else{
            skull.style="display:inline;"
            lives--;
            livesTag.textContent = lives;
            valid=false;
        }
    }else{
        skull.style="display:inline;"
        lives--;
        livesTag.textContent = lives;
        valid=false;
    }
    lettersTag.textContent = values;

    if(valid){
        hiddenword ="";
        for (var i = 0;  i < word.length; i++){
            var element =word[i]; 
            if(element==userText){
                console.log("HERE  " + i);
                hiddenword += userText + " ";
                console.log(hiddenword);
            }else{
                if (/^[a-zA-Z]+$/.test(element)) {
                    if(){
                        
                    }
                    hiddenword += "_ ";
                }else if(element == " "){
                    hiddenword += "&nbsp ";
                }else{
                    hiddenword += element + " ";
                }
            }
            console.log("hiddenword : " + hiddenword);
        }   
        var winword = document.getElementById("word");
        winword.innerHTML = hiddenword; 
    }
    



    // var stringsearch = "o"
    //     ,str = "this is foo bar";

    // for (var i = 0;  i < str.length; i++){
    //     console.log("HERE 1 ");
    //     if(str[i]==stringsearch){
    //         console.log("HERE  " + i);
    //         str = str.substr(0, i) + 'x' + str.substr(i + 1);
    //         console.log(str);
    //     }
    // }     
    console.log(("this is foo bar".match(/o/g)||[]).length);
    console.log(word);  
}