const { chromium } = require('playwright');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader']});
 const page=await browser.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1});
 const errs={console:[],page:[],failed:[],bad:[]};
 page.on('console',m=>{if(m.type()==='error')errs.console.push(m.text())});
 page.on('pageerror',e=>errs.page.push(String(e)));
 page.on('requestfailed',r=>errs.failed.push({url:r.url(),error:r.failure()?.errorText}));
 page.on('response',r=>{if(r.status()>=400)errs.bad.push({status:r.status(),url:r.url()})});
 const resp=await page.goto('http://127.0.0.1:8765/',{waitUntil:'load',timeout:120000});
 await page.waitForTimeout(1500);
 const count=await page.locator('.slide').count();
 const debug=await page.evaluate(()=>({title:document.title,debug:typeof window.YUMI_DEBUG,go:typeof window.YUMI_DEBUG?.go,slides:document.querySelectorAll('.slide').length}));
 const dir=path.resolve('.revision/v2'); require('fs').mkdirSync(dir,{recursive:true});
 const slides=[], overflow=[];
 for(let i=0;i<count;i++){
   if(i===1) continue; // user is auditing the map slide
   await page.evaluate(i=>window.YUMI_DEBUG.go(i),i);
   await page.waitForTimeout(i===7?4000:2500);
   const state=await page.evaluate(()=>{
     const s=document.querySelector('.slide.active'); if(!s)return {missing:true};
     const rect=s.getBoundingClientRect();
     const selectors=['h1','h2','h3','p','li','.eyebrow','.label','.caption']; const bad=[];
     for(const e of s.querySelectorAll(selectors.join(','))){const cs=getComputedStyle(e),r=e.getBoundingClientRect(); if(cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>0&&r.height>0&&(e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+3)) bad.push({tag:e.tagName,cls:e.className?.baseVal||e.className,text:(e.innerText||'').slice(0,90),client:[e.clientWidth,e.clientHeight],scroll:[e.scrollWidth,e.scrollHeight]});}
     const imgs=[...s.querySelectorAll('img')].map(x=>({src:x.getAttribute('src'),ok:x.complete&&x.naturalWidth>0,w:x.naturalWidth}));
     return {title:s.dataset.title,rect:[rect.width,rect.height],scroll:[s.scrollWidth,s.scrollHeight],badText:bad,imgs};
   });
   if(state.scroll[0]>1601||state.scroll[1]>901||state.badText.length)overflow.push({slide:i+1,...state});
   slides.push({slide:i+1,...state});
   await page.screenshot({path:path.join(dir,`slide-${String(i+1).padStart(2,'0')}.png`),animations:'disabled'});
 }
 console.log(JSON.stringify({httpStatus:resp.status(),debug,slides,overflow,errors:errs},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

