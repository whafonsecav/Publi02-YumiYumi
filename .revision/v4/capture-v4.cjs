const { chromium } = require('playwright');
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
 for(let i=0;i<14;i++){
   await page.evaluate(i=>window.YUMI_DEBUG.go(i),i);
   await page.waitForTimeout(i===4?5000:(i===1?17000:2600));
   const info=await page.evaluate(()=>{
     const slide=document.querySelector('.slide.active');
     const root=document.querySelector('#stage')||document.body;
     const sr=slide.getBoundingClientRect(), rr=root.getBoundingClientRect();
     const title=slide?.dataset.title||'';
     const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&+s.opacity!==0&&r.width>0&&r.height>0};
     const overflow=[...slide.querySelectorAll('*')].filter(visible).map(el=>{
       const r=el.getBoundingClientRect(), s=getComputedStyle(el), o=[];
       if((s.overflowX==='hidden'||s.overflowX==='clip')&&el.scrollWidth>el.clientWidth+8)o.push('scrollX '+(el.scrollWidth-el.clientWidth));
       if((s.overflowY==='hidden'||s.overflowY==='clip')&&el.scrollHeight>el.clientHeight+14)o.push('scrollY '+(el.scrollHeight-el.clientHeight));
       if(r.left<rr.left-2||r.right>rr.right+2||r.top<rr.top-2||r.bottom>rr.bottom+2)o.push('bounds');
       return o.length?{tag:el.tagName,cls:typeof el.className==='string'?el.className:'',text:(el.innerText||'').trim().slice(0,65),rect:[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)],client:[el.clientWidth,el.clientHeight],scroll:[el.scrollWidth,el.scrollHeight],reason:o}:null;
     }).filter(Boolean).slice(0,25);
     const broken=[...slide.querySelectorAll('img')].filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.src);
     return {title,rect:[Math.round(sr.left),Math.round(sr.top),Math.round(sr.right),Math.round(sr.bottom)],overflow,broken};
   });
   await page.screenshot({path:process.argv[2]+`\\slide-${String(i+1).padStart(2,'0')}.png`});
   slides.push({index:i+1,...info});
   console.log(`CAPTURED ${i+1}/14 ${info.title}`);
 }
 const out={url:page.url(),slides,errors,failed,bad};
 require('fs').writeFileSync(process.argv[2]+'\\qa.json',JSON.stringify(out,null,2));
 console.log('QA_SUMMARY '+JSON.stringify({titles:slides.map(s=>s.title),errors,failed,bad,overflow:slides.map(s=>({i:s.index,title:s.title,overflow:s.overflow.length,details:s.overflow.slice(0,4)})),broken:slides.map(s=>({i:s.index,broken:s.broken}))}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
