/**
 * XHTML tree manipulation script
 *
 * @author      Mohsen Khahani <mkhahani@gmail.com>
 * @copyright   2011-2013 Mohsen Khahani
 * @license     MIT
 * @version     2.0
 * @created     November 1, 2011
 * @url         http://mohsenkhahani.ir/phpTree
 */

/**
 * Tree base class
 */
function Tree(target) {
    if (!document.getElementsByTagName) return;

    // generates unique ID
    TREES = (typeof TREES === 'undefined')? [] : TREES;
    this.id = 'tree_' + (TREES.length + 1);
    TREES.push(this.id);

    if (typeof target !== 'object') {
        target = document.getElementById(target);
    }
    var nodes = target.getElementsByTagName('LI'),
        i;
    nodes[0].className = 'first';
    for (i = 0; i < nodes.length; i++) {
        var parts = nodes[i].children,
            image = parts[0],
            node  = parts[1],
            child = parts[2];
        node.className = 'node';
        if (!nodes[i].nextSibling) {
            nodes[i].className = 'last';
        }
        if (child) {
            child.style.display = 'none';
            image.className = 'close';
            image.onclick = this.toggleNode.bind(this);
        }
    }
    this.nodes = nodes;
    this.loadTree();
}

/**
 * Expands/Collapses tree node
 */
Tree.prototype.toggleNode = function (e) {
    var e = e || event,
        image = e.srcElement || e.target,
        child = image.nextSibling.nextSibling,
        hidden = (child.style.display === 'none');
    if (hidden) {
        child.style.display = '';
        image.className = 'open';
    } else {
        child.style.display = 'none';
        image.className = 'close';
    }
    this.saveTree();
}

/**
 * Stores current state of the tree
 */
Tree.prototype.saveTree = function () {
    var openNodes = [],
        i;
    for (i = 0; i < this.nodes.length; i++) {
        var child = this.nodes[i].children[2];
        if (child && child.style.display !== 'none') {
            openNodes.push(i);
        }
    }
    setCookie(this.id, openNodes.join(','));
}

/**
 * Loads saved state of the tree
 */
Tree.prototype.loadTree = function () {
    var openNodes = getCookie(this.id),
        i;
    if (openNodes) {
        openNodes = openNodes.split(',');
        for (i = 0; i < openNodes.length; i++) {
            var node = this.nodes[openNodes[i]];
            node.children[0].className = 'open';
            node.children[2].style.display = '';
        }
    }
}

function setCookie(name, value) {
	document.cookie = name + '=' + value + '; path=/';
}
	
function getCookie(name) {
    var nameEQ = name + '=',
        ca = document.cookie.split(';'),
        i;
    for (i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Simulates bind() for IE<9
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
