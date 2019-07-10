const hasClass = function (el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
};

const addClass = function (el, className) {
    if (hasClass(el, className)) {
        return;
    }

    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
};

const removeClass = function (el, className) {
    if (!hasClass(el, className)) {
        return;
    }

    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
    el.className = el.className.replace(reg, ' ');
};

const getData = function (el, name, val) {
    let prefix = 'data-';
    if (val) {
        return el.setAttribute(prefix + name, val);
    }
    return el.getAttribute(prefix + name);
};

const getRect = function (el) {
    if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        };
    } else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        };
    }
};

// 滚动组件
const pageScroll = (function () {
    const fn = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    let islock = false;

    return {
        lock(el) {
            if (islock) return;
            islock = true;
            (el || document).addEventListener('touchmove', fn);
        },
        unlock(el) {
            islock = false;
            (el || document).removeEventListener('touchmove', fn);
        }
    };
})();

const preventScroll = (function () {
    return {
        lock(el) {
            isIOS && addClass(el || document.body, 'g-fix-ios-prevent-scroll');
        },
        unlock(el) {
            isIOS && removeClass(el || document.body, 'g-fix-ios-prevent-scroll');
        }
    };
})();

const isIOS = !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

const getScrollview = function (el) {
    let currentNode = el;
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
};

const checkInview = function (scrollView, el) {
    const contentHeight = scrollView === window ? document.body.offsetHeight : scrollView.offsetHeight;
    const contentTop = scrollView === window ? 0 : scrollView.getBoundingClientRect().top;

    const post = el.getBoundingClientRect().top - contentTop;
    const posb = post + el.offsetHeight;

    return (post >= 0 && post < contentHeight) || (posb > 0 && posb <= contentHeight);
};

//Copy from iView. https://www.iviewui.com/
const scrollTop = function (el, from = 0, to, duration = 500, callback) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) {
            typeof callback === 'function' && callback();
            return;
        }

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }

    scroll(from, to, step);
};

export {hasClass, addClass, removeClass, getData, getRect, pageScroll, preventScroll, getScrollview, checkInview, scrollTop};
