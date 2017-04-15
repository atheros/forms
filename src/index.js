let Form = require('./Form');
let FormInstance = require('./FormInstance');
let Field = require('./Field');
let FieldInstance = require('./FieldInstance');

function create(fields) {
	return new Form(fields);
}

function field(name, defaultValue) {
	return new Field(name, defaultValue);
}

module.exports = {
	create: create,
	field: field,

	Form: Form,
	FormInstance: FormInstance,
	Field: Field,
	FieldInstance: FieldInstance
};
