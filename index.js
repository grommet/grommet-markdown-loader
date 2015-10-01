"use strict";

var loaderUtils = require("loader-utils");
var assign = require("object-assign");

var hljs = require('highlight.js/lib/highlight');
hljs.configure({useBR: true});
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));

var marked = require("./marked.js");
var renderer = new marked.Renderer();

renderer.code = function(code, language){
  var lang = language || 'nohighlight';

  if (language && language !== 'nohighlight' && language !== 'ascii-art') {
    code = hljs.highlight(lang, code).value;
  }

  return '<pre><code class="hljs ' + lang + '">' +
    code.replace(/\n/g, '<br />').replace(/{/g, "{'{'}").replace(/^'}/g, "{'}'}") + '</code></pre>';
};

renderer.paragraph = function (text) {
  return '<p>' + text.replace(/\n/g, '<br />').replace(/{/g, "{'{'}").replace(/^'}/g, "{'}'}") + '</p>';
}

// default option
var options = {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
};

module.exports = function (markdown) {

    this.cacheable();

    marked.setOptions(options);

    return marked(markdown);
};
