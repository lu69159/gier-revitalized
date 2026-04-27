Events.on(BlockDestroyEvent, e => {
try{ 
if (!Core.settings.getBool("wreckEnabled")) return;
  
const tile = e.tile;
const block = tile.block();
const build = tile.build;

if (!build || !build.x || !build.y || !build.team || !build.team.color) return;
  
const particle = new ParticleEffect();
Object.assign(particle, {
particles: 1,
cone: 0,
cap: false,
layer: 22,
length: 0,
lifetime: 600,
colorTo: Color.valueOf("00000000"),
colorFrom: Color.valueOf("9f9f9f"),
interp: Interp.sineIn,
clip: 1000
});

var rotation = 0;
if (block instanceof Turret){
rotation = build.rotation;
} else if (!block.rotate){
rotation = 0;
} else {
rotation = build.rotation * 90;
}

const baseLength = Mathf.random(-5,5);
const offset = Mathf.random(-15,15) + rotation;
  
particle.region = block.uiIcon;
particle.sizeFrom = particle.sizeTo = block.size * 3.95;
particle.lifetime = Mathf.random(300,3000);
particle.baseLength = baseLength;
particle.offset = offset;
particle.randLength = false;
  
const regionT = block.teamRegion;
if (regionT != Core.atlas.find("error")){
const teamEffect = new ParticleEffect();

for (let k in particle){
try{
let val = particle[k];

if(typeof val !== "function" && k != "class"){
teamEffect[k] = val;
}

}catch(e){
Vars.ui.showInfoToast(e + "[red] - WreckFX", 5);
}}

const base = build.team.color.cpy();
teamEffect.layer += 0.01;
teamEffect.region = regionT;
teamEffect.colorFrom = base.cpy().mul(0.6, 0.6, 0.6, 1);
teamEffect.baseLength = baseLength;
teamEffect.offset = offset;
teamEffect.colorTo = base.cpy().mul(0.6, 0.6, 0.6, 0);
teamEffect.at(build.x, build.y);
}
particle.at(build.x, build.y);
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - WreckFX",5); 
}});
