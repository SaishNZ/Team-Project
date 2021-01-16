//player
var player;

//pokemon and backGround
var pikachu_running, pikachu_jumping, pikachu_standing;
var runningBack1, runningBack2,runningBack3,runningBack4, gymBack, natureBack, pokeballBack, invisibleGround;
var runningBackImg, gymBackImg, natureBackImg, pokeballBackImg;

var zubat_flying, enemy_moving, enemyGroup;
var face_image;

//endless and level game
var endlessGame, endlessgameImg;
var levelGame, levelgameImg;

//sounds
var battleSound;
var selectSound;
var serveStageSound;

//gameState
var gameState = "select";

//confirmBox
var confirmBox;
var alert;

//sound slider
var slider;

//score
var score, points;

function preload() {
//pikachu running, standing and jumping animation
 pikachu_running = loadAnimation("images/pikachu1.png","images/pikachu2.png", "images/pikachu3.png",
 "images/pikachu4.png","images/pikachu5.png",
 "images/pikachu5.png","images/pikachu6.png","images/pikachu7.png","images/pikachu8.png","images/pikachu9.png",
 "images/pikachu10.png","images/pikachu11.png",
 "images/pikachu12.png","images/pikachu13.png","images/pikachu14.png");

 pikachu_jumping = loadAnimation("images/pikachu2.png","images/pikachu3.png","images/pikachu5.png");
 pikachu_standing = loadAnimation("images/pikachustanding.png");

 face_image = loadImage("images/face1.png");

 //animation of enemies
 zubat_flying = loadAnimation("images/zubat1.png","images/zubat2.png","images/zubat3.png",
 "images/zubat4.png","images/zubat5.png"); 

 enemy_moving = loadImage("images/enemy1.png");

 //background
 runningBackImg = loadImage("backgrounds/runningback.jpeg");
 natureBackImg = loadImage("backgrounds/natureback.jpeg");
 gymBackImg = loadImage("backgrounds/gymback.jpeg");
 pokeballBackImg = loadImage("backgrounds/pokeballback.jpeg");

 //endless and level
 endlessgameImg = loadImage("images/endlessgame.png");
 levelgameImg = loadImage("images/levelgame.png");

 //load sounds
 battleSound = loadSound("sound/PokmonGOBattle.mp3");
 selectSound = loadSound("sound/select.mp3");
 serveStageSound = loadSound("sound/serveStage.mp3")
}

function setup() {
    //create canvas fit according to screen
    createCanvas(windowWidth,windowHeight+10);

     //create sprite in setup
     //background
    pokeballBack = createSprite(windowWidth-700,windowHeight-300);
    pokeballBack.addImage(pokeballBackImg);

    runningBack1 = createSprite(windowWidth/2,windowHeight/2);
    runningBack1.addImage(runningBackImg);
    runningBack1.velocityX = -5;

    runningBack2 = createSprite(windowWidth/2,windowHeight/2);
    runningBack2.addImage(runningBackImg);
    runningBack2.velocityX = -5;

    runningBack3 = createSprite(windowWidth/2,windowHeight/2);
    runningBack3.addImage(runningBackImg);
    runningBack3.velocityX = -5;

    runningBack4 = createSprite(windowWidth/2,windowHeight/2);
    runningBack4.addImage(runningBackImg);
    runningBack4.velocityX = -5;

    player = createSprite((width/4)-100,windowHeight/2+225);
    player.addAnimation("running", pikachu_running);
    player.scale = 0.2;

    //Invisible ground 
    invisibleGround = createSprite(windowWidth/5.2, windowHeight/1.14);
    invisibleGround.visible = false;

    // endless and level
    endlessGame = createSprite(pokeballBack.x,pokeballBack.y-50);
    imageMode(CENTER);
    endlessGame.addImage(endlessgameImg);

    levelGame = createSprite(pokeballBack.x,pokeballBack.y+50);
    levelGame.addImage(levelgameImg);

    //create slider
    slider = createSlider(0,10,0.1,0.01);
    slider.position(windowWidth/10, windowHeight/2+280);

    //alert for high volume
    //alert("Please Unplug Headsets and Make sure your volume is loo. Too high volume can harm you ears")

    //change depth
   

    if(gameState === "select" ) {
        serveStageSound.loop();
        serveStageSound.setVolume(0.1);
    }
    if(gameState === "endlessPlay" || gameState === "levelPlay") {
        battleSound.loop();
        battleSound.setVolume(1);
    }

    player.setCollider("circle", 0, 0, 25);
    player.debug = false;

    enemyGroup = createGroup();
    pointsGroup = createGroup();

    score = 0;
    points = 0; 
    
}

