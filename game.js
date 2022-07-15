// initialize context
kaboom({
	scale: 10,
})
volume(0.2)

// load assets
loadSprite("cloudswaterreflection", "assets/cloudswaterreflection.png");
loadAseprite("player", "assets/player.png", "assets/player.json");
loadAseprite("dragon2", "assets/dragon2.png", "assets/dragon2.json");


// add background to screen
add([
	sprite("cloudswaterreflection", { width: 128, height: 72}),
  pos(center()),
  origin("center"),
])

// score
let scoreposition = center()
scoreposition.x -= 58
scoreposition.y -= 35

const score = add([
    text("Score: 0", {
      font: "sink",
      size: 56,
    }),
    scale(0.08),
    pos(scoreposition),
    { value: 0 },
])

// instructions
let instructionPos = center()
instructionPos.x += 10
instructionPos.y -= 35

const instruction = add([
    text("Press 'z' or Tap Screen", {
      font: "sink",
      size: 36,
    }),
    scale(0.08),
    pos(instructionPos),
])

// wat the dragon do
let dragoneyecounter = 0; 
let timer = choose([1, 3, 5, 7])

loop(timer, () => {
  timer = choose([1, 3, 5, 7])
  dragoneyecounter++;
  add([
      sprite("dragon2", {frame: dragoneyecounter % 2 }),
      pos(center()),
      origin("center"),
      area(),
      scale(1),
      z(0),
      rotate(0),
  ])
})


// add player to screen
let playerposition = center()
playerposition.x -= 14
playerposition.y += 1

const player = add([
	sprite("player"),
  pos(playerposition),
	origin("center"),
	area(),
	scale(1),
	rotate(0),
  z(10),
	{ isPeeing: false, }
])

// how to lose the game
let isPlayerDead = false
  
onUpdate( () => {
  if (dragoneyecounter % 2 == 0 && player.isPeeing == true){
    destroy(player)
    isPlayerDead = true
  }

  if (player.isPeeing && !isPlayerDead ){
    score.value += 4 * dt()
    score.text = "Score:" + Math.floor(score.value)
  }
})

//player peeing or not peeing
onKeyPress("z", () => {
	player.frame = 1
	player.isPeeing = true
})

onKeyRelease("z", () => {
	player.frame = 0
	player.isPeeing = false
})

onTouchStart( () => {
	player.frame = 1
	player.isPeeing = true
})

onTouchEnd( () => {
	player.frame = 0
	player.isPeeing = false
})

   