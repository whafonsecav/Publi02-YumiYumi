from pathlib import Path
p=Path('presentacion/INSTRUCCIONES.txt');s=p.read_text(encoding='utf-8-sig').replace('VERSIÓN 4','VERSIÓN 5')
s=s.replace('Analizar: ocho lecturas que conectan las observaciones con su utilidad.','Analizar: ocho lecturas sobre las interacciones de las personas con las bebidas.')
s=s.replace('Registrar: secuencia de bebidas y cuatro fotografías ampliables, vinculadas con los datos.','Registrar: una sola lámina con secuencia de bebidas, seis insumos de interacción y cuatro fotos ampliables.')
s=s.replace('Concluir: seis deducciones y contraste de seis hipótesis.','Concluir: las cuatro personas, sus vínculos y el contraste de ocho hipótesis.\nSíntesis de las cuatro fases antes del agradecimiento.')
p.write_text(s,encoding='utf-8')
p=Path('presentacion/scripts/empaquetar-v4.py');Path('presentacion/scripts/empaquetar-v5.py').write_text(p.read_text(encoding='utf-8-sig').replace('Presentacion_v4','Presentacion_v5'),encoding='utf-8')
