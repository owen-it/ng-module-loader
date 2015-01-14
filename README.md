# Angular module loader for webpack

## Usage

``` javascript
require("ng-loader?myModule!./file.js");
// adds below code the the file's source:
//  exports["file"] = angular.module("myModule");

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
