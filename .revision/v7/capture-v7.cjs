const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader']});
 const page=await browser.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1}); const errors=[],failed=[],bad=[];
 page.on('pageerror',e=>errors.push(String(e))); page.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text())}); page.on('requestfailed',r=>failed.push(r.url()+' :: '+(r.failure()?.errorText||''))); page.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url())});
 await page.goto('http://127.0.0.1:8765/',{waitUntil:'load',timeout:90000}); await page.waitForFunction(()=>window.YUMI_DEBUG&&document.querySelectorAll('.slide').length===15,{timeout:30000});
 const slides=[];
 for(let i=6;i<=13;i++){
  await page.evaluate(i=>window.YUMI_DEBUG.go(i),i); await page.waitForTimeout(2700);
  const info=await page.evaluate(()=>{const s=document.querySelector('.slide.active'), sr=s.getBoundingClientRect(), stage=(document.querySelector('#stage')||document.body).getBoundingClientRect(); const vis=e=>{let c=getComputedStyle(e),r=e.getBoundingClientRect();return c.display!=='none'&&c.visibility!=='hidden'&&+c.opacity!==0&&r.width>0&&r.height>0};
   const overflow=[...s.querySelectorAll('*')].filter(vis).map(e=>{let c=getComputedStyle(e),dx=e.scrollWidth-e.clientWidth,dy=e.scrollHeight-e.clientHeight, r=e.getBoundingClientRect(),why=[];if((c.overflowX==='hidden'||c.overflowX==='clip')&&dx>8)why.push('scrollX '+dx);if((c.overflowY==='hidden'||c.overflowY==='clip')&&dy>14)why.push('scrollY '+dy);if(r.left<stage.left-2||r.right>stage.right+2||r.top<stage.top-2||r.bottom>stage.bottom+2)why.push('bounds');return why.length?{tag:e.tagName,cls:typeof e.className==='string'?e.className:'',text:(e.innerText||'').trim().slice(0,75),rect:[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)],why}:null}).filter(Boolean).slice(0,25);
   return {title:s.dataset.title||'',overflow,broken:[...s.querySelectorAll('img')].filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.src)};});
  const n=i+1; await page.screenshot({path:process.argv[2]+`\\slide-${String(n).padStart(2,'0')}.png`}); slides.push({index:n,...info}); console.log('CAPTURED '+n+' '+info.title);
 }
 require('fs').writeFileSync(process.argv[2]+'\\qa.json',JSON.stringify({slides,errors,failed,bad},null,2)); console.log('QA_SUMMARY '+JSON.stringify({errors,failed,bad,slides})); await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
