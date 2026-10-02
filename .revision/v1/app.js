(function(){
"use strict";
const $=id=>document.getElementById(id), stage=$("stage"), slides=Array.from(document.querySelectorAll(".slide"));
let current=0, drawerMode="", bookIndex=0, flipBusy=false, activeClip=null, priorFocus=null;
let motion=!window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let timerRemaining=600000,timerRunning=false,timerDeadline=0;
let viewer=null,mapPromise=null,orbit=false,heading=0,lastOrbit=0;
const times=slides.map(s=>+s.dataset.seconds), cumulative=[0];times.forEach(t=>cumulative.push(cumulative[cumulative.length-1]+t));
const fmt=t=>String(Math.floor(t/60)).padStart(2,"0")+":"+String(Math.floor(t%60)).padStart(2,"0");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function resize(){const scale=Math.min(innerWidth/1600,innerHeight/900);stage.style.left=(innerWidth-1600)/2+"px";stage.style.top=(innerHeight-900)/2+"px";stage.style.transform="scale("+scale+")";}
function updateTimer(){
 const remaining=timerRunning?Math.max(0,timerDeadline-Date.now()):timerRemaining;
 $("timer-value").textContent=fmt(Math.ceil(remaining/1000));
 stage.classList.toggle("timer-yellow",remaining<=180000&&remaining>60000);
 stage.classList.toggle("timer-red",remaining<=60000);
 stage.classList.toggle("timer-finished",remaining===0);
 if(timerRunning&&remaining===0){timerRunning=false;timerRemaining=0;}
 $("timer").classList.toggle("running",timerRunning);$("timer").classList.toggle("paused",!timerRunning&&remaining>0&&remaining<600000);
 $("timer").title=timerRunning?"Pausar el cronómetro":remaining===600000?"Iniciar el cronómetro de 10 minutos":remaining===0?"Tiempo finalizado. Reiniciar desde Opciones":"Continuar el cronómetro";
 $("timer").setAttribute("aria-label",$("timer").title+", "+$("timer-value").textContent);
}
function toggleTimer(){if(timerRunning){timerRemaining=Math.max(0,timerDeadline-Date.now());timerRunning=false;}else if(timerRemaining>0){timerDeadline=Date.now()+timerRemaining;timerRunning=true;}updateTimer();}
function resetTimer(){timerRunning=false;timerRemaining=600000;updateTimer();}
function stopAudio(){}
function context(){
 const c=$("context-controls");c.innerHTML="";
 const type=slides[current].dataset.context;
 function btn(label,fn){const b=document.createElement("button");b.textContent=label;b.addEventListener("click",fn);c.appendChild(b);return b;}
 if(type==="map"){btn("Repetir recorrido",()=>startMap(true));btn(orbit?"Pausar giro":"Girar",()=>{orbit=!orbit;context();});const a=document.createElement("a");a.href="https://maps.app.goo.gl/mW4h4z5dguT1ePkf6";a.target="_blank";a.rel="noopener";a.textContent="Google Maps ↗";c.appendChild(a);}
 if(type==="book"){
  btn("Carta ‹",()=>turnBook(-2)).disabled=bookIndex===0;
  const t=document.createElement("span");t.id="book-count";t.style.fontSize="12px";t.textContent=(bookIndex+1)+"–"+Math.min(bookIndex+2,CARTA_FOLIOS.length)+" / "+CARTA_FOLIOS.length;c.appendChild(t);
  btn("›",()=>turnBook(2)).disabled=bookIndex+2>=CARTA_FOLIOS.length;
  btn("Cócteles",()=>setBook(4));btn("Sin licor",()=>setBook(10));
  btn("Ampliar",()=>zoom($("book-right").src,"Fragmento "+(bookIndex+2)+" de la carta original",true));
  const a=document.createElement("a");a.href="assets/fuentes/carta-original.pdf";a.target="_blank";a.textContent="PDF ↗";c.appendChild(a);
 }
 if(type==="photo")btn("Ampliar foto",()=>zoom(slides[current].dataset.photo,"Fotografía del equipo · 26 septiembre 2026"));
 if(type==="promo")btn("Ampliar pieza",()=>zoom("assets/promo-3x1.webp","Promoción original suministrada por el equipo"));

 if(type==="gallery")btn("Ver fotografías",()=>zoom("assets/fotos/foto-6c13f9b.webp","Fotografía 01 del equipo"));
}
function go(index){
 if(index<0||index>=slides.length)return;
 closeZoom();stopAudio();
 slides[current].classList.remove("active");slides[current].setAttribute("aria-hidden","true");
 current=index;slides[current].classList.add("active");slides[current].setAttribute("aria-hidden","false");
 $("slide-count").textContent=String(current+1).padStart(2,"0")+" / "+slides.length;
 $("prev").disabled=current===0;$("next").disabled=current===slides.length-1;
 $("progress").style.width=((current+1)/slides.length*100)+"%";
 history.replaceState(null,"","#"+String(current+1).padStart(2,"0"));
 const v=document.querySelector(".cover-video");if(current===0&&motion)v.play().catch(()=>{});else v.pause();
 if(viewer)viewer.useDefaultRenderLoop=current===1&&motion;
 if(current===1&&motion)startMap(false);
 if(current===8)renderBook();
 context();if(drawerMode)renderDrawer();
}
function closeDrawer(){
 stopAudio();$("drawer").hidden=true;drawerMode="";
 ["index","notes","options"].forEach(n=>$(n+"-btn").setAttribute("aria-expanded","false"));
 if($("lightbox").hidden)$("close-overlay").hidden=true;
}
function openDrawer(mode){if(drawerMode===mode&&!$("drawer").hidden){closeDrawer();return;}closeZoom();stopAudio();drawerMode=mode;$("drawer").hidden=false;
 ["index","notes","options"].forEach(n=>$(n+"-btn").setAttribute("aria-expanded",String(n===mode)));
 $("close-overlay").hidden=false;renderDrawer();
}
function renderDrawer(){
 const d=$("drawer-content");
 if(drawerMode==="index"){
  d.innerHTML='<h3>Recorrido de 10 minutos</h3><div class="index-grid">'+slides.map((s,i)=>'<button data-slide="'+i+'" class="'+(i===current?"current":"")+'"><span>'+String(i+1).padStart(2,"0")+'</span>'+esc(s.dataset.title)+'</button>').join("")+'</div><p class="small">El guion distribuye 600 segundos entre las 24 láminas. La navegación permanece manual.</p>';
  d.querySelectorAll("[data-slide]").forEach(b=>b.onclick=()=>{const x=+b.dataset.slide;closeDrawer();go(x);});
 }
 if(drawerMode==="notes"){
  d.innerHTML='<h3>'+esc(slides[current].dataset.title)+'</h3><div class="note-meta"><span>Lámina '+(current+1)+' / '+slides.length+'</span><span>'+times[current]+' segundos sugeridos</span><span>Tramo '+fmt(cumulative[current])+'–'+fmt(cumulative[current+1])+'</span></div><p>'+esc(SLIDE_NOTES[current])+'</p><p class="small">Guion orientativo para sustentar. Los audios y las ampliaciones son material de consulta y no requieren reproducirse completos durante los diez minutos.</p>';
 }
 if(drawerMode==="options"){
  d.innerHTML='<h3>Opciones de presentación</h3><div class="options-row"><button id="reset-timer">Reiniciar cronómetro</button><button id="fullscreen">'+(document.fullscreenElement?"Salir de pantalla completa":"Pantalla completa")+'</button><button id="motion">'+(motion?"Pausar animaciones":"Activar animaciones")+'</button><button id="google-embed">Mapa de Google</button></div><p class="keyboard-help">← → / avanzar y regresar &nbsp; · &nbsp; Espacio / avanzar &nbsp; · &nbsp; T / iniciar o pausar el tiempo &nbsp; · &nbsp; Esc / cerrar panel</p><p class="small">El video, las fotos y el libro funcionan desde la carpeta local. El recorrido del globo y Google Maps requieren conexión. Si el globo no carga, se conserva una imagen satelital guardada.</p>';
  $("reset-timer").onclick=resetTimer;
  $("fullscreen").onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else stage.requestFullscreen().catch(()=>{});};
  $("motion").onclick=()=>{motion=!motion;stage.classList.toggle("no-motion",!motion);if(!motion){document.querySelector(".cover-video").pause();if(viewer)viewer.useDefaultRenderLoop=false;}else{if(current===0)document.querySelector(".cover-video").play().catch(()=>{});if(current===1){if(viewer)viewer.useDefaultRenderLoop=true;startMap(false);}}renderDrawer();};
  $("google-embed").onclick=()=>{d.innerHTML='<h3>Yumi Yumi · mapa suministrado</h3><iframe title="Ubicación en Google Maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8186.195215922021!2d-74.05405601481!3d4.669584175520206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9af528eef491%3A0xe556aad8433d64e1!2sYumi%20Yumi!5e0!3m2!1ses!2sco!4v1790914959085!5m2!1ses!2sco" width="100%" height="430" style="border:0" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';};
 }
}
function zoom(src,caption,tall){
 closeDrawer();priorFocus=document.activeElement;$("lightbox-image").src=src;$("lightbox-image").classList.toggle("tall",!!tall);$("lightbox-caption").textContent=caption||"Fotografía suministrada por el equipo";
 $("lightbox").hidden=false;$("lightbox-scroll").scrollTop=0;$("close-overlay").hidden=false;$("close-overlay").focus();
}
function closeZoom(){if(!$("lightbox").hidden){$("lightbox").hidden=true;$("lightbox-image").removeAttribute("src");if(priorFocus&&priorFocus.isConnected)priorFocus.focus();}if(!drawerMode)$("close-overlay").hidden=true;}
const readings=[
 {title:"Comida en pares",text:"Combos de 2 sándwiches por $61.900 y 2 hamburguesas por $63.900."},
 {title:"El pedido se puede ampliar",text:"Papas, ensalada de repollo y adiciones acompañan los platos de la carta."},
 {title:"Mezclas frutales",text:"Tequila, caipiroskas y vodka aparecen con frutas distintas. Se pueden comparar recetas y sabores."},
 {title:"La base también cambia",text:"Mojitos con ron y una sección de whisky y ginebra. La carta organiza parte de la elección por tipo de licor."},
 {title:"Cremosos y otras mezclas",text:"Martinis, cócteles cremosos e iced teas. Bubble Gum incluye vodka, Baileys, triple sec y banano."},
 {title:"Opciones sin licor",text:"Ocho cócteles sin licor, además de cerveza, agua y gaseosa. La oferta incluye elecciones con y sin alcohol."}
];
function renderBook(){
 if(!CARTA_FOLIOS.length)return;
 $("book-left").src=CARTA_FOLIOS[bookIndex].path;$("book-right").src=CARTA_FOLIOS[Math.min(bookIndex+1,CARTA_FOLIOS.length-1)].path;
 const reading=readings[Math.floor(bookIndex/2)];$("menu-reading").classList.remove("pop");$("menu-reading").innerHTML="<span>LECTURA DE LA CARTA / "+String(Math.floor(bookIndex/2)+1).padStart(2,"0")+"</span><h3>"+reading.title+"</h3><p>"+reading.text+"</p>";void $("menu-reading").offsetWidth;$("menu-reading").classList.add("pop");
 $("book-caption").textContent="Fragmentos "+(bookIndex+1)+"–"+Math.min(bookIndex+2,CARTA_FOLIOS.length)+" de "+CARTA_FOLIOS.length+" · PDF original de 2 páginas";context();
 [bookIndex+2,bookIndex+3].forEach(i=>{if(CARTA_FOLIOS[i]){const im=new Image();im.src=CARTA_FOLIOS[i].path;}});
}
function setBook(index){if(index===bookIndex)return;turnBook(index-bookIndex);}
function turnBook(delta){const next=bookIndex+delta;if(flipBusy||next<0||next>=CARTA_FOLIOS.length)return;flipBusy=true;$("book").classList.add("flipping");setTimeout(()=>{bookIndex=next;renderBook();},250);setTimeout(()=>{$("book").classList.remove("flipping");flipBusy=false;},570);}
function loadMapLibrary(){
 if(window.Cesium)return Promise.resolve();
 if(mapPromise)return mapPromise;
 mapPromise=new Promise((resolve,reject)=>{
  window.CESIUM_BASE_URL="https://cesium.com/downloads/cesiumjs/releases/1.134/Build/Cesium/";
  const css=document.createElement("link");css.rel="stylesheet";css.href=CESIUM_BASE_URL+"Widgets/widgets.css";document.head.append(css);
  const script=document.createElement("script");script.src=CESIUM_BASE_URL+"Cesium.js";script.onload=resolve;script.onerror=reject;document.head.append(script);
 });return mapPromise;
}
async function startMap(replay){
 try{
  $("map-status").textContent="Recorrido del globo hasta Bogotá · vista satelital orbital";
  await loadMapLibrary();
  if(!viewer){
   viewer=new Cesium.Viewer("globe",{animation:false,timeline:false,baseLayerPicker:false,geocoder:false,homeButton:false,sceneModePicker:false,navigationHelpButton:false,fullscreenButton:false,infoBox:false,selectionIndicator:false,baseLayer:new Cesium.ImageryLayer(new Cesium.UrlTemplateImageryProvider({url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",maximumLevel:19,credit:"Esri, Maxar, Earthstar Geographics and GIS User Community"}))});
   viewer.resolutionScale=.85;viewer.scene.globe.enableLighting=false;
   viewer.scene.screenSpaceCameraController.enableInputs=false;
   const target=Cesium.Cartesian3.fromDegrees(-74.0537016,4.6686545);
   viewer.entities.add({position:target,point:{pixelSize:11,color:Cesium.Color.fromCssColorString("#e6b1a3"),outlineColor:Cesium.Color.WHITE,outlineWidth:2,disableDepthTestDistance:Number.POSITIVE_INFINITY},label:{text:"YUMI YUMI",font:"16px sans-serif",fillColor:Cesium.Color.WHITE,showBackground:true,backgroundColor:Cesium.Color.fromCssColorString("#122e28"),pixelOffset:new Cesium.Cartesian2(0,-25),disableDepthTestDistance:Number.POSITIVE_INFINITY}});
   viewer.scene.preRender.addEventListener(()=>{
    const now=performance.now();if(orbit&&current===1&&motion){const delta=Math.min(.05,(now-lastOrbit)/1000);heading+=delta*.028;viewer.camera.lookAt(target,new Cesium.HeadingPitchRange(heading,-Math.PI/3.5,560));$("compass-needle").style.transform="rotate("+(-heading*180/Math.PI)+"deg)";}lastOrbit=now;
   });
   $("globe").classList.add("ready");slides[1].classList.add("has-globe");replay=true;
  }
  viewer.useDefaultRenderLoop=current===1&&motion;
  if(replay){
   orbit=false;viewer.camera.cancelFlight();viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
   viewer.camera.setView({destination:Cesium.Cartesian3.fromDegrees(-74,25,24000000),orientation:{heading:0,pitch:-Math.PI/2,roll:0}});
   heading=.28;
   viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(-74.0537016,4.6686545),1),{duration:10,offset:new Cesium.HeadingPitchRange(heading,-Math.PI/3.5,560),complete:()=>{orbit=true;context();}});
  }
  $("map-status").textContent="Punto: 4.6686545° N, 74.0537016° O · vista orbital de mapa, sin grabación de dron";
 }catch(e){window.MAP_ERROR=String(e);console.warn("map",String(e));$("map-status").textContent="Vista satelital guardada · el recorrido del globo requiere conexión";$("globe").classList.remove("ready");slides[1].classList.remove("has-globe");}
}
window.addEventListener("resize",resize);
document.addEventListener("fullscreenchange",()=>{resize();if(drawerMode==="options")renderDrawer();});
$("prev").onclick=()=>go(current-1);$("next").onclick=()=>go(current+1);$("timer").onclick=toggleTimer;
["index","notes","options"].forEach(n=>$(n+"-btn").onclick=()=>openDrawer(n));
$("close-overlay").onclick=()=>{closeZoom();closeDrawer();};
document.querySelectorAll("img[data-zoom]").forEach(im=>{im.tabIndex=0;im.setAttribute("role","button");im.setAttribute("aria-label","Ampliar "+im.alt);const open=()=>zoom(im.src,im.alt,current===8);im.onclick=open;im.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();open();}};});
stage.addEventListener("click",e=>{if(!e.target.closest("button,a,img[data-zoom],audio,iframe,#drawer,#lightbox,#globe")&&!drawerMode){const bounds=stage.getBoundingClientRect();go(current+(e.clientX-bounds.left<bounds.width*.18?-1:1));}});
document.addEventListener("keydown",e=>{
 if(e.target.closest("audio,input,textarea,select"))return;
 if(e.key==="Escape"){closeZoom();closeDrawer();return;}
 if(!$("lightbox").hidden)return;
 if(e.key.toLowerCase()==="t"){e.preventDefault();toggleTimer();return;}
 if(e.key==="ArrowRight"||e.key==="PageDown"||(e.code==="Space"&&!e.target.closest("button"))){e.preventDefault();go(current+1);}
 if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();go(current-1);}
 if(e.key==="Home"){e.preventDefault();go(0);}if(e.key==="End"){e.preventDefault();go(slides.length-1);}
});
stage.classList.toggle("no-motion",!motion);resize();updateTimer();setInterval(updateTimer,250);
slides.forEach(s=>s.setAttribute("aria-hidden","true"));const initial=Math.max(0,Math.min(slides.length-1,(parseInt(location.hash.slice(1),10)||1)-1));go(initial);
window.YUMI_DEBUG={go,resetTimer,setRemaining:s=>{timerRunning=false;timerRemaining=s*1000;updateTimer();},getState:()=>({current,timerRunning,timerRemaining,bookIndex,totalSeconds:cumulative[cumulative.length-1]}),toggleTimer,turnBook,openDrawer};
})();
