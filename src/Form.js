let lodash = require('lodash');

let FormInstance = require('./FormInstance');
let Field = require('./Field');

/**
 * Form definition.
 */
class Form {

	/**
	 * Create a new field.
	 *
	 * @param {string} name Field name.
	 * @param {*} [defaultValue] Default value.
	 * @returns {Field} New Field object.
	 */
	static field(name, defaultValue) {
		return new Field(name, defaultValue);
	}


	/**
	 * Constructor.
	 *
	 * @param {Field[]} [fields] Array of fields to populate the form.
	 */
	constructor(fields) {
		this.fields = [];

		if (fields) {
			// Make sure fields is an array.
			if (!lodash.isArray(fields)) {
				throw new Error('Expected fields to be an array of Field objects');
			}

			// Add each field to the form.
			for(let field of fields) {
				if (field instanceof Field) {
					this.fields.push(field);
				} else {
					throw new Error('Unexpected item in fields array');
				}
			}
		}
	}

	/**
	 * Returns the name of all fields
	 *
	 * @returns {string[]} Array of field names.
	 */
	getFieldNames() {
		return lodash.map(this.fields, 'name');
	}

	/**
	 * Return field by name or null.
	 *
	 * @param {string} name Field name.
	 * @returns {Field} Field or null.
	 */
	getField(name) {
		for(let field of this.fields) {
			if (field.name === name) {
				return field;
			}
		}

		return null;
	}

	/**
	 * Create for instance and populate it with data and default values.
	 *
	 * @param {object} [data] Form data.
	 * @returns {FormInstance} Form instance.
	 */
	createInstance(data = null) {
		let instance = new FormInstance(this);

		instance.setData(data);

		return instance;
	}
}

module.exports = Form;
