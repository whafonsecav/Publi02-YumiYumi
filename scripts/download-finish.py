from pathlib import Path
p=Path('presentacion/app.js');s=p.read_text(encoding='utf-8').replace('const old=current;current=n;','const old=current;current=n;$("#download-status").textContent="";');p.write_text(s,encoding='utf-8')
p=Path('presentacion/INSTRUCCIONES.txt');s=p.read_text(encoding='utf-8').replace('Ver carta / Descargar carta: enlaces al PDF en el pie de la lámina de la oferta.','Ver carta: abre el PDF. Descargar carta: guarda el PDF sin navegar fuera de la presentación; permite elegir destino cuando el navegador lo admite.');p.write_text(s,encoding='utf-8')
