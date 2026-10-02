from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
import json, math, shutil, time, base64, sys
from PIL import Image
from io import BytesIO
root=Path.cwd(); ref=Path(r'C:\Users\willi\OneDrive\Desktop\04. Recoevo\RECOEVO_Estudio_Campo\05_Presentacion'); target=root/'presentacion'; v2=target/'assets/v2'; lib=target/'lib'; cache=target/'datos/v2_tile_cache'
v2.mkdir(parents=True,exist_ok=True); lib.mkdir(parents=True,exist_ok=True); cache.mkdir(parents=True,exist_ok=True)
for name in ('maplibre-gl.js','maplibre-gl.css','gsap.min.js'): shutil.copy2(ref/'lib'/name,lib/name)
# Reuse only complete global levels 0-3 from the established offline pack.
old_index=json.loads((ref/'media/tiles/pack.json').read_text(encoding='utf-8')); old_bin=(ref/'media/tiles/pack.bin').read_bytes(); tiles={}
for key,(offset,length) in old_index.items():
    z=int(key.split('/')[0])
    if z<=3:
        b=old_bin[offset:offset+length]
        if not (b.startswith(b'\xff\xd8') and b.endswith(b'\xff\xd9')): raise ValueError('Invalid source JPEG '+key)
        tiles[key]=b
# Global complete imagery at z4–5; regional tiles around Yumi Yumi at z6–18.
lon,lat=-74.0537016,4.6686545
def xy(z,lon,lat):
    n=1<<z; x=int((lon+180)/360*n); lr=math.radians(lat); y=int((1-math.asinh(math.tan(lr))/math.pi)/2*n); return max(0,min(n-1,x)),max(0,min(n-1,y))
requests=[]; coverage={}
for z in (4,5):
    coords=[(z,y,x) for y in range(1<<z) for x in range(1<<z)]; requests.extend(coords); coverage[str(z)]={'type':'global','tiles_expected':len(coords),'x_range':[0,(1<<z)-1],'y_range':[0,(1<<z)-1]}
for z in range(6,19):
    cx,cy=xy(z,lon,lat); xr=[max(0,cx-6),min((1<<z)-1,cx+6)]; yr=[max(0,cy-4),min((1<<z)-1,cy+4)]
    coords=[(z,y,x) for y in range(yr[0],yr[1]+1) for x in range(xr[0],xr[1]+1)]; requests.extend(coords); coverage[str(z)]={'type':'regional','tiles_expected':len(coords),'center_xy':[cx,cy],'x_range':xr,'y_range':yr}
base='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
def fetch(coord):
    z,y,x=coord; key=f'{z}/{y}/{x}'; fp=cache/f'{z}-{y}-{x}.jpg'
    if fp.exists() and fp.stat().st_size>0: return key,fp.read_bytes()
    url=base.format(z=z,y=y,x=x); err=None
    for attempt in range(4):
        try:
            req=Request(url,headers={'User-Agent':'YumiYumi-Presentation/1.0 (offline educational presentation)'})
            with urlopen(req,timeout=35) as resp: data=resp.read()
            if not data.startswith(b'\xff\xd8'): raise ValueError(f'Not a JPEG ({url}): {data[:40]!r}')
            im=Image.open(BytesIO(data));
            if im.size!=(256,256): raise ValueError(f'Unexpected tile size {im.size} at {key}')
            fp.write_bytes(data); return key,data
        except Exception as e:
            err=e; time.sleep(0.5*(attempt+1))
    raise RuntimeError(f'Failed {key}: {err}')
print(f'Downloading {len(requests)} Esri tiles: global z4-5, regional z6-18',flush=True)
with ThreadPoolExecutor(max_workers=12) as pool:
    futures=[pool.submit(fetch,c) for c in requests]
    for i,f in enumerate(as_completed(futures),1):
        k,b=f.result(); tiles[k]=b
        if i%200==0 or i==len(futures): print(f'{i}/{len(futures)} tiles',flush=True)
# Deterministic compact binary layout in memory; all source assets remain untouched.
keys=sorted(tiles,key=lambda k:tuple(map(int,k.split('/')))); packed=bytearray(); index={}; by_level={}
for key in keys:
    data=tiles[key]; index[key]=[len(packed),len(data)]; packed.extend(data); z=key.split('/')[0]; by_level[z]=by_level.get(z,0)+len(data)
