Events.on(ContentInitEvent,() => {
try {
const block = Vars.content.block("gr-profusive-distributor");
const itemSeq = [];
const liquidSeq = [];

Vars.content.items().each(t => {
itemSeq.push(new ItemStack(t,1);
});

Vars.content.liquids().each(t => {
liquidSeq.push(new ItemStack(t,1);
});

block.consumers[0] = new ConsumeItems(itemSeq);
block.consumers[1] = new ConsumeLiquids(liquidSeq);

block.outputItems = itemSeq;
block.outputLiquids = liquidSeq;
  
// load stats
Vars.ui.content.show(block);
Vars.ui.content.hide();

block.stats.remove(Stat.output);
block.stats.remove(Stat.input);
  
} catch(e) {
Vars.ui.showText("idk", e);
}});
