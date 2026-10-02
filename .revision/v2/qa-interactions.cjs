const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1600,height:900}});const errors={console:[],page:[],failed:[],bad:[]};
 p.on('console',m=>{if(m.type()==='error')errors.console.push(m.text())});p.on('pageerror',e=>errors.page.push(String(e)));p.on('requestfailed',r=>errors.failed.push({url:r.url(),error:r.failure()?.errorText}));p.on('response',r=>{if(r.status()>=400)errors.bad.push({status:r.status(),url:r.url()})});
 const resp=await p.goto('http://127.0.0.1:8765/',{waitUntil:'load',timeout:120000});await p.waitForTimeout(1000);
 const count=await p.locator('.slide').count();
 await p.evaluate(()=>YUMI_DEBUG.go(5));await p.waitForTimeout(500);
 const book=[];book.push(await p.locator('#book-count').innerText());
 for(let i=0;i<3;i++){await p.locator('#book-next').click();await p.waitForTimeout(1250);book.push(await p.locator('#book-count').innerText());}
 const finalDisabled=await p.locator('#book-next').isDisabled();
 await p.locator('#book-prev').click();await p.waitForTimeout(1250);const afterBack=await p.locator('#book-count').innerText();
 await p.locator('#page-left .source-image').click();await p.waitForTimeout(150);const photo={visible:await p.locator('#lightbox').isVisible(),img:await p.locator('#lightbox-content img').evaluate(el=>({src:el.getAttribute('src'),width:el.naturalWidth,complete:el.complete}))};
 await p.locator('#lightbox-close').click();const photoClosed=await p.locator('#lightbox').isHidden();
 await p.evaluate(()=>YUMI_DEBUG.go(10));await p.waitForTimeout(1200);await p.keyboard.press('ArrowRight');await p.waitForTimeout(300);const right=await p.locator('.slide.active').getAttribute('data-title');await p.keyboard.press('ArrowLeft');await p.waitForTimeout(300);const left=await p.locator('.slide.active').getAttribute('data-title');
 const clock=await p.evaluate(()=>{let t=performance.now();try{Object.defineProperty(performance,'now',{configurable:true,value:()=>t});window.__qaAddTime=ms=>{t+=ms};return {ok:true,start:t}}catch(e){return {ok:false,error:String(e)}}});
 await p.locator('#timer').click();await p.waitForTimeout(250);const startTimer=await p.locator('#timer-value').innerText();
 if(clock.ok){await p.evaluate(()=>window.__qaAddTime(420000));await p.waitForTimeout(250);}
 const at180=await p.evaluate(()=>({value:document.querySelector('#timer-value').innerText,yellow:document.querySelector('#stage').classList.contains('time-yellow'),red:document.querySelector('#stage').classList.contains('time-red')}));
 if(clock.ok){await p.evaluate(()=>window.__qaAddTime(120000));await p.waitForTimeout(250);}
 const at60=await p.evaluate(()=>({value:document.querySelector('#timer-value').innerText,yellow:document.querySelector('#stage').classList.contains('time-yellow'),red:document.querySelector('#stage').classList.contains('time-red')}));
 const result={http:resp.status(),slideCount:count,book:{steps:book,finalNextDisabled:finalDisabled,afterBack},photo:{...photo,closed:photoClosed},arrows:{afterRight:right,afterLeft:left},timer:{clock,startTimer,at180,at60},errors};console.log(JSON.stringify(result,null,2));await b.close();
})().catch(e=>{console.error(e);process.exitCode=1});
