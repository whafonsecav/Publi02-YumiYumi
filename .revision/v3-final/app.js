(()=>{"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const slides=$$(".slide"),stage=$("#stage"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
let current=0,drawerMode="",motion,bookIndex=0,turning=false,map=null,mapReady=false,mapPromise=null,mapRun=0,marker=null;
const PIN=[-74.0537016,4.6686545];
const seconds=slides.map(s=>+s.dataset.seconds);
const guides=["El trabajo aplica la metodología de observación para reunir insumos de ideación. Visitamos el gastrobar Yumi Yumi, en Bogotá, el sábado 26 de septiembre de 2026. Primero presentamos el contexto; después desarrollamos Evaluar, Analizar, Registrar y Concluir.", "El acercamiento va del planeta a Colombia, Bogotá y la Zona T. Yumi Yumi está en la calle 84A número 12a-22. La imagen satelital queda girando suavemente mientras se muestran dirección y coordenadas.", "Aplicamos los cinco sentidos. Vista: luz tenue, verde y madera, barra iluminada. Oído: música agradable con un volumen que permitía conversar. Tacto: acolchados suaves, pero algunos asientos sin respaldo. Olfato: ambiente neutro, sin olor desagradable ni olor marcado a alcohol. Gusto: nosotros probamos sandía, suave y frutal, y fresa con vodka, con el alcohol más presente. Las preferencias variaron y a Juan no le gustó uno. Estas sensaciones son del equipo.", "Entramos a las 8:30 p. m. después de una fila corta y conseguimos una mesa para cuatro en el primer piso. Reconocimos mesas bajas, sofás y sillas con y sin respaldo. La preparación de bebidas estaba abajo; la cocina, más mesas y los baños estaban arriba. El baño tenía vestíbulo compartido, un espacio para hombres y dos para mujeres: pequeño y cómodo. Salimos a las 10 p. m. Esta secuencia describe la experiencia de llegada.", "Hay dos momentos distintos. El QR mostró una publicidad de 3×1, pero esa franja ya había terminado. Durante nuestra visita estaba disponible el 2×1, del mismo sabor por par según la carta. La oferta incluía varias bases de licor y sabores frutales, cremosos, ocho opciones sin licor y combos específicos de dos sándwiches o hamburguesas. Esto permite describir variedad, texturas y formatos de elección, sin asumir que todos los clientes quieren lo mismo.", "El PDF de clase presenta cuatro pasos: Evaluar define qué, quién, dónde y cuándo. Analizar selecciona lo importante, sobresaliente y necesario. Registrar levanta y organiza los datos. Concluir genera deducciones o contrasta hipótesis. El ejemplo de Henry y Karen muestra que hay que describir a los participantes y seguir su interacción con el entorno. Ahora aplicaremos cada fase a nuestra mesa.", "Evaluar. Qué: la interacción de cuatro adultos con bebidas alcohólicas. Dónde: una mesa del primer piso de Yumi Yumi, Bogotá. Cuándo: sábado 26 de septiembre, de 8:30 a 10 p. m. Quiénes: usaremos nombres ficticios. Carlos, aproximadamente 52, camiseta negra, hablaba y gesticulaba. Patricia, aproximadamente 48, gafas y reloj, al principio intervenía menos. Valentina, aproximadamente 28, chaqueta oscura y reloj, conversaba con Carlos. Andrés, aproximadamente 29, buzo tipo polo y pantalón beige, primero asentía y después participaba más. Las edades son estimaciones. No confirmamos parentescos ni ocupaciones.", "Analizar. De lo visible escogimos lo que respondía al objetivo. Lo importante fueron los pedidos y sus cambios, porque permiten seguir la interacción con las bebidas. Lo sobresaliente fueron los gestos, el pitillo usado para señalar y los cambios de participación. Lo necesario para dar contexto fue describir vestuario, accesorios y entorno. El equipo comentó una impresión de nivel socioeconómico medio-alto en los jóvenes por su apariencia. La conservamos como apreciación no verificada: la ropa no demuestra ingresos, marcas ni estrato. Tampoco convertimos la posible relación familiar en un hecho.", "Registrar. Al comienzo Carlos y Andrés tenían bebidas que parecían whisky; Patricia y Valentina, cócteles en 2×1. No confirmamos el nombre del primer cóctel. Luego llegaron pares de sandía y naranja. Más adelante llegaron otros cócteles en promociones. Registramos tres momentos, el cambio de bebidas y la repetición del formato. No medimos cuánto tomó cada persona ni confirmamos todos los ingredientes.", "Registrar también incluye acciones. Valentina y Carlos conversaban más al inicio; Andrés asentía y luego intervino más. En otro momento conversaban las mujeres y Andrés aportaba. Él usaba el pitillo para señalar y los hombres gesticulaban con las manos. Ambos fueron al baño. Del mayor registramos tres visitas; en la última su marcha parecía menos estable. La fotografía y los diagramas ayudan a seguir esas observaciones. No atribuimos una causa comprobada al cambio de marcha.", "Concluir. La secuencia permite reconocer tres patrones: elegir en pares, variar sabores y mantener la conversación durante el consumo. Deducimos que, en esta mesa, el 2×1 fue una pauta repetida de elección; la variedad de cócteles se reflejó en cambios de pedido; y el consumo estuvo acompañado por interacción social. No sabemos si la promoción motivó la visita ni si los cuatro eran familia. Conservamos los patrones como recursos para idear después. El alcance es una mesa y 90 minutos, no un perfil de toda la clientela.", "Gracias. El resultado es un registro organizado de lugar, oferta y personas. La observación queda disponible como insumo para una creación posterior."];
function resize(){stage.style.transform="scale("+Math.min(innerWidth/1600,innerHeight/900)+")";if(map)map.resize()}
addEventListener("resize",resize);resize();
function closeDrawer(){$("#drawer").hidden=true;drawerMode=""}
function animateSlide(s){
 if(motion)motion.kill();
 gsap.killTweensOf(s.querySelectorAll("*"));
 const nodes=s.querySelectorAll(".reveal");
 gsap.set(nodes,{clearProps:"opacity,visibility,transform"});
 motion=gsap.timeline();
 motion.fromTo(s,{opacity:0},{opacity:1,duration:reduce?.05:.5},0)
 .fromTo(nodes,{y:reduce?0:27,opacity:0},{y:0,opacity:1,duration:reduce?.01:.8,stagger:reduce?0:.075,ease:"power3.out",clearProps:"transform"},.12);
 if(s.classList.contains("drinks")){
 motion.fromTo(s.querySelectorAll(".round"),{y:35,opacity:0},{y:0,opacity:1,stagger:.65,duration:.9,ease:"power3.out"},.45);
 motion.fromTo(s.querySelectorAll(".drink i"),{scaleY:0},{scaleY:1,duration:1.4,stagger:.14,ease:"power2.inOut"},.9);
 }
 
 if(s.classList.contains("table-observation"))motion.fromTo(".table-focus,.person-tag",{opacity:0},{opacity:1,stagger:.2,duration:.7},.6);
 
 if(s.classList.contains("method"))motion.fromTo(".method-orb",{scale:.7},{scale:1,stagger:.22,duration:1,ease:"back.out(1.5)"},.4);
 if(!s.classList.contains("drinks")&&s.querySelector(".drink i"))motion.fromTo(s.querySelectorAll(".drink i"),{scaleY:0},{scaleY:1,duration:1.35,stagger:.13,ease:"power2.inOut"},.8);
 if(s.querySelector(".profile-bust"))motion.fromTo(s.querySelectorAll(".profile-bust>b"),{scaleY:0},{scaleY:1,duration:.9,stagger:.15,ease:"power3.out"},.4);
 if(s.querySelector(".bottle-shelf"))motion.fromTo(".bottle-shelf>i",{scaleY:0},{scaleY:1,duration:.8,stagger:.12,ease:"power3.out"},.45);
 if(s.querySelector(".evaluation-photo"))motion.fromTo(".evaluation-photo",{clipPath:"polygon(50% 0,50% 0,50% 12%,50% 88%,50% 100%,50% 100%,50% 88%,50% 12%)"},{clipPath:"polygon(8% 0,93% 0,100% 12%,100% 88%,92% 100%,7% 100%,0 88%,0 12%)",duration:1.2,ease:"power3.inOut"},.2);
 if(s.classList.contains("findings"))motion.fromTo(".finding-icon",{scale:.8,opacity:0},{scale:1,opacity:1,duration:1,stagger:.3,ease:"back.out(1.2)"},.5);
}
function go(n){
 n=Math.max(0,Math.min(slides.length-1,n));if(n===current&&slides[n].classList.contains("active"))return;
 const old=current;current=n;slides.forEach((s,i)=>s.classList.toggle("active",i===n));
 if(old===1){mapRun++;map?.stop()}
 $("#slide-count").textContent=String(n+1).padStart(2,"0")+" / "+slides.length;
 $("#footer-section").textContent=slides[n].dataset.title.toUpperCase();
 $("#deck-progress").style.width=((n+1)/slides.length*100)+"%";
 $("#prev").disabled=n===0;$("#next").disabled=n===slides.length-1;
 $("#book-tools").hidden=n!==4;$("#map-tools").hidden=n!==1;
 closeDrawer();$("#lightbox").hidden=true;animateSlide(slides[n]);
 if(n===0)$("#cover-video").play().catch(()=>{});else $("#cover-video").pause();
 if(n===1)initMap().then(()=>flyJourney()).catch(mapFallback);
 history.replaceState(null,"","#"+(n+1));
}
$("#next").onclick=()=>go(current+1);$("#prev").onclick=()=>go(current-1);
function forward(){go(current+1)}
function backward(){go(current-1)}
document.addEventListener("keydown",e=>{
 if(e.key==="Escape"){closeDrawer();$("#lightbox").hidden=true;return}
 if(!$("#lightbox").hidden)return;
 if(["ArrowRight","PageDown"," "].includes(e.key)){e.preventDefault();closeDrawer();forward()}
 if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();closeDrawer();backward()}
 if(e.key==="Home"){e.preventDefault();go(0)}
 if(e.key==="End"){e.preventDefault();go(11)}
 if(e.key.toLowerCase()==="f")toggleFullscreen();
});
$("#slides").onclick=e=>{if(e.target.closest("button,a,.source-image"))return;if(!$("#drawer").hidden){closeDrawer();return}forward()};
let tx=0;stage.addEventListener("touchstart",e=>{tx=e.changedTouches[0].clientX},{passive:true});
stage.addEventListener("touchend",e=>{let dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>60){if(dx<0)forward();else backward()}},{passive:true});
function showDrawer(mode){
 if(drawerMode===mode){closeDrawer();return}drawerMode=mode;$("#drawer").hidden=false;
 $("#drawer-title").textContent=mode==="index"?"Recorrido · 10 minutos":"Guion de esta lámina";
 if(mode==="index"){
 $("#drawer-content").innerHTML='<div class="index-list">'+slides.map((s,i)=>'<button class="'+(i===current?'selected':'')+'" data-go="'+i+'"><b>'+String(i+1).padStart(2,"0")+'</b><span>'+s.dataset.title+'</span></button>').join("")+'</div>';
 $$("#drawer-content [data-go]").forEach(b=>b.onclick=()=>go(+b.dataset.go));
 }else{
 let before=seconds.slice(0,current).reduce((a,b)=>a+b,0);
 $("#drawer-content").innerHTML='<div class="guide"><span class="guide-time">'+fmt(seconds[current])+' PARA ESTA LÁMINA · ACUMULADO '+fmt(before)+'–'+fmt(before+seconds[current])+'</span><p>'+guides[current]+'</p><div class="guide-actions"><span>Flechas: avanzar · F: pantalla completa</span><button id="reset-timer">Reiniciar 10:00</button></div></div>';
 $("#reset-timer").onclick=()=>{resetTimer();closeDrawer()};
 }
 gsap.fromTo("#drawer",{y:13,opacity:0},{y:0,opacity:1,duration:.22});
}
$("#index-btn").onclick=()=>showDrawer("index");$("#notes-btn").onclick=()=>showDrawer("notes");$("#drawer-close").onclick=closeDrawer;
async function toggleFullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{}}
$("#fullscreen-btn").onclick=toggleFullscreen;
let remaining=600,running=false,deadline=0;
function fmt(s){s=Math.max(0,Math.ceil(s));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
function paintTimer(){$("#timer-value").textContent=fmt(remaining);$("#timer-icon").textContent=running?"Ⅱ":"▷";stage.classList.toggle("time-yellow",remaining<=180&&remaining>60);stage.classList.toggle("time-red",remaining<=60);$("#timer").setAttribute("aria-label",(running?"Pausar":"Iniciar")+" cronómetro. Restan "+fmt(remaining))}
function tick(){if(running){remaining=Math.max(0,(deadline-performance.now())/1000);if(remaining<=0)running=false}paintTimer()}
function resetTimer(){running=false;remaining=600;paintTimer()}
$("#timer").onclick=()=>{if(remaining<=0)resetTimer();running=!running;if(running)deadline=performance.now()+remaining*1000;paintTimer()};
setInterval(tick,200);
let tilesPromise;
function loadTiles(){if(!tilesPromise)tilesPromise=new Promise((resolve,reject)=>{const script=document.createElement("script");script.src="assets/v2/map-tiles.js";script.onload=resolve;script.onerror=reject;document.head.append(script)});return tilesPromise}
async function initMap(){
 if(mapReady)return map;if(mapPromise)return mapPromise;
 mapPromise=(async()=>{
 await loadTiles();window.YUMI_MAP_TILE_PACK.registerMapLibre(maplibregl);window.YUMI_MAP_TILE_FALLBACK.install(maplibregl);
 map=new maplibregl.Map({container:"map",interactive:false,attributionControl:false,fadeDuration:0,pixelRatio:Math.min(1.5,devicePixelRatio||1),maxPitch:65,maxTileCacheSize:500,refreshExpiredTiles:false,center:[-74,14],zoom:1.95,bearing:0,pitch:0,
 style:{version:8,projection:{type:"globe"},sky:{"sky-color":"#040a08","horizon-color":"#456354","fog-color":"#071d15","sky-horizon-blend":.65,"horizon-fog-blend":.75,"fog-ground-blend":.65,"atmosphere-blend":["interpolate",["linear"],["zoom"],0,1,5,.9,8,0]},
 sources:{sat:{type:"raster",tiles:["offline://{z}/{y}/{x}"],tileSize:256,minzoom:0,maxzoom:18,attribution:"Esri World Imagery"}},layers:[{id:"bg",type:"background",paint:{"background-color":"#040a08"}},{id:"sat",type:"raster",source:"sat",paint:{"raster-contrast":.07,"raster-brightness-max":.94,"raster-fade-duration":120}}]}});
 await new Promise((resolve,reject)=>{map.once("load",resolve);map.on("error",e=>{console.warn("Mapa:",e.error?.message)});setTimeout(()=>{if(!map.loaded()&&!map.isStyleLoaded())reject(Error("Mapa sin inicializar"))},20000)});
 mapReady=true;map.resize();
 const coords=[];for(let i=0;i<=80;i++){let a=i/80*Math.PI*2;coords.push([PIN[0]+Math.cos(a)*.0006,PIN[1]+Math.sin(a)*.0006])}
 map.addSource("site",{type:"geojson",data:{type:"Feature",geometry:{type:"Polygon",coordinates:[coords]}}});
 map.addLayer({id:"site-fill",type:"fill",source:"site",paint:{"fill-color":"#d0ed9d","fill-opacity":0}});
 map.addLayer({id:"site-ring",type:"line",source:"site",paint:{"line-color":"#c6e58b","line-width":2,"line-opacity":0}});
 const el=document.createElement("div");el.className="yumi-pin";el.innerHTML="<span>Yumi Yumi</span><i></i>";el.style.visibility="hidden";
 marker=new maplibregl.Marker({element:el,anchor:"bottom"}).setLngLat(PIN).addTo(map);
 map.on("rotate",()=>{$("#compass-needle").style.transform="rotate("+(-map.getBearing())+"deg)"});
 return map;
 })();return mapPromise;
}
function mapStep(i,label){$("#map-phase").textContent=label;$$(".map-route b").forEach((x,n)=>x.classList.toggle("on",n<=i))}
async function flyJourney(){
 if(!mapReady||current!==1)return;const run=++mapRun;map.stop();map.resize();
 const valid=()=>current===1&&run===mapRun;
 gsap.set("#map-target",{opacity:0,y:20});marker.getElement().style.visibility="hidden";map.setPaintProperty("site-ring","line-opacity",0);map.setPaintProperty("site-fill","fill-opacity",0);
 map.jumpTo({center:[-74,12],zoom:1.95,pitch:0,bearing:0,padding:{left:320,right:0,top:0,bottom:0}});
 mapStep(0,"DEL PLANETA A BOGOTÁ");
 const labels=()=>{if(!valid())return;const z=map.getZoom();if(z<4)mapStep(0,"DEL PLANETA A COLOMBIA");else if(z<9)mapStep(1,"COLOMBIA");else if(z<15)mapStep(2,"BOGOTÁ");else mapStep(3,"ZONA T · CALLE 84A")};
 map.on("move",labels);
 map.flyTo({center:PIN,zoom:17.55,pitch:55,bearing:-38,duration:reduce?0:8500,curve:1.15,easing:t=>1-Math.pow(1-t,1.65),essential:true});
 await new Promise(r=>setTimeout(r,reduce?50:8600));map.off("move",labels);if(!valid())return;
 mapStep(3,"YUMI YUMI · LUGAR DE LA VISITA");
 marker.getElement().style.visibility="visible";map.setPaintProperty("site-ring","line-opacity",.85);map.setPaintProperty("site-fill","fill-opacity",.06);
 gsap.to("#map-target",{opacity:1,y:0,duration:.65,ease:"power3.out"});
 while(valid()&&!reduce){map.easeTo({bearing:map.getBearing()+32,duration:18000,easing:t=>t,essential:true});await new Promise(r=>setTimeout(r,18050))}
}
function mapFallback(error){console.warn(error);$("#map-phase").textContent="ZONA T · BOGOTÁ";$("#map-fallback").hidden=false;$("#map-fallback").style.zIndex=0;gsap.to("#map-target",{opacity:1,y:0,duration:.4})}
$("#map-replay").onclick=()=>{if(mapReady)flyJourney();else initMap().then(flyJourney).catch(mapFallback)};
setTimeout(()=>initMap().catch(()=>{}),150);
$("#prev").disabled=true;animateSlide(slides[0]);paintTimer();
const hash=+location.hash.slice(1);if(hash>1&&hash<=12)go(hash-1);
window.YUMI_DEBUG={go,resetTimer,setRemaining:s=>{running=false;remaining=s;paintTimer()},getState:()=>({current,bookIndex,turning,totalSeconds:seconds.reduce((a,b)=>a+b,0),remaining,running,mapReady,mapZoom:map?.getZoom(),mapCenter:map?.getCenter(),mapBearing:map?.getBearing()}),map:()=>map,flyJourney,showDrawer};
})();


