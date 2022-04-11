song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWristY = 0;
scoreRightWristY = 0;
songStatus1 = "";
songStatus2 = "";

function preload() {
    song1 = loadSound("believer.mp3");
    song2 = loadSound("happier.mp3");
}

function setup() {
    canvas = createCanvas(640, 525);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    songStatus1 = song1.isPlaying();
    songStatus2 = song2.isPlaying();

    image(video, 0, 0, 640, 525);
    fill("red");
    stroke("black");

    if (scoreLeftWristY > 0.01) {
        circle(leftWristX, leftWristY, 30);
        song2.stop();
        if (songStatus1 == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song Name: Believer";
        }
    }

     fill("blue");
     stroke("black");

    if (scoreRightWristY > 0.01) {
        circle(rightWristX, rightWristY, 30);
        song1.stop();
        if (songStatus2 == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Song Name: Happier";
        }
    }
}

function modelLoaded() {
    console.log('Model is Ready!');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWristY = results[0].pose.keypoints[9].score;
        scoreRightWristY = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("X and Y Coordinates of letf wrist - " + leftWristX + ", " + leftWristY);
        console.log("X and Y Coordinates of right wrist - " + rightWristX + ", " + rightWristY);
    }
}