function draw() {
//volume accoring to slider value
battleSound.setVolume(slider.value());
serveStageSound.setVolume(slider.value());


  //serve stage
   if(gameState === "select") {
       //give visiblity
       player.visible = false;
       //zubat.visible = false;
       runningBack1.visible = false;
       runningBack2.visible = false;
       runningBack3.visible = false;
       runningBack4.visible = false;

       if(mousePressedOver(endlessGame)) {
           endlessGame.visible = false;
           levelGame.visible = false;         

           confirmBox = confirm("Are you sure to start the Endless game? Make sure you are in good environment to start Endless Game");
           if(confirmBox == true) {
               gameState = "endlessPlay";
              
               //sound
               serveStageSound.stop();
               battleSound.loop();
               return true;
           } else {
               window.location.reload(true);
               return false;
           }

        } else if(mousePressedOver(levelGame)) {
            endlessGame.visible = false;
            levelGame.visible = false;

           
            confirmBox = confirm("Are you sure to start the level game? Make sure you are in good environment to start Level Game");
            if(confirmBox == true) {
                gameState = "levelPlay";
                 //sound
                 serveStageSound.stop();
                 battleSound.loop();

                return true;
            } else {
                window.location.reload(true);
                return false;
            }
            
        }

       } else if(gameState === "levelPlay") {
           //give visiblity
           player.visible = true;
           zubat.visible = true;
           endlessGame.visible = false;
           levelGame.visible = false;
           pokeballBack.visible = false;
           runningBack1.visible = true;
           runningBack2.visible = true;
           runningBack3.visible = true;
           runningBack4.visible = true;

           //background
            background("#fff");
            

       } else if(gameState === "endlessPlay") {
           //give visiblity
           player.visible = true;
           endlessGame.visible = false;
           levelGame.visible = false;
           pokeballBack.visible = false;
           runningBack2.visible = true;
           runningBack1.visible = true;
           runningBack3.visible = true;
           runningBack4.visible = true;

           //Jump 
           if(keyDown("space") && player.y >= 579) {
           player.velocityY = -13;
           }

           //Adding Gravity 
           player.velocityY = player.velocityY + 0.5;

           //Score
           score = score + Math.round(getFrameRate()/100);

           //Spawnning enemies and face
           spawnEnimies();
           spawnFace();

           //background
           background("#fff");

           //reset background
           if(runningBack1.x < windowWidth) {
               runningBack2.x = runningBack1.x+600;
           }
           if(runningBack2.x < windowWidth) {
               runningBack3.x = runningBack2.x+600;
           }
           if(runningBack3.x < windowWidth) {
            runningBack4.x = runningBack3.x+600;
           }
           if(runningBack4.x < windowWidth) {
            runningBack1.x = runningBack4.x+600;
           }

           if(pointsGroup.isTouching(player)) {
               points = points + 1;
               pointsGroup.destroyEach();
           }

           if(enemyGroup.isTouching(player)) {
               gameState = end;
           }
           

       } else if(gameState === "end") {
           //give visiblity
            endlessGame.visible = false;
            levelGame.visible = false;
            runningBack1.visible = true;
            runningBack2.visible = true;
            runningBack3.visible = true;
            runningBack4.visible = true;
        //background
           background("#fff");
 
       }
       
    player.collide(invisibleGround); 
    
    drawSprites();

       stroke("red");
       textSize(35);
       fill("yellow");
       text("Score: " + frameCount, width/4+800, windowHeight/2-300);

       stroke("purple");
       textSize(35);
       fill("orange");
       text("Points: " + points, width/4+600, windowHeight/2-300);

}

 function spawnEnimies() {

    if(frameCount % 300 === 0) {
        var zubat = createSprite((width/4)+1200, windowHeight/2+50);
        zubat.y = Math.round(random(350, 550));
        zubat.addAnimation("flying", zubat_flying);
        zubat.scale = 0.25;
        zubat.velocityX = -(7 + score/100);
        zubat.lifetime = 500;
        enemyGroup.add(zubat);

        zubat.depth = player.depth;
        player.depth = player.depth + 1;

    }

    if(frameCount % 225 === 0) {
        var enemy1 = createSprite((width/4)+1200,windowHeight/2+215);
        enemy1.addImage("moving", enemy_moving);
        enemy1.scale = 0.80;
        enemy1.velocityX = -(7 + score/100);
        enemy1.lifetime = 500;
        enemyGroup.add(enemy1);

        enemy1.depth = player.depth;
        player.depth = player.depth + 1;

    }
}

function spawnFace() {

    if(frameCount % 500 === 0) {
        var face = createSprite((width/4)+1200, windowHeight/2+50);
        face.y = Math.round(random(350, 550));
        face.addImage(face_image);
        face.scale = 0.08;
        face.velocityX = -(7 + score/100);
        face.lifetime = 500;
        pointsGroup.add(face);

        face.depth = player.depth;
        player.depth = player.depth + 1;

    }

}