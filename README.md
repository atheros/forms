Core Framework / Forms
======================

[![NPM Version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Coveralls][coveralls-image]][coveralls-url]

[npm-image]: https://img.shields.io/npm/v/@core-framework/forms.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@core-framework/forms
[travis-image]: https://img.shields.io/travis/core-framework-js/forms.svg?style=flat-square
[travis-url]: https://travis-ci.org/core-framework-js/forms
[coveralls-image]: https://img.shields.io/coveralls/core-framework-js/forms.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/core-framework-js/forms?branch=master


About
-----

Form definition and validation library for Core Framework.


Install
-------

**NOTE** This framework is work-in-progress, please don't use it in production yet!

```js
npm install --save @core-framework/forms
```


Examples
--------

Simple form example:

```js
let forms = require('@core-framework/forms');
let MyForm = forms.create([
    forms.field('field1', 'Bob').notEmpty(),
    forms.field('checkbox', true).checkbox()
]);

//...

let form = MyForm.createInstance(req.body);
let result = form.validate();

console.log(form.messages);
console.log(form.values);
```
