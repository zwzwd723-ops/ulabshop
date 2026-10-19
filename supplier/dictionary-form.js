/* Dictionary-backed supplier declarations. This module has no publish or approval action. */
(() => {
'use strict';
const D=globalThis.ULAB_SUPPLIER_DICTIONARY, C=globalThis.ULAB_SUPPLIER_SCHEMA.categories;
const opt=(value,label)=>({value,label}), request=opt('request','其他');
const field=(path,label,type='text',extra={})=>({path,label,type,required:true,...extra});
const freshFit=()=>({id:crypto.randomUUID(),category:'',model:'',version:'',firmware:'',relation:'',conditions:'',evidence:''});
const standard=p=>D.standards.find(s=>s.id===p.specs.standard&&s.layout===p.specs.layout&&s.categories.includes(p.base.category));
const matchesLayout=(p,x)=>!p.specs.layout||['accessories','cable','packaging'].includes(p.base.category)||x.layout===p.specs.layout||['not-applicable','request'].includes(p.specs.layout);
const product=(p,r)=>D.products.find(x=>x.id===r.model&&x.category===r.category&&matchesLayout(p,x));
const version=(p,r)=>product(p,r)?.versions.find(v=>v.id===r.version);
const allowed={shell:['pcb','plate','foam','accessories'],keycaps:['switches','stabilizers'],switches:['pcb','plate','keycaps'],plate:['shell','pcb','switches','stabilizers'],pcb:['shell','plate','switches','stabilizers','cable'],stabilizers:['plate','pcb','keycaps'],foam:['shell','pcb','plate','switches'],accessories:['shell','pcb','keycaps'],cable:['pcb','shell'],packaging:['shell','pcb','keycaps','cable']};
function specs(p){
 const fields=[
  field('specs.layout','对应配列','select',{options:D.layouts,group:'01 / 平台规格字典',hint:'先选配列。型号、规格与版本将按所选条件联动；相同配列不代表兼容。'}),
  ...(['request','not-applicable'].includes(p.specs.layout)?[field('specs.layout_detail','其他配列 / 不适用说明','textarea')]:[]),
  field('specs.standard','平台规格条目','select',{disabled:!p.specs.layout,options:[...D.standards.filter(s=>s.layout===p.specs.layout&&s.categories.includes(p.base.category)&&(s.evidence!=='demo'||s.id===p.specs.standard)).map(s=>opt(s.id,s.label)),request],hint:'选择对应的平台规格；没有合适选项时选择“其他”，并填写规格说明。'}),
  ...(standard(p)?[field('specs.standard_version','规格资料版本','select',{options:standard(p).versions.map(v=>opt(v.id,v.label)),hint:standard(p).note})]:[]),
  ...(p.specs.standard==='request'?[field('specs.standard_request','其他规格与依据','textarea',{placeholder:'填写商品所用规格、已有编号（如有）、图纸或标准来源。'})]:[]),
  field('specs.dimension_mode','尺寸资料提供方式','select',{group:'02 / 尺寸与公差',options:[opt('measured','填写实测尺寸'),opt('drawing','以附件尺寸图为准'),opt('pending','尺寸待补充')]}),
  ...(p.specs.dimension_mode==='measured'?[
   ...['length','width','height','thickness'].map((key,i)=>field('specs.'+key,['长度','宽度','高度','板材 / 材料厚度'][i],'number',{required:false,min:0,step:'any',unit:'mm',short:true})),
   field('specs.tolerance_minus','公差下偏差','number',{required:false,step:'any',unit:'mm',short:true,min:-1000000,hint:'负值表示低于名义尺寸；请在下方标明对应尺寸。'}),
   field('specs.tolerance_plus','公差上偏差','number',{required:false,step:'any',unit:'mm',short:true,min:-1000000})
  ]:[]),
  field('specs.dimensions','尺寸图、关键孔位与测量基准','textarea',{placeholder:'引用图纸文件名、编号、版本及尺寸代号；未完成测量时说明待补项。'}),
  field('specs.tolerance','公差对应尺寸与技术说明','textarea',{hint:'尺寸以 mm 记录，公差按实际图纸填写。字典不提供未经确认的合格阈值。'}),
  field('specs.limits','适配限制与不兼容情况','textarea',{placeholder:'填写必须配套的部件、安装干涉、环境或功能限制；未发现时也请说明。'})
 ];
 return fields;
}
function technical(p,original){
 const mappings=globalThis.ULAB_SUPPLIER_FIELD_DICTIONARIES?.[p.base.category]||{};
 const extras=globalThis.ULAB_SUPPLIER_EXTRA_DICTIONARY_FIELDS?.[p.base.category]||[];
 const controlled=(f,m)=>{
  const options=(D.terms[m.term]||[]).filter(o=>!m.values||m.values.includes(o.value));
  return {...f,label:m.label||f.label,type:m.multiple?'multiselect':'select',options,term:m.term,hint:m.hint||f.hint||'按商品实际情况选择；选择“其他”后补充说明。'};
 };
 const list=[...extras.map(f=>controlled(field('tech.'+f.key,f.label,'select',f),f)),...original.map(f=>mappings[f.key]?controlled(f,mappings[f.key]):f.key.startsWith('declared_')?{...f,required:false,label:'补充说明：'+f.label,hint:'型号与版本在下方适配关系中选择，此处补充装配细节或组合限制。'}:f)].filter(f=>!(p.base.category==='switches'&&p.tech.structure_code==='mechanical'&&['polarity_code','polarity_code_request','magnetic_polarity','magnet_specification'].includes(f.path.split('.')[1])));
 const result=[];
 for(const f of list){result.push(f);const value=p.tech[f.path.split('.')[1]];if(f.term&&(value==='request'||Array.isArray(value)&&value.includes('request')))result.push(field(f.path+'_request','其他说明：'+f.label,'textarea',{placeholder:'填写具体名称、工艺或参数；有相关图纸、规格书时可一并提供。'}));}
 if(result.length)result[0].group='03 / '+(C.find(c=>c.id===p.base.category)?.label||'配件')+'参数字典与技术说明';
 return result;
}
function fitFields(p){
 const list=[field('specs.fit_mode','适配对象登记方式','select',{group:'04 / 型号与版本适配关系',options:[opt('listed','从平台目录选择，并逐项声明'),opt('request','其他型号，补充说明'),...(['accessories','cable','packaging'].includes(p.base.category)?[opt('independent','独立使用，不绑定特定产品')]:[])],hint:'一条关系绑定一个型号、硬件版本及固件。可添加多条；整套组合的试装结果仍须平台验证。'})];
 if(p.specs.fit_mode==='request')return [...list,field('specs.fit_request','其他型号、版本与适配说明','textarea',{hint:'填写品牌、型号、硬件版本、所属品类、资料来源和兼容限制。状态保持“待平台确认”。'})];
 if(p.specs.fit_mode==='independent')return [...list,field('specs.independent_reason','独立使用依据与通用接口限制','textarea')];
 if(p.specs.fit_mode!=='listed')return list;
 (p.fits||[]).forEach((r,i)=>{
  const prefix='fits:'+r.id+'.',prod=product(p,r),ver=version(p,r);
  const models=D.products.filter(x=>x.category===r.category&&matchesLayout(p,x));
  const fixed=ver?[(ver.sensor?'PCBA 固定属性：'+ver.sensor:''),(ver.polarity?'磁极约定：'+ver.polarity:''),'兼容关系待平台验证'].filter(Boolean).join('；'):'';
  list.push(
   field(prefix+'category','目标配件分类','select',{group:'适配关系 '+String(i+1).padStart(2,'0'),relationId:r.id,options:C.filter(c=>(allowed[p.base.category]||[]).includes(c.id)).map(c=>opt(c.id,c.label))}),
   field(prefix+'model','目标型号','select',{disabled:!r.category,options:[...models.map(x=>opt(x.id,x.label+' · '+x.id)),request],hint:r.category&&!models.length?'该配列下暂无对应型号，请选择“其他”并补充说明。':'选择对应的 ULAB 商品型号；没有合适选项时选择“其他”。'})
  );
  if(r.model==='request'){list.push(field(prefix+'request','其他型号与版本说明','textarea'));}
  else list.push(field(prefix+'version','目标硬件 / 产品版本','select',{disabled:!prod,options:[...(prod?.versions||[]).map(v=>opt(v.id,v.label)),request],hint:fixed||'先选择目标型号；版本按该型号的字典记录提供。'}));
  if(r.model!=='request'&&r.version==='request')list.push(field(prefix+'version_request','其他硬件版本与变更说明','textarea'));
  if(ver?.firmwares?.length)list.push(field(prefix+'firmware','目标固件版本','select',{options:[...ver.firmwares,request].map(v=>v.value?v:opt(v.id,v.label)),hint:'固件与所选 PCBA 硬件版本绑定。'}));
  if(r.firmware==='request'&&ver?.firmwares?.length)list.push(field(prefix+'firmware_request','其他固件版本与来源','textarea'));
  list.push(field(prefix+'relation','供应商声明结论','select',{options:D.terms.relation}),field(prefix+'conditions','配套条件与限制','textarea',{required:r.relation!=='compatible',hint:'有条件兼容、不兼容或尚待确认时必填；明确引用相关关系序号或其他配套型号。'}),field(prefix+'evidence','声明依据 / 自测资料','textarea',{hint:'填写自测批次、报告文件名及页码；未经测试时如实填写“尚未自测”。'}));
 });
 return list;
}
function afterChange(path,p){
 if(path==='base.category'){p.specs.standard='';p.specs.standard_version='';p.specs.fit_mode='';p.fits=[];}
 if(path==='specs.layout'){p.specs.standard='';p.specs.standard_version='';p.fits=[];if(p.specs.fit_mode==='listed')p.fits.push(freshFit());}
 if(path==='specs.standard')p.specs.standard_version='';
 if(path==='specs.fit_mode'&&p.specs.fit_mode==='listed'&&!p.fits?.length)p.fits=[freshFit()];
 if(path.startsWith('fits:')){const [scope,key]=path.split('.'),r=p.fits?.find(r=>r.id===scope.slice(5));if(!r)return;
  if(key==='category'){r.model='';r.version='';r.firmware='';r.request='';r.version_request='';}
  if(key==='model'){r.version='';r.firmware='';r.request='';r.version_request='';}
  if(key==='version'){r.firmware='';r.version_request='';}
  if(['category','model','version','firmware'].includes(key)){r.relation='';r.conditions='';r.evidence='';r.firmware_request='';}
 }
}
function validate(p){
 const issues=[],add=(path,label,message)=>issues.push({path,label,message,part:p.id});
 if(p.specs.dimension_mode==='measured'&&!['length','width','height','thickness'].some(k=>Number(p.specs[k])>0))add('specs.length','实测尺寸','至少填写一项大于 0 的实测尺寸');
 if(p.specs.dimension_mode==='measured'&&p.specs.tolerance_minus!==''&&p.specs.tolerance_plus!==''&&p.specs.tolerance_minus!=null&&p.specs.tolerance_plus!=null&&Number(p.specs.tolerance_minus)>Number(p.specs.tolerance_plus))add('specs.tolerance_plus','公差区间','上偏差不能小于下偏差');
 if(p.specs.fit_mode==='listed'&&!p.fits?.length)add('specs.fit_mode','适配关系','请至少添加一条适配关系');
 const seen=new Set();
 if(p.specs.fit_mode==='listed')for(const r of p.fits||[]){
  if(r.model&&r.model!=='request'&&r.version&&r.version!=='request'&&r.firmware!=='request'){const key=[r.model,r.version,r.firmware].join('|');if(seen.has(key))add('fits:'+r.id+'.model','重复适配关系','同一型号、硬件版本及固件仅保留一条声明');seen.add(key);}
  // Only known conflicts in supplied parameters are flagged; no missing rule is treated as a pass.
  const target=version(p,r),polarity=p.tech.polarity_code||p.tech.magnetic_polarity_code;
  if(p.base.category==='switches'&&p.tech.structure_code==='magnetic'&&target?.polarity&&polarity&&polarity!=='request'&&polarity!==target.polarity&&['compatible','conditional'].includes(r.relation))add('fits:'+r.id+'.relation','磁极冲突','所填轴体磁极与目标 PCBA 字典约定不同，请核对参数或登记为不兼容 / 待确认');
 }
 return issues;
}
function snapshot(p){
 const definitions=[...specs(p),...technical(p,(C.find(c=>c.id===p.base.category)?.fields||[]).map(f=>({...f,path:'tech.'+f.key}))),...fitFields(p)];
 const get=f=>{const [scope,key]=f.path.split('.');return scope.startsWith('fits:')?p.fits?.find(r=>r.id===scope.slice(5))?.[key]:p[scope]?.[key];};
 const selections=definitions.filter(f=>['select','multiselect'].includes(f.type)).map(f=>({field:f.path,dictionary:f.term||f.path,values:(Array.isArray(get(f))?get(f):[get(f)]).filter(Boolean).map(code=>({code,label:f.options.find(o=>(o.value??o)===code)?.label||String(code)}))}));
 const requests=definitions.filter(f=>f.path.endsWith('_request')||f.path.endsWith('.request')).filter(f=>get(f)).map(f=>({field:f.path,label:f.label,proposedValue:get(f),status:'pending_platform_review'}));
 const relations=p.specs.fit_mode==='listed'?(p.fits||[]).map(r=>{const prod=product(p,r),ver=version(p,r);return {id:r.id,targetCategory:r.category,targetModel:r.model,targetModelLabel:prod?.label||'',targetVersion:r.model==='request'?'':r.version,targetFirmware:ver?.firmwares?.length?r.firmware:'',targetAttributes:ver?{sensor:ver.sensor||null,polarity:ver.polarity||null}:null,declaration:r.relation,conditions:r.conditions||'',evidence:r.evidence||'',request:r.model==='request'?r.request||'':undefined,versionRequest:r.version==='request'?r.version_request||'':undefined,firmwareRequest:r.firmware==='request'?r.firmware_request||'':undefined,dictionaryReferenceStatus:r.model==='request'||r.version==='request'||r.firmware==='request'?'pending':'demo_reference_only',platformVerification:'not_started',admission:'not_started',published:false};}):[];
 return {revision:D.revision,sourceRevision:D.sourceRevision,evidenceStatus:'demo',measurements:{unit:'mm',mode:p.specs.dimension_mode,values:p.specs.dimension_mode==='measured'?Object.fromEntries(['length','width','height','thickness','tolerance_minus','tolerance_plus'].filter(k=>p.specs[k]!==''&&p.specs[k]!=null).map(k=>[k,Number(p.specs[k])])):{}},standard:standard(p)?{id:standard(p).id,revision:p.specs.standard_version,formalSpecificationAvailable:false}:null,selections,requests,relations,check:{scope:'dictionary_references_and_declared_parameters_only',issues:validate(p),compatibleVerified:false},legacySupplement:p.legacySupplement||null};
}
function migrate(state){
 if(state.dictionaryRevision===D.revision)return false;
 for(const p of state.parts){
  if(!state.dictionaryRevision){
   p.legacySupplement={specs:{...p.specs},tech:{...p.tech}};
   const oldLayout=p.specs.layout;
   p.specs={dimensions:p.specs.dimensions||'',tolerance:p.specs.tolerance||'',limits:p.specs.limits||'',layout:D.layouts.find(o=>o.label===oldLayout)?.value||''};
   const sensor=p.tech.sensor_attribute;if(sensor==='Hall（霍尔）')p.tech.sensor_attribute='Hall';else if(sensor&&sensor!=='TMR')delete p.tech.sensor_attribute;
   p.fits=[];
  }
 }
 state.dictionaryRevision=D.revision;return true;
}
globalThis.ULAB_SUPPLIER_DICTIONARY_FORM={specs,technical,fitFields,afterChange,validate,snapshot,migrate,freshFit,standard,product,version};
})();
