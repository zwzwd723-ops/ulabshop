(() => {
'use strict';
const categories=globalThis.ULAB_SUPPLIER_SCHEMA.categories;
const DF=globalThis.ULAB_SUPPLIER_DICTIONARY_FORM,D=globalThis.ULAB_SUPPLIER_DICTIONARY;
const KEY='ulab-supplier-form-v1', SF=globalThis.ULAB_SELECTION_FORM, LAST=3;
const titles=['商品信息','商品参数与适配声明','报价与样品'];
const id=()=>globalThis.crypto?.randomUUID?.()||'p-'+Date.now()+'-'+Math.random().toString(36).slice(2,8);
const freshPart=()=>({id:id(),base:{},specs:{fit_mode:'pending'},tech:{},supply:{},sample:{},fits:[]});
let state={company:{},parts:[freshPart()],step:0,active:0,declarations:{},updatedAt:null};
try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved?.parts?.length&&saved.parts.every(p=>p.id&&p.base&&p.tech&&p.specs&&p.supply&&p.sample)){state={...state,...saved};state.active=Math.min(state.active,state.parts.length-1);state.step=Math.max(0,Math.min(5,state.step));}}catch{}
const migrated=DF.migrate(state);
let selectionMigrated=false;
if(state.flowVersion!=='selection-v1'){
 state.step=({0:0,1:0,2:1,3:2,4:2,5:3})[state.step]??0;
 if(!state.company.contact_method){const key=['phone','wechat','email'].find(k=>String(state.company[k]||'').trim());state.company.contact_method=key||'phone';state.company.contact_value=key?state.company[key]:'';}
 for(const p of state.parts){
  p.specs.fit_mode||='pending';
  p.supply.currency=({'CNY 人民币':'CNY','USD 美元':'USD','EUR 欧元':'EUR','其他':'other'})[p.supply.currency]||p.supply.currency||'';
  p.supply.unit=({'件':'piece','套':'set','颗':'switch','张':'sheet','米':'meter','其他':'other'})[p.supply.unit]||p.supply.unit||'';
  p.supply.quote_status=p.supply.price!==''&&p.supply.price!=null?'quoted':'';
  if(p.sample.status&&!['ready','make','unavailable'].includes(p.sample.status)){p.sample.previous_status=p.sample.status;p.sample.status=p.sample.status==='暂未准备'?'make':'ready';}
 }
 state.declarations.selection_truth=false;state.flowVersion='selection-v1';selectionMigrated=true;
}
const singlePageMigrated=state.layoutVersion!=='single-form-v1'||state.step!==0;
state.step=0;state.layoutVersion='single-form-v1';
let errors=[],db,attachments=[],timer,objectURLs=[],busy=false,attachmentsReady=false,attachmentBusy=false,advancedOpen={};
const $=s=>document.querySelector(s),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const checkMark='<span class="u-check-box" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg></span>';
const activePart=()=>state.parts[state.active];
const cat=p=>categories.find(c=>c.id===p.base.category);
const schema=(path,label,type='text',required=true,extra={})=>({path,label,type,required,...extra});
const fieldsFor=(step,p=activePart())=>(step===0?[...SF.basic(),...SF.contact(state.company)]:step===1?SF.technical(p):step===2?[...SF.supply(p),...SF.sample(p)]:[]).filter(f=>!f.when||f.when(p));
const allFields=(p=activePart())=>[...fieldsFor(0,p),...fieldsFor(1,p),...fieldsFor(2,p)];
const selectionAttachments=()=>attachments.filter(a=>state.parts.some(p=>p.id===a.owner)&&['images','specification','evidence'].includes(a.slot));
const read=(path,p=activePart())=>{const [scope,key]=path.split('.');return scope==='company'?state.company[key]:scope.startsWith('fits:')?p.fits?.find(r=>r.id===scope.slice(5))?.[key]:p[scope]?.[key];};
const put=(path,value,p=activePart())=>{const [scope,key]=path.split('.');if(scope==='company')state.company[key]=value;else if(scope.startsWith('fits:')){const row=p.fits?.find(r=>r.id===scope.slice(5));if(row)row[key]=value;}else p[scope][key]=value;};
const fieldId=path=>'field-'+path.replace(/[.:]/g,'-');
const displayValue=(f,p=activePart())=>{const raw=read(f.path,p);if(!['select','multiselect'].includes(f.type))return raw;const values=Array.isArray(raw)?raw:raw?[raw]:[];return values.map(v=>{const o=f.options.find(o=>(o.value??o)===v);return o?.label||(typeof o==='string'?o:v+'（已不在当前字典中）');}).join('、');};
function toast(message,error=false){clearTimeout(timer);$('#toast').textContent=message;$('#toast').hidden=false;$('#toast').classList.toggle('error',error);timer=setTimeout(()=>$('#toast').hidden=true,4500);}
function persist(show=false){try{state.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state));$('#save-state').textContent='草稿已保存 · '+new Date(state.updatedAt).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})+' · 仅本机';if(show)toast('草稿已保存在此浏览器');}catch{ $('#save-state').textContent='草稿未能保存，请导出资料备份';if(show)toast('本机空间或浏览器存储不可用，请导出草稿',true);}}
function fieldHTML(f,p=activePart()){
 const value=read(f.path,p)??'',fid=fieldId(f.path),err=errors.find(e=>e.path===f.path&&(!e.part||e.part===p.id));
 const attrs=`id="${fid}" data-path="${esc(f.path)}" ${f.disabled?'disabled':''} ${f.required?'required aria-required="true"':''} aria-describedby="${fid}-hint ${fid}-error" ${err?'aria-invalid="true"':''}`;
 let control;
 if(f.type==='multiselect')control=`<fieldset class="dictionary-options" id="${fid}" aria-describedby="${fid}-hint ${fid}-error" ${f.required?'aria-required="true"':''} ${err?'aria-invalid="true"':''}><legend class="sr-only">${esc(f.label)}</legend>${f.options.map(o=>`<label class="u-check"><input type="checkbox" data-multi="${esc(f.path)}" value="${esc(o.value)}" ${(Array.isArray(value)?value:[]).includes(o.value)?'checked':''}>${checkMark}<span>${esc(o.label)}</span></label>`).join('')}</fieldset>`;
 else if(f.type==='select')control=`<select class="u-select" ${attrs}><option value="">${f.disabled?'请先完成上级选择':'请选择'}</option>${f.options.map(o=>{const v=typeof o==='string'?o:o.value,l=typeof o==='string'?o:o.label;return `<option value="${esc(v)}" ${value===v?'selected':''}>${esc(l)}</option>`;}).join('')}</select>`;
 else if(f.type==='textarea')control=`<textarea class="u-input" ${attrs} rows="3" maxlength="6000" placeholder="${esc(f.placeholder||'')}">${esc(value)}</textarea>`;
 else control=`<input class="u-input" ${attrs} type="${f.type}" value="${esc(value)}" ${f.type==='number'?`min="${f.min??0}" ${f.max!==undefined?`max="${f.max}"`:''} step="${f.step??'any'}"`:'maxlength="500"'} placeholder="${esc(f.placeholder||'')}" ${f.type==='email'?'autocomplete="email"':f.type==='tel'?'autocomplete="tel"':''}>`;
 return `${f.group?`<div class="section-title-row"><h3 class="section-head">${esc(f.group)}</h3>${f.relationId?`<button type="button" class="danger-button u-button u-button--quiet u-button--sm" data-remove-fit="${esc(f.relationId)}">删除此关系</button>`:''}</div>`:''}<div class="field ${f.short?'short':''} ${f.unit?'has-unit':''}" data-field="${esc(f.path)}"><label class="u-field-label" for="${fid}">${esc(f.label)}${f.required?'':'<span class="optional">选填</span>'}</label><p id="${fid}-hint" class="hint u-field-hint" ${f.hint?'':'hidden'}>${esc(f.hint||'')}</p><div class="control">${control}${f.unit?`<span class="unit">${esc(f.unit)}</span>`:''}</div><p id="${fid}-error" class="error-text u-field-hint u-field-error" ${err?'':'hidden'}>${esc(err?.message||'')}</p></div>`;
}
function renderNav(){
 $('#parts-list').innerHTML=state.parts.map((p,i)=>`<button type="button" class="part-switch u-button u-button--secondary u-button--sm ${i===state.active?'active':''}" data-part="${i}" ${i===state.active?'aria-pressed="true"':'aria-pressed="false"'}><span class="part-dot" aria-hidden="true"></span><span class="part-name">${esc(p.base.name||'未命名商品 '+String(i+1).padStart(2,'0'))}</span><small>${esc(p.base.version||'草稿')}</small></button>`).join('');
 $('#part-count').textContent=String(state.parts.length).padStart(2,'0');
}
function errorSummary(){return errors.length?`<div class="error-summary u-alert u-alert--error" role="alert" tabindex="-1"><p>还需要补充或修正 ${errors.length} 项资料</p>${errors.map((e,i)=>`<button type="button" data-error="${i}">${esc(e.partLabel?e.partLabel+' · ':'')}${esc(e.label)}：${esc(e.message)}</button>`).join('')}</div>`:'';}
const uploadSlots=p=>[
 {key:'images',owner:p.id,label:'商品图片',hint:'提供能看清商品外观的图片，可添加多张。',required:true},
 {key:'specification',owner:p.id,label:'规格书 / 尺寸图 / 产品目录',hint:'已有资料可一并上传，初审阶段不强制提供。',required:false},
 {key:'evidence',owner:p.id,label:'测试资料或其他补充文件',hint:'有助于了解商品特点及适配情况的现有资料。',required:false}
];
function uploadHTML(p,keys){
 return uploadSlots(p).filter(slot=>!keys||keys.includes(slot.key)).map(slot=>{
  const files=attachments.filter(a=>a.owner===slot.owner&&a.slot===slot.key);
  const formats=slot.key==='images'?'JPG、PNG、WebP':'PDF、图片、STEP、DXF、XLSX、ZIP 等';
  return `<section class="upload-field" id="upload-${slot.key}"><h3>${slot.label}${slot.required?'':'<span class="optional">选填</span>'}</h3><p>${slot.hint} ${formats}；单个文件不超过 20 MB，全部附件不超过 100 MB。</p><label class="upload-zone"><span class="plus" aria-hidden="true">＋</span><span>选择文件，可多选</span><input type="file" multiple data-slot="${slot.key}" data-owner="${slot.owner}" aria-label="${slot.label}" accept="${slot.key==='images'?'.jpg,.jpeg,.png,.webp':'.pdf,.jpg,.jpeg,.png,.webp,.step,.stp,.dxf,.xlsx,.zip'}"></label><div class="files">${files.map(a=>{
   let visual=`<span class="file-icon">${esc(a.name.split('.').pop().toUpperCase())}</span>`;
   if(a.type.startsWith('image/')){const url=URL.createObjectURL(a.blob);objectURLs.push(url);visual=`<img src="${url}" alt="${esc(a.name)} 预览">`;}
   return `<div class="file-row">${visual}<div class="file-copy"><span>${esc(a.name)}</span><small>${size(a.size)} · 已保存在本机</small></div><button type="button" class="u-button u-button--quiet u-button--sm" data-remove-file="${a.id}" aria-label="删除附件 ${esc(a.name)}">删除</button></div>`;
  }).join('')}</div></section>`;
 }).join('');
}
function size(n){return n>=1048576?(n/1048576).toFixed(1)+' MB':Math.max(1,Math.round(n/1024))+' KB';}
function updateBusyControls(){
 $('#export-draft').disabled=busy||attachmentBusy||!attachmentsReady;
 $('#next').disabled=busy||attachmentBusy||!attachmentsReady;
 document.querySelectorAll('[data-slot],[data-remove-file],#remove-part').forEach(el=>el.disabled=busy||attachmentBusy||!attachmentsReady);
}
function render(){
 const previousDetails=$('#optional-details');
 if(previousDetails?.dataset.owner)advancedOpen[previousDetails.dataset.owner]=previousDetails.open;
 objectURLs.forEach(URL.revokeObjectURL);objectURLs=[];renderNav();
 const p=activePart(),basic=SF.basic(),technical=fieldsFor(1,p);
 const extra=[...basic,...technical].filter(f=>f.advanced);
 const hasExtraError=extra.some(f=>errors.some(e=>e.path===f.path&&(!e.part||e.part===p.id)));
 let content=`<h2 id="panel-title" class="sr-only">填写商品资料</h2>${errorSummary()}`;
 if(state.parts.length>1)content+=`<div class="inline-tools"><span class="part-tag u-badge">商品 ${String(state.active+1).padStart(2,'0')} · ${esc(p.base.name||'未命名商品')}</span><button type="button" class="danger-button u-button u-button--quiet u-button--sm" id="remove-part">删除此商品草稿</button></div>`;
 content+='<form id="details-form" novalidate>';
 content+=basic.filter(f=>f.path==='base.category').map(f=>fieldHTML({...f,group:undefined},p)).join('');
 content+=technical.filter(f=>!f.advanced).map(f=>fieldHTML(f,p)).join('');
 content+=basic.filter(f=>!f.advanced&&f.path!=='base.category').map((f,i)=>fieldHTML({...f,group:i===0?'商品介绍':undefined},p)).join('');
 content+=fieldsFor(2,p).map(f=>fieldHTML(f,p)).join('');
 content+=uploadHTML(p,['images']);
 content+=`<details class="optional-details" id="optional-details" data-owner="${esc(p.id)}" ${advancedOpen[p.id]||hasExtraError?'open':''}><summary>补充资料 <span>选填 · 品牌版本、适配说明、规格书等</span></summary><div><p class="section-description supplement-intro">有现成资料时再补充。企业资质与品牌授权在商品初审通过后提供。</p>${extra.map(f=>fieldHTML(f,p)).join('')}${p.specs.fit_mode==='listed'?'<button type="button" id="add-fit" class="outline-button u-button u-button--secondary">＋ 添加适配关系</button>':''}${uploadHTML(p,['specification','evidence'])}</div></details>`;
 content+=SF.contact(state.company).map(f=>fieldHTML(f,p)).join('');
 content+=`<label class="check-field u-check"><input id="${fieldId('declarations.selection_truth')}" type="checkbox" data-declaration="selection_truth" ${state.declarations.selection_truth?'checked':''}>${checkMark}<span>我确认商品和联系资料真实，可用于 ULAB 选品评估；适配信息为供应商声明，须由平台另行验证。</span></label></form>`;
 $('#form-panel').innerHTML=content;
 $('#footer-hint').textContent='草稿自动保存，随时继续';
 bindPanel();updateBusyControls();
}
function go(partIndex=state.active,path){state.step=0;state.active=partIndex;errors=[];persist();render();$('#form-panel').focus({preventScroll:true});$('#form-panel').scrollIntoView({block:'start',behavior:'instant'});if(path){const el=path.startsWith('upload.')?$('#upload-'+path.split('.')[1]):$('#'+fieldId(path));if(el?.closest('details'))el.closest('details').open=true;el?.scrollIntoView({block:'center',behavior:'instant'});(el?.querySelector('input')||el)?.focus({preventScroll:true});}}
function validateField(f,p=activePart()){
 const raw=read(f.path,p),value=String(raw??'').trim();let message='';
 if(f.required&&(!value||Array.isArray(raw)&&!raw.length))message='请填写'+f.label;
 else if(f.type==='multiselect'&&raw!==undefined&&(!Array.isArray(raw)||raw.some(v=>!f.options.some(o=>o.value===v))))message='请重新选择有效的字典选项';
 else if(value&&f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))message='请输入有效邮箱，例如 name@company.com';
 else if(value&&f.type==='tel'&&(value.replace(/\D/g,'').length<6||value.replace(/\D/g,'').length>20))message='请输入有效的电话号码，也可切换为微信或邮箱';
 else if(value&&f.type==='url'){try{const u=new URL(value);if(!['https:','http:'].includes(u.protocol))message='请输入以 https:// 或 http:// 开头的地址';}catch{message='请输入完整网址，例如 https://example.com';}}
 else if(value&&f.type==='number'){const n=Number(value);if(!Number.isFinite(n))message='请输入有效数字';else if(f.min!==undefined&&n<f.min)message='数值不能小于 '+f.min;else if(f.max!==undefined&&n>f.max)message='数值不能大于 '+f.max;else if(f.step===1&&!Number.isInteger(n))message='请输入整数';}
 else if(value&&f.type==='select'&&!f.options.some(o=>(typeof o==='string'?o:o.value)===value))message='请重新选择有效选项';
 if(!message&&f.path==='sample.version'&&value&&value!==String(p.base.version||'').trim())message='样品版本须与本次配件版本一致，或另建配件档案';
 return message?{path:f.path,label:f.label,message,part:f.path.startsWith('company.')?null:p.id}:null;
}
function validateStep(step,p=activePart()){return [...fieldsFor(step,p).map(f=>validateField(f,p)).filter(Boolean),...(step===1?SF.validate(p):[])];}
function validateAll(){
 const all=SF.contact(state.company).map(f=>validateField(f)).filter(Boolean).map(e=>({...e,step:0}));
 state.parts.forEach((p,index)=>{
  for(let step=0;step<LAST;step++)for(const e of validateStep(step,p).filter(e=>!e.path.startsWith('company.')))all.push({...e,step,index,partLabel:p.base.name||'商品 '+(index+1)});
  uploadSlots(p).forEach(slot=>{if(slot.required&&!selectionAttachments().some(a=>a.owner===slot.owner&&a.slot===slot.key))all.push({path:'upload.'+slot.key,label:slot.label,message:'请添加商品图片',part:p.id,index,step:2,partLabel:p.base.name||'商品 '+(index+1)});});
 });
 if(!state.declarations.selection_truth)all.push({path:'declarations.selection_truth',label:'资料确认',message:'请确认商品及联系资料',step:LAST});
 return all;
}
function showFieldError(f){const el=$('#'+fieldId(f.path));if(!el)return;const e=validateField(f);el.setAttribute('aria-invalid',String(Boolean(e)));const note=$('#'+fieldId(f.path)+'-error');note.textContent=e?.message||'';note.hidden=!e;}
function bindPanel(){
 $('#details-form')?.addEventListener('submit',e=>e.preventDefault());
 const optionalDetails=$('#optional-details'),partId=activePart().id;
 optionalDetails?.addEventListener('toggle',()=>{if(optionalDetails.isConnected)advancedOpen[partId]=optionalDetails.open;});
 document.querySelectorAll('[data-path]').forEach(el=>{
  const path=el.dataset.path,f=allFields().find(f=>f.path===path);
  el.addEventListener('input',()=>{if(el.tagName==='SELECT')return;put(path,el.value);persist();if(path==='base.name'||path==='base.version'){renderNav();const tag=$('.part-tag');if(tag)tag.textContent='商品 '+String(state.active+1).padStart(2,'0')+' · '+(activePart().base.name||'未命名商品');}});
  el.addEventListener('blur',()=>{if(f)showFieldError(f);});
  el.addEventListener('change',()=>{
   if(el.tagName!=='SELECT')return;
   if(path==='base.category'&&el.value!==activePart().base.category&&Object.values(activePart().tech).some(v=>String(v).trim())){if(!confirm('更换分类会清除当前分类的专属技术参数。其他商品资料和附件会保留，请重新检查。继续更换？')){el.value=activePart().base.category||'';return;}activePart().tech={};}
   if(path==='base.category'&&el.value!==activePart().base.category)activePart().tech={};
   put(path,el.value);DF.afterChange(path,activePart());if(path==='company.contact_method')state.company.contact_value='';if(path==='base.category')activePart().specs.fit_mode='pending';errors=[];persist();render();$('#'+fieldId(path))?.focus({preventScroll:true});
  });
 });
 document.querySelectorAll('[data-multi]').forEach(el=>el.addEventListener('change',()=>{const path=el.dataset.multi,values=[...document.querySelectorAll('[data-multi]')].filter(x=>x.dataset.multi===path&&x.checked).map(x=>x.value);put(path,values);DF.afterChange(path,activePart());errors=[];persist();render();const focus=[...document.querySelectorAll('[data-multi]')].find(x=>x.dataset.multi===path&&x.value===el.value);focus?.focus({preventScroll:true});}));
 $('#add-fit')?.addEventListener('click',()=>{const p=activePart();p.fits||=[];p.fits.push(DF.freshFit());errors=[];persist();render();const target=$('#'+fieldId('fits:'+p.fits.at(-1).id+'.category'));target?.scrollIntoView({block:'center'});target?.focus({preventScroll:true});});
 document.querySelectorAll('[data-remove-fit]').forEach(el=>el.addEventListener('click',()=>{activePart().fits=activePart().fits.filter(r=>r.id!==el.dataset.removeFit);errors=[];persist();render();}));
 document.querySelectorAll('[data-slot]').forEach(el=>el.addEventListener('change',()=>addFiles(el)));
 document.querySelectorAll('[data-remove-file]').forEach(el=>el.addEventListener('click',async()=>{if(attachmentBusy||busy||!attachmentsReady)return;const fileId=el.dataset.removeFile;attachmentBusy=true;updateBusyControls();try{await dbDelete(fileId);attachments=attachments.filter(a=>a.id!==fileId);toast('附件已从本机草稿中移除');}catch{toast('附件未能移除，请重试',true);}finally{attachmentBusy=false;render();}}));
 $('#remove-part')?.addEventListener('click',async()=>{if(attachmentBusy||busy||!attachmentsReady)return;if(!confirm('删除这款配件的草稿及其附件？联系资料和其他商品会保留。'))return;const pid=activePart().id;attachmentBusy=true;updateBusyControls();try{for(const a of attachments.filter(a=>a.owner===pid))await dbDelete(a.id);attachments=attachments.filter(a=>a.owner!==pid);const currentId=activePart().id,index=state.parts.findIndex(p=>p.id===pid);if(index>=0)state.parts.splice(index,1);const currentIndex=state.parts.findIndex(p=>p.id===currentId);state.active=currentIndex>=0?currentIndex:Math.max(0,Math.min(index-1,state.parts.length-1));errors=[];persist();}catch{toast('删除未完成，请重试',true);}finally{attachmentBusy=false;render();}});
 document.querySelectorAll('[data-error]').forEach(el=>el.addEventListener('click',()=>{const e=errors[Number(el.dataset.error)];if(!e)return;const keep=errors,stableIndex=e.part?state.parts.findIndex(p=>p.id===e.part):state.active;if(stableIndex<0){errors=validateAll();render();return;}state.step=0;state.active=stableIndex;persist();errors=keep;render();const target=e.path.startsWith('upload.')?$('#upload-'+e.path.split('.')[1]):$('#'+fieldId(e.path));if(target?.closest('details'))target.closest('details').open=true;target?.scrollIntoView({block:'center',behavior:'instant'});(target?.querySelector('input')||target)?.focus({preventScroll:true});}));
 document.querySelectorAll('[data-declaration]').forEach(el=>el.addEventListener('change',()=>{state.declarations[el.dataset.declaration]=el.checked;persist();}));
}
function openDB(){return new Promise((resolve,reject)=>{if(!globalThis.indexedDB)return reject(new Error('无法访问本机附件存储'));const req=indexedDB.open('ulab-supplier-attachments-v1',1);req.onupgradeneeded=()=>req.result.createObjectStore('files',{keyPath:'id'});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
function dbPut(record){return new Promise((resolve,reject)=>{if(!db)return reject(Error('附件存储不可用'));const tx=db.transaction('files','readwrite');tx.objectStore('files').put(record);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
function dbDelete(fileId){return new Promise((resolve,reject)=>{if(!db)return reject(Error('附件存储不可用'));const tx=db.transaction('files','readwrite');tx.objectStore('files').delete(fileId);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}
function dbAll(){return new Promise((resolve,reject)=>{const req=db.transaction('files').objectStore('files').getAll();req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
async function addFiles(input){
 if(attachmentBusy||busy||!attachmentsReady){input.value='';toast('附件正在处理，请稍后再选择文件');return;}
 attachmentBusy=true;updateBusyControls();const chosen=[...input.files];let total=selectionAttachments().reduce((n,a)=>n+a.size,0),added=0,rejected=[];
 for(const file of chosen){
  const ext=file.name.split('.').pop().toLowerCase(),allowed=input.dataset.slot==='images'?['jpg','jpeg','png','webp']:['pdf','jpg','jpeg','png','webp','step','stp','dxf','xlsx','zip'];
  if(!allowed.includes(ext)){rejected.push(file.name+'：不支持此格式');continue;}
  if(file.size>20*1024*1024){rejected.push(file.name+'：超过 20 MB');continue;}
  if(total+file.size>100*1024*1024){rejected.push(file.name+'：总附件超过 100 MB');continue;}
  const record={id:id(),owner:input.dataset.owner,slot:input.dataset.slot,name:file.name,type:file.type||'application/octet-stream',size:file.size,blob:file,addedAt:new Date().toISOString()};
  try{await dbPut(record);attachments.push(record);total+=file.size;added++;}catch{rejected.push(file.name+'：本机存储失败，请检查剩余空间');}
 }
 attachmentBusy=false;persist();render();if(rejected.length)toast(rejected.join('；'),true);else if(added)toast(added+' 个附件已保存在本机');
}
function cleanPart(p){
 const output={id:p.id};for(const scope of ['base','specs','tech','supply','sample'])output[scope]={};
 const fits=new Map();
 for(let step=0;step<LAST;step++)for(const f of fieldsFor(step,p)){
  const [scope,key]=f.path.split('.');if(scope==='company')continue;
  const value=read(f.path,p);if(value===undefined||value==='')continue;
  if(scope.startsWith('fits:')){const rowId=scope.slice(5);if(!fits.has(rowId))fits.set(rowId,{id:rowId});fits.get(rowId)[key]=value;}
  else output[scope][key]=value;
 }
 const canonical={...output,fits:[...fits.values()]};
 output.categoryLabel=cat(p)?.label||'';
 output.dictionary=DF.snapshot(canonical);
 const definitions=fieldsFor(1,canonical),allowedPaths=new Set(definitions.map(f=>f.path));
 output.dictionary.selections=definitions.filter(f=>['select','multiselect'].includes(f.type)).map(f=>{const raw=read(f.path,canonical),values=(Array.isArray(raw)?raw:[raw]).filter(v=>v!==undefined&&v!=='');return {field:f.path,dictionary:f.term||f.path,values:values.map(code=>({code,label:f.options.find(o=>(o.value??o)===code)?.label||String(code)}))};});
 output.dictionary.requests=output.dictionary.requests.filter(f=>allowedPaths.has(f.field));
 output.dictionary.check.issues=SF.validate(canonical);
 delete output.dictionary.legacySupplement;
 output.compatibility={evidenceSource:p.specs.fit_mode==='pending'?'待供应商补充':'供应商声明',platformVerification:'未开展',admission:'未开展',published:false};return output;
}
const safeName=s=>String(s).replace(/[<>:"/\\|?*\x00-\x1f]/g,'_').slice(0,100)||'未命名';
function attachmentPath(a){const p=state.parts.find(p=>p.id===a.owner),index=state.parts.indexOf(p);return '附件/'+(a.owner==='company'?'企业资料':String(index+1).padStart(2,'0')+'_'+safeName(p?.base.name||'配件'))+'/'+a.slot+'/'+a.id.slice(0,8)+'_'+safeName(a.name);}
function applicationData(mode){
 const supplier=Object.fromEntries(SF.contact(state.company).map(f=>[f.path.split('.')[1],read(f.path)||'']));
 return {format:'ULAB_PRODUCT_SELECTION_V1',phase:'product_selection',dictionary:{revision:D.revision,sourceRevision:D.sourceRevision,status:D.status},mode,generatedAt:new Date().toISOString(),submission:{sentToPlatform:false,reviewStarted:false,notice:'本地生成的商品初审资料；企业资质与授权在初审通过后补充。'},supplier,parts:state.parts.map(cleanPart),declarations:{selection_truth:Boolean(state.declarations.selection_truth)},attachments:selectionAttachments().map(({blob,...a})=>({...a,path:attachmentPath(a)}))};
}
function humanText(data){
 let s='ULAB 商品选品资料\n'+(data.mode==='draft'?'草稿（资料可能未完成）':'待提交的商品初审资料')+'\n生成时间：'+data.generatedAt+'\n\n资料尚未发送至 ULABSHOP；未进入初审、兼容验证或上架。\n企业资质、品牌授权与详细合作条款在初审通过后补充。\n\n供应商与联系方式\n';
 for(const f of SF.contact(state.company))s+=f.label+'：'+(displayValue(f)||'未填写')+'\n';
 state.parts.forEach((p,index)=>{s+='\n========== 商品 '+(index+1)+'：'+(p.base.name||'未命名')+' ==========\n';for(let step=0;step<LAST;step++){s+='\n'+titles[step]+'\n';for(const f of fieldsFor(step,p).filter(f=>!f.path.startsWith('company.')&&(f.required||String(read(f.path,p)??'').trim())))s+=f.label+'：'+(displayValue(f,p)||'未填写')+'\n';}s+='\n商品初审：待提交\n兼容验证：未开展\n准入及上架：未开展\n';});
 s+='\n商品附件清单\n';for(const a of data.attachments)s+=a.path+' ('+size(a.size)+')\n';return s;
}
const crcTable=Uint32Array.from({length:256},(_,n)=>{for(let i=0;i<8;i++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
const crc32=bytes=>{let crc=0xffffffff;for(const byte of bytes)crc=crcTable[(crc^byte)&255]^(crc>>>8);return (crc^0xffffffff)>>>0;};
async function zipBlob(entries){
 const chunks=[],central=[];let offset=0,centralLength=0;const enc=new TextEncoder(),now=new Date(),dt=((now.getFullYear()-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate(),tm=(now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>1);
 for(const entry of entries){const name=enc.encode(entry.name),data=typeof entry.data==='string'?enc.encode(entry.data):new Uint8Array(await entry.data.arrayBuffer()),crc=crc32(data);const header=new Uint8Array(30),h=new DataView(header.buffer);h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(10,tm,true);h.setUint16(12,dt,true);h.setUint32(14,crc,true);h.setUint32(18,data.length,true);h.setUint32(22,data.length,true);h.setUint16(26,name.length,true);chunks.push(header,name,data);
  const c=new Uint8Array(46),v=new DataView(c.buffer);v.setUint32(0,0x02014b50,true);v.setUint16(4,20,true);v.setUint16(6,20,true);v.setUint16(8,0x0800,true);v.setUint16(12,tm,true);v.setUint16(14,dt,true);v.setUint32(16,crc,true);v.setUint32(20,data.length,true);v.setUint32(24,data.length,true);v.setUint16(28,name.length,true);v.setUint32(42,offset,true);central.push(c,name);centralLength+=46+name.length;offset+=30+name.length+data.length;
 }
 const end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,entries.length,true);e.setUint16(10,entries.length,true);e.setUint32(12,centralLength,true);e.setUint32(16,offset,true);return new Blob([...chunks,...central,end],{type:'application/zip'});
}
async function exportPackage(mode){
 if(busy||attachmentBusy||!attachmentsReady)return;busy=true;updateBusyControls();
 try{persist();const data=applicationData(mode);const entries=[{name:'选品资料.json',data:JSON.stringify(data,null,2)},{name:'选品资料.txt',data:'\ufeff'+humanText(data)},{name:'字典快照.json',data:JSON.stringify(D,null,2)},...selectionAttachments().map(a=>({name:attachmentPath(a),data:a.blob}))];const blob=await zipBlob(entries),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='ULAB_'+safeName(state.company.name||'供应商')+'_'+(mode==='draft'?'选品草稿':'选品资料')+'_'+new Date().toISOString().slice(0,10)+'.zip';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);if(mode==='ready')$('#complete-dialog').showModal();else toast('草稿已导出为 ZIP，包含填写资料与附件');}
 catch(e){toast('生成资料失败，请重试；草稿仍保留在本机',true);console.error(e);}
 finally{busy=false;updateBusyControls();}
}
$('#parts-list').addEventListener('click',e=>{const target=e.target.closest('[data-part]');if(target)go(Number(target.dataset.part));});
$('#add-part').onclick=()=>{state.parts.push(freshPart());go(state.parts.length-1);toast('已添加另一款商品，供应商联系资料共用');};
$('#next').onclick=async()=>{errors=validateAll();if(errors.length){render();$('.error-summary')?.focus();$('.error-summary')?.scrollIntoView({block:'start'});return;}await exportPackage('ready');};
$('#save-draft').onclick=()=>persist(true);$('#export-draft').onclick=()=>exportPackage('draft');$('#close-complete').onclick=$('#back-to-review').onclick=()=>$('#complete-dialog').close();
if(migrated||selectionMigrated||singlePageMigrated)persist();
render();
openDB().then(async database=>{db=database;const all=await dbAll();attachments=all.filter(a=>a.owner==='company'||state.parts.some(p=>p.id===a.owner));attachmentsReady=true;render();}).catch(()=>{toast('未能恢复本机附件，请刷新后重试；文字资料仍可保存',true);});
if(state.updatedAt)$('#save-state').textContent='已恢复本机草稿 · '+new Date(state.updatedAt).toLocaleString('zh-CN');
})();
