from pathlib import Path
import base64
root=Path('presentacion');data=base64.b64encode((root/'assets/fuentes/carta-original.pdf').read_bytes()).decode('ascii');(root/'assets/fuentes/carta-data.js').write_text('window.YUMI_CARTA_PDF_BASE64="'+data+'";',encoding='ascii')
p=root/'index.html';s=p.read_text(encoding='utf-8').replace('<a href="assets/fuentes/carta-original.pdf" download="Carta-Yumi-Yumi.pdf">↓ Descargar carta</a>','<button id="download-menu" type="button" aria-label="Guardar la carta en PDF">↓ Descargar carta</button><span id="download-status" role="status" aria-live="polite"></span>');s=s.replace('app.js?v=7-final','app.js?v=7-download').replace('estilos.css?v=7-final','estilos.css?v=7-download');p.write_text(s,encoding='utf-8')
p=root/'app.js';s=p.read_text(encoding='utf-8');anchor='let tilesPromise;'
code='''// A download is an explicit save action, never a navigation to the PDF.
let menuBytesPromise;
function menuBytes(){
 if(!menuBytesPromise)menuBytesPromise=new Promise((resolve,reject)=>{
  const read=()=>{try{const raw=atob(window.YUMI_CARTA_PDF_BASE64);const bytes=Uint8Array.from(raw,c=>c.charCodeAt(0));delete window.YUMI_CARTA_PDF_BASE64;resolve(bytes)}catch(e){reject(e)}};
  const script=document.createElement('script');script.src='assets/fuentes/carta-data.js';script.onload=read;script.onerror=()=>{menuBytesPromise=null;reject(Error('No se pudo cargar la carta'))};document.head.append(script);
 });return menuBytesPromise;
}
async function downloadMenu(e){
 e.preventDefault();e.stopPropagation();const button=$('#download-menu'),status=$('#download-status');button.disabled=true;status.textContent='';
 let handle=null;
 try{
  // Request the native picker while the click still has user activation.
  if(typeof window.showSaveFilePicker==='function'){
   try{handle=await window.showSaveFilePicker({suggestedName:'Carta-Yumi-Yumi.pdf',types:[{description:'Documento PDF',accept:{'application/pdf':['.pdf']}}]})}
   catch(err){if(err.name==='AbortError')return;if(!['SecurityError','NotAllowedError','NotSupportedError'].includes(err.name))throw err;}
  }
  button.textContent='Guardando…';const bytes=await menuBytes();
  if(handle){const stream=await handle.createWritable();await stream.write(new Blob([bytes],{type:'application/pdf'}));await stream.close();status.textContent='PDF guardado';}
  else{
   // Binary MIME prevents the PDF viewer from taking over the presentation.
   const url=URL.createObjectURL(new Blob([bytes],{type:'application/octet-stream'}));const link=document.createElement('a');link.href=url;link.download='Carta-Yumi-Yumi.pdf';link.style.display='none';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);status.textContent='Descarga iniciada';
  }
 }catch(err){console.warn('Guardar carta:',err);status.textContent='No se pudo guardar. Inténtalo de nuevo.';}
 finally{button.disabled=false;button.textContent='↓ Descargar carta';}
}
$('#download-menu').addEventListener('click',downloadMenu);
'''
s=s.replace(anchor,code+'\n'+anchor);p.write_text(s,encoding='utf-8')
p=root/'scripts/empaquetar-v7.py';s=p.read_text(encoding='utf-8');s=s.replace('"assets/fuentes/carta-original.pdf",','"assets/fuentes/carta-original.pdf","assets/fuentes/carta-data.js",');p.write_text(s,encoding='utf-8')
