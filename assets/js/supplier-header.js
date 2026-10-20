import {renderSiteMenu} from './site-menu.js?v=20261020-home';

// Use the site's own menu renderer; the supplier form keeps its independent
// form state while links return to the existing site routes and overlays.
const siteRoot = new URL('../../', import.meta.url);
const dialog = document.getElementById('supplier-site-menu');
const trigger = document.getElementById('supplier-menu-trigger');
const routes = new Map([
  ['666:630', '/'], ['919:713', '/store'], ['834:587', '/lab'],
  ['527:130', '/technology'], ['527:233', '/drivers'],
  ['527:337', '/support'], ['527:463', '/about']
]);
const overlayActions = new Map([
  ['1338:763', 'search'], ['1338:773', 'contact'],
  ['1338:778', 'wishlist'], ['1338:768', 'account'], ['1338:783', 'cart']
]);

function routeUrl(path) {
  const url = new URL(siteRoot);
  url.hash = path;
  return url.href;
}
function navigate(id) {
  const path = routes.get(id);
  if (path) window.location.assign(routeUrl(path));
}
function openOverlay(id) {
  const action = overlayActions.get(id);
  if (!action) return;
  const url = new URL(siteRoot);
  url.searchParams.set('ulabAction', action);
  url.hash = '/';
  window.location.assign(url.href);
}
function closeMenu() { dialog.close(); }

const drawer = renderSiteMenu({navigate, openOverlay, close: closeMenu, current: 'supplier'});
for (const link of drawer.querySelectorAll('.site-menu-row')) {
  const path = link.getAttribute('href').slice(1);
  link.dataset.ulabRoute = path;
  // Also support modified clicks and opening the link in another tab.
  link.href = routeUrl(path);
}
const cooperation = document.createElement('a');
cooperation.className = 'site-menu-utility site-menu-supplier';
cooperation.href = new URL('supplier/', siteRoot).href;
cooperation.setAttribute('aria-current', 'page');
const label = document.createElement('span');
label.className = 'site-menu-label';
label.textContent = '供应商合作';
const chevron = document.createElement('span');
chevron.className = 'site-menu-chevron';
chevron.setAttribute('aria-hidden', 'true');
cooperation.append(label, chevron);
cooperation.addEventListener('click', event => {
  if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  closeMenu();
});
drawer.querySelector('.site-menu-utilities').append(cooperation);
dialog.append(drawer);

trigger.addEventListener('click', () => {
  if (dialog.open) return;
  dialog.showModal();
  trigger.setAttribute('aria-expanded', 'true');
});
dialog.addEventListener('close', () => {
  trigger.setAttribute('aria-expanded', 'false');
  trigger.focus({preventScroll: true});
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeMenu();
});
