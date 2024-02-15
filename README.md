![Arrow.js](http://i.imgur.com/rZSWaEl.png)
===

Arrow.js is a tiny library (4.5kb gzipped) for displaying an arrow pointing to the browser download location. Perfect for pointing at that new file you downloaded!

### Get Started

Include the javascript in your HTML

```html
<script type="text/javascript" src="node_modules/ArrowJS/src/js/arrow.js">
```

Or use the minified version

```html
<script type="text/javascript" src="node_modules/ArrowJS/dist/arrow-1.0.0.min.js">
```

### Installing with NPM

    npm install ucs-arrow-js --save

### How to use

#### API

```javascript
//Display the Arrow for 5 seconds
//
//@param milliseconds {integer} Show the arrow for this many milliseconds then fade
//out. Defaults to 6000 milliseconds (6 seconds)
Arrow.show(5000);
```

#### Properties

```javascript
//Get Arrow.js Version
Arrow._version;

//Get Current Browser
Arrow._browser;

//Get Current Browser Version
Arrow._browserVersion 
```

### Maintainer

[Bjorn Lammers](https://github.com/walkxcode)

### License

The MIT License (MIT)

Copyright (c) 2024 Bjorn Lammers

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