encoded=base64.b64encode(packed).decode('ascii'); idx_json=json.dumps(index,separators=(',',':'))
js='''/* Offline Yumi Yumi imagery pack. Sources: reused global z0-3 tiles from RECOEVO pack; Esri World_Imagery z4-18. */\n(function(g){\n  const index='''+idx_json+''';\n  const base64='''+json.dumps(encoded)+''';\n  let bytes=null;\n  function getBytes(){if(bytes)return bytes;const s=atob(base64);bytes=new Uint8Array(s.length);for(let i=0;i<s.length;i++)bytes[i]=s.charCodeAt(i);return bytes;}\n  const dataURLs={};\n  for(const k of Object.keys(index))Object.defineProperty(dataURLs,k,{enumerable:true,configurable:false,get(){const [o,n]=index[k],b=getBytes().subarray(o,o+n);let bin='';for(let i=0;i<b.length;i+=0x8000)bin+=String.fromCharCode(...b.subarray(i,Math.min(i+0x8000,b.length)));return 'data:image/jpeg;base64,'+btoa(bin);}});\n  function registerMapLibre(lib=g.maplibregl){if(!lib||typeof lib.addProtocol!=='function')throw new Error('MapLibre GL must be loaded before registering offline tiles');lib.addProtocol('offline',({url},ctrl)=>{if(ctrl&&ctrl.signal.aborted)return Promise.reject(new Error('aborted'));const key=url.replace(/^offline:\/\//,'');const item=index[key];if(!item)return Promise.reject(new Error('Offline tile missing: '+key));const [o,n]=item;return Promise.resolve({data:getBytes().slice(o,o+n).buffer});});}\n  g.YUMI_MAP_TILE_PACK={format:'jpeg-concat-base64-v1',index,base64,tiles:dataURLs,registerMapLibre,getTileDataURL:k=>dataURLs[k]||null,registerProtocol:registerMapLibre};\n  g.YUMI_MAP_TILES=dataURLs;\n})(window);\n'''
js_path=v2/'map-tiles.js'; js_path.write_text(js,encoding='utf-8')
manifest={'format':'jpeg-concat-base64-v1','path':'assets/v2/map-tiles.js','raw_pack_bytes':len(packed),'base64_bytes':len(encoded),'javascript_bytes':js_path.stat().st_size,'tile_count':len(tiles),'min_zoom':0,'max_zoom':18,'levels':{},'coverage_by_level':coverage,'pin_wgs84':{'longitude':lon,'latitude':lat},'attribution':'Esri, Maxar, Earthstar Geographics, and the GIS User Community.','notes':['z0–3 reused from complete global pyramid in reference pack.','z4–5 downloaded from Esri World_Imagery for full-world transition.','z6–18 downloaded from Esri World_Imagery in a 13×9 tile rectangle centered on Yumi Yumi (clamped at world edges).','map-tiles.js includes a byte index and base64 pack for file:// use; `YUMI_MAP_TILE_PACK.registerMapLibre(maplibregl)` registers offline://z/y/x. `YUMI_MAP_TILES` exposes lazy dataURL getters keyed z/y/x.']}
for z in range(0,19):
    n=1<<z; entries=[k for k in index if int(k.split('/')[0])==z]
    coords=[tuple(map(int,k.split('/')[1:])) for k in entries]
    manifest['levels'][str(z)]={'tile_count':len(entries),'bytes':by_level.get(str(z),0),'x_range':[min(c[1] for c in coords),max(c[1] for c in coords)],'y_range':[min(c[0] for c in coords),max(c[0] for c in coords)],'coverage':coverage.get(str(z),{'type':'global','tiles_expected':len(entries),'x_range':[0,n-1],'y_range':[0,n-1]})}
(v2/'map-tiles-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'tiles':len(tiles),'raw_bytes':len(packed),'base64_bytes':len(encoded),'js_bytes':js_path.stat().st_size,'levels':{z:v['tile_count'] for z,v in manifest['levels'].items()},'regional_bbox':{z:v for z,v in coverage.items() if v['type']=='regional'}},ensure_ascii=False),flush=True)
# Clean only this task's derived tile cache.
for f in cache.iterdir(): f.unlink()
cache.rmdir()
