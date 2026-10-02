const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader']});
 const page=await browser.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1});
 const errors=[],failed=[],bad=[];
 page.on('pageerror',e=>errors.push(String(e)));
 page.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text())});
 page.on('requestfailed',r=>failed.push(r.url()+' :: '+(r.failure()?.errorText||'')));
 page.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url())});
 await page.goto('http://127.0.0.1:8765/',{waitUntil:'load',timeout:90000});
 await page.waitForFunction(()=>window.YUMI_DEBUG&&document.querySelectorAll('.slide').length===14,{timeout:30000});
 const slides=[];
 for(let i=7;i<=12;i++){
  await page.evaluate(i=>window.YUMI_DEBUG.go(i),i); await page.waitForTimeout(2500);
  const info=await page.evaluate(()=>{
   const s=document.querySelector('.slide.active'), rect=s.getBoundingClientRect();
   const vis=e=>{let c=getComputedStyle(e),r=e.getBoundingClientRect();return c.display!=='none'&&c.visibility!=='hidden'&&+c.opacity!==0&&r.width>0&&r.height>0};
   const clipped=[...s.querySelectorAll('*')].filter(vis).map(e=>{let c=getComputedStyle(e);if(c.overflowX!=='hidden'&&c.overflowX!=='clip'&&c.overflowY!=='hidden'&&c.overflowY!=='clip')return null;let dx=e.scrollWidth-e.clientWidth,dy=e.scrollHeight-e.clientHeight;return dx>8||dy>14?{tag:e.tagName,cls:typeof e.className==='string'?e.className:'',text:(e.innerText||'').trim().slice(0,80),scroll:[dx,dy]}:null}).filter(Boolean).slice(0,20);
   return {title:s.dataset.title||'',rect:[rect.left,rect.top,rect.right,rect.bottom],clipped,images:[...s.querySelectorAll('img')].filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.src)};
  });
  const idx=i+1; await page.screenshot({path:process.argv[2]+`\\slide-${String(idx).padStart(2,'0')}.png`}); slides.push({index:idx,...info}); console.log('CAPTURED '+idx+' '+info.title);
 }
 require('fs').writeFileSync(process.argv[2]+'\\qa.json',JSON.stringify({slides,errors,failed,bad},null,2));
 console.log('QA_SUMMARY '+JSON.stringify({errors,failed,bad,slides})); await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
