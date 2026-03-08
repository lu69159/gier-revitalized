Events.on(UnitDamageEvent, e => {
try{
const unit = e.unit;
const damage = e.bullet.damage;
const target = Vars.content.getByName(ContentType.unit, "gr-barracade");
const maxThres = (unit.maxHealth / 10) * 2.5;
const valid = unit.getDuration(StatusEffects.invincible);

if (damage <= 15 || damage >= maxThres || unit.type != target || valid != 0) return;
unit.apply(StatusEffects.invincible,7.5);
Fx.select.at(unit.x,unit.y);
Sounds.unitCreateBig.at(unit.x,unit.y);

} catch(e){
Vars.ui.showInfoToast(e,3);
}})
