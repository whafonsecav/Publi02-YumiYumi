from pathlib import Path
p=Path('presentacion/index.html');s=p.read_text(encoding='utf-8')
s=s.replace('<h3>Oído</h3></div>','<h3>Oído</h3><span class="sensory-mini mini-wave"><i></i><i></i><i></i><i></i><i></i></span></div>')
s=s.replace('<h3>Tacto</h3></div>','<h3>Tacto</h3><span class="sensory-mini mini-soft"><i></i><i></i></span></div>')
s=s.replace('<h3>Olfato</h3></div>','<h3>Olfato</h3><span class="sensory-mini mini-air"><i></i><i></i><i></i></span></div>')
s=s.replace('<h3>Gusto</h3></div>','<h3>Gusto</h3><span class="sensory-mini mini-taste"><i></i><i></i></span></div>')
p.write_text(s,encoding='utf-8')
