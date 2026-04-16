// Team changes, showing gier and other stuff
require("Startup");
require("Deranged");

//    ### Class Overrides ###
// Subclass: Block
require("PowerButton"); // Requires to atleast have powerProduction
require("DamageBattery"); // Requires to atleast be able to have consumeBuffered
require("BrittleDrill"); // Could actually be anything lol
require("LaunchSilo"); // Required to shootConne on 180 and needs to be a turret that can shoot
require("CompactCore"); // Adapted to CoreBlocl but could be used for anything. Spawner is a turret that kills itself
require("Fabricator");
require("DummyBlock");
require("TheStem");
require("CommandBlock"); // Command Block from minecraft or something
require("MeltingPort");
require("AttributeConstructor");
require("MechPad");
require("AssemblyRig");
require("AddBar");
require("InfoBlock");
require("ReflectWall");
//require("DroneBay");

// Subclass: Units
require("IFrameUnit");
require("EnrageUnit");
require("ZapUnit");

// Mods
require("Modifiers");
