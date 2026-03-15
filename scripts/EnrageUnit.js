
Events.on(UnitDamageEvent, e => {
try{
const unit = e.unit;
const targetAsh = Vars.content.getByName(ContentType.unit, "gr-ash");
const status = Vars.content.getByName(ContentType.status, "gr-rage");
const maxThres = (unit.maxHealth / 2);
const valid = unit.getDuration(status);
  
if (unit.health >= maxThres || valid != 0) return;
if (unit.type != targetAsh) return;
  
unit.apply(status);

} catch(e){
Vars.ui.showInfoToast(e,3);
}})
