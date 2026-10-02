(()=>{"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const slides=$$(".slide"),stage=$("#stage"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
let current=0,drawerMode="",motion,bookIndex=0,turning=false,map=null,mapReady=false,mapPromise=null,mapRun=0,marker=null;
const PIN=[-74.0537016,4.6686545];
const seconds=slides.map(s=>+s.dataset.seconds);
const guides=["El trabajo aplica la metodología de observación para reunir insumos de ideación. Visitamos el gastrobar Yumi Yumi, en Bogotá, el sábado 26 de septiembre de 2026. Primero presentamos el contexto; después desarrollamos Evaluar, Analizar, Registrar y Concluir.", "El acercamiento va del planeta a Colombia, Bogotá y la Zona T. Yumi Yumi está en la calle 84A número 12a-22. La imagen satelital queda girando suavemente mientras se muestran dirección y coordenadas.", "Llegamos a las 8:30 p. m. Encontramos una fila corta y una mesa disponible para cuatro en el primer piso. Nos sentamos, abrimos el QR y encontramos la publicidad del 3×1, cuyo horario ya había terminado. Pedimos cócteles y dos combos de sándwich con la oferta disponible. Reconocimos el entorno y enfocamos la observación en una mesa de cuatro adultos. Estuvimos hasta las 10 p. m.", "La vista reúne seis elementos: verde y madera con luz tenue; entrada abierta que parecía zona de fumadores; mesas bajas, sofás y asientos sin respaldo; barra con botellas, lámpara de cristales y hojas; dos pisos conectados por escaleras a la derecha; y baño pequeño, cómodo, con vestíbulo compartido, espejos, un espacio de hombres y dos de mujeres. La música tenía presencia, pero permitía escucharnos. Las otras mesas no interrumpían y percibimos respeto. Los acolchados eran suaves y los objetos se percibían cuidados; algunos asientos no permitían recostar la espalda. El olor era neutro y el ambiente no se sentía encerrado ni caluroso. Sandía resultó suave y frutal; fresa con vodka tenía el alcohol más presente. Las preferencias variaron: a Juan no le gustó uno de los cócteles. Son percepciones del equipo.", "Hay dos momentos distintos. El QR mostró una publicidad de 3×1, pero esa franja ya había terminado. Durante nuestra visita estaba disponible el 2×1, del mismo sabor por par según la carta. La oferta incluía varias bases de licor y sabores frutales, cremosos, ocho opciones sin licor y combos específicos de dos sándwiches o hamburguesas. Esto permite describir variedad, texturas y formatos de elección, sin asumir que todos los clientes quieren lo mismo. La estrella identifica nuestro pedido: sandía, fresa con vodka y dos combos de sándwich. No es el pedido de la mesa observada.", "El PDF de clase presenta cuatro pasos: Evaluar define qué, quién, dónde y cuándo. Analizar selecciona lo importante, sobresaliente y necesario. Registrar levanta y organiza los datos. Concluir genera deducciones o contrasta hipótesis. El ejemplo de Henry y Karen muestra que hay que describir a los participantes y seguir su interacción con el entorno. Ahora aplicaremos cada fase a nuestra mesa.", "Evaluar. Qué: la interacción de cuatro adultos con bebidas alcohólicas. Dónde: una mesa del primer piso de Yumi Yumi, Bogotá. Cuándo: sábado 26 de septiembre, de 8:30 a 10 p. m. Quiénes: usaremos nombres ficticios. Carlos, aproximadamente 52, camiseta negra, hablaba y gesticulaba. Patricia, aproximadamente 48, gafas y reloj, al principio intervenía menos. Valentina, aproximadamente 28, chaqueta oscura y reloj, conversaba con Carlos. Andrés, aproximadamente 29, buzo tipo polo y pantalón beige, primero asentía y después participaba más. Las edades son estimaciones. No confirmamos parentescos ni ocupaciones.", "Evaluar también requirió detenernos en detalles, como en el ejemplo de Henry y Karen. D01: ropa casual, camiseta de Carlos, relojes de las mujeres, pantalón beige recto y pelo partido al medio de Andrés; hubo dudas sobre el reloj del mayor. La chaqueta de Valentina pareció costosa y comentamos un posible nivel medio-alto de los jóvenes, sin comprobar marca ni estrato. D02: whisky aparente al comienzo, cócteles, cambios de sabor y promoción repetida; no confirmamos todos los nombres y bases. D03: Valentina y Carlos conversaban más, Andrés asentía y luego se integró; Patricia intervenía menos y después conversaba con Valentina. D04: manos al hablar, pitillo para señalar, caricia de Valentina en la cara de Andrés. D05: ambos hombres fueron al baño y Carlos tres veces; al final su marcha parecía menos estable. D06: música conversable, pantallas apagadas, QR, meseras sin uniforme, personal de cocina y barra uniformado; los cargos de los otros hombres no se confirmaron. Durante la observación surgieron seis hipótesis: posible familia y novio, atracción del 2×1, exploración de sabores, nivel socioeconómico, continuidad en una base de licor y posible previa a otra salida. Se conservan como preguntas.", "Analizar significa seleccionar e interpretar lo que responde al objetivo. Repetir el 2×1 permite seguir el formato de elección; cambiar sabores conecta la oferta con el consumo; empezar con bebidas distintas muestra preferencias diferentes dentro de un grupo. Pasar de asentir a intervenir sugiere integración progresiva, sin probar jerarquías. El pitillo usado para señalar relaciona un objeto de consumo con la expresión. La caricia y el trato cercano sugieren confianza, pero no prueban parentesco. Las pausas y la marcha menos estable se conservan como cambios corporales, sin atribuir una causa comprobada. La música y las pantallas apagadas describen condiciones compatibles con conversar. La apariencia sirve para describir: no demuestra ingresos, marcas ni ocupaciones. Estas ocho lecturas convierten detalles aislados en material útil para la ideación posterior.", "El registro de bebidas organiza tres momentos. Al comienzo los hombres tenían bebidas que parecían whisky y las mujeres cócteles en promoción. El nombre del primer cóctel no quedó confirmado: hubo referencias distintas durante la visita. Luego se observaron pares de sandía y naranja. Después llegaron otros cócteles y se repitió el 2×1. No medimos cantidades consumidas por persona ni confirmamos todas las bases de licor. Esta secuencia permite consultar el cambio de bebidas y el uso de la oferta.", "Registrar deja evidencia consultable. Las cuatro fotografías muestran consumo y conversación, el gesto de Andrés, el entorno y la composición de la mesa. Se pueden ampliar desde cada polaroid. Cada foto está vinculada con los detalles seleccionados, pero una foto no prueba por sí sola toda la secuencia ni las intenciones. El registro escrito organiza acciones, cambios, pausas y dudas; el visual conserva estos cuatro momentos; el contexto reúne ubicación, carta y experiencia sensorial. La lámina anterior registra las bebidas. No usamos las imágenes para afirmar edades exactas, parentescos o nivel socioeconómico.", "Concluimos seis cosas con respaldo en esta visita: el 2×1 fue una pauta repetida de pedido; la variedad de la carta se reflejó en cambios de cóctel; la participación en la conversación cambió; el pitillo y las manos acompañaron el habla; el consumo tuvo pausas y cambios corporales observables; y el entorno permitió conversar y resultó ameno para el equipo. Estos resultados aportan formatos de elección, variedad, dinámicas de grupo, usos de objetos, secuencia corporal y experiencia del lugar. Son insumos para idear, con el alcance de una mesa, cuatro adultos y 90 minutos.", "Contrastamos las hipótesis que surgieron. H1: la cercanía es compatible con confianza, pero no confirma padres, hija y novio ni cuántas veces se habían reunido. H2: corroboramos el uso repetido de la promoción; no que fuera la razón de la visita ni quién conocía el lugar. H3: cambiar sabores apoya una lectura de exploración, aunque no se confirmó la intención. H4: la impresión de nivel medio-alto surgió por la apariencia y no permite verificar estrato. H5: no comprobamos las bases de todos los cócteles y al inicio había whisky aparente. H6: la idea de una previa surgió del ambiente y de otras salidas, pero no sabemos a dónde fue el grupo. Concluir también significa dejar abiertas las preguntas que el registro no resuelve.", "Gracias. El resultado es un registro organizado de lugar, oferta y personas. La observación queda disponible como insumo para una creación posterior."];
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
 if(s.querySelector('.inventory-symbol'))motion.fromTo(s.querySelectorAll('.inventory-symbol'),{scale:.5,rotation:-15},{scale:1,rotation:0,duration:.8,stagger:.12,ease:'back.out(1.5)'},.4);
 if(s.querySelector('.conclusion-icon'))motion.fromTo(s.querySelectorAll('.conclusion-icon'),{scale:.6},{scale:1,duration:1,stagger:.13,ease:'back.out(1.5)'},.45);
 if(s.querySelector('.hypothesis-marker'))motion.fromTo(s.querySelectorAll('.hypothesis-marker'),{scale:.4,rotation:-30},{scale:1,rotation:0,duration:.8,stagger:.13,ease:'back.out(1.6)'},.4);
 if(s.querySelector('.polaroid'))motion.fromTo(s.querySelectorAll('.polaroid'),{y:70,rotation:0,opacity:0},{y:0,rotation:i=>[-4,3,-2,4][i],opacity:1,duration:1.1,stagger:.17,ease:'power3.out'},.4);
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
 closeDrawer();closePhoto();animateSlide(slides[n]);
 if(n===0)$("#cover-video").play().catch(()=>{});else $("#cover-video").pause();
 if(n===1)initMap().then(()=>flyJourney()).catch(mapFallback);
 history.replaceState(null,"","#"+(n+1));
}
$("#next").onclick=()=>go(current+1);$("#prev").onclick=()=>go(current-1);
function forward(){go(current+1)}
function backward(){go(current-1)}
document.addEventListener("keydown",e=>{
 if(e.key==="Escape"){closeDrawer();closePhoto();return}
 if(!$("#lightbox").hidden){if(e.key==="ArrowRight"){e.preventDefault();openPhoto(photoIndex+1)}if(e.key==="ArrowLeft"){e.preventDefault();openPhoto(photoIndex-1)}return;}
 if(["ArrowRight","PageDown"," "].includes(e.key)){e.preventDefault();closeDrawer();forward()}
 if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();closeDrawer();backward()}
 if(e.key==="Home"){e.preventDefault();go(0)}
 if(e.key==="End"){e.preventDefault();go(slides.length-1)}
 if(e.key.toLowerCase()==="f")toggleFullscreen();
});
$("#slides").onclick=e=>{if(e.target.closest("button,a,.source-image"))return;if(!$("#drawer").hidden){closeDrawer();return}forward()};
let tx=0;stage.addEventListener("touchstart",e=>{tx=e.changedTouches[0].clientX},{passive:true});
stage.addEventListener("touchend",e=>{let dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>60){if(dx<0)forward();else backward()}},{passive:true});
function showDrawer(mode){
 closePhoto();
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

const photos=[["foto-6c13f9b.webp", "R01", "Conversar y consumir", "Una bebida se usa mientras la reunión continúa.", "Relación con el análisis: D02 + D03. La imagen conserva un instante del consumo compartiendo espacio con la conversación. La secuencia completa procede del registro de la visita."], ["foto-006a2a8.webp", "R02", "El gesto al hablar", "La mano acompaña la intervención de Andrés.", "Relación con el análisis: D04. Se ve un gesto amplio de la mano. El uso del pitillo para señalar fue registrado durante la observación; esta foto por sí sola no demuestra ese uso."], ["foto-f62da75.webp", "R03", "La mesa en su entorno", "Lámpara, verde, barra y servicio alrededor.", "Relación con el análisis: D06. La foto conserva elementos visibles del ambiente. El volumen de la música, el olor y las sensaciones se describen en el registro del equipo."], ["foto-5b05c8a.webp", "R04", "Cuatro personas, una mesa", "Composición del grupo, vasos y proximidad.", "Relación con el análisis: D01 + D02 + D03. Permite situar a Carlos, Patricia, Valentina y Andrés, nombres ficticios. La fotografía no confirma edades, parentesco ni nivel socioeconómico."]];
let photoIndex=0,photoTrigger=null;
function openPhoto(n){
 photoIndex=(n+photos.length)%photos.length;const a=photos[photoIndex];closeDrawer();
 if($("#lightbox").hidden)photoTrigger=document.activeElement;
 $("#lightbox-content").innerHTML='<img src="assets/fotos/'+a[0]+'" alt="'+a[2]+'"><div class="photo-detail"><span>'+a[1]+' / REGISTRO FOTOGRÁFICO</span><h3>'+a[2]+'</h3><p>'+a[3]+'</p><small>'+a[4]+'</small></div>';
 $("#lightbox").hidden=false;$("#photo-tools").hidden=false;stage.classList.add("photo-open");$("#photo-count").textContent='Foto '+(photoIndex+1)+' / '+photos.length;
 gsap.fromTo('#lightbox-content',{opacity:0,y:12},{opacity:1,y:0,duration:reduce?.01:.35});$("#photo-close").focus();
}
function closePhoto(){if(!$("#lightbox").hidden){$("#lightbox").hidden=true;$("#photo-tools").hidden=true;stage.classList.remove("photo-open");photoTrigger?.focus();}}
$$("[data-photo]").forEach(b=>b.onclick=e=>{e.stopPropagation();openPhoto(+b.dataset.photo)});
$("#photo-prev").onclick=()=>openPhoto(photoIndex-1);$("#photo-next").onclick=()=>openPhoto(photoIndex+1);$("#photo-close").onclick=closePhoto;
$("#lightbox").onclick=e=>{if(e.target.id==='lightbox')closePhoto()};
$("#lightbox").setAttribute('role','dialog');$("#lightbox").setAttribute('aria-label','Registro fotográfico ampliado');

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
 map.flyTo({center:PIN,zoom:17.55,pitch:50,bearing:-30,duration:reduce?0:15000,curve:1.15,easing:t=>t*t*(3-2*t),essential:true});
 await new Promise(r=>setTimeout(r,reduce?50:15100));map.off("move",labels);if(!valid())return;
 mapStep(3,"YUMI YUMI · LUGAR DE LA VISITA");
 marker.getElement().style.visibility="visible";map.setPaintProperty("site-ring","line-opacity",.85);map.setPaintProperty("site-fill","fill-opacity",.06);
 gsap.to("#map-target",{opacity:1,y:0,duration:.65,ease:"power3.out"});
 while(valid()&&!reduce){map.easeTo({bearing:map.getBearing()+32,duration:24000,easing:t=>t,essential:true});await new Promise(r=>setTimeout(r,24050))}
}
function mapFallback(error){console.warn(error);$("#map-phase").textContent="ZONA T · BOGOTÁ";$("#map-fallback").hidden=false;$("#map-fallback").style.zIndex=0;gsap.to("#map-target",{opacity:1,y:0,duration:.4})}
$("#map-replay").onclick=()=>{if(mapReady)flyJourney();else initMap().then(flyJourney).catch(mapFallback)};
setTimeout(()=>initMap().catch(()=>{}),150);
$("#prev").disabled=true;animateSlide(slides[0]);paintTimer();
const hash=+location.hash.slice(1);if(hash>1&&hash<=slides.length)go(hash-1);
window.YUMI_DEBUG={go,resetTimer,setRemaining:s=>{running=false;remaining=s;paintTimer()},getState:()=>({current,bookIndex,turning,totalSeconds:seconds.reduce((a,b)=>a+b,0),remaining,running,mapReady,mapZoom:map?.getZoom(),mapCenter:map?.getCenter(),mapBearing:map?.getBearing()}),map:()=>map,flyJourney,showDrawer};
})();


