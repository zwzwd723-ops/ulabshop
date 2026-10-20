const element=(tag,className='',text)=>{const node=document.createElement(tag);node.className=className;if(text!==undefined)node.textContent=text;return node;};
// Same 1.5px close icon used in the laboratory compass.
const closeIcon='<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 6 12 12M18 6 6 18"/></svg>';
const items=[
 ['商城','919:713','/store'],
 ['定制实验室','834:587','/lab'],
 ['技术探索','527:130','/technology'],
 ['软件与驱动','527:233','/drivers'],
 ['支持中心','527:337','/support'],
 ['关于 ULAB','527:463','/about']
];

export function renderSiteMenu({navigate,openOverlay,close,current}){
 const drawer=element('aside','site-drawer site-menu-drawer');drawer.setAttribute('aria-label','全局菜单');
 const header=element('header','site-menu-header'),closeButton=element('button','site-menu-close');
 closeButton.type='button';closeButton.setAttribute('aria-label','关闭菜单');closeButton.innerHTML=closeIcon;closeButton.append(element('span','','关闭'));closeButton.onclick=close;header.append(closeButton);
 const body=element('div','site-menu-body'),nav=element('nav','site-menu-primary');nav.setAttribute('aria-label','主导航');
 const showHome=current!=='666:630';
 if(showHome){
  const home=element('a','site-menu-row site-menu-home');home.href='#/';
  home.append(element('span','site-menu-label','返回首页'),chevron());
  home.onclick=event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();navigate('666:630');};
  nav.append(home);
 }
 for(const [index,[label,id,path]]of items.entries()){
  const link=element('a','site-menu-row'+(index<2?' site-menu-featured':'')+(index===1?' site-menu-featured-end':'')+(index===2?' site-menu-section-start':''));link.href='#'+path;link.style.setProperty('--menu-delay',(index+Number(showHome))*22+'ms');
  link.append(element('span','site-menu-label',label),chevron());
  if(current===id||(index===0&&(current?.startsWith('shop:')||['1395:1741','51:2','801:512'].includes(current)))||(index===1&&location.hash.startsWith('#/lab')))link.setAttribute('aria-current','page');
  link.onclick=event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();navigate(id);};
  nav.append(link);
 }
 const utilities=element('nav','site-menu-utilities');utilities.setAttribute('aria-label','账户与联系');
 for(const [label,id]of [['我的 ULAB','1338:768'],['联系我们','1338:773']]){
  const button=element('button','site-menu-utility');button.type='button';
  button.append(element('span','site-menu-label',label),chevron());button.onclick=()=>openOverlay(id,{navigation:'SWAP'});utilities.append(button);
 }
 body.append(nav,utilities);
 const footer=element('footer','site-menu-signature');footer.append(element('span','','ULAB'),element('span','','为你的每一次输入'));
 drawer.append(header,body,footer);return drawer;
}

function chevron(){const icon=element('span','site-menu-chevron');icon.setAttribute('aria-hidden','true');return icon;}
