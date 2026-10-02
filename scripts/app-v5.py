from pathlib import Path
import re,json,html
p=Path('presentacion/app.js');s=p.read_text(encoding='utf-8')
h=Path('presentacion/index.html').read_text(encoding='utf-8');m=re.search(r'const guides=(\[.*?\]);',s,re.S);g=json.loads(m[1]);sections=re.findall(r'<section class="slide .*?</section>',h,re.S)
g[6]=g[6].replace('hablaba y gesticulaba','conversaba con Valentina y fue tres veces al baño')
g=g[:7]
for sec in sections[7:-1]:
 sec=re.sub(r'<aside class="person-key">.*?</aside>','',sec,flags=re.S)
 sec=re.sub(r'<svg.*?</svg>','',sec,flags=re.S)
 text=html.unescape(re.sub(r'<[^>]+>',' ',sec));text=re.sub(r'\s+',' ',text).strip();g.append(text)
g.append('Gracias. La visita queda organizada en observaciones, interpretaciones, registros e hipótesis contrastadas. Es materia prima para la ideación posterior, centrada en cómo interactúan las personas alrededor de las bebidas.')
# Names remain identifiable even inside the presenter guide.
for i,t in enumerate(g):
 for name,age in [('Carlos',52),('Patricia',48),('Valentina',28),('Andrés',29)]:
  t=re.sub(r'\b'+name+r'\b(?!\s*\(≈)',name+f' (≈{age})',t)
 g[i]=t
s=s[:m.start()]+'const guides='+json.dumps(g,ensure_ascii=False)+';'+s[m.end():]
s=s.replace('const nodes=s.querySelectorAll(".reveal");','const nodes=s.querySelectorAll(".reveal:not(.polaroid):not(.round)");')
s=s.replace('motion.fromTo(s,{opacity:0},{opacity:1,duration:reduce?.05:.5},0)\n .fromTo(nodes,','gsap.set(s,{opacity:1});\n motion.fromTo(nodes,')
# One animation owner per photo; do not clear transforms while a second tween is running.
s=re.sub(r" if\(s.querySelector\('\.polaroid'\)\)motion\.fromTo\(s\.querySelectorAll\('\.polaroid'\).*?;",''' if(s.querySelector('.polaroid')){const cards=s.querySelectorAll('.polaroid');gsap.set(cards,{clearProps:'opacity,transform'});motion.fromTo(cards,{y:20,opacity:0},{y:0,opacity:1,duration:reduce?.01:.65,stagger:.09,ease:'power2.out',clearProps:'transform'},.3);}''',s,count=1)
s=s.replace('if(old===1){mapRun++;map?.stop()}','if(old===1){mapRun++;map?.stop();if(marker)marker.getElement().style.visibility="hidden";gsap.killTweensOf("#map-target");gsap.set("#map-target",{opacity:0});}')
s=s.replace('function mapFallback(error){console.warn(error);','function mapFallback(error){if(current!==1)return;console.warn(error);')
s=s.replace('La mano acompaña la intervención de Andrés.','La mano acompaña la intervención de Andrés (≈29).')
s=s.replace('Carlos, Patricia, Valentina y Andrés, nombres ficticios.','Carlos (≈52), Patricia (≈48), Valentina (≈28) y Andrés (≈29), nombres ficticios y edades estimadas.')
s=s.replace('D02 + D03. La imagen','R1 + R2 + R3. La imagen').replace('D04. Se ve','R4. Se ve').replace('D06. La foto','Contexto del grupo. La foto').replace('D01 + D02 + D03. Permite','R1 + R3 + R5. Permite')
p.write_text(s,encoding='utf-8');print('Guiones',len(g))
