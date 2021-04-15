const rows = document.getElementsByClassName('BorderGrid-row');
let lastRow;
for (let index = 1; index < rows.length; index++) {
    const element = rows[rows.length - index];
    const hidden = element.getAttribute('hidden');
    if (hidden === null) {
        lastRow = element;
        break;
    }
}
const lastRowOffsetTop = lastRow ? (lastRow.offsetTop + lastRow.offsetHeight) : 0;

const box = document.createElement("div");
box.className = 'BorderGrid-row';
box.style.zIndex = '999';
box.style.maxHeight = '100%';
box.style.overflowY = 'auto';

const cell = document.createElement("div");
cell.className = 'BorderGrid-cell';
cell.style.border = 'none';

const source = document.getElementsByClassName('SelectMenu');
const catalog = source[source.length - 1];
const a = catalog.getElementsByTagName('a')
for (const iterator of a) {
    const newA = document.createElement("a");
    newA.href = iterator.getAttribute('href');
    newA.innerHTML = iterator.text;
    newA.style = iterator.getAttribute('style');
    newA.className = iterator.getAttribute('class');
    newA.style.color = 'var(--color-text-link)';
    cell.append(newA);
}

const target = document.getElementsByClassName('BorderGrid BorderGrid--spacious')[0];
// cell.append(catalog);
box.append(cell);
target.append(box);
const targetOffset = box.offsetTop;

const setPosition = function () {
    const footer = document.getElementsByClassName('footer')[0];
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    box.style.position = 'unset';
    if (scrollTop > targetOffset && scrollTop > lastRowOffsetTop) {
        box.style.position = 'fixed';
        box.style.top = '0';
        box.style.bottom = footer.offsetHeight + 'px';
    }
}

setPosition();
window.onscroll = function () {
    setPosition();
}

