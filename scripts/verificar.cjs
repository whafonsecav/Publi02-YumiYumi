const fs=require("fs"),path=require("path");
const {chromium}=require("C:/Users/willi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
(async()=>{
 const out=path.resolve("presentacion/.revision");fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1600,height:900}});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("http://127.0.0.1:8765/",{waitUntil:"networkidle"});
 await page.evaluate(()=>document.fonts.ready);
 await page.addStyleTag({content:".slide,.content,.photo-copy,.cover-copy,.location-copy,.promo-copy,.book-heading{animation:none!important;transition:none!important}"});
 const results=[];
 for(let i=0;i<24;i++){
  await page.evaluate(i=>YUMI_DEBUG.go(i),i);
  if(i===1)await page.waitForTimeout(14000);else await page.waitForTimeout(200);
  const check=await page.evaluate(()=>{
   const s=document.querySelector(".slide.active"), r=s.getBoundingClientRect();
   const overflow=[];
   s.querySelectorAll("h1,h2,h3,p,article").forEach(el=>{const b=el.getBoundingClientRect();if(b.bottom>r.bottom-4||b.right>r.right+2||b.left<r.left-2)overflow.push({tag:el.tagName,text:el.textContent.slice(0,65),x:b.x,y:b.y,bottom:b.bottom});});
   return {title:s.dataset.title,overflow,images:Array.from(s.querySelectorAll("img")).filter(im=>im.src&&(!im.complete||!im.naturalWidth)).map(im=>im.src)};
  });
  results.push({slide:i+1,...check});
  await page.screenshot({path:path.join(out,"slide-"+String(i+1).padStart(2,"0")+".png")});
 }
 await page.evaluate(()=>YUMI_DEBUG.go(0));
 await page.click("#timer");await page.waitForTimeout(1100);
 const timerStarted=await page.locator("#timer-value").textContent();
 await page.click("#timer");const paused=await page.locator("#timer-value").textContent();await page.waitForTimeout(1100);
 const pauseWorks=paused===await page.locator("#timer-value").textContent();
 await page.evaluate(()=>YUMI_DEBUG.setRemaining(180));const yellow=await page.locator("#stage").getAttribute("class");
 await page.screenshot({path:path.join(out,"timer-yellow.png")});
 await page.evaluate(()=>YUMI_DEBUG.setRemaining(60));const red=await page.locator("#stage").getAttribute("class");
 await page.screenshot({path:path.join(out,"timer-red.png")});
 await page.evaluate(()=>YUMI_DEBUG.resetTimer());
 await page.keyboard.press("ArrowRight");const arrowWorks=await page.evaluate(()=>YUMI_DEBUG.getState().current===1);
 await page.evaluate(()=>YUMI_DEBUG.go(8));const first=await page.locator("#book-left").getAttribute("src");

 await page.evaluate(()=>YUMI_DEBUG.turnBook(2));await page.waitForTimeout(650);
 const bookWorks=first!==await page.locator("#book-left").getAttribute("src");
 await page.locator("#book-left").click();const zoomWorks=await page.locator("#lightbox").isVisible();await page.click("#close-overlay");
 await page.evaluate(()=>YUMI_DEBUG.go(14));await page.click("#sources-btn");
 await page.locator("[data-play]").first().click();await page.waitForTimeout(1200);
 const audio=await page.evaluate(()=>{const a=document.getElementById("field-audio");return{readyState:a.readyState,currentTime:a.currentTime,error:a.error?.message||null}});
 await page.screenshot({path:path.join(out,"drawer-sources.png")});
 await page.click("#close-overlay");await page.click("#notes-btn");await page.screenshot({path:path.join(out,"drawer-notes.png")});
 await page.click("#close-overlay");await page.click("#index-btn");await page.screenshot({path:path.join(out,"drawer-index.png")});
 const summary={errors,results,timerStarted,pauseWorks,yellow,red,arrowWorks,bookWorks,zoomWorks,audio,totalSeconds:await page.evaluate(()=>YUMI_DEBUG.getState().totalSeconds),map:await page.locator("#map-status").textContent()};
 fs.writeFileSync(path.join(out,"resultados.json"),JSON.stringify(summary,null,2));
 console.log(JSON.stringify(summary));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});

