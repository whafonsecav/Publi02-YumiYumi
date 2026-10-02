from pathlib import Path
p=Path('presentacion/index.html');s=p.read_text(encoding='utf-8')
for letter,name,cls in [('A','Carlos','ea'),('B','Patricia','eb'),('C','Valentina','ec'),('D','Andrés','ed')]:
 s=s.replace(f'<span class="eval-mark {cls}">{letter}</span>',f'<span class="eval-mark {cls}">{name}</span>')
 s=s.replace(f'</b><span>{letter}</span></div><h3>{name}',f'</b></div><h3>{name}')
p.write_text(s,encoding='utf-8')
