let assert = require('chai').assert;

let forms = require('../src');
let Form = require('../src/Form');
let FormInstance = require('../src/FormInstance');
let Field = require('../src/Field');
let FieldInstance = require('../src/FieldInstance');

describe('index.js', () => {
	describe('exports classes', () => {
		it('Form', () => {
			assert.property(forms, 'Form');
			assert.isFunction(forms.Form);
			assert.ok(forms.Form === Form);
		});

		it('FormInstance', () => {
			assert.property(forms, 'FormInstance');
			assert.isFunction(forms.FormInstance);
			assert.ok(forms.FormInstance === FormInstance);
		});

		it('Field', () => {
			assert.property(forms, 'Field');
			assert.isFunction(forms.Field);
			assert.ok(forms.Field === Field);
		});

		it('FieldInstance', () => {
			assert.property(forms, 'FieldInstance');
			assert.isFunction(forms.FieldInstance);
			assert.ok(forms.FieldInstance === FieldInstance);
		});
	});

	describe('create()', () => {
		it('exists', () => {
			assert.property(forms, 'create');
			assert.isFunction(forms.create);
		});

		it('creates a form', () => {
			let form = forms.create();

			assert.isObject(form);
			assert.ok(form instanceof forms.Form);
		});
	});

	describe('field()', () => {
		it('exists', () => {
			assert.property(forms, 'field');
			assert.isFunction(forms.field);
		});

		it('creates a field', () => {
			let field = forms.field('foo', null);

			assert.isObject(field);
			assert.ok(field instanceof forms.Field);
		});
	});
});
