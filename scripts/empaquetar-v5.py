from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root=Path("presentacion")
files=[root/p for p in ["index.html","estilos.css","app.js","INSTRUCCIONES.txt","assets/promo-3x1.webp","assets/video/portada-poster.jpg","assets/fuentes/carta-original.pdf","assets/mapa/zona-t-satelite.jpg","assets/logos/Logo YumiYumi.png","assets/logos/politecnico-w.webp"]]
for folder in ["lib","assets/fotos","assets/v2"]:
 files.extend(p for p in (root/folder).rglob("*") if p.is_file() and p.suffix not in [".log"])
with ZipFile("Yumi_Yumi_Presentacion_v5.zip","w",ZIP_DEFLATED,compresslevel=6) as z:
 for p in files: z.write(p,Path("Yumi_Yumi")/p.relative_to(root))
print(f"{len(files)} archivos. ZIP {Path('Yumi_Yumi_Presentacion_v5.zip').stat().st_size/1024/1024:.1f} MB")



