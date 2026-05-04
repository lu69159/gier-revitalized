const statUnit = require("StatUnit");
const stat = require("stat");
const block = [
"gr-circuit-wire"
];

Events.on(ClientLoadEvent, () => {
try {
for (let i = 0; i < block.length; i++){
const block = Vars.content.block(block[i]);
const rate = block.attributes.get(Attribute.get("circuitRate"));
const circuitUnit = statUnit.circuitRate;

block.stats.remove(Stat.speed);
block.stats.add(Stat.speed, rate, circuitUnit);
}
  
} catch(e){
Vars.ui.showText("CircuitLogic", e);  
}});
