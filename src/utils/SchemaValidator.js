import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export function validateSchema(schema, data) {
    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(schema);
    const isValid = validate(data);
    if (!isValid) {
        throw new Error(`Schema validation failed: ${ajv.errorsText()}`);
    }
    return isValid;
}