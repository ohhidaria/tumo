

// let array = [1004, 1240, 1437, 2000, 3456, 6789, 1500, 2600, 1111]
// for (let i = 0; i <array.length; i++){
//   if (array[i]%2 == 0){
// console.log(array[i])
// }
// // }

// let num = 5;
// console.log(num);


// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15];
// let intPos = 0; 
// let sumNeg = 0; 
// for (let  = 0; i <arr.length; i++){
//   if (arr[i] > 0 && arr[i] !=0 ){
//     intPos = intPos +1;
//   }else{
//     sumNeg = sumNeg+ arr[i];
//   }

// }
// console.log([intPos,sumNeg])

// }

//3 задача 

// let arr = [];
// for (let i =  0; i <5; i++){
//      arr.unshift(i); 
// }
// console.log(arr)


//4 задача 

// function palindrome(str) {
//   let check = '';
//   for (let i = str.length - 1; i >= 0; --i) {
//     check += str[i];
//   }
//   return str == check;
// }

// console.log(palindrome('34543'));

//5 задача 



// function task(string){
  
//   return string.slice(1, string.length -1);
// }
// console.log(task("ufhfury"));


// задача 3





// palindrome("racecar");
// function palindrome(str){
//     return str === str.split("").reverse().join("");
// }
// console.log(palindrome("racecar"));


// задача1
// function num(a, b, c){
    

    
//     console.log(a, b, c);
//     let y = -4*a * a - 8/b + 5*c;
//    return y

// }
// num(2, 3, 4)



// задача3
// function getRandomInt(max){
//     return Math.floor(Math.random() * max);
// }
// console.log(getRandomInt(3));




// class CoffeeMachine {
//     #water = 0 
//     #kavabeans = 0
//     #milk = 0
//     #coffemakermode = false

//     get water() { 
//         return this.#water
//     }
//     set water(newWater) {
//         if(this.#water + newWater <= 0 || this.#water + newWater >= 1000){
//         throw new Error("error")
//     }
//     this.#water = newWater 
//     console.log(this.#water)
// }
// get kavabeans () {
//     return thas.#kavabeans

// set kavabeans(newKavabeans) {
//     if(this.kavabeans + newKavabeans <=0 || this.kavabeans + newKavabeans >=300)
//     throw new Error("error")
//     this.#kavabeans = newKavabeans
//     console.log(this.#kavabeans)

//jkskdkwekldeooeeo

function setup(){
    createCanvas(400, 400);
    Game.addCommonBalloon()
    
    }

    function draw (){
       
        background('skyblue');
        
        for(let balloon of Game.balloons){
        balloon.display()
        balloon.move(Game.score)

        if (balloon.y <= balloon.size / 2 && balloon.color != "black"){
            
            noLoop()
            clearInterval(interval)
            Game.balloons.length = 0
            background(136, 220, 166)
            let score = Game.score
            Game.score = ""
            textSize (64)
            fill("white")
            textAlign(CENTER, CENTER)
            text("FINISH", 200, 200)
            textSize(34)
            text("Score: " + score, 200, 300)
        }

        }
     textSize(32)
        fill("black")
        text(Game.score, 20, 40)
    
    if(frameCount % 50 === 0){
        Game.addCommonBalloon()
    }
    if(frameCount % 100 === 0){
        Game.addUniqBalloon()
}
    if(frameCount % 120 === 0){
        Game.addAngryBalloon()
    }
}


function mousePressed() {
    if(!isLooping()){
    loop()
    Game.score = 0
    Game.countOfBlack = 0
    Game.countOfBlue = 0
    Game.countOfGreen = 0
    Game.countOfClick = 0

    let interval = setInterval(() => {
        Game.sendStatistics()
    }, 5000);
    }
    Game.countOfClick += 1
    Game.checkIfBalloonBurst()
}
    

let interval = setInterval(() => {
    Game.sendStatistics()
}, 5000);




class Game {
    static balloons = []
    static score = 0;
    static countOfGreen = 0;
    static countOfBlue = 0;
    static countOfBlack = 0;
    static countOfClick = 0;


    static sendStatistics() {
        let stats = {
         score: this.score,
         countOfGreen: this.countOfGreen,
         countOfBlue:  this.countOfBlue,
         countOfBlack: this.countOfBlack,
         countOfClick: this.countOfClick
    };
        fetch("/stats",{
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(stats)
        })
    }


    static addCommonBalloon(){
        let commonBalloon = new CommonBalloon ("blue", 50)
        this.balloons.push(commonBalloon)
    }
    static addUniqBalloon (){
        let uniqBalloon = new UniqBalloon ("green", 30)
        this.balloons.push(uniqBalloon)
}
static addAngryBalloon (){
    let angryBalloon = new AngryBalloon ("black", 50)
    this.balloons.push(angryBalloon)
}
static checkIfBalloonBurst(){
    this.balloons.forEach((balloon, index) => {
let distance = dist(balloon.x, balloon.y, mouseX, mouseY)
if (distance <= balloon.size / 2){
    balloon.burst(index)
}
    })
}
}





class CommonBalloon {
    constructor(color, size){
        this.x = random(width)
        this.y = random(height - 10, height + 50)
        this.color = color
        this.size = size 
    }
    display(){
        fill(this.color);
        ellipse(this.x, this.y, this.size);
        line(this.x,this.y + this.size/2, this.x, this.y + 2*this.size)
    }
    move(score){
        if(score < 100){
        this.y -= 1
        } else if (score >= 100 && score <= 200){
            this.y -= 1.5
        } else{
            this.y -=2
        }
    }
    burst(index){
        Game.balloons.splice(index, 1)
        Game.score += 1
        Game.countOfGreen += 1

    }
}
class UniqBalloon extends CommonBalloon {
    constructor(color, size){
        super(color, size)
    }


    burst(index){
        Game.balloons.splice(index, 1)
        Game.score += 10
        Game.countOfBlue += 1
    }
}

class AngryBalloon extends CommonBalloon {
    constructor(color, size){
    super(color, size)
    }


burst(index){
    Game.balloons.splice(index, 1)
    Game.score -= 10
    Game.countOfBlack += 1
}
}
