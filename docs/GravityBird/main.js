title = "Gravity Bird";

description = `   Tap to 
swap gravity`;

characters = [
`
yyyyyy
y    y
y  lly
yrr  y
rrr  y
yyyyyy
`,
`
yyyyyy
y    y
y  lly
yrr  y
y    y
yyyyyy
`,
`
yyyyyy
rrr  y
yrr  y
y  lly
y    y
yyyyyy
`,
`
yyyyyy
y    y
yrr  y
y  lly
y    y
yyyyyy
`

];

const G = {
  WIDTH: 100,
  HEIGHT: 100,
  GRAVITY: 0.05,
  FLAP_STRENGTH: .5,
  BIRD_X: 30,
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
};

let bird;
let pipes;
let cooldown = 10
let animationCountdown = cooldown;
let animationAt = "a";
// let score = 0;

function update() {
if (!ticks) {
bird = { x: G.BIRD_X, y: G.HEIGHT / 2, vy: 0 };
pipes = [{ x: G.WIDTH, gapY: rnd(30, 70) }];
score = 0;
}

bird.vy += G.GRAVITY;
bird.y += bird.vy;

if (bird.y < 0 || bird.y > G.HEIGHT) {
end();
}

if (input.isJustPressed) {
    G.GRAVITY *= -1
    if(G.GRAVITY >= 0){
        bird.vy = -G.FLAP_STRENGTH
    }
    else{
        bird.vy = G.FLAP_STRENGTH;
    }
    

    if(animationAt == "a"){
        animationAt = "c"
    }
    else if(animationAt == "b"){
        animationAt = "d"
    }
    else if(animationAt == "c"){
        animationAt = "a"
    }
    else if(animationAt == "d"){
        animationAt = "b"
    }


}

if (bird.y > G.HEIGHT) {
bird.y = G.HEIGHT;
}

for (let i = 0; i < pipes.length; i++) {
const pipe = pipes[i];
pipe.x -= 1;
if (pipe.x < -20) {
    pipes.shift();
    pipes.push({ x: G.WIDTH, gapY: rnd(30, 70) });
}

if (bird.x > pipe.x && bird.x < pipe.x + 20) {
    if (bird.y < pipe.gapY - 15 || bird.y > pipe.gapY + 15) {
    end();
    }
}

if (bird.x == pipe.x + 20) {
    score += 1;
}
}

color("green")
pipes.forEach((pipe) => {
rect(pipe.x, 0, 20, pipe.gapY - 20);
rect(pipe.x, pipe.gapY + 20, 20, G.HEIGHT - pipe.gapY - 20);
});

if(animationCountdown <= 0){
    if (animationAt == "a"){
        animationAt = "b"
    }
    else if(animationAt == "b"){
        animationAt = "a"
    }
    else if(animationAt == "c"){
        animationAt = "d"
    }
    else if(animationAt == "d"){
        animationAt = "c"
    }




    animationCountdown = cooldown
}
animationCountdown -= 1;
color("black")
char(animationAt, bird.x, bird.y);

}
