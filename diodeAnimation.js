var _containerHeight = 1000;
var _width, _height, _scrollHeight;
var letters = document.getElementsByTagName('span');
var _movingElements = [];
var _scrollPercent = 0;
var pre = prefix();
var _jsPrefix  = pre.lowercase;
if(_jsPrefix == 'moz') _jsPrefix = 'Moz'
var _cssPrefix = pre.css;
var _positions =
    {
        name: 'diode',
        start: {
            percent: 0.2, x: -0.2, y: 0.2
        },
        end: {
            percent: 0.8, x: 0.9, y: 0.9
        }
    }


resize();
initMovingElements();

function initMovingElements() {
    _positions.diff = {
        percent: _positions.end.percent - _positions.start.percent,
        x: _positions.end.x - _positions.start.x,
        y: _positions.end.y - _positions.start.y,
    }

    _movingElements = document.getElementsByClassName(_positions.name)[0];
}

function resize() {
    _width = window.innerWidth;
    _height = window.innerHeight;
    _scrollHeight = _containerHeight-_height;
}

function updateElements() {
    let p = _positions;
    if(_scrollPercent <= p.start.percent) {
        _movingElements.style[_jsPrefix+'Transform'] = 'translate3d('+(p.start.x*_width)+'px, '+(p.start.y*_containerHeight)+'px, 0px)';
    } else if(_scrollPercent >= p.end.percent) {
        _movingElements.style[_jsPrefix+'Transform'] = 'translate3d('+(p.end.x*_width)+'px, '+(p.end.y*_containerHeight)+'px, 0px)';
    } else {
        _movingElements.style[_jsPrefix + 'Transform'] = 'translate3d(' + (p.start.x * _width + (p.diff.x * (_scrollPercent - p.start.percent) / p.diff.percent * _width)) + 'px, ' +
            (p.start.y * _containerHeight + (p.diff.y * (_scrollPercent - p.start.percent) / p.diff.percent * _containerHeight)) + 'px, 0px)';
    }
}

function loop() {
    _scrollOffset = window.pageYOffset || window.scrollTop;
    _scrollPercent = _scrollOffset/_scrollHeight || 0;
    updateElements();

    requestAnimationFrame(loop);
}

loop();

window.addEventListener('resize', resize);

/* prefix detection http://davidwalsh.name/vendor-prefix */

function prefix() {
    var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
    };
}
