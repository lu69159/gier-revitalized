Events.on(TapEvent, event => {
try{
const tile = event.tile;
const player = event.player;
const block = tile.block();
const build = tile.build;
const silo = Vars.content.getByName(ContentType.block, "gr-launch-silo");
    
if (block == null || block != silo || build == null) return;
const peekAmmo = build.peekAmmo();
const ammo = build.totalAmmo;
if (peekAmmo == null || totalAmmo <= 0) return;
    
build.shoot(peekAmmo);
Sounds.click.at(build.x,build.y);

/*
Timer.schedule(() => {  
build.control(LAccess.shoot, build.x, build.y, 0, 0);
}, 0.0166665);
*/
    
} catch(e) {
Vars.ui.showInfoToast(e,4.5);
}
});
