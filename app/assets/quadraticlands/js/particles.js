/*
mode : mouse-trail
attrackt / distribute
mode : magnetic
mode : touch particle = give it a bit a twist / other random direction ?
navigation / button on click onclick="setMode('explosion')"  ?

*/


console.debug("PARTICLES")

config = {

  scene : { "w" : document.documentElement.clientWidth, "h" : document.documentElement.clientHeight },

  paths : [
    "M63 20L99 90L29 108L63 20Z",
    "M85 22L82 102L42 106L85 22Z",
    "M103 96L52 23L28 77L103 96Z",
    "M103 101L78 26L24 83L103 101Z",
    "M30 30L107 25L93 104H22L30 30Z",
    "M13 80L70 31L115 75L19 95L13 80Z",
    "M107 109L21 25L27 54L80 107L107 109Z",
    "M104 82L26 20L23 35L57 109L104 82Z",
    "M31 29L66 16L97 45L88 80L54 112L31 29Z", 
    "M63 14L103 48L92 104H34L16 48L63 14Z",
    "M74 27L109 42L95 101L26 83L20 65L74 27Z", 
    "M37 16L79 36L107 110L30 70L21 36L37 16Z"
  ],

  particles : 15,
  size : { min: 11, max: 36 },
  color : { purple: "#6F3FF5", pink: "#F35890", aqua: "#02E2AC" },
  colorcycleTime : { min: 600, max: 6000 },
  rotationTime : { min: 3000, max: 12000 },
  padding: "5px",
  paddingTime : { min: 600, max: 4000 },
  opacityTime : { min: 600, max: 6000 },
  initialmode : "", // can be set external
  mode : "space", //"space","wind","floating",
  floating : { min: -5, max: 5 },
  wind : { min: -0.3, max: -15 },
  magneticSpeed : { min: 20, max: 60 },
  shuffle : false

}


// check if external override outside of this script
// e.g. <script>const particleSetup = {"initialmode": "floating"}</script>
// later : maybe override other values as well here like particles count
if (typeof particleSetup !== 'undefined') {
  config.mode = particleSetup.initialmode
  console.log("INITIALMODE:", config.mode )
}




class Particle {

  constructor(){
    this.x = Math.random() * config.scene.w
    this.y = Math.random() * config.scene.h
    this.size = ~~(Math.random() * (config.size.max - config.size.min) + config.size.min)
    this.sizeDefault = this.size = ~~(Math.random() * (config.size.max - config.size.min) + config.size.min)
    this.path = config.paths[ ~~( Math.random() * config.paths.length ) ]
    this.colorcycleTime = ~~(Math.random() * (config.colorcycleTime.max - config.colorcycleTime.min) + config.colorcycleTime.min)
    this.rotationTime = ~~(Math.random() * (config.rotationTime.max - config.rotationTime.min) + config.rotationTime.min)
    this.paddingTime = ~~(Math.random() * (config.paddingTime.max - config.paddingTime.min) + config.paddingTime.min)
    this.opacityTime = ~~(Math.random() * (config.opacityTime.max - config.opacityTime.min) + config.opacityTime.min)
    this.dx = 0 
    this.dy = 0
    this.targetX = 0
    this.targetY = 0
    this.magneticSpeed = ~~(Math.random() * (config.magneticSpeed.max - config.magneticSpeed.min) + config.magneticSpeed.min)

  }

  update(){
    if(config.mode == "space") { this.space() }
    if(config.mode == "wind") { this.wind() }
    if(config.mode == "floating") { this.floating() }
    if(this.targetX || this.targetY) { this.magnetic() }
    if(config.shuffle) { this.shuffle() }
  }

  draw(i){
    scene = document.getElementById("particles")
    svg = scene.childNodes;

    if (!this.targetX || !this.targetY){
      this.y += this.dy
      this.x += this.dx      
    }

  
    svg[i].style.left = this.x + "px"
    svg[i].style.top = this.y + "px" 
    svg[i].style.width = this.size + "px"
    svg[i].style.height = this.size + "px"
  }


  wind(){
    if (this.x < 0){
      this.x = config.scene.w
      this.y = Math.random() * config.scene.h
    }
  }

  floating(){
      if (this.x < 0 || this.x > config.scene.w ) { this.dx = -this.dx }
      if (this.y < 0 || this.y > config.scene.h ) { this.dy = -this.dy }
  }

  space(){

  }


  magnetic(){
      if (this.x >= this.targetX ) { this.x -= this.magneticSpeed  }
      if (this.x <= this.targetX ) { this.x += this.magneticSpeed  }
      if (this.y >= this.targetY ) { this.y -= this.magneticSpeed  }
      if (this.y <= this.targetY ) { this.y += this.magneticSpeed  }
  }





