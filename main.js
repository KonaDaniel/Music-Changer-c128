song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song1 = loadSound("believer.mp3");
    song2 = loadSound("happier.mp3");
}

function setup()
{
    canvas = createCanvas(640, 525);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 640, 525);
}

function modelLoaded()
{
    console.log('Model is Ready!');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("X and Y Coordinates of letf wrist - " + leftWristX + ", " + leftWristY);
        console.log("X and Y Coordinates of right wrist - " + rightWristX + ", " + rightWristY);
    }
}