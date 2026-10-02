import sys, types, os, pathlib, subprocess, json, time, re
# Decode through the installed FFmpeg executable. PyAV is not loaded.
sys.modules["av"] = types.ModuleType("av")
import numpy as np
dll_handles = []
nvidia = pathlib.Path(sys.executable).parent / "Lib" / "site-packages" / "nvidia"
for dll in nvidia.rglob("*.dll"):
    directory = str(dll.parent)
    if directory not in os.environ.get("PATH", ""):
        os.environ["PATH"] = directory + os.pathsep + os.environ.get("PATH", "")
        dll_handles.append(os.add_dll_directory(directory))
from faster_whisper import WhisperModel
root = pathlib.Path.cwd()
out = root / "presentacion" / "datos"
out.mkdir(parents=True, exist_ok=True)
print("Cargando large-v3 CUDA", flush=True)
model = WhisperModel("large-v3", device="cuda", compute_type="float16", local_files_only=True)
print("Modelo listo", flush=True)
def decode(file):
    raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", str(file), "-f", "f32le", "-ac", "1", "-ar", "16000", "-"])
    return np.frombuffer(raw, np.float32).copy()
def order(file):
    m = re.search(r"at (\d+)\.(\d+)\.(\d+) PM", file.name)
    return tuple(map(int,m.groups())) if m else (0,0,0)
files = sorted((root/"assets"/"Audios Notas").glob("*.ogg"),key=order)
all_notes=[]
for index,file in enumerate(files):
    print("NOTA",index+1,file.name,flush=True)
    wave = decode(file)
    segments,info = model.transcribe(wave, language="es", beam_size=5, condition_on_previous_text=False, initial_prompt="Observaciones de campo en el gastrobar Yumi Yumi de Bogota. Cuatro personas en una mesa. Bebidas, cocteles, whisky, gin tonic, margarita, mojito, promocion dos por uno.")
    data={"file":file.name,"duration":len(wave)/16000,"segments":[]}
    for s in segments:
        entry={"start":round(s.start,2),"end":round(s.end,2),"text":s.text.strip(),"avg_logprob":round(s.avg_logprob,3),"no_speech_prob":round(s.no_speech_prob,3)}
        data["segments"].append(entry)
        print(f"[{s.start:.1f}-{s.end:.1f}] {s.text}",flush=True)
    all_notes.append(data)
    (out/"notas-transcripcion.json").write_text(json.dumps(all_notes,ensure_ascii=False,indent=2),encoding="utf-8")
    (out/"notas-transcripcion.txt").write_text("\n\n".join(n["file"]+"\n"+"\n".join(f'[{s["start"]:.1f}-{s["end"]:.1f}] {s["text"]}' for s in n["segments"]) for n in all_notes),encoding="utf-8")
print("NOTAS COMPLETAS",flush=True)
file=root/"assets"/"Presentacion Calse y Tarea"/"Grabacion Clase.m4a"
wave=decode(file)
records=[]
# Independent five-minute chunks keep timestamps and limit hallucinations across pauses.
for start in range(0,len(wave),16000*300):
    offset=start/16000
    print("CLASE",offset,flush=True)
    segments,info=model.transcribe(wave[start:start+16000*300],language="es",beam_size=5,condition_on_previous_text=False,initial_prompt="Clase de Publicidad 2 del Politecnico Grancolombiano. Proceso creativo: inspiracion, alineacion, ideacion. Metodologia de observacion: evaluar, analizar, registrar y concluir. Henry y Karen, Goodfellas, Copacabana.")
    for s in segments:
        records.append({"start":round(offset+s.start,2),"end":round(offset+s.end,2),"text":s.text.strip(),"avg_logprob":round(s.avg_logprob,3)})
    (out/"clase-transcripcion.json").write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding="utf-8")
    (out/"clase-transcripcion.txt").write_text("\n".join(f'[{s["start"]:.1f}-{s["end"]:.1f}] {s["text"]}' for s in records),encoding="utf-8")
print("TODO COMPLETO",flush=True)

