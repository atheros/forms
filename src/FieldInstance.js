
class FieldInstance {
	constructor() {
		this.field = null;
		this.messages = null;
		this.value = null;
	}

	set(field, value) {
		this.field = field;
		this.value = value;
		this.messages = [];
	}

	message(text) {
		this.messages.push(text);
	}
}

module.exports = FieldInstance;
