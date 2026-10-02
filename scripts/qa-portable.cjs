const {chromium}=require("C:/Users/willi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const fs=require("fs"),path=require("path"),{pathToFileURL}=require("url");
(async()=>{const out="presentacion/.revision/v2";const browser=await chromium.launch({headless:true,args:["--enable-webgl","--use-angle=swiftshader"]});
const page=await browser.newPage({viewport:{width:1600,height:900}});let errors=[],failed=[];page.on("pageerror",e=>errors.push(e.message));page.on("requestfailed",r=>failed.push(r.url()));
await page.goto(pathToFileURL(path.resolve("presentacion/index.html")).href,{waitUntil:"load"});
await page.evaluate(()=>YUMI_DEBUG.go(1));await page.waitForFunction(()=>YUMI_DEBUG.getState().mapReady,{timeout:40000});
await page.waitForTimeout(1000);await page.screenshot({path:out+"/world-final.png"});
console.log("FILEMAP",await page.evaluate(()=>YUMI_DEBUG.getState()));
await page.evaluate(()=>YUMI_DEBUG.go(5));await page.waitForTimeout(2100);await page.screenshot({path:out+"/book-first.png"});
await page.click("#book-next");await page.waitForTimeout(450);await page.screenshot({path:out+"/book-turn.png"});
await page.waitForTimeout(1500);await page.screenshot({path:out+"/book-second.png"});
console.log("FILE",JSON.stringify({errors,failed,state:await page.evaluate(()=>YUMI_DEBUG.getState())}));await browser.close()})().catch(e=>{console.error(e);process.exit(1)});

