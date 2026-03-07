import { faker } from '@faker-js/faker';

export class DataGenerator {
    
    generateEmployeeObj(){
        return {
            employeeid: faker.string.uuid().slice(0, 10),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName()
        }
    }
}