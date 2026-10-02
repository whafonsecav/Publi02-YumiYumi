from pathlib import Path
import re,json
p=Path('presentacion/app.js');s=p.read_text(encoding='utf-8');m=re.search(r'const photos=(\[.*?\]);',s,re.S);a=json.loads(m[1])
a[0][4]='La imagen muestra una bebida junto con la conversación. La secuencia de pedidos y los cambios de participación proceden de la observación de toda la visita.'
a[1][4]='Andrés (≈29) acompaña el habla con la mano. El uso del pitillo para señalar se observó durante la visita; esta imagen por sí sola no demuestra toda esa acción.'
a[2][4]='La mesa comparte el espacio con la barra, la lámpara y el servicio. La música que permitía conversar fue parte de la experiencia del equipo.'
a[3][4]='Carlos (≈52), Patricia (≈48), Valentina (≈28) y Andrés (≈29): nombres ficticios y edades estimadas. La foto permite situarlos, pero no confirma parentesco ni nivel socioeconómico.'
s=s[:m.start()]+'const photos='+json.dumps(a,ensure_ascii=False)+';'+s[m.end():];p.write_text(s,encoding='utf-8')
