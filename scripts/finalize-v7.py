from pathlib import Path
for name in ['index.html','app.js']:
 p=Path('presentacion')/name;s=p.read_text(encoding='utf-8').replace('dos edades compartiendo un plan','personas de edades distintas compartiendo un plan');
 if name=='index.html':s=s.replace('estilos.css?v=7','estilos.css?v=7-final').replace('app.js?v=7','app.js?v=7-final')
 p.write_text(s,encoding='utf-8')
