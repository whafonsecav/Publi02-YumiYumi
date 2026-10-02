const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{
 const b=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1});
 const errors={console:[],page:[],failed:[],bad:[]};p.on('console',m=>{if(m.type()==='error')errors.console.push(m.text())});p.on('pageerror',e=>errors.page.push(String(e)));p.on('requestfailed',r=>errors.failed.push({url:r.url(),error:r.failure()?.errorText}));p.on('response',r=>{if(r.status()>=400)errors.bad.push({status:r.status(),url:r.url()})});
 const response=await p.goto('http://127.0.0.1:8765/?v=3',{waitUntil:'load',timeout:120000});await p.waitForTimeout(1000);
 const count=await p.locator('.slide').count();const initial=await p.evaluate(()=>({title:document.title,debug:typeof YUMI_DEBUG?.go,totalSlides:document.querySelectorAll('.slide').length,timer:document.querySelector('#timer-value')?.textContent,seconds:document.querySelector('#timer')?.getAttribute('title')}));
 const dir=path.resolve('presentacion/.revision/v3');fs.mkdirSync(dir,{recursive:true});const shots=[];const overflows=[];
 for(let i=0;i<count;i++){
  if(i===1)continue;
  await p.evaluate(i=>YUMI_DEBUG.go(i),i);await p.waitForTimeout(i===7?5000:3000);
  const state=await p.evaluate(()=>{
    const s=document.querySelector('.slide.active');if(!s)return {missing:true};const r=s.getBoundingClientRect();
    const textOverflow=[];for(const e of s.querySelectorAll('h1,h2,h3,h4,p,li,blockquote,small,.eyebrow,.caption,.label')){const cs=getComputedStyle(e),q=e.getBoundingClientRect();if(cs.display==='none'||cs.visibility==='hidden'||q.width<1||q.height<1)continue;if(e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+3)textOverflow.push({tag:e.tagName,cls:typeof e.className==='string'?e.className:'svg',text:(e.innerText||'').trim().slice(0,100),client:[e.clientWidth,e.clientHeight],scroll:[e.scrollWidth,e.scrollHeight]});}
    const images=[...s.querySelectorAll('img')].map(x=>({src:x.getAttribute('src'),ok:x.complete&&x.naturalWidth>0,width:x.naturalWidth}));
    return {title:s.dataset.title,rect:[Math.round(r.width),Math.round(r.height)],scroll:[s.scrollWidth,s.scrollHeight],textOverflow,brokenImages:images.filter(x=>!x.ok),imageCount:images.length};
  });
  if(state.missing||state.scroll[0]>1602||state.scroll[1]>902||state.textOverflow.length||state.brokenImages.length)overflows.push({slide:i+1,...state});
  shots.push({slide:i+1,...state});await p.screenshot({path:path.join(dir,`slide-${String(i+1).padStart(2,'0')}.png`),animations:'disabled'});
 }
 const timer=await p.evaluate(async()=>{let now=performance.now();try{Object.defineProperty(performance,'now',{configurable:true,value:()=>now});window.__qaAdvance=ms=>{now+=ms};}catch(e){return {initial:document.querySelector('#timer-value')?.textContent,clockError:String(e)}}const start=document.querySelector('#timer-value')?.textContent;document.querySelector('#timer').click();await new Promise(r=>setTimeout(r,250));const atStart=document.querySelector('#timer-value')?.textContent;window.__qaAdvance(600000);await new Promise(r=>setTimeout(r,250));return {initial:start,afterStart:atStart,after600Seconds:document.querySelector('#timer-value')?.textContent,red:document.querySelector('#stage')?.classList.contains('time-red')};});
 const result={url:'http://127.0.0.1:8765/?v=3',httpStatus:response.status(),initial,slides:shots,overflowIssues:overflows,timer,errors};fs.writeFileSync(path.join(dir,'qa-results.json'),JSON.stringify(result,null,2),'utf8');console.log(JSON.stringify({httpStatus:result.httpStatus,initial,slides:shots.map(x=>({slide:x.slide,title:x.title,scroll:x.scroll,textOverflow:x.textOverflow.length,brokenImages:x.brokenImages.length})),overflowIssues:overflows,timer,errors},null,2));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
