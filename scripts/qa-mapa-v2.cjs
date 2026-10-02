const {chromium}=require("C:/Users/willi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const fs=require("fs");
(async()=>{
const out="presentacion/.revision/v2";fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:["--enable-webgl","--use-angle=swiftshader"]});
const page=await browser.newPage({viewport:{width:1600,height:900},ignoreHTTPSErrors:true});
const errors=[];page.on("pageerror",e=>errors.push(e.message));
page.on("console",m=>{if(m.type()==="warning"&&m.text().startsWith("Mapa:"))console.log(m.text())});
await page.goto("http://127.0.0.1:8765",{waitUntil:"load"});
await page.waitForTimeout(2500);await page.screenshot({path:out+"/cover.png"});
await page.evaluate(()=>YUMI_DEBUG.go(1));
await page.waitForFunction(()=>YUMI_DEBUG.getState().mapReady,{timeout:30000});
await page.waitForTimeout(1500);await page.screenshot({path:out+"/map-world.png"});
console.log("EARTH",await page.evaluate(()=>YUMI_DEBUG.getState()));
await page.waitForTimeout(7500);await page.screenshot({path:out+"/map-flight.png"});
await page.waitForTimeout(13000);await page.screenshot({path:out+"/map-arrival.png"});
console.log("FINAL",await page.evaluate(()=>YUMI_DEBUG.getState()),"ERRORS",errors);
await page.evaluate(()=>YUMI_DEBUG.go(3));await page.waitForTimeout(2000);await page.screenshot({path:out+"/space.png"});
await page.evaluate(()=>YUMI_DEBUG.go(7));await page.waitForTimeout(2000);await page.screenshot({path:out+"/table.png"});
await page.evaluate(()=>YUMI_DEBUG.go(9));await page.waitForTimeout(2000);await page.screenshot({path:out+"/interaction.png"});
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

