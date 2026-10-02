from pathlib import Path
import re,json
root=Path('presentacion');old='Carlos y Patricia parecían mayores que Valentina y Andrés. Vestían de forma casual; los relojes, la chaqueta y el pantalón llamaron la atención del equipo.'
new='Dos mayores y dos jóvenes, con ropa casual. La chaqueta de Valentina parecía costosa; el buzo tipo polo y pantalón beige de Andrés se veían cuidados. Por eso surgió la pregunta sobre un nivel medio-alto, sin verificarlo.'
for name in ['index.html','app.js']:
 p=root/name;s=p.read_text(encoding='utf-8');s=s.replace(old,new);p.write_text(s,encoding='utf-8')
p=root/'datos/v7-content.json';d=json.loads(p.read_text(encoding='utf-8'));d['rows'][0]['observation']=new;p.write_text(json.dumps(d,ensure_ascii=False),encoding='utf-8')
