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
const lastRowWidth = lastRow.clientWidth || 0;

const box = document.createElement("div");
box.className = 'BorderGrid-row';
box.style.maxHeight = '100%';
box.style.overflowX = 'hidden';
box.style.overflowY = 'auto';
box.style.width = lastRowWidth + 'px';

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
    newA.className = iterator.getAttribute('class');
    newA.style = iterator.getAttribute('style');
    newA.style.color = 'var(--color-text-link)';
    newA.style.width = lastRowWidth + 'px';
    newA.setAttribute('title', iterator.text);
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
        const height = footer.offsetHeight + 10 + 'px';
        box.style.position = 'fixed';
        box.style.top = height;
        box.style.bottom = height;
        box.style.border = '1px solid rgb(68, 76, 86)';
    }
}

setPosition();
window.onscroll = function () {
    setPosition();
}

