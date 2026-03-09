import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

// Validate the response body agains the defined schema (verify if the data type and rules match)
export function validateSchema(schema, data) {
    const validate = ajv.compile(schema);
    const isValid = validate(data);

    return {
        isValid,
        errorMessage: validate.errors ? ajv.errorsText(validate.errors, { separator: "\n" }) : null
    };
}
