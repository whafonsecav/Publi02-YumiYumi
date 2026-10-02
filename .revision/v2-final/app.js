(()=>{"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const slides=$$(".slide"),stage=$("#stage"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
let current=0,drawerMode="",motion,bookIndex=0,turning=false,map=null,mapReady=false,mapPromise=null,mapRun=0,marker=null;
const PIN=[-74.0537016,4.6686545];
const seconds=slides.map(s=>+s.dataset.seconds);
const guides=[
"Presentamos una observación de campo para Publicidad 2. Visitamos Yumi Yumi el sábado 26 de septiembre de 2026. La finalidad fue reunir material para una ideación posterior: conocer el entorno y seguir la interacción de una mesa con sus bebidas.",
"El recorrido ubica el lugar: Colombia, Bogotá, Zona T, calle 84A número 12a-22. La cámara pasa del planeta a la imagen satelital del sector y luego gira lentamente. La dirección y las coordenadas quedan visibles al llegar.",
"Lo percibimos agradable: luz tenue, verde y madera, una lámpara de cristales y botellas iluminadas. La música tenía presencia, pero permitía conversar. Los acolchados eran suaves; algunos asientos no tenían respaldo. El olor era neutro. Como equipo probamos sandía, suave y frutal, y fresa con vodka, con el alcohol más presente. Las preferencias fueron distintas; a Juan no le gustó uno. Estas sensaciones corresponden a nosotros, no a la mesa observada.",
"Llegamos a las 8:30 p. m. Había una fila corta y conseguimos una mesa para cuatro en el primer piso. De la entrada abierta se pasaba al interior tenue y a la barra del fondo, con un bartender y apoyo de barra. A la derecha estaban las escaleras. Arriba había mesas, cocina y baño: un vestíbulo compartido, un espacio para hombres y dos para mujeres. Era pequeño y cómodo. Vimos dos meseras sin uniforme y otros dos hombres cuyo cargo no confirmamos. Salimos a las 10 p. m.",
"Al escanear el QR apareció primero una pieza de 3×1. Esa franja ya había terminado cuando llegamos. Durante la visita estaba disponible el 2×1 de cócteles, con el mismo sabor por promoción según la carta. Es un mensaje visible antes de elegir. Esto registra cómo se presenta la oferta, sin afirmar que conocemos la razón por la que llegó cada cliente.",
"Pasar por las cuatro aperturas con los controles del pie o con la flecha derecha. Frutas y bases: una familia admite varios sabores, como las caipiroskas. Cremosos: la elección también distingue ingredientes y texturas. Sin licor: la carta ofrece ocho opciones; no toda la oferta requiere alcohol. Comida: hay combos de dos sándwiches y dos hamburguesas. La carta nos da un inventario de posibilidades para relacionar después con las elecciones observadas. Los precios son los de la carta recogida en la visita.",
"En clase se entrenó la observación con una pintura y con la escena de Henry y Karen en Goodfellas: mirar detalles y seleccionar un foco. Aplicamos cuatro fases. Evaluar delimita qué, quién, dónde y cuándo. Analizar selecciona lo relevante. Registrar organiza la secuencia y las fotografías. Concluir conserva los patrones respaldados por el registro. Este trabajo aporta información al proceso creativo; todavía no formula una campaña.",
"Escogimos una mesa de cuatro adultos. Para seguir sus acciones usamos A y B para el hombre y la mujer de mayor edad aparente; C y D para la mujer y el hombre más jóvenes. No confirmamos edades exactas ni parentescos. El interés fue observar los pedidos, los cambios de bebida y la interacción alrededor de ellos.",
"Al comenzar, los hombres tenían bebidas que parecían whisky y las mujeres cócteles en 2×1. El primer nombre no quedó confirmado. Después llegaron pares de sandía y naranja. Más adelante pidieron otros cócteles, otra vez en promociones. Lo visible fue una secuencia de elecciones distintas dentro del mismo formato 2×1. El esquema muestra los pedidos, no una medición de lo que bebió cada persona.",
"Al inicio destacaba la conversación entre C y A; D asentía y luego participó más. También hubo momentos de conversación entre las mujeres con aportes del joven. Los hombres movían las manos al hablar y D utilizaba el pitillo para señalar. Ambos hombres fueron al baño; contamos tres visitas del mayor y, en la última, una marcha menos estable. Describimos el cambio observado sin atribuirle una causa comprobada.",
"Conservamos tres patrones. Elegir en pares: el 2×1 se repitió. Variar el sabor: los cócteles cambiaron. Conversar y beber: los pedidos ocurrieron junto a gestos, turnos de conversación y pausas. Son insumos sobre formato de elección, variedad e interacción social. El alcance es una mesa durante 90 minutos; no un perfil de toda la clientela. Con esto queda una base concreta para idear después.",
"Gracias. Primero reunimos observaciones del entorno, la oferta y una mesa. La creación posterior podrá partir de este material."
];
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
 if(s.classList.contains("senses"))motion.fromTo(".sensory-photo>img",{scale:1.12},{scale:1.04,duration:12,ease:"none"},0);
 if(s.classList.contains("table-observation"))motion.fromTo(".table-focus,.person-tag",{opacity:0},{opacity:1,stagger:.2,duration:.7},.6);
 if(s.classList.contains("menu")){motion.fromTo(".book-wrap",{y:35,rotate:3,opacity:0},{y:0,rotate:0,opacity:1,duration:1.1,ease:"power3.out"},.2);animateBook()}
 if(s.classList.contains("method"))motion.fromTo(".method-orb",{scale:.7},{scale:1,stagger:.22,duration:1,ease:"back.out(1.5)"},.4);
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
 $("#book-tools").hidden=n!==5;$("#map-tools").hidden=n!==1;
 closeDrawer();$("#lightbox").hidden=true;animateSlide(slides[n]);
 if(n===0)$("#cover-video").play().catch(()=>{});else $("#cover-video").pause();
 if(n===1)initMap().then(()=>flyJourney()).catch(mapFallback);
 history.replaceState(null,"","#"+(n+1));
}
$("#next").onclick=()=>go(current+1);$("#prev").onclick=()=>go(current-1);
function forward(){if(current===5&&bookIndex<3){turnBook(1);return}go(current+1)}
function backward(){if(current===5&&bookIndex>0){turnBook(-1);return}go(current-1)}
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
function svg(id){return '<svg><use href="#i-'+id+'"/></svg>'}
const chapters=[
{title:"Frutas + bases",summary:"Una misma familia de cócteles ofrece variaciones de sabor.",image:"frutas",short:true,quote:"La variedad está dentro de cada familia.",right:'<h3 class="page-head">Una base.<br><em>Varios caminos.</em></h3><p class="page-copy">Las caipiroskas combinan vodka con distintas frutas.</p><div class="flavor-graphic"><div class="base-circle">VODKA</div><span class="flavor-bubble">Limón</span><span class="flavor-bubble">Maracuyá</span><span class="flavor-bubble">Lychee</span><span class="flavor-bubble">Lulo</span></div><div class="page-read">La carta permite elegir tanto<br><b>por licor como por sabor.</b></div>'},
{title:"Cremosos",summary:"La oferta también se distingue por ingredientes y texturas.",image:"cremosos",short:true,quote:"Frutas, lácteos y sabores dulces.",right:'<h3 class="page-head">También se elige<br><em>la textura.</em></h3><div class="cream-stack"><span><i></i><div>Strawberries & Cream<small>Fresa · coco · vainilla</small></div></span><span><i></i><div>Bubble Gum<small>Banano · cereza · leche</small></div></span><span><i></i><div>After Eight<small>Menta · chocolate · leche de coco</small></div></span></div><p class="page-copy">Tres ejemplos de una categoría<br>con perfiles diferentes.</p><div class="page-read">Un recurso de observación:<br><b>comparar ingredientes y sensaciones.</b></div>'},
{title:"Sin licor",summary:"La misma carta incluye alternativas para elegir sin alcohol.",image:"sin-licor",short:false,right:'<h3 class="page-head">La oferta incluye<br><em>otra elección.</em></h3><div class="zero-graphic"><b>8</b><span>cócteles<br>sin licor</span></div><div class="zero-fruits"><span>Lulo</span><span>Fresa</span><span>Mango</span><span>Piña</span><span>Maracuyá</span></div><p class="page-copy">Frutas que también aparecen<br>en las preparaciones con alcohol.</p><div class="page-read">La oferta permite compartir mesa<br><b>con elecciones distintas.</b></div>'},
{title:"Comida para compartir",summary:"Cócteles y comida forman parte de la oferta del gastrobar.",image:"comida",short:false,right:'<h3 class="page-head">La fórmula de dos<br><em>también se come.</em></h3><div class="food-pairs"><div>'+svg("burger")+svg("burger")+'<p>2 sándwiches<b>$61.900</b></p></div><div>'+svg("burger")+svg("burger")+'<p>2 hamburguesas<b>$63.900</b></p></div></div><p class="page-copy">Son combos específicos publicados en la carta.</p><div class="page-read">El formato en pares aparece<br><b>en bebidas y en comida.</b></div>'}
];
function leftHTML(c){return '<div class="page-kicker"><span>YUMI YUMI / CARTA ORIGINAL</span><span>↗ AMPLIAR</span></div><img class="source-image '+(c.short?'short-crop':'')+'" src="assets/v2/carta/'+c.image+'.webp" alt="Fragmento original de la carta: '+c.title+'">'+(c.quote?'<p class="original-note">'+c.quote+'</p>':'')+'<div class="page-left-caption">Selección del PDF recogido en la visita.</div>'}
function rightHTML(c){return '<div class="page-kicker"><span>LECTURA DE LA OFERTA</span><span>0'+(chapters.indexOf(c)+1)+'</span></div>'+c.right}
function bookLabels(){let c=chapters[bookIndex];$("#chapter-number").textContent=String(bookIndex+1).padStart(2,"0")+" / 04";$("#chapter-title").textContent=c.title;$("#chapter-summary").textContent=c.summary;$("#book-count").textContent="Carta "+(bookIndex+1)+" / 4";$$("#book-dots i").forEach((el,i)=>el.classList.toggle("on",i===bookIndex));$("#book-prev").disabled=bookIndex===0;$("#book-next").disabled=bookIndex===3}
function bindZoom(){$("#page-left .source-image").onclick=e=>{e.stopPropagation();$("#lightbox-content").innerHTML='<img src="'+e.target.getAttribute("src")+'" alt="'+e.target.alt+'">';$("#lightbox").hidden=false}}
function renderBook(){$("#page-left").innerHTML=leftHTML(chapters[bookIndex]);$("#page-right").innerHTML=rightHTML(chapters[bookIndex]);bookLabels();bindZoom()}
function animateBook(){gsap.fromTo($$("#page-right .page-head,#page-right .page-copy,#page-right .flavor-bubble,#page-right .cream-stack span,#page-right .zero-graphic,#page-right .zero-fruits span,#page-right .food-pairs>div,#page-right .page-read"),{y:17,opacity:0},{y:0,opacity:1,stagger:.1,duration:.65,ease:"power3.out",delay:.22})}
function turnBook(dir){
 if(turning)return;let target=bookIndex+dir;if(target<0||target>3)return;turning=true;
 const c=chapters[target],page=$("#turning-page");
 if(reduce){bookIndex=target;renderBook();turning=false;return}
 page.style.display="block";
 if(dir>0){
 $(".sheet-front").innerHTML=rightHTML(chapters[bookIndex]);$(".sheet-back").innerHTML=leftHTML(c);$("#page-right").innerHTML=rightHTML(c);
 gsap.set(page,{rotationY:0});gsap.to(page,{rotationY:-180,duration:1.12,ease:"power2.inOut",onComplete:finish});
 }else{
 $(".sheet-front").innerHTML=rightHTML(c);$(".sheet-back").innerHTML=leftHTML(chapters[bookIndex]);$("#page-left").innerHTML=leftHTML(c);
 gsap.set(page,{rotationY:-180});gsap.to(page,{rotationY:0,duration:1.12,ease:"power2.inOut",onComplete:finish});
 }
 function finish(){bookIndex=target;renderBook();page.style.display="none";turning=false;animateBook()}
}
$("#book-prev").onclick=()=>turnBook(-1);$("#book-next").onclick=()=>turnBook(1);
$("#page-right").onclick=e=>{e.stopPropagation();if(bookIndex<3)turnBook(1);else go(current+1)};
$("#lightbox-close").onclick=()=>$("#lightbox").hidden=true;$("#lightbox").onclick=e=>{if(e.target===$("#lightbox"))$("#lightbox").hidden=true};
renderBook();

let tilesPromise;
function loadTiles(){if(!tilesPromise)tilesPromise=new Promise((resolve,reject)=>{const script=document.createElement("script");script.src="assets/v2/map-tiles.js";script.onload=resolve;script.onerror=reject;document.head.append(script)});return tilesPromise}
async function initMap(){
 if(mapReady)return map;if(mapPromise)return mapPromise;
 mapPromise=(async()=>{
 await loadTiles();window.YUMI_MAP_TILE_PACK.registerMapLibre(maplibregl);window.YUMI_MAP_TILE_FALLBACK.install(maplibregl);
 map=new maplibregl.Map({container:"map",interactive:false,attributionControl:false,fadeDuration:0,pixelRatio:Math.min(1.5,devicePixelRatio||1),maxPitch:65,maxTileCacheSize:500,refreshExpiredTiles:false,center:[-74,14],zoom:1.7,bearing:0,pitch:0,
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
 map.jumpTo({center:[-74,14],zoom:1.7,pitch:0,bearing:0,padding:{left:320,right:0,top:0,bottom:0}});
 mapStep(0,"UNA CIUDAD EN EL MUNDO");
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const travel=async(opts,ms)=>{if(!valid())return;map.easeTo({...opts,duration:reduce?0:ms,easing:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,essential:true});await wait(reduce?50:ms+100)};
 await wait(reduce?50:2500);if(!valid())return;
 mapStep(1,"COLOMBIA");await travel({center:[-74.2,4.4],zoom:4,pitch:0,bearing:0},3500);if(!valid())return;
 mapStep(2,"BOGOTÁ");await travel({center:[-74.07,4.67],zoom:11,pitch:20,bearing:-8},4500);if(!valid())return;
 mapStep(3,"ZONA T · CALLE 84A");await travel({center:PIN,zoom:16.9,pitch:48,bearing:-28},4500);if(!valid())return;
 await travel({center:PIN,zoom:17.55,pitch:55,bearing:-38},2200);if(!valid())return;
 mapStep(3,"YUMI YUMI · LUGAR DE LA VISITA");
 marker.getElement().style.visibility="visible";map.setPaintProperty("site-ring","line-opacity",.85);map.setPaintProperty("site-fill","fill-opacity",.06);
 gsap.to("#map-target",{opacity:1,y:0,duration:.9,ease:"power3.out"});
 while(valid()&&!reduce){map.easeTo({bearing:map.getBearing()+32,duration:18000,easing:t=>t,essential:true});await wait(18050)}
}
function mapFallback(error){console.warn(error);$("#map-phase").textContent="ZONA T · BOGOTÁ";$("#map-fallback").hidden=false;$("#map-fallback").style.zIndex=0;gsap.to("#map-target",{opacity:1,y:0,duration:.4})}
$("#map-replay").onclick=()=>{if(mapReady)flyJourney();else initMap().then(flyJourney).catch(mapFallback)};
setTimeout(()=>loadTiles().catch(()=>{}),1300);
$("#prev").disabled=true;animateSlide(slides[0]);paintTimer();
const hash=+location.hash.slice(1);if(hash>1&&hash<=12)go(hash-1);
window.YUMI_DEBUG={go,turnBook,resetTimer,setRemaining:s=>{running=false;remaining=s;paintTimer()},getState:()=>({current,bookIndex,turning,totalSeconds:seconds.reduce((a,b)=>a+b,0),remaining,running,mapReady,mapZoom:map?.getZoom(),mapCenter:map?.getCenter(),mapBearing:map?.getBearing()}),map:()=>map,flyJourney,showDrawer};
})();


