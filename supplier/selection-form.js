/* 选品初审字段：合作资质、交易条款与正式验收资料在初审通过后补充。 */
(() => {
'use strict';
const D=globalThis.ULAB_SUPPLIER_DICTIONARY;
const DF=globalThis.ULAB_SUPPLIER_DICTIONARY_FORM;
const C=globalThis.ULAB_SUPPLIER_SCHEMA.categories;
const option=(value,label)=>({value,label});
const field=(path,label,type='text',required=true,extra={})=>({path,label,type,required,...extra});

function contact(company={}){
 const methods={phone:{label:'联系电话',type:'tel',placeholder:'填写手机号或座机，含区号'},wechat:{label:'微信号',type:'text',placeholder:'填写可添加的微信号'},email:{label:'联系邮箱',type:'email',placeholder:'name@example.com'}};
 const method=methods[company.contact_method]||{label:'联系方式',type:'text',placeholder:'先选择联系方式类型'};
 return [
  field('company.name','供应商名称','text',true,{group:'联系信息',placeholder:'公司、品牌或工作室名称均可'}),
  field('company.contact','联系人','text',true,{placeholder:'方便我们称呼您'}),
  field('company.contact_method','联系方式类型','select',true,{options:[option('phone','电话'),option('wechat','微信'),option('email','邮箱')]}),
  field('company.contact_value',method.label,method.type,true,{placeholder:method.placeholder,hint:'提供一种能联系到您的方式即可。'})
 ];
}

function basic(){
 return [
  field('base.category','商品分类','select',true,{group:'商品信息',options:C.map(c=>option(c.id,c.label)),hint:'选择分类后，直接填写这类商品的参数。'}),
  field('base.name','商品名称','text',true,{placeholder:'填写这款商品的名称'}),
  field('base.model','型号 / 料号','text',true,{placeholder:'填写供应商型号，便于区分商品'}),
  field('base.brand','品牌','text',false,{advanced:true}),
  field('base.version','产品版本','text',false,{advanced:true,placeholder:'有版本号时填写，例如 V1.0'}),
  field('base.variant','颜色 / 表面工艺','text',false,{advanced:true}),
  field('base.link','商品或资料链接','url',false,{advanced:true,placeholder:'https://…'}),
  field('base.description','商品卖点与配套内容','textarea',true,{placeholder:'简要介绍主要特点、套装内容或值得推荐的地方。'})
 ];
}

function technical(p){
 const allSpecs=DF.specs(p);
 const usesLayout=['shell','pcb','plate','keycaps','foam'].includes(p.base.category);
 const layout=usesLayout?allSpecs.filter(f=>['specs.layout','specs.layout_detail'].includes(f.path)).map(f=>({
  ...f,required:f.path==='specs.layout_detail'&&p.specs.layout==='request',group:undefined,
  hint:f.path==='specs.layout'?'按商品实际支持的配列选择；其他或多配列方案可选择“其他”并补充说明。':f.hint
 })):[];
 const original=(C.find(c=>c.id===p.base.category)?.fields||[]).map(f=>({...f,path:'tech.'+f.key}));
 const definitions=DF.technical(p,original);
 const coreHints={
  'tech.profile_code':'按商品实际使用的键帽高度体系选择；没有合适选项时选择“其他”。',
  'tech.connection_codes':'三模方案同时勾选有线、蓝牙和 2.4 GHz。',
  'tech.polarity_code':'按轴体安装状态，选择朝向 PCBA 一侧的磁极。'
 };
 const controlled=definitions.filter(f=>f.term||f.path.endsWith('_request')).map(f=>({
  ...f,
  group:undefined,
  required:f.path==='tech.sensor_attribute'||f.path.endsWith('_request'),
  hint:f.path==='tech.sensor_attribute'?'按本次提交的 PCBA 型号及硬件版本填写；该属性随这款方案固定。':f.path.endsWith('_request')?'填写这款商品实际使用的名称、工艺或参数。':coreHints[f.path]
 }));
 if(p.base.category==='pcb'){
  const sensorFields=controlled.filter(f=>f.path.startsWith('tech.sensor_attribute'));
  controlled.splice(0,controlled.length,...sensorFields,...controlled.filter(f=>!f.path.startsWith('tech.sensor_attribute')));
 }
 const wireless=Array.isArray(p.tech.connection_codes)&&p.tech.connection_codes.some(code=>['bluetooth','2.4g','tri-mode'].includes(code));
 const coreText={
  shell:['port_openings'],
  pcb:['firmware_support',...(wireless?['power_requirements']:[])],
  stabilizers:['stabilizer_material'],
  cable:['data_power_support'],
  packaging:['closure_and_protection']
 }[p.base.category]||[];
 const textLabels={port_openings:'接口开孔位置',firmware_support:'固件版本与配置工具',power_requirements:'电池与供电要求',stabilizer_material:'轴心、轴座与钢丝材质',data_power_support:'数据传输与供电能力',closure_and_protection:'闭合与固定方式'};
 // Keep existing text from detailed drafts available without asking new applicants
 // to complete the former engineering questionnaire or authorization documents.
 const legacy=definitions.filter(f=>!f.term&&!f.path.endsWith('_request'))
  .filter(f=>!['artwork_rights','printing_and_rights'].includes(f.key))
  .filter(f=>coreText.includes(f.key)||String(p.tech[f.key]??'').trim())
  .map(f=>({...f,label:textLabels[f.key]||f.label,required:false,advanced:!coreText.includes(f.key),group:undefined,
   ...(coreText.includes(f.key)?{hint:undefined,placeholder:({port_openings:'例如 USB-C 后置居中；特殊开孔可补充图纸。',firmware_support:'填写送样固件版本、配置工具或资料链接；暂不确定可留空。',power_requirements:'说明是否随附电池，以及容量、接口或必须配套的条件。',stabilizer_material:'分别填写主要部件材质，了解时补充。',data_power_support:'例如 USB 2.0 数据与供电、额定电流；按实际产品能力填写。',closure_and_protection:'例如拉链、锁扣、缓冲内托或配件分隔。'})[f.key]}:{})
  }));
 const scalars={
  switches:[field('tech.pressure_g','压力','number',false,{min:0,step:'any',unit:'g',short:true}),field('tech.travel_mm','总行程','number',false,{min:0,step:'any',unit:'mm',short:true})],
  plate:[field('tech.plate_thickness_mm','定位板厚度','number',false,{min:0,step:'any',unit:'mm',short:true})],
  foam:[field('tech.foam_thickness_mm','填充厚度','number',false,{min:0,step:'any',unit:'mm',short:true})],
  cable:[field('tech.cable_length_m','有效使用长度','number',false,{min:0,step:'any',unit:'m',short:true})],
  packaging:[field('tech.inner_dimensions','内部适用尺寸 / 容纳范围','text',false,{placeholder:'有尺寸时注明长 × 宽 × 高及单位；也可填写适用产品范围。'})]
 }[p.base.category]||[];
 const fit=DF.fitFields(p).map(f=>{
  if(f.path==='specs.fit_mode')return {...f,label:'型号适配情况',advanced:true,required:false,group:'型号适配（选填）',options:[option('pending','尚未确认，后续配合试装'),option('listed','选择已有型号并说明适配情况'),option('request','其他型号，补充说明'),...(['accessories','cable','packaging'].includes(p.base.category)?[option('independent','独立使用，不绑定特定型号')]:[])],hint:'已有明确适配资料时可补充。初审可保持尚未确认。'};
  if(f.path.endsWith('.evidence'))return {...f,advanced:true,label:'已有自测依据',required:false,hint:'有资料时填写报告名称、链接或测试条件。'};
  if(f.path.endsWith('.conditions')){
   const relationId=f.path.slice(5).split('.')[0];
   const relation=p.fits?.find(r=>r.id===relationId)?.relation;
   return {...f,advanced:true,required:['conditional','incompatible'].includes(relation),hint:'有条件兼容或不兼容时，请简要说明条件或原因。'};
  }
  return {...f,advanced:true,...(f.path==='specs.independent_reason'?{required:false}:{})};
 });
 const advanced=allSpecs.filter(f=>['specs.standard','specs.standard_version','specs.standard_request','specs.dimensions','specs.tolerance','specs.limits'].includes(f.path)).map(f=>({
  ...f,
  advanced:true,
  group:undefined,
  required:['specs.standard_version','specs.standard_request'].includes(f.path),
  ...(f.path==='specs.standard'?{label:'引用已有平台规格',required:false,hint:'已有对应规格时选择，初审可以留空。'}:{}),
  ...(f.path==='specs.dimensions'?{label:'尺寸 / 图纸说明',placeholder:'有现成尺寸或图纸时，填写主要尺寸或附件名称。',hint:undefined}:{}),
  ...(f.path==='specs.tolerance'?{label:'公差与测量说明',hint:undefined}:{}),
  ...(f.path==='specs.limits'?{label:'其他适配限制 / 备注',placeholder:'有已知限制时填写。',hint:undefined}:{})
 }));
 const core=[...(p.base.category==='keycaps'?[...controlled,...layout]:[...layout,...controlled]),...scalars,...legacy.filter(f=>!f.advanced)];
 if(core.length)core[0].group=(C.find(c=>c.id===p.base.category)?.label||'商品')+'参数';
 return [...core,...fit,...advanced,...legacy.filter(f=>f.advanced)];
}

function supply(p){
 const fields=[field('supply.quote_status','报价情况','select',true,{group:'参考报价与供货',options:[option('quoted','可以提供参考报价'),option('negotiable','价格面议 / 后续补充')]})];
 if(p.supply.quote_status==='quoted')fields.push(
  field('supply.currency','币种','select',true,{options:[option('CNY','人民币 CNY'),option('USD','美元 USD'),option('EUR','欧元 EUR'),option('other','其他币种')]}),
  ...(p.supply.currency==='other'?[field('supply.other_currency','其他币种','text')]:[]),
  field('supply.price','参考供货单价','number',true,{min:0,step:'any',short:true})
 );
 const quantityProvided=['moq','stock'].some(key=>p.supply[key]!==undefined&&p.supply[key]!==null&&String(p.supply[key]).trim()!=='');
 fields.push(
  field('supply.unit','报价 / 数量单位','select',p.supply.quote_status==='quoted'||quantityProvided,{options:[option('piece','件'),option('set','套'),option('switch','颗'),option('sheet','张'),option('meter','米'),option('other','其他')],hint:'填写报价、起订量或库存数量时请选择单位。'}),
  ...(p.supply.unit==='other'?[field('supply.unit_detail','其他计价 / 数量单位','text')]:[]),
  field('supply.moq','起订量','number',false,{min:1,step:1,short:true,hint:'有明确起订要求时填写。'}),
  field('supply.stock','现货数量','number',false,{min:0,step:1,short:true,hint:'暂无现货可填 0，不确定可留空。'}),
  field('supply.lead_days','预计供货周期','number',false,{min:0,step:1,unit:'天',short:true})
 );
 return fields;
}

function sample(p){
 return [
  field('sample.status','样品情况','select',true,{group:'样品与补充资料',options:[option('ready','可提供样品'),option('make','需要打样'),option('unavailable','暂不提供样品')]}),
  ...(p.sample.status==='make'?[field('sample.lead_days','预计打样周期','number',false,{min:0,step:1,unit:'天',short:true})]:[]),
  field('sample.notes','样品或供货补充说明','textarea',false,{placeholder:'如有样品费用、打样条件或供货说明，可在这里补充。'})
 ];
}

function validate(p){
 // The former detailed form may leave hidden values in a restored draft.
 // Only current controlled parameters and selected fit relations participate.
 const visible=technical(p);
 const techKeys=new Set(visible.filter(f=>f.path.startsWith('tech.')).map(f=>f.path.split('.')[1]));
 const current={...p,specs:{...p.specs,dimension_mode:''},tech:Object.fromEntries(Object.entries(p.tech||{}).filter(([key])=>techKeys.has(key)))};
 return DF.validate(current).filter(issue=>visible.some(f=>f.path===issue.path));
}

globalThis.ULAB_SELECTION_FORM={contact,basic,technical,supply,sample,validate};
})();
