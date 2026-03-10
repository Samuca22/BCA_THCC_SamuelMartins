export const loginPayloadBuilder = (overrideData = {}) => {
    return {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
        ...overrideData
    };
};