from pathlib import Path
import re,json,shutil
p=Path("presentacion");h=(p/"index.html").read_text(encoding="utf-8-sig")
(p/".revision/v3-final").mkdir(parents=True,exist_ok=True)
for n in ["index.html","estilos.css","app.js"]:shutil.copy2(p/n,p/".revision/v3-final"/n)
def section(cls,title,content):return f'<section class="slide {cls}" data-title="{title}" data-seconds="45">{content}</section>'
def replace(cls,html):
 global h
 h=re.sub(r'<section class="slide '+cls+r'".*?</section>',lambda m:html,h,flags=re.S)
def icon(x):return f'<svg><use href="#i-{x}"/></svg>'
def heading(phase,title):return f'<div class="phase-heading"><span class="phase-token">{phase}</span><h2 class="reveal">{title}</h2></div>'
inventory=[
("person","Apariencia y detalles","Relojes en las mujeres; duda sobre el de Carlos. Andrés: pantalón recto beige y cabello partido al medio. La chaqueta de Valentina pareció costosa.","D01"),
("glass","Bebidas y elecciones","Whisky aparente para los hombres; cócteles para las mujeres. Luego sandía, naranja y otras bebidas. El 2×1 se repitió.","D02"),
("talk","Quién habla con quién","Primero Valentina y Carlos. Andrés asiente y se integra. Patricia interviene menos al inicio; después conversan las dos mujeres.","D03"),
("hand","Gestos y cercanía","Los hombres mueven las manos. Andrés señala con el pitillo. Valentina le acaricia la cara. Los gestos acompañan la conversación.","D04"),
("stairs","Pausas y desplazamientos","Los hombres van al baño; Carlos, tres veces. En la última, marcha menos estable. No registramos salidas de las mujeres.","D05"),
("sound","Lo que rodea la mesa","Música que permite hablar; televisores apagados. Carta por QR y promoción. Servicio sin uniforme, salvo cocina y barra; cargos no confirmados.","D06")
]
inv=heading("01 / EVALUAR · DETALLES E HIPÓTESIS","Todo lo que empezó<br>a <em>llamarnos la atención.</em>")
inv+='<div class="observation-inventory">'
for ico,title,body,code in inventory:
 inv+=f'<article class="reveal"><div class="inventory-symbol">{icon(ico)}<small>{code}</small></div><div><h3>{title}</h3><p>{body}</p></div></article>'
inv+='</div><div class="hypothesis-seeds reveal"><span>HIPÓTESIS QUE SURGIERON<br><b>Preguntas, no hechos.</b></span><div>'
for num,label in enumerate(["¿Familia y novio?","¿Vinieron por el 2×1?","¿Querían probar sabores?","¿Nivel medio-alto?","¿Solo vodka?","¿Una previa a otra salida?"],1):
 inv+=f'<span><b>H{num}</b> {label}</span>'
inv+='</div></div>'
h=h.replace('<section class="slide analyze-v3"',section("inventory-v4","Evaluar: detalles e hipótesis",inv)+'\n<section class="slide analyze-v3"')
analysis=[
("D02","Repetición del 2×1","El par se vuelve un formato de pedido. Sirve para entender cómo se organiza la elección.","glass"),
("D02","Sabores que cambian","La variedad de la carta se refleja en el consumo. Permite conectar oferta y elecciones reales.","glass"),
("D02","Distintas bebidas al inicio","El grupo reúne preferencias diferentes y luego pide cócteles. Evita tratar a los cuatro como un solo perfil.","person"),
("D03","Asentir, hablar, intervenir","Los papeles en la conversación cambian. Sugiere integración progresiva, sin demostrar una jerarquía.","talk"),
("D04","Manos y pitillo al hablar","El objeto de consumo también acompaña la expresión. Aporta gestos y usos para explorar después.","hand"),
("D04","Una caricia y trato cercano","Sugiere confianza entre los jóvenes. No demuestra parentesco ni define su relación con los mayores.","person"),
("D05","Pausas y marcha distinta","La experiencia incluye desplazamientos y cambios corporales. Su causa no quedó comprobada.","stairs"),
("D06","Música y pantallas apagadas","El entorno resultó compatible con conversar. Describe condiciones favorables, no el motivo de la visita.","sound")
]
a=heading("02 / ANALIZAR · SELECCIONAR E INTERPRETAR","Juntar los detalles.<br><em>Encontrar lo que aportan.</em>")
a+='<p class="analysis-intro">Del detalle observado a una lectura útil.<br>Una interpretación puede orientar sin convertirse en certeza.</p><div class="interpretation-grid">'
for code,obs,interp,ico in analysis:
 a+=f'<article class="reveal"><div class="interpret-icon">{icon(ico)}<span>{code}</span></div><div class="interpret-observation"><h3>{obs}</h3></div><i>→</i><p>{interp}</p></article>'
