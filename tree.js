/**
 * Tree - A Javascript tree handler adds expand/collapse functionality
 * Copyright 2011-2013 Mohsen Khahani
 *
 * Licensed under The MIT license.
 * Created on November 1, 2011
 *
 * You can use tree.php to generate tree structures from a data array
 * For more information visit: http://mohsenkhahani.ir/phpTree
 */

function Tree(target, className) {
    if (!document.getElementsByTagName) return;

    className = className || 'tree';
    target = document.getElementById(target);
    var nodes = target.getElementsByTagName('LI');
    for (var i = 0; i < nodes.length; i++) {
        var children = nodes[i].children,
            image = children[0],
            node  = children[1],
            child = children[2];
        node.className = className + '-node';
        if (child != null) {
            child.style.display = 'none';
            image.className = className + '-image-close';
            image.onclick = function () {
                var child = this.nextSibling.nextSibling,
                    display = (child.style.display == 'none'),
                    node;
                child.style.display = display? 'block' : 'none';
                if (display) {
                    node = this.nextSibling.children[0];
                    this.className = className + '-image-open';
                } else {
                    try {
                        node = this.parentNode.parentNode.previousSibling.children[0];
                    } catch(err) {
                        cookie.set('');
                    };
                    this.className = className + '-image-close';
                }
                if (node) {
                    cookie.set(node.innerHTML);
                } else {
                    cookie.set('');
                }
            };
        } else {
            if (nodes[i].nextSibling == null) {
                image.className = className + '-image-l';
            } else {
                image.className = className + '-image-t';
            }
        }
    }

    function openNode(node) {
        var child = node.nextSibling,
            parent = node.parentNode.parentNode.previousSibling;
        node.previousSibling.className = className + '-image-open';
        if (child) {
            child.style.display = 'block';
        }
        if (parent && parent.className == className + '-node') {
            openNode(parent);
        }
    }

    var nodes = target.getElementsByTagName('div'),
        value = cookie.get(),
        i;
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].innerHTML == value) {
            break;
        }
    }
    if (nodes[i]) {
        openNode(nodes[i].parentNode);
    }
}

/* Based upon http://www.quirksmode.org/js/cookies.html */
function Cookie(name) {
	this.name = name;
	
	this.set = function(value) {
		document.cookie = this.name + '=' + value + '; path=/';
	};
	
	this.get = function() {
		var nameEQ = this.name + '=',
            ca = document.cookie.split(';'),
            i;
		for(i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	};
}

var cookie = new Cookie('tree');
