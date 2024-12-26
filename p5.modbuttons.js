// 7vector's button system V2
// now better in every way!
// (theres definitely better ones, but the old one sucked)

p5.prototype.buttons = []

class Button {
  constructor (type, x, y){
    
    this.pressed = false
    this.hover = false
    
    this.type = type.toUpperCase()
    if(this.type != "BOX" && this.type != "CIRCLE") this.type = "BOX" // default to a box button
    this.x = x
    this.y = y
    
    this.width = 100
    this.height = 100
    this.radius = 100
    
    this.drawn = false
    this.updated = false
    
    this.hidden = false
    this.active = true
    
    this.timeSinceHoverChange = 0
    this.timeSincePressedChange = 0
    
    this.fill = [255,255,255]
    this.stroke = [0,0,0]
    this.strokeWeight = 1
    
    p5.prototype.buttons.push(this)
    
    
  }
  onHover(){
    
  }
  onHoverBegin(){
    cursor(HAND)
  }
  onHoverEnd(){
    cursor()
  }
  onPress(){
    
  }
  onPressBegin(){
    
  }
  onPressEnd(){
    
  }
  check(){ // check for mouse interaction
    if(this.type == "BOX"){
      
      if(mouseX >= this.x && mouseY >= this.y 
          && mouseX < this.x + this.width && mouseY < this.y + this.height){
        if(this.hover == false){ this.onHoverBegin(); this.timeSinceHoverChange = 0 }
        
        this.hover = true
        if(mouseIsPressed) {
          if(this.pressed == false) {this.onPressBegin(); this.timeSincePressedChange = 0 }
          this.pressed = true
          this.onPress()
        } else {
          if(this.pressed == true) { this.onPressEnd(); this.timeSincePressedChange = 0 }
          this.pressed = false
        }
        
        this.onHover()
      }else{
        if(this.hover == true) { this.onHoverEnd(); this.timeSinceHoverChange = 0 }
        
        this.hover = false
        this.pressed = false
      }
      
    }else if(this.type == "CIRCLE"){
      if(dist(this.x, this.y, mouseX, mouseY) <= this.radius){
        if(this.hover == false) { this.onHoverBegin(); this.timeSinceHoverChange = 0 }

          this.hover = true
          if(mouseIsPressed) {
            if(this.pressed == false) { this.onPressBegin(); this.timeSincePressedChange = 0 }
            this.pressed = true
            this.onPress()
          } else {
            if(this.pressed == true) { this.onPressEnd(); this.timeSincePressedChange = 0 }
            this.pressed = false
          }

          this.onHover()
      }else{
        if(this.hover == true) { this.onHoverEnd(); this.timeSinceHoverChange = 0 }
        
        this.hover = false
        this.pressed = false
      }
    }
    
    this.timeSinceHoverChange += round(deltaTime/1000,3)
    this.timeSincePressedChange += round(deltaTime/1000,3)
  }
  onUpdate(){

  }
  update(){
    this.updated = true
    if(this.active){ 
      this.check() 
      this.onUpdate()
    }
  
  }
  render(){ 
    if(this.type == "BOX"){
      fill(this.fill)
      stroke(this.stroke)
      strokeWeight(this.strokeWeight)
      rect(this.x, this.y, this.width, this.height)
    }else if(this.type == "CIRCLE"){
      fill(this.fill)
      stroke(this.stroke)
      strokeWeight(this.strokeWeight)
      circle(this.x, this.y, this.radius * 2)
    }
  }
  draw(){
    this.drawn = true
    if(!this.hidden) this.render()
  }
  enable(){
    this.active = true
    this.hidden = false
  }
  disable(){
    this.active = false
    this.hidden = true
  }
}

function saveButtonStatus(){ // returns an array that can be used in the following function
    let status = []
    for(let i = 0; i < p5.prototype.buttons.length; i++){
        let button = p5.prototype.buttons[i]
        status[i] = [button.hidden, button.enabled]
    }
    return status
}

function loadButtonStatus(status){
    for(let i = 0; i < p5.prototype.buttons.length; i++){
        let button = p5.prototype.buttons[i]
        button.hidden = status[i][0]
        button.active = status[i][1]
    }
}

function disableAllButtons(){
    for(let i = 0; i < p5.prototype.buttons.length; i++){
        let button = p5.prototype.buttons[i]
        button.disable()
    }
}

p5.prototype.updateButtons = function(){
  for(let button of p5.prototype.buttons){
    if(!button.updated) button.update()
    button.updated = false
    
    if(!button.drawn) button.draw()
    button.drawn = false
    
  }
}