a+='</div><div class="analysis-boundary reveal"><b>D01 / Apariencia y estilo</b><span>El vestuario ayuda a describir y distinguir a las personas; no acredita marcas, ocupación, ingresos ni estrato.</span></div>'
replace("analyze-v3",section("analysis-v4","Analizar: ocho lecturas de las observaciones",a))
photos=[
("foto-6c13f9b.webp","R01","Conversar y consumir","Una bebida se usa mientras la reunión continúa.","Relación con el análisis: D02 + D03. La imagen conserva un instante del consumo compartiendo espacio con la conversación. La secuencia completa procede del registro de la visita."),
("foto-006a2a8.webp","R02","El gesto al hablar","La mano acompaña la intervención de Andrés.","Relación con el análisis: D04. Se ve un gesto amplio de la mano. El uso del pitillo para señalar fue registrado durante la observación; esta foto por sí sola no demuestra ese uso."),
("foto-f62da75.webp","R03","La mesa en su entorno","Lámpara, verde, barra y servicio alrededor.","Relación con el análisis: D06. La foto conserva elementos visibles del ambiente. El volumen de la música, el olor y las sensaciones se describen en el registro del equipo."),
("foto-5b05c8a.webp","R04","Cuatro personas, una mesa","Composición del grupo, vasos y proximidad.","Relación con el análisis: D01 + D02 + D03. Permite situar a Carlos, Patricia, Valentina y Andrés, nombres ficticios. La fotografía no confirma edades, parentesco ni nivel socioeconómico.")
]
r=heading("03 / REGISTRAR · EVIDENCIA VISUAL Y ESCRITA","Que la observación<br><em>pueda volver a consultarse.</em>")
r+='<p class="record-intro">Cuatro fotografías, una secuencia de bebidas<br>y anotaciones de interacción.<br><b>Clic en cada foto para ampliarla.</b></p><div class="polaroid-gallery">'
for i,(file,code,title,body,detail) in enumerate(photos):
 r+=f'<button class="polaroid reveal" data-photo="{i}" style="--tilt:{[-4,3,-2,4][i]}deg" aria-label="Ampliar {code}: {title}"><div class="polaroid-image"><img src="assets/fotos/{file}" alt="{title}"></div><div class="polaroid-caption"><span>{code}</span><h3>{title}</h3><p>{body}</p><i>↗</i></div></button>'
r+='</div><div class="registration-strip reveal"><div><b>Escrito</b><span>Acciones, secuencia y dudas conservadas.</span></div><div><b>Visual</b><span>Fotos vinculadas con D01–D06.</span></div><div><b>Contexto</b><span>Mapa, carta y sensaciones del equipo.</span></div></div>'
replace("interaction record-v3",section("registration-v4","Registrar: cuatro fotografías y sus datos",r))
conclusions=[
("glass","01","El 2×1 se repite","Fue una pauta de pedido en esta mesa. Se corroboró su uso; no la razón para elegir el lugar.","FORMATO DE ELECCIÓN"),
("glass","02","La variedad se utiliza","Hubo cambios de cóctel y preferencias distintas al inicio. La experiencia no se limitó a una sola bebida.","VARIEDAD Y PREFERENCIAS"),
("talk","03","La participación cambia","Andrés pasó de asentir a intervenir y cambiaron los interlocutores. Los papeles no permanecieron fijos.","DINÁMICA DEL GRUPO"),
("hand","04","El objeto también comunica","El pitillo y las manos acompañaron el habla. La interacción con una bebida incluye gestos, no solo sorbos.","USOS Y GESTOS"),
("stairs","05","El consumo tiene pausas","Se registraron idas al baño y un cambio de marcha. Se conserva el hecho sin asegurar su causa.","SECUENCIA CORPORAL"),
("sound","06","El entorno acompaña","El volumen permitía conversar y el ambiente resultó ameno para el equipo. Aporta contexto a lo ocurrido.","EXPERIENCIA DEL LUGAR")
]
c=heading("04 / CONCLUIR · DEDUCCIONES DEL REGISTRO","Seis resultados.<br><em>Una base para idear.</em>")
c+='<div class="conclusion-grid">'
for ico,num,title,body,inp in conclusions:
 c+=f'<article class="reveal"><div class="conclusion-icon">{icon(ico)}<b>{num}</b></div><div><h3>{title}</h3><p>{body}</p><span>{inp}</span></div></article>'
