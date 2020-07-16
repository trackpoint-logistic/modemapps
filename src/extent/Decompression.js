/**
 * @module ol/trackpoint/Decompression
 */



export default function Decompression(variables, instructions, data, callback, item) {
	const dataLength = data.length || 0;
	let dataIndex = 0;


	if (typeof (item) == 'undefined') {
		item = {};
		for (let i = 0, l = variables.length; i < l; i++) {
			item[variables[i]] = 0
		}
	}

	while (dataIndex < dataLength) {
		const clone = {};
		for (let index = 0, length = variables.length; length--; index++) {

			const variable = variables[index];
			const instruction = instructions[index];

			let shift = 0;
			let result = 0;
			let cc;
			do {
				cc = data.charCodeAt(dataIndex++) - 63;
				result |= (cc & 0x1f) << shift;
				shift += 5;
			} while (cc >= 0x20);

			let value = ((result & 1) ? ~(result >> 1) : (result >> 1));


			if (instruction == 1) {
				clone[variable] = (value = (item[variable] += value))
			} else {
				clone[variable] = (item[variable] = value)
			}

		}
		callback(clone);
	}
}