class Slider extends Button{
    constructor(type,vertical, x, y){
      super(type,x,y)
      
      this.width = 20
      this.height = 20
      this.radius = 20

      this.vertical = vertical

      this.Slength = 100

      this.smooth = true
      this.segments = 5
      this.value = 0
      this.prevValue = this.value
      
      this.timeSinceValueChange = 0
    }

    check(){
      
      let Soffset = this.vertical?(this.smooth?(-this.value):(-(this.value*(this.Slength/this.segments)))):(this.smooth?(this.value):((this.value*(this.Slength/this.segments)))) // yolo
       
        if(this.type == "BOX"){
      
      if(mouseX >= this.x - this.width/2 + (this.vertical?0:Soffset) && mouseY >= this.y - this.height/2 + (this.vertical?Soffset:0)
          && mouseX < this.x + this.width/2 + (this.vertical?0:Soffset) && mouseY < this.y + this.height/2 + (this.vertical?Soffset:0)){
        if(this.hover == false){ this.onHoverBegin(); this.timeSinceHoverChange = 0 }
        
        this.hover = true
        if(mouseIsPressed) {
          if(this.pressed == false) {this.onPressBegin(); this.timeSincePressedChange = 0 }
          this.pressed = true
          this.onPress()
        }
        
        this.onHover()
      }else{
        if(this.hover == true) { this.onHoverEnd(); this.timeSinceHoverChange = 0 }
        
        this.hover = false
      }
      
    }else if(this.type == "CIRCLE"){
      if(dist(this.x + (this.vertical?0:Soffset), this.y + (this.vertical?Soffset:0), mouseX, mouseY) <= this.radius/2){
        if(this.hover == false) { this.onHoverBegin(); this.timeSinceHoverChange = 0 }

          this.hover = true
          if(mouseIsPressed) {
            if(this.pressed == false) { this.onPressBegin(); this.timeSincePressedChange = 0 }
            this.pressed = true
            this.onPress()
          }
          
          this.onHover()
      }else{
        if(this.hover) this.onHoverEnd()
        this.hover = false
      }
    }
      
      if(this.pressed){
        if(mouseIsPressed){
          
          if(this.vertical){
            if(this.smooth){
              this.value = max(min(this.y - mouseY, this.Slength),0)
            }else{
              this.value = max(min(round(((this.y - mouseY)/this.Slength)*this.segments), this.segments),0)
            }
          }else{
            if(this.smooth){
              this.value = max(min(mouseX - this.x, this.Slength),0)
            }else{
              this.value = max(min(round(((mouseX - this.x)/this.Slength)*this.segments), this.segments),0)
            }
          }
          
        }else{
          if(this.pressed == true) { this.onPressEnd(); this.timeSincePressedChange = 0 }
          this.pressed = false
        }
      }
      
    if(this.prevValue != this.value){ 
      this.onValueChange(this.value - this.prevValue) 
      this.timeSinceValueChange = 0
    }
      
    this.prevValue = this.value
    
    this.timeSinceHoverChange += round(deltaTime/1000,3)
    this.timeSincePressedChange += round(deltaTime/1000,3)
    this.timeSinceValueChange += round(deltaTime/1000,3)
  }
  render(){ 
    if(this.type == "BOX"){
      fill(this.hover?this.fill:this.stroke)
      stroke(this.hover?this.stroke:this.fill)
      strokeWeight(this.strokeWeight)
      if(this.vertical){
        line(this.x,this.y,this.x,this.y - this.Slength)
        if(this.smooth){
          rect(this.x - this.width/2, this.y - this.height/2 - this.value, this.width, this.height)
        }else{
          rect(this.x - this.width/2, this.y - this.height/2 - (this.value * (this.Slength / this.segments)), this.width, this.height)
        }
      }else{
        line(this.x,this.y,this.x + this.Slength,this.y)
        if(this.smooth){
          rect(this.x - this.width/2 + this.value, this.y - this.height/2, this.width, this.height)
        }else{
          rect(this.x - this.width/2 + (this.value * (this.Slength / this.segments)), this.y - this.height/2, this.width, this.height)
        }
      }
    }else if(this.type == "CIRCLE"){
      fill(this.hover?this.fill:this.stroke)
      stroke(this.hover?this.stroke:this.fill)
      strokeWeight(this.strokeWeight)
      if(this.vertical){
        line(this.x,this.y,this.x,this.y - this.Slength)
        if(this.smooth){
          circle(this.x, this.y - this.value, this.radius)
        }else{
          circle(this.x, this.y - (this.value * (this.Slength / this.segments)), this.radius)
        }
      }else{
        line(this.x,this.y,this.x + this.Slength,this.y)
        if(this.smooth){
          circle(this.x + this.value, this.y, this.radius)
        }else{
          circle(this.x + (this.value * (this.Slength / this.segments)), this.y, this.radius)
        }
      }
    }
  }
  onValueChange(deltaValue){
    
  }
  
}


