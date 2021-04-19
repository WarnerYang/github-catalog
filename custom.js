try {
  const siderRows = document.getElementsByClassName('BorderGrid-row');
  let lastRow;
  for (let index = 1; index < siderRows.length; index++) {
    const element = siderRows[siderRows.length - index];
    const hidden = element.getAttribute('hidden');
    if (hidden === null) {
      lastRow = element;
      break;
    }
  }
  const lastRowOffsetTop = lastRow ? (lastRow.offsetTop + lastRow.offsetHeight) : 0;
  const lastRowWidth = lastRow ? lastRow.clientWidth : 0;

  const box = document.createElement("div");
  box.className = 'BorderGrid-row';
  box.style.maxHeight = '100%';
  box.style.overflowX = 'hidden';
  box.style.overflowY = 'auto';
  box.style.width = lastRowWidth + 'px';

  const cell = document.createElement("div");
  cell.className = 'BorderGrid-cell';
  cell.style.border = 'none';
  const target = document.getElementsByClassName('BorderGrid BorderGrid--spacious')[0];
  target.append(box);

  const setCatalog = function () {
    cell.innerHTML = '';
    const source = document.getElementsByClassName('SelectMenu');
    const catalog = source[source.length - 1];
    const aList = catalog.getElementsByTagName('a')
    for (const iterator of aList) {
      const a = document.createElement("a");
      a.href = iterator.getAttribute('href');
      a.innerHTML = iterator.text;
      a.className = iterator.getAttribute('class');
      a.style = iterator.getAttribute('style');
      a.style.width = lastRowWidth + 'px';
      a.style.borderRadius = 0;
      a.setAttribute('title', iterator.text);
      const currentPage = iterator.getAttribute('aria-current');
      if (currentPage) {
        a.className = a.className + 'current'
        a.setAttribute('aria-current', currentPage);
      }
      cell.append(a);
    }
    box.append(cell);
    box.style.position = 'unset';

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const boxOffsetTop = box.offsetTop;
    if (scrollTop > boxOffsetTop && scrollTop > lastRowOffsetTop) {
      const footer = document.getElementsByClassName('footer')[0];
      const height = footer.offsetHeight + 40 + 'px';
      box.style.position = 'fixed';
      box.style.top = height;
      box.style.bottom = height;
      box.style.border = '1px solid var(--color-border-primary)';
      box.style.borderRadius = '6px';
      const currentPages = box.getElementsByClassName('current');
      const currentOffsetTop = currentPages[0].offsetTop;
      box.scrollTop = Math.ceil(currentOffsetTop - box.offsetHeight / 2);
    }
  }

  // init
  setCatalog();

  // scroll check
  let timer;
  window.onscroll = function () {
    // debounce
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      setCatalog();
    }, 50);
  }
} catch (error) {
  console.log('extension [github-cataLog] error:' + error);
}

