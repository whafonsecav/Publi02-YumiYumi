import pathlib,json,re,shutil
base=pathlib.Path("presentacion"); data=json.loads((base/"datos"/"notas-transcripcion.json").read_text(encoding="utf8"))
out=base/"assets"/"audio";out.mkdir(exist_ok=True)
for i,n in enumerate(data):
    target=f"n{i+1:02d}.ogg"
    shutil.copyfile(pathlib.Path("assets")/"Audios Notas"/n["file"],out/target)
    m=re.search(r"at (\d+)\.(\d+)\.(\d+) PM",n["file"])
    n["clock"]=f"{int(m[1])+12:02}:{m[2]}:{m[3]}"
    n["path"]="assets/audio/"+target
(base/"datos"/"audios.json").write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding="utf8")
inv=json.loads((base/"datos"/"inventario-medios.json").read_text(encoding="utf-8-sig"))
print("folio keys",list(inv["pdfs"]["carta"]))
folios=inv["pdfs"]["carta"].get("reader_folios",[])
print("folios",len(folios))
(base/"libro.js").write_text("window.CARTA_FOLIOS = "+json.dumps(folios,ensure_ascii=False)+";",encoding="utf8")
(base/"audios.js").write_text("window.AUDIO_NOTES = "+json.dumps(data,ensure_ascii=False)+";",encoding="utf8")



