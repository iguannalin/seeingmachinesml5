// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let GUID = "307b329b-67ef-4b9d-bf68-7096a62bf6bd";

let video;
let poseNet;
let poses = [];
let x = 0;
let y = 0;
let postData = { content:{"x":x,"y":y} };

function makeCall() {
  fetch(`https://seasons986.pythonanywhere.com/sendcoordinates?x=${x}&y=${y}`,{headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  }}).then((r)=>r.json()).then((d) => {
    console.log({d});
  });
}

function setup() {
  // createCanvas(640, 480);
  // video = createCapture(VIDEO);
  // video.size(width, height);

  // // Create a new poseNet method with a single detection
  // poseNet = ml5.poseNet(video, modelReady);
  // // This sets up an event that fills the global variable "poses"
  // // with an array every time new poses are detected
  // poseNet.on('pose', function(results) {
  //   poses = results;
  // });
  // // Hide the video element, and just show the canvas
  // video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  // image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();
  frameRate(1);
  x+=1;
  y+=1;
  makeCall();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        
        // httpPost(url, 'json', postData, (r) => print(r));
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}