class Dial extends Button{
  constructor(continuous,x,y){
    super("circle",x,y)
    this.value = 0
    this.prevValue = this.value
    
    this.continuous = continuous // whether the button's value can go beyond 0-360
    this.minAngle = 0 // the minimum and maximum angles of the button
    this.maxAngle = 360 // ignored if contintinuous mode is enabled
    this.segments = 0 // if 0 or less, will be smooth,
    this.originOffset = 90 // where the button starts
    
    this.timeSincevalueChange = 0
    
    this.cos = 0
    this.sin = -1
  }
  check(){
    angleMode(DEGREES)
    
    if(dist(this.x, this.y, mouseX, mouseY) <= this.radius){
        if(this.hover == false) { this.onHoverBegin(); this.timeSinceHoverChange = 0 }

          this.hover = true
          if(mouseIsPressed) {
            if(this.pressed == false) { this.onPressBegin(); this.timeSincePressedChange = 0 }
            this.pressed = true
            this.onPress()
          }
          
          this.onHover()
      }else{
        if(this.hover) this.onHoverEnd()
        this.hover = false
      }
    
    if(this.pressed){
      
      let angle = (atan2(mouseY - this.y, mouseX - this.x) + 180 + this.originOffset)%360
      
      
      let tempValue = this.segments<=0?angle:round(angle/this.segments)
      
      if(this.continuous){
        
        let prevAngle = this.segments<=0?(this.value%360):(((this.value%this.segments)/this.segments)*360)
        
        
        let Dangle = angle - prevAngle
        
        
        if(angle < 90 && prevAngle > 270){
          Dangle += 360
        }else if(angle > 270 && prevAngle < 90){
          Dangle -= 360
        }
        
        if(Dangle >= 180) Dangle -= 360 // very good
        
        
        if(this.segments <= 0){
          this.value += Dangle
        }else{
          this.value += round(Dangle/(360/this.segments))
        }
        
        
      }else{
        angle = min(max(angle, this.minAngle), this.maxAngle)
        
        if(this.segments <= 0){
          tempValue = angle
          this.value = tempValue
        }else{
          tempValue = round(((angle - this.minAngle)/(this.maxAngle-this.minAngle))*this.segments)
          this.value = tempValue
        }
      }
      
      if(!mouseIsPressed){
        this.pressed = false
        this.onPressEnd()
      }
      
    }
    
    if(this.prevValue != this.value){
      this.timeSinceValueChange = 0
      this.onValueChange(this.value - this.prevValue)
    }
    
    this.prevValue = this.value
    
    this.timeSinceHoverChange += round(deltaTime/1000,3)
    this.timeSincePressedChange += round(deltaTime/1000,3)
    this.timeSinceValueChange += round(deltaTime/1000,3)
    
    // horrible math slop oh ew
    this.cos = cos(this.segments<=0?(this.value + this.originOffset):-(this.minAngle + ((this.maxAngle-this.minAngle)/this.segments)*(this.value%(this.segments + 1))) + 180 + this.originOffset)
    if(this.continuous) this.cos = cos(this.segments<=0?(this.value + this.originOffset):-((360/this.segments)*(this.value%(this.segments))) + 180 + this.originOffset)
    this.sin = sin(this.segments<=0?(this.value + this.originOffset):-(this.minAngle + ((this.maxAngle-this.minAngle)/this.segments)*(this.value%(this.segments + 1))) + 180 - this.originOffset)
    if(this.continuous) this.sin = sin(this.segments<=0?(this.value + this.originOffset):-((360/this.segments)*(this.value%(this.segments))) + this.originOffset)
    
    angleMode(RADIANS)
  }
  render(){
    angleMode(DEGREES)
    
    fill(this.hover?this.stroke:this.fill)
    stroke(this.hover?this.fill:this.stroke)
    strokeWeight(this.strokeWeight)
    circle(this.x, this.y, this.radius*2)
    
    let C = this.cos
    let S = this.sin
    
    line(this.x + C*(this.radius/2), this.y + S*(this.radius/2),
        this.x + C*(this.radius), this.y + S*(this.radius))
    
    angleMode(RADIANS)
  }
  onValueChange(deltaValue){
    
  }
}

p5.prototype.Clerp = function(a, b, l){
  return lerp(a,b,min(1,max(0, l)))
}

p5.prototype.ClerpColor = function(col1, col2, l){
  return lerpColor(color(col1),color(col2),min(1,max(0, l)))
}

p5.prototype.registerMethod("post",p5.prototype.updateButtons)
