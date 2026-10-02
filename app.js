(()=>{"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const slides=$$(".slide"),stage=$("#stage"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
let current=0,drawerMode="",motion,bookIndex=0,turning=false,map=null,mapReady=false,mapPromise=null,mapRun=0,marker=null;
const PIN=[-74.0537016,4.6686545];
const seconds=slides.map(s=>+s.dataset.seconds);
const guides=["El trabajo aplica la metodología de observación para reunir insumos de ideación. Visitamos el gastrobar Yumi Yumi, en Bogotá, el sábado 26 de septiembre de 2026. Primero presentamos el contexto; después desarrollamos Evaluar, Analizar, Registrar y Concluir.", "El acercamiento va del planeta a Colombia, Bogotá y la Zona T. Yumi Yumi está en la calle 84A número 12a-22. La imagen satelital queda girando suavemente mientras se muestran dirección y coordenadas.", "Llegamos a las 8:30 p. m. Encontramos una fila corta y una mesa disponible para cuatro en el primer piso. Nos sentamos, abrimos el QR y encontramos la publicidad del 3×1, cuyo horario ya había terminado. Pedimos cócteles y dos combos de sándwich con la oferta disponible. Reconocimos el entorno y enfocamos la observación en una mesa de cuatro adultos. Estuvimos hasta las 10 p. m.", "La vista reúne seis elementos: verde y madera con luz tenue; entrada abierta que parecía zona de fumadores; mesas bajas, sofás y asientos sin respaldo; barra con botellas, lámpara de cristales y hojas; dos pisos conectados por escaleras a la derecha; y baño pequeño, cómodo, con vestíbulo compartido, espejos, un espacio de hombres y dos de mujeres. La música tenía presencia, pero permitía escucharnos. Las otras mesas no interrumpían y percibimos respeto. Los acolchados eran suaves y los objetos se percibían cuidados; algunos asientos no permitían recostar la espalda. El olor era neutro y el ambiente no se sentía encerrado ni caluroso. Sandía resultó suave y frutal; fresa con vodka tenía el alcohol más presente. Las preferencias variaron: a Juan no le gustó uno de los cócteles. Son percepciones del equipo.", "Hay dos momentos distintos. El QR mostró una publicidad de 3×1, pero esa franja ya había terminado. Durante nuestra visita estaba disponible el 2×1, del mismo sabor por par según la carta. La oferta incluía varias bases de licor y sabores frutales, cremosos, ocho opciones sin licor y combos específicos de dos sándwiches o hamburguesas. Esto permite describir variedad, texturas y formatos de elección, sin asumir que todos los clientes quieren lo mismo. La estrella identifica nuestro pedido: sandía, fresa con vodka y dos combos de sándwich. No es el pedido de la mesa observada.", "El PDF de clase presenta cuatro pasos: Evaluar define qué, quién, dónde y cuándo. Analizar selecciona lo importante, sobresaliente y necesario. Registrar levanta y organiza los datos. Concluir genera deducciones o contrasta hipótesis. El ejemplo de Henry y Karen muestra que hay que describir a los participantes y seguir su interacción con el entorno. Ahora aplicaremos cada fase a nuestra mesa.", "Evaluar. Qué: la interacción de cuatro adultos con bebidas alcohólicas. Dónde: una mesa del primer piso de Yumi Yumi, Bogotá. Cuándo: sábado 26 de septiembre, de 8:30 a 10 p. m. Quiénes: usaremos nombres ficticios. Carlos (≈52), aproximadamente 52, camiseta negra, conversaba con Valentina (≈28) y fue tres veces al baño. Patricia (≈48), aproximadamente 48, gafas y reloj, al principio intervenía menos. Valentina (≈28), aproximadamente 28, chaqueta oscura y reloj, conversaba con Carlos (≈52). Andrés (≈29), aproximadamente 29, buzo tipo polo y pantalón beige, primero asentía y después participaba más. Las edades son estimaciones. No confirmamos parentescos ni ocupaciones.", "01 / EVALUAR · LO QUE VIMOS Nueve observaciones de la misma mesa. 01 Personas de edades distintas Dos mayores y dos jóvenes, con ropa casual. La chaqueta de Valentina parecía costosa; el buzo tipo polo y pantalón beige de Andrés se veían cuidados. Por eso surgió la pregunta sobre un nivel medio-alto, sin verificarlo. 02 Al principio pidieron distinto Carlos y Andrés tenían bebidas que parecían whisky. Patricia y Valentina tomaban cócteles en 2×1. No quedó claro el nombre del primer cóctel. 03 Los hombres se sumaron al 2×1 Después, Carlos y Andrés dejaron el whisky aparente y pidieron cócteles en promoción con sus respectivas acompañantes. El 2×1 se volvió a repetir. 04 Cambiaron los sabores entre pedidos Llegaron cócteles de sandía y naranja; después, otros diferentes. Mantuvieron el 2×1. No se confirmaron todos los sabores ni las bases de licor. 05 Andrés empezó a participar más Al comienzo Andrés asentía mientras Valentina y Carlos hablaban. Conforme avanzaron la reunión y las bebidas, Andrés intervino más en la conversación. 06 La conversación cambió de interlocutores Primero hablaron más Valentina y Carlos. Patricia intervino menos al inicio; después conversó con Valentina y Andrés también aportó. La música permitía escucharse. 07 Andrés hablaba con las manos y el pitillo Andrés era quien movía las manos al hablar. Usaba el pitillo para señalar, además de tenerlo en su bebida. Este gesto no se atribuye a Carlos. 08 Los jóvenes mostraron cercanía Valentina acarició la cara de Andrés. En otro momento salieron juntos al baño y regresaron tomados de la mano. No se supo qué hablaron durante esa salida. 09 Carlos hizo más pausas durante la visita Los hombres fueron al baño por separado. Carlos se levantó tres veces; en la última ocasión su marcha se veía menos estable. Luego seguía dentro de la reunión. De estas observaciones surgieron las preguntas de la siguiente lámina.", "01 / EVALUAR · HIPÓTESIS Lo que empezamos a preguntarnos sobre ellos. RELACIONES ¿Será que Valentina es hija de Carlos y Patricia? RELACIONES ¿Será que Andrés es el novio de Valentina y está conociendo a su familia? RELACIONES ¿Será la segunda o tercera salida de Andrés con la familia de Valentina? APARIENCIA ¿Será que Valentina y Andrés son de un nivel socioeconómico medio-alto por su ropa y accesorios? PRIMER PEDIDO ¿Será que Carlos y Andrés eligieron whisky para verse más serios al empezar la reunión? PRIMER PEDIDO ¿Será que Patricia y Valentina pidieron el 2×1 porque, como posible mamá e hija, les resultaba fácil ponerse de acuerdo? CAMBIO DE PEDIDO ¿Será que Patricia y Valentina convencieron a Carlos y Andrés de seguir con el 2×1? CAMBIO DE PEDIDO ¿Será que los cuatro querían probar distintos sabores aprovechando el 2×1? ELECCIÓN DEL LUGAR ¿Será que Valentina o Andrés conocían el 2×1 y propusieron llevar a los mayores a Yumi Yumi? CONFIANZA ¿Será que compartir las bebidas ayudó a Andrés a perder la timidez y participar más? MOMENTO A DOS ¿Será que Valentina y Andrés salieron juntos para hablar de cómo se estaban sintiendo en la reunión? PLAN DE LA NOCHE ¿Será que el grupo estaba tomando y comiendo antes de continuar la noche en otro lugar? Son preguntas nacidas de lo observado. La cercanía, la ropa o una bebida no bastan para responderlas.", "02 / ANALIZAR · INTERACCIÓN CON LAS BEBIDAS Qué nos dice cada detalle sobre cómo se relacionan. 01 Personas de edades distintas Las diferencias de edad ayudan a seguir quién conversa con quién y cómo se forman los pares al pedir. La ropa sirve para reconocerlos; no permite saber sus ingresos ni si son familia. 02 Al principio pidieron distinto Al empezar, los hombres eligieron por separado y las mujeres compartieron una promoción. Puede haber gustos distintos o más confianza entre ellas para acordar un pedido; no sabemos por qué eligieron así. 03 Los hombres se sumaron al 2×1 Los pedidos de los hombres se acercaron a lo que ya tomaban las mujeres. Es posible que ellas los animaran o que acordaran aprovechar la oferta. El cambio se vio; quién convenció a quién no se escuchó. 04 Cambiaron los sabores entre pedidos Cambiar de sabor mientras repiten la promoción sugiere que querían probar juntos, además de beber. La elección podía ser parte del momento compartido; no registramos qué opinaban de cada sabor. 05 Andrés empezó a participar más Andrés pareció sentirse más cómodo con el grupo. Beber juntos pudo ayudar, pero también pasó más tiempo conversando. No se puede atribuir ese cambio solo al alcohol ni saber si era una presentación familiar. 06 La conversación cambió de interlocutores La atención no quedó siempre en las mismas personas. Entre pedidos se abrieron otras conversaciones: Patricia participó y Valentina habló tanto con Carlos como con ella. La reunión siguió siendo compartida. 07 Andrés hablaba con las manos y el pitillo La bebida también estaba presente en su forma de hablar: el pitillo se volvió un apoyo para señalar y expresarse. Junto con sus intervenciones, el gesto muestra una participación más activa. 08 Los jóvenes mostraron cercanía Los gestos apoyan la idea de una relación afectiva. Salir juntos pudo darles un momento para hablar a solas o comentar cómo se sentían, pero eso no se observó. La cercanía sí quedó registrada. 09 Carlos hizo más pausas durante la visita Carlos alternó conversación, consumo y salidas de la mesa. La bebida pudo influir en esas pausas y en su forma de caminar, pero no comprobamos la causa ni cuánto había tomado. Las mismas nueve observaciones, en el mismo orden. Las posibles razones se distinguen de los hechos.", "Registrar conserva hechos concretos y explica cómo usarlos para una creación posterior. Compartir entre edades. Observamos: Dos mayores y dos jóvenes pasan a compartir cócteles. Para idear: Explorar qué facilita disfrutar un mismo plan entre personas de edades distintas. Elegir solos o acompañados. Observamos: Ellos empiezan con whisky aparente; ellas comparten el 2×1. Para idear: Explorar cuándo pesa el gusto propio y cuándo se acuerda una bebida con alguien. Sumarse al pedido del otro. Observamos: Los hombres después piden el 2×1 con sus acompañantes. Para idear: Explorar cómo una recomendación o un acuerdo cambia lo que alguien decide tomar. Probar como plan compartido. Observamos: Cambian sabores y mantienen los pedidos en pares. Para idear: Explorar la elección de un nuevo sabor como momento para compartir curiosidad. Ganar voz en la reunión. Observamos: Andrés pasa de asentir a hablar más mientras avanza el encuentro. Para idear: Explorar cómo beber y conversar juntos acompañan la confianza, sin asegurar qué la causa. Abrir espacio a otras voces. Observamos: Patricia interviene más; Valentina conversa con distintos integrantes. Para idear: Explorar cómo un encuentro alrededor de las bebidas permite incorporarse a la conversación. Expresarse con el pitillo. Observamos: Andrés señala con el pitillo mientras habla y mueve las manos. Para idear: Considerar los objetos de la bebida como parte del gesto y de la expresión social. Pasar del grupo a la pareja. Observamos: Caricia, salida juntos y regreso de Valentina y Andrés de la mano. Para idear: Explorar cómo una salida con bebidas combina cercanía de pareja y convivencia del grupo. Reconocer ritmos personales. Observamos: Carlos hace tres pausas; al final camina menos estable. Para idear: Considerar pausas y cambios de comodidad al pensar la experiencia, sin asumir igual consumo. Estas son posibilidades de exploración, no ideas publicitarias ya resueltas ni efectos demostrados del alcohol.", "04 / CONCLUIR · RESULTADOS DEL ENCUENTRO Así se relacionaron alrededor de las bebidas. 01 Personas de edades distintas Compartieron la salida personas de edades distintas. El posible parentesco y el nivel medio-alto quedaron como preguntas, no como datos. 02 Al principio pidieron distinto Estar en la misma mesa no significó empezar bebiendo lo mismo. La diferencia inicial ayuda a reconocer cómo se acercaron después sus elecciones. 03 Los hombres se sumaron al 2×1 La elección de bebida pasó a organizarse en pares. La influencia de las mujeres es una explicación posible, pero no quedó confirmada. 04 Cambiaron los sabores entre pedidos Repitieron la manera de pedir, pero cambiaron lo que tomaban. Esto apoya la idea de curiosidad por probar sabores durante la reunión. 05 Andrés empezó a participar más Andrés ganó presencia en la conversación. Su integración es visible; que fuera un novio conociendo a la familia o un efecto del alcohol sigue siendo supuesto. 06 La conversación cambió de interlocutores Patricia tuvo más participación de la que mostraba al comienzo. Valentina conectó con varios integrantes; pudo ayudar a acercar al joven a los mayores. 07 Andrés hablaba con las manos y el pitillo La relación con la bebida incluyó más que tomarla. En Andrés, el pitillo acompañó el habla y ayudó a hacer visible su participación. 08 Los jóvenes mostraron cercanía Los jóvenes mantuvieron un vínculo cercano dentro del encuentro. Los gestos son compatibles con una pareja; el motivo de la salida conjunta permanece abierto. 09 Carlos hizo más pausas durante la visita La misma reunión tuvo ritmos distintos para cada persona. En Carlos fueron más visibles las pausas y un cambio corporal; su causa no quedó establecida. Una mesa, cuatro adultos y 90 minutos. Estas conclusiones se refieren a este encuentro.", "04 / CONCLUIR · CONTRASTE DE LAS HIPÓTESIS Lo que pensamos. Lo que la visita permitió sostener. ¿Valentina es hija de Carlos y Patricia? No confirmado Valentina conversó con ambos y mostró cercanía. Eso no permite asegurar que sean sus padres. ¿Andrés es el novio que conoce a la familia? Compatible; parentesco abierto La caricia, la mano y su mayor participación apoyan cercanía, pero no confirman una presentación familiar. ¿Es su segunda o tercera salida juntos? No se pudo comprobar Al equipo le pareció que ya había confianza. No conocíamos sus encuentros anteriores. ¿Los jóvenes son de nivel medio-alto? Impresión sin verificar La idea surgió por su apariencia. No sabemos marcas, ingresos ni estrato. ¿El whisky buscaba dar una imagen seria? Explicación posible Se observó whisky aparente. También pudieron elegirlo por gusto; no conocimos su intención. ¿El 2×1 unió a una posible mamá e hija? Pedido visible; relación abierta Compartieron la promoción al inicio. No se comprobó el parentesco ni la razón del acuerdo. ¿Ellas convencieron a los hombres? La secuencia lo permite Los hombres se sumaron después. No escuchamos quién propuso el cambio. ¿Querían probar sabores con el 2×1? Apoyada por los cambios Cambiaron los cócteles y repitieron la promoción. Eso apoya la exploración, sin confirmar el propósito. ¿Un joven conocía el lugar y los llevó? Sin comprobar El uso repetido de la oferta no revela quién eligió el sitio ni qué motivó la visita. ¿Las bebidas ayudaron a Andrés a soltarse? Cambio visible; causa abierta Andrés se involucró más. También avanzaron el tiempo y la conversación; no aislamos el efecto del alcohol. ¿Los jóvenes salieron a hablar a solas? No sabemos el motivo Volvieron de la mano. La conversación y la intención de esa pausa quedaron fuera de la observación. ¿Después seguirían la noche en otro sitio? Sin comprobar La idea surgió del ambiente y de otras salidas. No conocimos el destino posterior de esta mesa. Se comprobaron cambios en los pedidos, participación y cercanía. Los vínculos y motivos no se confirmaron con ellos.", "En Yumi Yumi, durante 90 minutos, Carlos (≈52), Patricia (≈48), Valentina (≈28) y Andrés (≈29) compartieron mesa. Andrés se mostraba tímido: escuchaba y asentía mientras Valentina hablaba con Carlos. Patricia participaba menos. Ellos empezaron con bebidas distintas a los cócteles 2×1 de ellas; luego pidieron por pares y cambiaron sabores. Andrés fue ganando confianza: habló más y señaló con el pitillo. Valentina le acarició la cara. Él había ido solo al baño; en otra ocasión salió con ella y regresaron de la mano. Carlos se levantó tres veces y al final caminaba menos estable. La reunión pasó de elecciones separadas a una experiencia más compartida. Los hombres pudieron dejarse animar por sus acompañantes para pedir el 2×1; probar otros sabores les daba nuevas decisiones en común. Andrés dejó de limitarse a escuchar y empezó a ocupar su lugar en la conversación. Compartir bebidas pudo acompañar esa confianza, junto con el tiempo y el trato. Patricia también encontró momentos para hablar y Valentina conectó con distintos integrantes. La caricia y la salida juntos sugieren cercanía: imaginamos un momento a dos para comentar cómo iban sintiéndose. Las pausas de Carlos muestran que no todos llevaban el mismo ritmo. De esta mesa quedan escenas concretas para volver a mirar: personas de edades distintas compartiendo un plan; hombres y mujeres que empiezan eligiendo distinto; un pedido que se extiende a los acompañantes; sandía, naranja y luego otros sabores; Andrés que pasa de escuchar a participar; Patricia que entra al diálogo; un pitillo que sirve para señalar; una caricia y un regreso de la mano; Carlos que interrumpe su permanencia tres veces. Son insumos para explorar acuerdos al pedir, curiosidad compartida, confianza al conversar, usos sociales de los objetos, afecto dentro del grupo y pausas personales. Las cuatro fotos acompañan las escenas visibles. Compartir bebidas acompañó una reunión en la que las personas fueron acercando sus elecciones y mostrando distintas formas de confianza. Andrés ganó presencia; Patricia habló más; Valentina sostuvo conversaciones con los mayores y momentos de afecto con Andrés; Carlos alternó conversación y pausas. Esto hace comprensible nuestra idea de un novio que busca integrarse, de unas mujeres que pudieron influir en los pedidos y de una pareja que pudo necesitar un momento propio. Son lecturas de lo visto: no sabemos si eran familia, si era su segunda o tercera salida, qué hablaron fuera de la mesa ni cuánto del cambio se debió al alcohol.", "Gracias. La visita queda organizada en observaciones, interpretaciones, registros e hipótesis contrastadas. Es materia prima para la ideación posterior, centrada en cómo interactúan las personas alrededor de las bebidas."];
function resize(){stage.style.transform="scale("+Math.min(innerWidth/1600,innerHeight/900)+")";if(map)map.resize()}
addEventListener("resize",resize);resize();
function closeDrawer(){$("#drawer").hidden=true;drawerMode=""}
function animateSlide(s){
 if(motion)motion.kill();
 gsap.killTweensOf(s.querySelectorAll("*"));
 const nodes=s.querySelectorAll(".reveal:not(.polaroid):not(.round)");
 gsap.set(nodes,{clearProps:"opacity,visibility,transform"});
 motion=gsap.timeline();
 gsap.set(s,{opacity:1});
 motion.fromTo(nodes,{y:reduce?0:27,opacity:0},{y:0,opacity:1,duration:reduce?.01:.8,stagger:reduce?0:.075,ease:"power3.out",clearProps:"transform"},.12);
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
 if(s.querySelector('.polaroid')){const cards=s.querySelectorAll('.polaroid');gsap.set(cards,{clearProps:'opacity,transform'});motion.fromTo(cards,{y:20,opacity:0},{y:0,opacity:1,duration:reduce?.01:.65,stagger:.09,ease:'power2.out',clearProps:'transform'},.3);}
 if(s.classList.contains("findings"))motion.fromTo(".finding-icon",{scale:.8,opacity:0},{scale:1,opacity:1,duration:1,stagger:.3,ease:"back.out(1.2)"},.5);
}
function go(n){
 n=Math.max(0,Math.min(slides.length-1,n));if(n===current&&slides[n].classList.contains("active"))return;
 const old=current;current=n;$("#download-status").textContent="";slides.forEach((s,i)=>s.classList.toggle("active",i===n));
 if(old===1){mapRun++;map?.stop();if(marker)marker.getElement().style.visibility="hidden";gsap.killTweensOf("#map-target");gsap.set("#map-target",{opacity:0});}
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

const photos=[["foto-6c13f9b.webp", "R01", "Conversar y consumir", "Una bebida se usa mientras la reunión continúa.", "La imagen muestra una bebida junto con la conversación. La secuencia de pedidos y los cambios de participación proceden de la observación de toda la visita."], ["foto-006a2a8.webp", "R02", "El gesto al hablar", "La mano acompaña la intervención de Andrés (≈29).", "Andrés (≈29) acompaña el habla con la mano. El uso del pitillo para señalar se observó durante la visita; esta imagen por sí sola no demuestra toda esa acción."], ["foto-f62da75.webp", "R03", "La mesa en su entorno", "Lámpara, verde, barra y servicio alrededor.", "La mesa comparte el espacio con la barra, la lámpara y el servicio. La música que permitía conversar fue parte de la experiencia del equipo."], ["foto-5b05c8a.webp", "R04", "Cuatro personas, una mesa", "Composición del grupo, vasos y proximidad.", "Carlos (≈52), Patricia (≈48), Valentina (≈28) y Andrés (≈29): nombres ficticios y edades estimadas. La foto permite situarlos, pero no confirma parentesco ni nivel socioeconómico."]];
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

// A download is an explicit save action, never a navigation to the PDF.
let menuBytesPromise;
function menuBytes(){
 if(!menuBytesPromise)menuBytesPromise=new Promise((resolve,reject)=>{
  const read=()=>{try{const raw=atob(window.YUMI_CARTA_PDF_BASE64);const bytes=Uint8Array.from(raw,c=>c.charCodeAt(0));delete window.YUMI_CARTA_PDF_BASE64;resolve(bytes)}catch(e){reject(e)}};
  const script=document.createElement('script');script.src='assets/fuentes/carta-data.js';script.onload=read;script.onerror=()=>{menuBytesPromise=null;reject(Error('No se pudo cargar la carta'))};document.head.append(script);
 });return menuBytesPromise;
}
async function downloadMenu(e){
 e.preventDefault();e.stopPropagation();const button=$('#download-menu'),status=$('#download-status');button.disabled=true;status.textContent='';
 let handle=null;
 try{
  // Request the native picker while the click still has user activation.
  if(typeof window.showSaveFilePicker==='function'){
   try{handle=await window.showSaveFilePicker({suggestedName:'Carta-Yumi-Yumi.pdf',types:[{description:'Documento PDF',accept:{'application/pdf':['.pdf']}}]})}
   catch(err){if(err.name==='AbortError')return;if(!['SecurityError','NotAllowedError','NotSupportedError'].includes(err.name))throw err;}
  }
  button.textContent='Guardando…';const bytes=await menuBytes();
  if(handle){const stream=await handle.createWritable();await stream.write(new Blob([bytes],{type:'application/pdf'}));await stream.close();status.textContent='PDF guardado';}
  else{
   // Binary MIME prevents the PDF viewer from taking over the presentation.
   const url=URL.createObjectURL(new Blob([bytes],{type:'application/octet-stream'}));const link=document.createElement('a');link.href=url;link.download='Carta-Yumi-Yumi.pdf';link.style.display='none';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);status.textContent='Descarga iniciada';
  }
 }catch(err){console.warn('Guardar carta:',err);status.textContent='No se pudo guardar. Inténtalo de nuevo.';}
 finally{button.disabled=false;button.textContent='↓ Descargar carta';}
}
$('#download-menu').addEventListener('click',downloadMenu);

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
function mapFallback(error){if(current!==1)return;console.warn(error);$("#map-phase").textContent="ZONA T · BOGOTÁ";$("#map-fallback").hidden=false;$("#map-fallback").style.zIndex=0;gsap.to("#map-target",{opacity:1,y:0,duration:.4})}
$("#map-replay").onclick=()=>{if(mapReady)flyJourney();else initMap().then(flyJourney).catch(mapFallback)};
setTimeout(()=>initMap().catch(()=>{}),150);
$("#prev").disabled=true;animateSlide(slides[0]);paintTimer();
const hash=+location.hash.slice(1);if(hash>1&&hash<=slides.length)go(hash-1);
window.YUMI_DEBUG={go,resetTimer,setRemaining:s=>{running=false;remaining=s;paintTimer()},getState:()=>({current,bookIndex,turning,totalSeconds:seconds.reduce((a,b)=>a+b,0),remaining,running,mapReady,mapZoom:map?.getZoom(),mapCenter:map?.getCenter(),mapBearing:map?.getBearing()}),map:()=>map,flyJourney,showDrawer};
})();