  shuffle(){
    if (config.mode == "space")
    {
    //redistribute particles on space mode
    this.x = Math.random() * config.scene.w
    this.y = Math.random() * config.scene.h
    this.targetY = false
    this.targetX = false
    this.size = Math.random() * (config.size.max - config.size.min) + config.size.min
    config.shuffle = false
    init()
    //console.log("SHUFFLE")      
    }
  }






}


// set mode and its behaviour parameters
// "","wind","floating"

function setMode(mode){

  if (mode=="space"){
    config.mode = "space"
    for (let i=0; i<particlesArray.length; i++){
      particlesArray[i].dx = 0
      particlesArray[i].dy = 0
    } 
  }

  if (mode=="floating"){
    config.mode = "floating"
    for (let i=0; i<particlesArray.length; i++){
      particlesArray[i].dx = Math.random() * (config.floating.max - config.floating.min) + config.floating.min
      particlesArray[i].dy = Math.random() * (config.floating.max - config.floating.min) + config.floating.min
    } 
  }

  if (mode=="wind"){
    config.mode = "wind"
    for (let i=0; i<particlesArray.length; i++){
      particlesArray[i].dx = Math.random() * (config.wind.max - config.wind.min) + config.wind.min
      particlesArray[i].dy = 0
    }
  }


}



function animate(){
  for (let i=0; i<particlesArray.length; i++){
    particlesArray[i].update(i)
    particlesArray[i].draw(i)
  }
  requestAnimationFrame(animate)
}



// init particlesArray
function init(){
  particlesArray = []
  for (let i = 0; i < config.particles; i++){
    particlesArray.push ( new Particle() )
  }

  // set particle mode based on config
  if(config.mode == "space") { setMode("space") }
  if(config.mode == "wind") { setMode("wind") }
  if(config.mode == "floating") { setMode("floating") }

}



// init scene and all SVG particles

function initSVGS(){

  console.debug("initSVGS")

  scene = document.createElement("section")
  scene.setAttribute("id","particles")
  document.body.appendChild(scene)

  for (let i=0; i<particlesArray.length; i++){

    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute ("width", "128" )
    svg.setAttribute ("height", "128" )
    svg.setAttribute ("viewBox", "0 0 128 128")

    svg.animate({ fill: [ config.color.purple, config.color.pink, config.color.aqua, config.color.purple ]}, 
    { duration: particlesArray[i].colorcycleTime, delay: 0, iterations: Infinity })

    svg.animate({ transform: ["rotate(0deg)","rotate(360deg)"] },
    { duration: particlesArray[i].rotationTime, delay: 0, iterations: Infinity })

    svg.animate({ padding: ["0px" , config.padding , "0px" ]},
    { duration: particlesArray[i].paddingTime, delay: 0, iterations: Infinity })

    svg.animate({ opacity: [ 0.8, 1, 0.8] },
    { duration: particlesArray[i].opacityTime, delay: 0, iterations: Infinity })

    path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", particlesArray[i].path)

    svg.appendChild(path)
    document.getElementById("particles").appendChild(svg)
  }

}



const particleAttract = document.querySelectorAll(".particleAttract, section a, section .btn")


particleAttract.forEach(link => {
  link.onmouseover = () => {

    particlesArrayPast = particlesArray
    //console.log("PAST")
    //console.log(particlesArrayPast)

    box = link.getBoundingClientRect()

    size = 60
    if (link.dataset.particlesize) { size = link.dataset.particlesize }

    for (let i=0; i<particlesArray.length; i++){
      if ( Math.random() >= 0.5) {
        particlesArray[i].targetX = box.left + ( ~~(Math.random() * link.offsetWidth )) - ( size / 2 )
        particlesArray[i].targetY = box.top + ( ~~(Math.random() * link.offsetHeight )) - ( size / 2 )
        particlesArray[i].size = size
      }
    }


    //console.log(particlesArray)


  };


  link.onmouseout = () => {

    particlesArray = particlesArrayPast

    config.shuffle = true

    for (let i=0; i<particlesArray.length; i++){
        particlesArray[i].size = Math.random() * (config.size.max - config.size.min) + config.size.min
        particlesArray[i].targetY = false
        particlesArray[i].targetX = false 
    }



  };



});




/// ON RESIZE SET NEW SCENE DIMENSIONS
window.addEventListener('resize', (event) => {
  console.debug("RESIZE")
  config.scene.w = document.documentElement.clientWidth
  config.scene.h = document.documentElement.clientHeight
  init()
} );



// SWITCH MODE WITH SAL
const particleMode = document.querySelectorAll('.particleMode');
particleMode.forEach((mode) => {
  mode.addEventListener('sal:in', () => {
    setMode(mode.getAttribute("data-mode"))
    console.debug("MODE:START")
    console.log(config.mode)
  });
})






// init particleArray
init()
// create SVGS in #particles
initSVGS()
// loop
animate()











