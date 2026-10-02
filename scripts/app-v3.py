from pathlib import Path
import re,json
p=Path("presentacion");s=(p/"app.js").read_text(encoding="utf-8-sig")
guides=[
"El trabajo aplica la metodología de observación para reunir insumos de ideación. Visitamos el gastrobar Yumi Yumi, en Bogotá, el sábado 26 de septiembre de 2026. Primero presentamos el contexto; después desarrollamos Evaluar, Analizar, Registrar y Concluir.",
"El acercamiento va del planeta a Colombia, Bogotá y la Zona T. Yumi Yumi está en la calle 84A número 12a-22. La imagen satelital queda girando suavemente mientras se muestran dirección y coordenadas.",
"Aplicamos los cinco sentidos. Vista: luz tenue, verde y madera, barra iluminada. Oído: música agradable con un volumen que permitía conversar. Tacto: acolchados suaves, pero algunos asientos sin respaldo. Olfato: ambiente neutro, sin olor desagradable ni olor marcado a alcohol. Gusto: nosotros probamos sandía, suave y frutal, y fresa con vodka, con el alcohol más presente. Las preferencias variaron y a Juan no le gustó uno. Estas sensaciones son del equipo.",
"Entramos a las 8:30 p. m. después de una fila corta y conseguimos una mesa para cuatro en el primer piso. Reconocimos mesas bajas, sofás y sillas con y sin respaldo. La preparación de bebidas estaba abajo; la cocina, más mesas y los baños estaban arriba. El baño tenía vestíbulo compartido, un espacio para hombres y dos para mujeres: pequeño y cómodo. Salimos a las 10 p. m. Esta secuencia describe la experiencia de llegada.",
"Hay dos momentos distintos. El QR mostró una publicidad de 3×1, pero esa franja ya había terminado. Durante nuestra visita estaba disponible el 2×1, del mismo sabor por par según la carta. La oferta incluía varias bases de licor y sabores frutales, cremosos, ocho opciones sin licor y combos específicos de dos sándwiches o hamburguesas. Esto permite describir variedad, texturas y formatos de elección, sin asumir que todos los clientes quieren lo mismo.",
"El PDF de clase presenta cuatro pasos: Evaluar define qué, quién, dónde y cuándo. Analizar selecciona lo importante, sobresaliente y necesario. Registrar levanta y organiza los datos. Concluir genera deducciones o contrasta hipótesis. El ejemplo de Henry y Karen muestra que hay que describir a los participantes y seguir su interacción con el entorno. Ahora aplicaremos cada fase a nuestra mesa.",
"Evaluar. Qué: la interacción de cuatro adultos con bebidas alcohólicas. Dónde: una mesa del primer piso de Yumi Yumi, Bogotá. Cuándo: sábado 26 de septiembre, de 8:30 a 10 p. m. Quiénes: usaremos nombres ficticios. Carlos, aproximadamente 52, camiseta negra, hablaba y gesticulaba. Patricia, aproximadamente 48, gafas y reloj, al principio intervenía menos. Valentina, aproximadamente 28, chaqueta oscura y reloj, conversaba con Carlos. Andrés, aproximadamente 29, buzo tipo polo y pantalón beige, primero asentía y después participaba más. Las edades son estimaciones. No confirmamos parentescos ni ocupaciones.",
"Analizar. De lo visible escogimos lo que respondía al objetivo. Lo importante fueron los pedidos y sus cambios, porque permiten seguir la interacción con las bebidas. Lo sobresaliente fueron los gestos, el pitillo usado para señalar y los cambios de participación. Lo necesario para dar contexto fue describir vestuario, accesorios y entorno. El equipo comentó una impresión de nivel socioeconómico medio-alto en los jóvenes por su apariencia. La conservamos como apreciación no verificada: la ropa no demuestra ingresos, marcas ni estrato. Tampoco convertimos la posible relación familiar en un hecho.",
"Registrar. Al comienzo Carlos y Andrés tenían bebidas que parecían whisky; Patricia y Valentina, cócteles en 2×1. No confirmamos el nombre del primer cóctel. Luego llegaron pares de sandía y naranja. Más adelante llegaron otros cócteles en promociones. Registramos tres momentos, el cambio de bebidas y la repetición del formato. No medimos cuánto tomó cada persona ni confirmamos todos los ingredientes.",
"Registrar también incluye acciones. Valentina y Carlos conversaban más al inicio; Andrés asentía y luego intervino más. En otro momento conversaban las mujeres y Andrés aportaba. Él usaba el pitillo para señalar y los hombres gesticulaban con las manos. Ambos fueron al baño. Del mayor registramos tres visitas; en la última su marcha parecía menos estable. La fotografía y los diagramas ayudan a seguir esas observaciones. No atribuimos una causa comprobada al cambio de marcha.",
"Concluir. La secuencia permite reconocer tres patrones: elegir en pares, variar sabores y mantener la conversación durante el consumo. Deducimos que, en esta mesa, el 2×1 fue una pauta repetida de elección; la variedad de cócteles se reflejó en cambios de pedido; y el consumo estuvo acompañado por interacción social. No sabemos si la promoción motivó la visita ni si los cuatro eran familia. Conservamos los patrones como recursos para idear después. El alcance es una mesa y 90 minutos, no un perfil de toda la clientela.",
"Gracias. El resultado es un registro organizado de lugar, oferta y personas. La observación queda disponible como insumo para una creación posterior."
]
s=re.sub(r'const guides=\[.*?\];',lambda m:'const guides='+json.dumps(guides,ensure_ascii=False)+';',s,flags=re.S)
s=s.replace('$("#book-tools").hidden=n!==5','$("#book-tools").hidden=n!==4')
s=re.sub(r'function forward\(\).*?\nfunction backward\(\).*?\n', 'function forward(){go(current+1)}\nfunction backward(){go(current-1)}\n',s,flags=re.S) if False else s
s=s.replace('function forward(){if(current===5&&bookIndex<3){turnBook(1);return}go(current+1)}','function forward(){go(current+1)}')
s=s.replace('function backward(){if(current===5&&bookIndex>0){turnBook(-1);return}go(current-1)}','function backward(){go(current-1)}')
# Remove the old book implementation entirely.
s=re.sub(r'function svg\(id\).*?renderBook\(\);\s*\n\s*let tilesPromise;', 'let tilesPromise;',s,flags=re.S)
s=s.replace('if(s.classList.contains("menu")){motion.fromTo(".book-wrap",{y:35,rotate:3,opacity:0},{y:0,rotate:0,opacity:1,duration:1.1,ease:"power3.out"},.2);animateBook()}','')
s=s.replace('if(s.classList.contains("senses"))motion.fromTo(".sensory-photo>img",{scale:1.12},{scale:1.04,duration:12,ease:"none"},0);','')
# Meaningful motion applies to all illustrated slides, using the pouring vocabulary.
needle='if(s.classList.contains("findings"))motion.fromTo'
s=s.replace(needle,'''if(!s.classList.contains("drinks")&&s.querySelector(".drink i"))motion.fromTo(s.querySelectorAll(".drink i"),{scaleY:0},{scaleY:1,duration:1.35,stagger:.13,ease:"power2.inOut"},.8);
 if(s.querySelector(".profile-bust"))motion.fromTo(s.querySelectorAll(".profile-bust>b"),{scaleY:0},{scaleY:1,duration:.9,stagger:.15,ease:"power3.out"},.4);
 if(s.querySelector(".bottle-shelf"))motion.fromTo(".bottle-shelf>i",{scaleY:0},{scaleY:1,duration:.8,stagger:.12,ease:"power3.out"},.45);
 if(s.querySelector(".evaluation-photo"))motion.fromTo(".evaluation-photo",{clipPath:"polygon(50% 0,50% 0,50% 12%,50% 88%,50% 100%,50% 100%,50% 88%,50% 12%)"},{clipPath:"polygon(8% 0,93% 0,100% 12%,100% 88%,92% 100%,7% 100%,0 88%,0 12%)",duration:1.2,ease:"power3.inOut"},.2);
 if(s.classList.contains("findings"))motion.fromTo''')
s=s.replace('zoom:1.7,bearing:0','zoom:1.95,bearing:0')
start=s.index('async function flyJourney(){');end=s.index('function mapFallback',start)
flight='''async function flyJourney(){
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
'''
s=s[:start]+flight+s[end:]
s=s.replace('setTimeout(()=>loadTiles().catch(()=>{}),1300);','setTimeout(()=>initMap().catch(()=>{}),150);')
s=s.replace('go,turnBook,resetTimer','go,resetTimer')
(p/"app.js").write_text(s,encoding="utf-8")
h=(p/"index.html").read_text(encoding="utf-8")
h=h.replace('data-title="Evaluar: qué, quién, dónde y cuándo" data-seconds="75"','data-title="Evaluar: qué, quién, dónde y cuándo" data-seconds="90"').replace('data-title="Analizar: seleccionar lo que importa" data-seconds="70"','data-title="Analizar: seleccionar lo que importa" data-seconds="75"')
(p/"index.html").write_text(h,encoding="utf-8")
print("Tiempo total:",sum(int(x) for x in re.findall(r'data-seconds="(\d+)"',h)))

