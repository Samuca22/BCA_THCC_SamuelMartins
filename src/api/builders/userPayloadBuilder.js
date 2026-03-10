export const userPayloadBuilder = (overrideData = {}) => {
    return {
        name: 'Samuel Martins',
        job: 'Automation Engineer',
        ...overrideData
    };
};