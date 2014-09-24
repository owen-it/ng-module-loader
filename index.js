/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var SourceNode = require("source-map").SourceNode;
var SourceMapConsumer = require("source-map").SourceMapConsumer;
var Utils = require("loader-utils");
var FOOTER = "/*** EXPORTS FROM ng-loader ***/\n";

module.exports = function(content, sourceMap) {
	if(this.cacheable) this.cacheable();
	var query = Utils.parseQuery(this.query);
	var exports = [];
	var keys = Object.keys(query);
	if (keys.length == 1) {
			exports.push("module.exports = window.angular.module('" + keys[0] + "');");
	}
	if(sourceMap) {
		var currentRequest = Utils.getCurrentRequest(this);
		var node = SourceNode.fromStringWithSourceMap(content, new SourceMapConsumer(sourceMap));
		node.add("\n\n" + FOOTER + exports.join("\n"));
		var result = node.toStringWithSourceMap({
			file: currentRequest
		});
		this.callback(null, result.code, result.map.toJSON());
		return;
	}
	return content + "\n\n" + FOOTER + exports.join("\n");
};
