from pathlib import Path
from PIL import Image
p=Path("presentacion")
(p/"assets/v2/carta").mkdir(parents=True,exist_ok=True)
for name,folio,box in [
 ("frutas",6,(50,352,957,952)),
 ("cremosos",9,(43,720,958,1220)),
 ("sin-licor",11,(35,15,965,1240)),
 ("comida",1,(35,30,966,1070))]:
 im=Image.open(p/f"assets/carta/folios/folio-{folio:02}.webp")
 im.crop(box).save(p/f"assets/v2/carta/{name}.webp",quality=94)
(p/".revision/v1").mkdir(parents=True,exist_ok=True)
import shutil
for f in ["index.html","estilos.css","app.js"]:
 shutil.copy2(p/f,p/".revision/v1"/f)
print("Recortes de secciones completos y respaldo de la versión anterior listos.")

