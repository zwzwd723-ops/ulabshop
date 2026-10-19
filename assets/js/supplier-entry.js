// Add the supplier portal to the existing navigation without changing the
// offline commerce bundle or its routes. The app replaces these nodes on route
// changes, so observe the two owned render containers and mount once per node.
(() => {
  const siteRoot = new URL('../../', document.currentScript.src);
  const overlayActions = new Map([
    ['search', '1338:763'], ['contact', '1338:773'],
    ['wishlist', '1338:778'], ['account', '1338:768'], ['cart', '1338:783']
  ]);
  const requestedAction = new URL(location.href).searchParams.get('ulabAction');
  let actionOpened = false;
  function openRequestedAction() {
    const overlayId = overlayActions.get(requestedAction);
    // The existing application starts asynchronously. Its rendered screen is
    // the readiness signal; never turn arbitrary URL text into an overlay ID.
    if (actionOpened || !overlayId || !window.ULAB?.openOverlay || !document.querySelector('#app .screen')) return;
    actionOpened = true;
    const cleanUrl = new URL(location.href);
    cleanUrl.searchParams.delete('ulabAction');
    history.replaceState(history.state, '', cleanUrl);
    window.ULAB.openOverlay(overlayId);
  }
  const makeLink = className => {
    const link = document.createElement('a');
    link.className = className;
    link.href = new URL('supplier/', siteRoot).href;
    link.textContent = '供应商合作';
    // Source-artboard ancestors may own navigation handlers. Keep this a normal
    // browser link, including open-in-new-tab and modified-click behavior.
    link.addEventListener('click', event => event.stopPropagation());
    return link;
  };

  function mountEntries() {
    for (const header of document.querySelectorAll('#app .screen > .header, #app .site-header')) {
      if (header.closest('.lab-environment') || header.querySelector('.header-supplier-entry')) continue;
      const actions = header.querySelector(':scope > .header-actions-with-lab') || header.lastElementChild;
      if (!actions || header.children.length < 3) continue;
      header.classList.add('has-supplier-entry');
      actions.prepend(makeLink('header-supplier-entry'));
    }
    for (const utilities of document.querySelectorAll('#overlays .site-menu-utilities')) {
      if (utilities.querySelector('.site-menu-supplier')) continue;
      const link = makeLink('site-menu-utility site-menu-supplier');
      const label = document.createElement('span');
      label.className = 'site-menu-label';
      label.textContent = link.textContent;
      const chevron = document.createElement('span');
      chevron.className = 'site-menu-chevron';
      chevron.setAttribute('aria-hidden', 'true');
      link.replaceChildren(label, chevron);
      utilities.append(link);
    }
    openRequestedAction();
  }

  let queued = false;
  const observer = new MutationObserver(records => {
    if (queued || !records.some(record => record.addedNodes.length)) return;
    queued = true;
    queueMicrotask(() => { queued = false; mountEntries(); });
  });
  for (const id of ['app', 'overlays']) {
    const root = document.getElementById(id);
    if (root) observer.observe(root, {childList: true, subtree: true});
  }
  mountEntries();
})();
