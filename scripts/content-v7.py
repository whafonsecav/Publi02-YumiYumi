from pathlib import Path
import json,re,html
root=Path('presentacion');p=root/'index.html';s=p.read_text(encoding='utf-8');data=json.loads((root/'datos/v7-content.json').read_text(encoding='utf-8'));rows=data['rows'];hyps=data['hypotheses']
key='<aside class="person-key"><span>REFERENCIA · EDADES APROX.</span><div><b>Carlos <i>52</i></b><b>Patricia <i>48</i></b><b>Valentina <i>28</i></b><b>Andrés <i>29</i></b></div><small>Nombres ficticios · edades estimadas</small></aside>'
def head(t,h):return f'<div class="phase-heading"><span class="phase-token">{t}</span><h2 class="reveal">{h}</h2></div>'+key
def replace(cls,h):
 global s
 s=re.sub(r'<section class="slide '+cls+r'\b.*?</section>',lambda m:h,s,count=1,flags=re.S)
def grid(kind):
 return '<div class="nine-grid">'+''.join(f'<article class="reveal"><div class="nine-icon"><svg><use href="#i-{r["icon"]}"/></svg><span>{n+1:02}</span></div><div><h3>{r["title"]}</h3><p>{r[kind]}</p></div></article>'for n,r in enumerate(rows))+'</div>'
h='<section class="slide observations-v7" data-title="Evaluar: nueve observaciones de la mesa" data-seconds="60">'+head('01 / EVALUAR · LO QUE VIMOS','Nueve observaciones<br>de <em>la misma mesa.</em>')+grid('observation')+'<div class="nine-foot">De estas observaciones surgieron las preguntas de la siguiente lámina.</div></section>'
replace('inventory-v4',h)
h='<section class="slide questions-v7" data-title="Evaluar: las hipótesis que nos planteamos" data-seconds="45">'+head('01 / EVALUAR · HIPÓTESIS','Lo que empezamos<br>a <em>preguntarnos sobre ellos.</em>')+'<div class="questions-grid">'
for group,q,st,d in hyps:h+=f'<article class="reveal"><span>{group.upper()}</span><p>{q}</p></article>'
h+='</div><div class="nine-foot">Son preguntas nacidas de lo observado. La cercanía, la ropa o una bebida no bastan para responderlas.</div></section>'
s=s.replace('<section class="slide analysis-v4',h+'\n<section class="slide analysis-v4')
h='<section class="slide analysis-v7" data-title="Analizar: qué nos dicen las nueve observaciones" data-seconds="70">'+head('02 / ANALIZAR · INTERACCIÓN CON LAS BEBIDAS','Qué nos dice cada detalle<br>sobre <em>cómo se relacionan.</em>')+grid('analysis')+'<div class="nine-foot">Las mismas nueve observaciones, en el mismo orden. Las posibles razones se distinguen de los hechos.</div></section>'
replace('analysis-v4',h)
# Retain the animated drinks and all four clickable photographs.
m=re.search(r'<section class="slide registration-v5.*?</section>',s,re.S);reg=m[0];reg=reg.replace('registration-v5','registration-v5 registration-v7').replace('seis insumos','nueve insumos').replace('data-seconds="70"','data-seconds="60"')
rt=['Quién comparte mesa','El pedido inicial','Acuerdos al pedir','Probar sabores juntos','Participación de Andrés','Turnos de conversación','El pitillo y los gestos','Momentos de pareja','Las pausas de Carlos']
rd=['Dos mayores y dos jóvenes; relaciones por confirmar. Insumo: cómo comparten el consumo personas de edades distintas.','Whisky aparente para ellos; 2×1 para ellas. Insumo: elecciones individuales frente a decisiones compartidas.','Los hombres se suman al 2×1 con sus acompañantes. Insumo: cómo una elección se extiende a otros.','Cócteles iniciales → sandía/naranja → otros. Insumo: explorar en compañía sin cambiar el formato en pares.','Escuchar y asentir → intervenir más. Insumo: cambios de confianza durante el tiempo compartido.','Valentina–Carlos → Patricia–Valentina, con Andrés participando. Insumo: quién habla, escucha y se incorpora.','Andrés señala mientras habla. Insumo: usos del objeto de consumo como parte de la expresión.','Caricia → salida juntos → regreso de la mano. Insumo: momentos a dos dentro de una reunión grupal.','Tres idas al baño; marcha menos estable al final. Insumo: pausas y ritmos personales durante el encuentro.']
block='<div class="record-insumos">'+''.join(f'<article class="reveal"><span>{i+1:02}</span><div><h3>{t}</h3><p>{d}</p></div></article>' for i,(t,d) in enumerate(zip(rt,rd)))+'</div>'
reg=re.sub(r'<div class="record-insumos">.*?(?=<div class="record-photos">)',lambda m:block,reg,flags=re.S)
s=s[:m.start()]+reg+s[m.end():]
h='<section class="slide conclusions-v7" data-title="Concluir: qué deja cada observación" data-seconds="50">'+head('04 / CONCLUIR · RESULTADOS DEL ENCUENTRO','Así se relacionaron<br><em>alrededor de las bebidas.</em>')+grid('conclusion')+'<div class="nine-foot">Una mesa, cuatro adultos y 90 minutos. Estas conclusiones se refieren a este encuentro.</div></section>'
replace('conclusions-v4',h)
h='<section class="slide answers-v7" data-title="Concluir: qué pasó con nuestras doce hipótesis" data-seconds="40">'+head('04 / CONCLUIR · CONTRASTE DE LAS HIPÓTESIS','Lo que pensamos.<br><em>Lo que la visita permitió sostener.</em>')+'<div class="answers-grid">'
short=['¿Valentina es hija de Carlos y Patricia?','¿Andrés es el novio que conoce a la familia?','¿Es su segunda o tercera salida juntos?','¿Los jóvenes son de nivel medio-alto?','¿El whisky buscaba dar una imagen seria?','¿El 2×1 unió a una posible mamá e hija?','¿Ellas convencieron a los hombres?','¿Querían probar sabores con el 2×1?','¿Un joven conocía el lugar y los llevó?','¿Las bebidas ayudaron a Andrés a soltarse?','¿Los jóvenes salieron a hablar a solas?','¿Después seguirían la noche en otro sitio?']
for title,(_,q,st,d) in zip(short,hyps):h+=f'<article class="reveal"><h3>{title}</h3><span>{st}</span><p>{d}</p></article>'
h+='</div><div class="nine-foot">Se comprobaron cambios en los pedidos, participación y cercanía. Los vínculos y motivos no se confirmaron con ellos.</div></section>'
replace('hypotheses-v4',h)
s=s.replace('01 / 14','01 / 15').replace('estilos.css?v=6','estilos.css?v=7').replace('app.js?v=6','app.js?v=7')
p.write_text(s,encoding='utf-8');print('Slides',len(re.findall('class="slide ',s)),'seconds',sum(map(int,re.findall('data-seconds="(\\d+)"',s))))
