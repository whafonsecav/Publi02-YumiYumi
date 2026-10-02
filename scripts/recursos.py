import urllib.request,pathlib,re,json
out=pathlib.Path("presentacion/assets")
(out/"mapa").mkdir(parents=True,exist_ok=True)
(out/"fonts").mkdir(exist_ok=True)
url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-74.0570%2C4.6668%2C-74.0504%2C4.6705&bboxSR=4326&imageSR=4326&size=1600%2C900&format=jpg&f=image"
try:
 data=urllib.request.urlopen(url,timeout=30).read()
 if data[:2]!=b"\xff\xd8": raise ValueError(data[:300])
 (out/"mapa"/"zona-t-satelite.jpg").write_bytes(data)
 print("mapa",len(data))
except Exception as e: print("MAP ERROR",str(e))
cssurl="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap"
try:
 css=urllib.request.urlopen(urllib.request.Request(cssurl,headers={"User-Agent":"Mozilla/5.0"}),timeout=30).read().decode()
 urls=list(dict.fromkeys(re.findall(r"url\((https:[^)]+)\)",css)))
 for i,u in enumerate(urls):
  ext=u.split(".")[-1]
  (out/"fonts"/f"font-{i}.{ext}").write_bytes(urllib.request.urlopen(u,timeout=30).read())
  css=css.replace(u,f"assets/fonts/font-{i}.{ext}")
 pathlib.Path("presentacion/fonts.css").write_text(css,encoding="utf8")
 print("fonts",len(urls))
except Exception as e: print("FONT ERROR",str(e))

