Events.on(UnitDamageEvent, e => {
try{
const unit = e.unit;
const damage = e.bullet.damage;
const targetBarracade = Vars.content.getByName(ContentType.unit, "gr-barracade");
const targetAsh = Vars.content.getByName(ContentType.unit, "gr-ash");
const maxThres = (unit.maxHealth / 100) * 10;
const valid = unit.getDuration(StatusEffects.invincible);

if (damage < 10 || damage >= maxThres || valid != 0) return;
if (unit.type != targetBarracade && unit.type != targetAsh) return;
  
const dur = unit.type.crushDamage;

unit.apply(StatusEffects.invincible,dur);
unit.vel.set(0,0);
  
Fx.select.at(unit.x,unit.y);
Sounds.unitCreateBig.at(unit.x,unit.y);
} catch(e){
Vars.ui.showInfoToast(e,3);
}})
