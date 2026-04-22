Events.on(Trigger.draw, () => {
try {
const player = Vars.player;
if (player == null) return;
const mx = player.mouseX();
const my = player.mouseY();

const build = Vars.world.build(mx, my);
if (!build) return;

const block = Blocks.copperWall;
if (block != build.block) return;

Drawf.dashSquare(Color.valueOf("ffffff"), mx, my, 24);
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});