c+='</div><div class="conclusion-scope reveal"><strong>1 mesa · 4 adultos · 90 minutos</strong><span>Conclusiones de esta visita. Insumos para la creación posterior.</span></div>'
replace("findings",section("conclusions-v4","Concluir: seis deducciones con respaldo",c))
hypotheses=[
("H1","¿Familia y novio?","No corroborada","La cercanía y la caricia no prueban parentesco. Tampoco confirman una primera, segunda o tercera reunión.","open"),
("H2","¿Vinieron por el 2×1?","Uso sí; motivo no","Repitieron la promoción, pero no preguntamos qué los llevó al lugar ni quién lo conocía.","partial"),
("H3","¿Querían probar sabores?","Compatible","Cambiar de cóctel respalda una lectura de exploración. La intención no fue confirmada con ellos.","partial"),
("H4","¿Nivel medio-alto?","No verificable","Fue una impresión del equipo por la ropa y los accesorios. La apariencia no acredita un estrato.","open"),
("H5","¿Solo tomaban vodka?","No corroborada","No confirmamos las bases de todos los cócteles. Al inicio, dos bebidas parecían whisky.","open"),
("H6","¿Era una previa a otra salida?","No corroborada","La idea surgió al observar el ambiente y salidas del lugar. No seguimos ni confirmamos su destino.","open")
]
q=heading("04 / CONCLUIR · CONTRASTAR HIPÓTESIS","Lo que pensamos.<br><em>Lo que pudimos sostener.</em>")
q+='<div class="hypothesis-results">'
for code,title,status,body,state in hypotheses:
 q+=f'<article class="reveal {state}"><div class="hypothesis-marker">{code}<i>{"~" if state=="partial" else "?"}</i></div><div><h3>{title}</h3><span class="hypothesis-status">{status}</span><p>{body}</p></div></article>'
q+='</div><div class="hypothesis-close reveal"><b>La hipótesis orienta la mirada.</b><span>El registro permite apoyarla, limitarla o dejarla abierta.</span></div>'
h=h.replace('<section class="slide thanks"',section("hypotheses-v4","Concluir: contraste de las seis hipótesis",q)+'\n<section class="slide thanks"')
times=iter([20,25,35,30,45,25,55,75,70,50,45,60,55,10])
h=re.sub(r'data-seconds="\d+"',lambda m:f'data-seconds="{next(times)}"',h)
h=h.replace('estilos.css?v=3','estilos.css?v=4').replace('app.js?v=3','app.js?v=4').replace('01 / 12','01 / 14')
h=h.replace('<div class="footer-context">','<div class="footer-context"><div id="photo-tools" hidden><button id="photo-prev" aria-label="Foto anterior">←</button><span id="photo-count">Foto 1 / 4</span><button id="photo-next" aria-label="Foto siguiente">→</button><button id="photo-close">Cerrar foto ×</button></div>')
(p/"index.html").write_text(h,encoding="utf-8")
(p/"datos/photos-v4.json").write_text(json.dumps(photos,ensure_ascii=False),encoding="utf-8")
print("Láminas:",len(re.findall('<section class="slide ',h)),"Segundos:",sum(map(int,re.findall('data-seconds="(\\d+)"',h))))
