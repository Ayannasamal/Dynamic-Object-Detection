img="";
status1="";
object = [];

function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380, 380);  
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status1 != ""){
        r=random(255);
        b=random(255);
        g=random(255);
        objectDetector.detect(video, gotResult);
        document.getElementById("status").innerHTML="Status : Detected objects";
        document.getElementById("number_of_objects").innerHTML = "Number of objects : "+ object.length;
        for(i=0; i<object.length;i++){
            fill(r,g,b);
            percentage = floor(object[i].confidence * 100);
            text(object[i].label + " " + percentage + "%" , object[i].x+15 , object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height); 

        }
    }
    
}

function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
    
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;
    }
}

function Start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}