const statUnit = require("StatUnits");
const stat = require("Stats");
// Blocks specifically Wires
const blocks = ["gr-circuit-wire", "gr-circuit-splitter", "gr-power-cell", "gr-circuit-timer", "gr-signal", "gr-signal-detector"];
// Blocks with special functions
const other = ["gr-power-cell", "gr-circuit-splitter", "gr-circuit-timer", "gr-signal-detector"];


// Applie block Stats here
Events.on(ClientLoadEvent, () => {
try {
for (let i = 0; i < blocks.length; i++){
const block = Vars.content.block(blocks[i]);
Vars.ui.content.show(block);
Vars.ui.content.hide();
  
const rate = block.attributes.get(Attribute.get("circuitRate"));
const heatDamage = block.attributes.get(Attribute.get("circuitHeatDamage"));
const circuitRange = block.attributes.get(Attribute.get("circuitRange"));
const circuitUnit = statUnit.circuitUnit;
const circuitRangeUnit = statUnit.circuitRange;

block.databaseTag = "circuit-logic"
block.stats.remove(stat.CircuitRate);
if (rate) block.stats.add(stat.CircuitRate, rate, circuitUnit);
if (heatDamage) block.stats.add(stat.CircuitHeatDamage, heatDamage);
if (circuitRange) block.stats.add(stat.CircuitRange, circuitRange, circuitRangeUnit);
}
  
} catch(e){
Vars.ui.showText("CircuitLogic", e);  
}});


// Main logic
Events.on(TapEvent, event => {
try{
const tile = event.tile;
if(tile == null) return;
        
const targetBlock = Vars.content.block("gr-signal")
const wireBlock = Vars.content.block("gr-circuit-wire");
let heating = [];
let distance = 0;
if(!tile.build || tile.block() != targetBlock) return;
const range = tile.block().attributes.get(Attribute.get("circuitRange"));
      
function nearby(build){
try {
if (!build.build || build.block().rotate == false || build.block.size > 1 || Vars.state.isPaused() || !Vars.state.isPlaying()) return;
const frontBuild = build.nearbyBuild(build.build.rotation); 

let found = false;
let index = -1;
if (!frontBuild || !build) return;

for (let i = 0; i < other.length; i++){
if (frontBuild.block.name == other[i]){
found = true;
index = i;
}
}
          
if (frontBuild.block != wireBlock && !found) return;
distance++;
const {block} = frontBuild;
let baseTimer = 1;
const circuitRate = block.attributes.get(Attribute.get("circuitRate"));
const circuitHeatingDamage = block.attributes.get(Attribute.get("circuitHeatDamage"));
        
for (let i = 0; i < heating.length; i++){
if (heating[i] == frontBuild) {
frontBuild.damage(circuitHeatingDamage);
heating.splice(i, 1);
Fx.turbinegenerate.at(frontBuild.x, frontBuild.y);
return;
}
}
        
heating.push(frontBuild);
if (distance > range) return;
Fx.absorb.at(frontBuild.x, frontBuild.y, block.size);
Sounds.shootSegment.at(frontBuild.x, frontBuild.y);
          
if (found){
// PowerCell Function
if (index == 0){
if (frontBuild.power.graph.getBatteryStored() < 45) return;
frontBuild.power.graph.transferPower(-45);
Fx.generate.at(build.x,build.y);
frontBuild.block.configureSound.at(build.x,build.y);

Sounds.shootPulsar.at(frontBuild.x, frontBuild.y);
Lightning.create(frontBuild.team, frontBuild.team.color, 35, frontBuild.x, frontBuild.y, Mathf.random(360), 25);
          
return;
} else if (index == 2){
const number = Number(frontBuild.message.toString());

if (number){
baseTimer = Mathf.clamp(number, 1/circuitRate, 15) * circuitRate;
}} else if (index == 3){
const msg = frontBuild.message;
msg.setLength(0);
msg.append(String(distance));
}

}

          
Time.run((baseTimer/circuitRate) * 60, () => {
try {
if (!frontBuild || !frontBuild.isValid() || Vars.state.isPaused() || !Vars.state.isPlaying()) return;
if (!frontBuild.tile || !heating) return;

nearby(frontBuild.tile);

if (index == 1){
const left = frontBuild.left();
const right = frontBuild.right();
          
if (left && left.isValid()) nearby(left.tile);
if (right && right.isValid()) nearby(right.tile);
} 
          
} catch(e){
Vars.ui.showInfoToast(e + "[red] - inner2", 5); 
}});
            
} catch(e){
Vars.ui.showInfoToast(e + "[red] - Inner", 5);   
}}

Fx.generate.at(tile.worldx(), tile.worldy());
tile.block().configureSound.at(tile.worldx(), tile.worldy());
nearby(tile);

}catch(e){
Vars.ui.showInfoToast(String(e) + "[red] - Outer", 5);
}});
