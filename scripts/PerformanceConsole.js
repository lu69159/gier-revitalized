Events.on(TapEvent, e => {
    try{
        const tile = e.tile;
        const player = e.player;
        if (!tile || !player) return;

        const block = tile.block();
        const console = Vars.content.block("gr-preformance-console");

        const buildTeam = tile.team();
        const playerTeam = player.team();
        const selectBlock = player.selectedBlock;

        if (block != console || selectBlock != null || buildTeam != playerTeam) return;

        Vars.ui.showMenu("@performance-console.title", "", 
        [
            ["@performance-console.showStat"],
            ["@performance-console.dedrone"]
        ], p => {
            try{  
                if (p == 0){
                    const stat = Vars.state.stats;
                    const points = (stat.enemyUnitsDestroyed + stat.buildingsBuilt) * ((stat.wavesLasted * 0.45) + 1);

                    Vars.ui.showText("@performance-console.option1.title",
                        Core.bundle.get("performance-console.option1.enemyKill") + stat.enemyUnitsDestroyed + "\n" +
                        Core.bundle.get("performance-console.option1.buildingsBuilt") + stat.buildingsBuilt + "\n\n" +
                        Core.bundle.get("performance-console.option1.points") + points
                    );

                } else if (p == 1){

                    const facility = Vars.content.block("gr-drone-facility");
                    const dropzone = Vars.content.block("gr-facility-dropzone");

                    Vars.ui.hudfrag.showToast(
                        new TextureRegionDrawable(Core.atlas.find("gr-dedrone")),
                        "[tan]Dedrone[red] Enabled"
                    );

                    if(facility) Vars.state.rules.bannedBlocks.add(facility);
                    if(dropzone) Vars.state.rules.bannedBlocks.add(dropzone);
                }

            } catch(err){
                Vars.ui.showInfoToast(err + " - PerformanceConsole - [red]Inner",5); 
            }
        });

    } catch(err){
        Vars.ui.showInfoToast(err + " - PerformanceConsole",5); 
    }
});

/*
@preformance-console.option1.buildingsBuilt
@preformance-console.option1.enemyKill
@preformance-console.title
@preformance-console.showStat
@preformance-console.option1.title
*/
