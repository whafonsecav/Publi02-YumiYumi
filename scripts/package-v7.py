from pathlib import Path
for name in ['index.html','app.js']:
 p=Path('presentacion')/name;s=p.read_text(encoding='utf-8').replace('Cuatro personas de dos edades','Personas de edades distintas').replace('personas de dos edades distintas','personas de edades distintas').replace('grupo de dos edades','grupo de edades distintas');p.write_text(s,encoding='utf-8')
p=Path('presentacion/INSTRUCCIONES.txt');s=p.read_text(encoding='utf-8-sig').replace('VERSIÓN 6','VERSIÓN 7').replace('14 láminas','15 láminas').replace('Carta original: PDF consultable desde la lámina de la oferta.','Ver carta / Descargar carta: enlaces al PDF en el pie de la lámina de la oferta.')
a=s.index('RECORRIDO');b=s.index('Nombres ficticios',a)
s=s[:a]+'''RECORRIDO
Portada, ubicación, llegada, cinco sentidos y carta.
Evaluar: perfiles, nueve observaciones y doce hipótesis escritas como preguntas completas.
Analizar: nueve lecturas en lenguaje sencillo, siguiendo el mismo orden de las observaciones.
Registrar: una sola lámina con bebidas, nueve insumos de interacción y cuatro fotos ampliables.
Concluir: nueve resultados y contraste de las doce hipótesis.
Síntesis completa de hechos, análisis, registros e interpretación final; agradecimiento.

'''+s[b:];p.write_text(s,encoding='utf-8')
p=Path('presentacion/scripts/empaquetar-v6.py');Path('presentacion/scripts/empaquetar-v7.py').write_text(p.read_text(encoding='utf-8-sig').replace('Presentacion_v6','Presentacion_v7'),encoding='utf-8')
