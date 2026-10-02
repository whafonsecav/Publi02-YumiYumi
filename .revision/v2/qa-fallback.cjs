const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1600,height:900}});await p.goto('http://127.0.0.1:8765/',{waitUntil:'load'});
 if(!await p.evaluate(()=>!!window.YUMI_MAP_TILE_PACK))await p.addScriptTag({url:'/assets/v2/map-tiles.js'});
 await p.addScriptTag({url:'/assets/v2/tile-fallback.js'});
 const result=await p.evaluate(async()=>{
  const lib=window.maplibregl, pack=window.YUMI_MAP_TILE_PACK;pack.registerMapLibre(lib);const installed=window.YUMI_MAP_TILE_FALLBACK.install(lib);
  const keys=Object.keys(pack.index).filter(k=>k.startsWith('18/')).map(k=>k.split('/').map(Number));const xs=keys.map(v=>v[2]),ys=keys.map(v=>v[1]);const x=Math.max(...xs)+1,y=Math.floor((Math.min(...ys)+Math.max(...ys))/2),key=`18/${y}/${x}`;
  const ctrl=new AbortController();const first=await window.YUMI_MAP_TILE_FALLBACK.handle({url:`offline://${key}`},ctrl);const second=await window.YUMI_MAP_TILE_FALLBACK.handle({url:`offline://${key}`},ctrl);
  const bitmap=await createImageBitmap(new Blob([first.data],{type:'image/jpeg'}));const result={installed,missingKey:key,sourceAncestor:'z17/'+Math.floor(y/2)+'/'+Math.floor(x/2),firstArrayBuffer:first.data instanceof ArrayBuffer,cacheArrayBuffer:second.data instanceof ArrayBuffer,bytes:first.data.byteLength,width:bitmap.width,height:bitmap.height};bitmap.close();return result;
 });console.log(JSON.stringify(result));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
