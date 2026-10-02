from pathlib import Path
import re, shutil
p=Path("presentacion")
(p/".revision/v2-final").mkdir(parents=True,exist_ok=True)
for n in ["index.html","app.js","estilos.css"]:shutil.copy2(p/n,p/".revision/v2-final"/n)
h=(p/"index.html").read_text(encoding="utf-8-sig")
def replace(cls,html):
 global h
 h=re.sub(r'<section class="slide '+cls+r'".*?</section>',lambda m:html,h,flags=re.S)
def glass(color="watermelon",short=False):
 return f'<div class="drink {"short" if short else "tall"} {color}"><i></i>{"" if short else "<b></b>"}</div>'
def icon(x):return f'<svg><use href="#i-{x}"/></svg>'
replace("senses",'''
<section class="slide senses sensory-v3" data-title="Percibir con cinco sentidos" data-seconds="55">
<div class="section-heading"><p class="eyebrow reveal">EL LUGAR / EXPERIENCIA DEL EQUIPO</p><h2 class="reveal">No solo lo vimos.<br><em>Lo percibimos.</em></h2></div>
<div class="ambient-lens reveal"><img src="assets/fotos/foto-f62da75.webp" alt="Luz cálida, verdes y barra del gastrobar"><span>LUZ TENUE · VERDE · MADERA</span><i></i></div>
<div class="sense-objects">
<article class="reveal"><div class="sense-art lamp-art"><div class="lamp-cord"></div><div class="lamp-shade"></div><div class="lamp-glow"></div></div><h3>Vista</h3><p>Luz cálida y colores amenos.<br>La barra destaca al fondo.</p></article>
<article class="reveal"><div class="sense-art music-art"><span>♪</span><div class="music-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div><h3>Oído</h3><p>Música con presencia,<br>que permitía conversar.</p></article>
<article class="reveal"><div class="sense-art cushion-art"><i></i><i></i><span>SUAVE</span></div><h3>Tacto</h3><p>Acolchados suaves.<br>Faltaba respaldo<br>en algunos asientos.</p></article>
<article class="reveal"><div class="sense-art air-art"><svg viewBox="0 0 160 160"><path d="M15 60h90q40 0 30-25t-35 2M15 82h119M15 104h80q42 0 34 25t-29-1"/></svg></div><h3>Olfato</h3><p>Olor neutro.<br>Sin un olor marcado<br>a alcohol o encierro.</p></article>
<article class="reveal"><div class="sense-art taste-art">'''+glass("watermelon")+glass("violet")+'''</div><h3>Gusto</h3><p>Sandía: suave y frutal.<br>Fresa con vodka:<br>alcohol más perceptible.</p></article>
</div><div class="sensorial-bottom reveal"><span>AMBIENTE AGRADABLE</span><p>Los sabores se sintieron distintos y las preferencias también: a Juan no le gustó uno de los cócteles.</p></div>
</section>''')
replace("space",'''
<section class="slide space journey-v3" data-title="Llegar y habitar el lugar" data-seconds="40">
<div class="section-heading"><p class="eyebrow reveal">LA VISITA / 26 DE SEPTIEMBRE DE 2026</p><h2 class="reveal">Una fila corta.<br><em>Una mesa para cuatro.</em></h2></div>
<div class="visit-duration reveal"><b>90</b><span>MINUTOS<br>8:30–10:00 p. m.</span></div>
<div class="journey-objects">
<article class="reveal"><div class="entry-scene"><div class="drawn-door"></div><span class="queue-person">'''+icon("person")+'''</span><span class="queue-person">'''+icon("person")+'''</span></div><h3>Llegamos</h3><p>Había una fila pequeña.<br>Se liberó una mesa para cuatro.</p></article>
<span class="journey-arrow">→</span>
<article class="reveal"><div class="table-scene"><div class="round-table"></div><i></i><i></i><i></i><i></i><b>4</b></div><h3>Nos sentamos</h3><p>En el primer piso.<br>Mesas bajas, sofás y asientos<br>con y sin respaldo.</p></article>
<span class="journey-arrow">→</span>
<article class="reveal"><div class="bottle-scene"><div class="bottle-shelf"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="bar-counter"></div></div><h3>Reconocimos el entorno</h3><p>Barra y bebidas abajo.<br>Cocina, más mesas y baños arriba.</p></article>
</div><div class="journey-bottom reveal"><span>EL BAÑO</span><p>Vestíbulo compartido · un espacio para hombres y dos para mujeres.<br>Pequeño y cómodo; sin una ambientación especialmente fotográfica.</p></div>
</section>''')
replace("promo",'''
<section class="slide promo offer-v3" data-title="La oferta: promoción y variedad" data-seconds="65">
<div class="section-heading"><p class="eyebrow reveal">LA CARTA / QUÉ OFRECE EL GASTROBAR</p><h2 class="reveal">Vimos un <em>3×1.</em><br>Accedimos al <em>2×1.</em></h2></div>
<div class="offer-path">
<article class="reveal"><div class="offer-stage-label">AL ABRIR EL QR</div><div class="offer-glasses triple">'''+glass("cream")+glass("cream")+glass("cream")+'''<strong>3×1</strong></div><p>La publicidad que apareció.<br><b>Su horario ya había terminado.</b></p></article>
<div class="offer-clock reveal"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="32"/><path d="M40 17v25l18 9"/></svg><span>LLEGAMOS<br>8:30 p. m.</span><i>→</i></div>
<article class="reveal"><div class="offer-stage-label">DURANTE NUESTRA VISITA</div><div class="offer-glasses double">'''+glass("watermelon")+glass("watermelon")+'''<strong>2×1</strong></div><p>La promoción disponible.<br><b>Un mismo sabor por cada par.</b></p></article>
</div>
<div class="menu-landscape">
<article class="reveal"><div class="mini-pours">'''+glass("watermelon")+glass("orange")+'''</div><div><h3>Frutales</h3><p>Ron, vodka, tequila,<br>whisky y ginebra.</p><small>Elegir base + sabor.</small></div></article>
<article class="reveal"><div class="mini-pours">'''+glass("cream")+'''</div><div><h3>Cremosos</h3><p>Frutas, leche,<br>coco y chocolate.</p><small>También cambia la textura.</small></div></article>
<article class="reveal"><div class="no-alcohol"><b>8</b><span>SIN LICOR</span></div><div><h3>Otras elecciones</h3><p>Yumilu, Red Lips,<br>Brisa y más.</p><small>Compartir sin pedir alcohol.</small></div></article>
<article class="reveal"><div class="burger-drawing">'''+icon("burger")+icon("burger")+'''</div><div><h3>Combos de dos</h3><p>Sándwiches · $61.900<br>Hamburguesas · $63.900</p><small>El formato en pares se repite.</small></div></article>
</div><p class="offer-source">Lectura de la carta recogida en la visita. Los combos de comida son ofertas específicas.</p>
</section>''')
# The four-part method moves ahead of its application.
method=re.search(r'<section class="slide method".*?</section>',h,re.S).group(0)
h=h.replace(method,"")
replace("menu",method.replace('data-seconds="60"','data-seconds="35"').replace('06 / DE MIRAR A OBSERVAR','EL MÉTODO / DE LA CLASE AL LUGAR'))
# Explicit evaluation.
replace("table-observation",'''
<section class="slide evaluate-v3" data-title="Evaluar: qué, quién, dónde y cuándo" data-seconds="75">
<div class="phase-heading"><span class="phase-token">01 / EVALUAR</span><h2 class="reveal">Cuatro personas.<br><em>Un foco definido.</em></h2></div>
<div class="evaluation-brief reveal"><div><span>QUÉ</span><p>Su interacción con las bebidas alcohólicas.</p></div><div><span>DÓNDE</span><p>Una mesa del primer piso de Yumi Yumi, Bogotá.</p></div><div><span>CUÁNDO</span><p>Sábado 26 de septiembre · 8:30–10:00 p. m.</p></div></div>
<div class="profiles">
<article class="profile reveal" style="--person:#aa824e"><div class="profile-bust man-bust"><i></i><b></b><span>A</span></div><h3>Carlos <small>≈52 años</small></h3><p>Camiseta negra, manga corta.<br>Habla y gesticula con las manos.</p></article>
<article class="profile reveal" style="--person:#779564"><div class="profile-bust woman-bust glasses-bust"><i></i><b></b><span>B</span></div><h3>Patricia <small>≈48 años</small></h3><p>Gafas, reloj y ropa casual.<br>Al inicio interviene menos.</p></article>
<article class="profile reveal" style="--person:#cf8b75"><div class="profile-bust woman-bust"><i></i><b></b><span>C</span></div><h3>Valentina <small>≈28 años</small></h3><p>Chaqueta oscura y reloj.<br>Conversa con Carlos.</p></article>
<article class="profile reveal" style="--person:#bc9c67"><div class="profile-bust man-bust young-bust"><i></i><b></b><span>D</span></div><h3>Andrés <small>≈29 años</small></h3><p>Buzo tipo polo, pantalón beige.<br>Asiente y luego participa más.</p></article>
</div>
<div class="evaluation-photo reveal"><img src="assets/fotos/foto-5b05c8a.webp" alt="Mesa de las cuatro personas observadas"><span class="eval-mark ea">A</span><span class="eval-mark eb">B</span><span class="eval-mark ec">C</span><span class="eval-mark ed">D</span><div class="scan-line"></div></div>
<div class="profile-note reveal"><b>Nombres ficticios para seguir la observación.</b><span>Edades estimadas por apariencia. No se confirmó el parentesco ni la ocupación.</span></div>
</section>''')
# Add analysis after evaluation and before recorded consumption.
analysis='''<section class="slide analyze-v3" data-title="Analizar: seleccionar lo que importa" data-seconds="70">
<div class="phase-heading"><span class="phase-token">02 / ANALIZAR</span><h2 class="reveal">De todo lo visible,<br><em>¿qué nos sirve?</em></h2></div>
<div class="analysis-stream">
<article class="reveal"><div class="analysis-art selection-drinks">'''+glass("watermelon")+glass("orange")+'''<span>↻</span></div><span class="small-label">LO IMPORTANTE</span><h3>Pedidos y cambios</h3><p>Seguimos qué bebidas llegaban,<br>cómo variaban y cuándo<br>se repetía el 2×1.</p><div class="selection-tag">Nos habla de la elección.</div></article>
<article class="reveal"><div class="analysis-art gesture-lens"><img src="assets/fotos/foto-006a2a8.webp" alt="Andrés gesticula con la mano mientras habla"><div class="lens-cross"></div><span>GESTO OBSERVADO</span></div><span class="small-label">LO SOBRESALIENTE</span><h3>Gestos y conversación</h3><p>Manos al hablar, uso del pitillo<br>para señalar y cambios<br>en la participación.</p><div class="selection-tag">Nos habla de la interacción.</div></article>
<article class="reveal"><div class="analysis-art garment-art"><svg viewBox="0 0 160 150"><path d="m49 22-31 19 17 33 16-7v70h60V67l16 7 16-33-32-19-14 16H65ZM65 23l15 15 17-15M80 38v25"/><path class="cloth-detail" d="M65 81h31M65 94h20"/></svg><span>CONTEXTO</span></div><span class="small-label">LO NECESARIO</span><h3>Apariencia y entorno</h3><p>Registramos vestuario y accesorios.<br>Los separamos de las impresiones<br>que nos provocaron.</p><div class="selection-tag">Describe; no confirma un estrato.</div></article>
</div>
<div class="socio-note reveal"><span>IMPRESIÓN DEL EQUIPO</span><p>La ropa de los jóvenes sugirió un nivel socioeconómico medio-alto.<br><b>Fue una apreciación: no se comprobaron ingresos, marcas ni estrato.</b></p></div>
</section>'''
h=h.replace('<section class="slide drinks"',analysis+'\n<section class="slide drinks"')
h=h.replace('data-title="Las bebidas fueron cambiando" data-seconds="70"','data-title="Registrar: secuencia de consumo" data-seconds="65"')
h=h.replace('08 / LA SECUENCIA DE CONSUMO','03 / REGISTRAR · SECUENCIA DE CONSUMO')
h=h.replace('Los hombres<br><b>Aparentemente whisky</b>','Carlos y Andrés<br><b>Aparentemente whisky</b>').replace('Las mujeres<br><b>Cócteles en 2×1</b>','Patricia y Valentina<br><b>Cócteles en 2×1</b>')
replace("interaction",'''
<section class="slide interaction record-v3" data-title="Registrar: gestos, conversación y pausas" data-seconds="65">
<div class="phase-heading"><span class="phase-token">03 / REGISTRAR</span><h2 class="reveal">Alrededor de los vasos,<br><em>también pasan cosas.</em></h2></div>
<div class="record-network">
<article class="reveal"><div class="people-conversation"><div class="talk-pair"><span>C<small>Valentina</small></span><i></i><span>A<small>Carlos</small></span></div><div class="join-person">D<small>Andrés se integra</small></div><svg class="speech-bubble" viewBox="0 0 70 55"><path d="M5 5h60v35H40L25 51V40H5Z"/><path d="M17 18h35M17 27h23"/></svg></div><h3>La participación cambia</h3><p>Valentina y Carlos conversaban más al inicio.<br>Andrés pasó de asentir a intervenir.<br>Después conversaron también las dos mujeres.</p></article>
<article class="reveal"><div class="straw-story">'''+glass("watermelon")+'''<div class="speaking-straw"></div><div class="motion-arcs">⌁</div></div><h3>El pitillo acompaña el gesto</h3><p>Andrés lo usaba para señalar al hablar.<br>Los hombres acompañaban<br>la conversación con las manos.</p></article>
<article class="reveal"><div class="walk-story"><span>'''+icon("person")+'''</span><i></i><i></i><i></i><div class="wc-door">WC</div><strong>3<small>VISITAS</small></strong></div><h3>Hay pausas y desplazamientos</h3><p>Ambos hombres fueron al baño.<br>Carlos fue tres veces; en la última<br>se observó una marcha menos estable.</p></article>
</div>
<div class="record-photo-band reveal"><div class="record-photo-lens"><img src="assets/fotos/foto-6c13f9b.webp" alt="Valentina bebe mientras la mesa continúa reunida"></div><div class="photo-link-line"></div><p><b>Bebidas + conversación + pausas</b><br>El registro reúne acciones que ocurrieron durante la misma visita.</p><span>FOTOGRAFÍA<br>DE LA MESA</span></div>
</section>''')
h=h.replace('data-title="Lo observado queda como insumo" data-seconds="60"','data-title="Concluir: patrones e insumos" data-seconds="55"')
h=h.replace('10 / CONCLUIR Y CONSERVAR','04 / CONCLUIR · PATRONES DEL REGISTRO')
h=h.replace('Pidieron cócteles diferentes a lo largo de la visita.','Las elecciones variaron: no se mantuvo un único cóctel.').replace('El 2×1 apareció en varios pedidos de la mesa.','El 2×1 fue una pauta repetida en los pedidos de la mesa.')
h=h.replace('data-seconds="35">\\n<div id="map"','data-seconds="25">\\n<div id="map"')
h=h.replace('data-title="Del planeta a la Zona T" data-seconds="35"','data-title="Del planeta a la Zona T" data-seconds="25"')
# Replace obsolete book footer tools with one contextual PDF link.
h=re.sub(r'<div id="book-tools" hidden>.*?</div>', '<div id="book-tools" hidden><a href="assets/fuentes/carta-original.pdf" target="_blank">Carta original ↗</a></div>',h,flags=re.S)
h=h.replace('estilos.css','estilos.css?v=3').replace('src="app.js"','src="app.js?v=3"')
(p/"index.html").write_text(h,encoding="utf-8")
print("Láminas:",len(re.findall(r'<section class="slide ',h)))
print("Tiempos:",re.findall(r'data-seconds="(\\d+)"',h))
