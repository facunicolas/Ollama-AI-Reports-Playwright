import { faker } from '@faker-js/faker';
import { FormData } from '../pages/DemoQAPages/form.page';
import path from 'path';

export const createRandomUser = (): FormData => {
    const randomDate = faker.date.birthdate({ min: 18, max: 50, mode: 'age' });

    const day = randomDate.getDate().toString().padStart(2, '0');
    const month = randomDate.toLocaleString('en-US', { month: 'short' });
    const year = randomDate.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
        mobile: faker.string.numeric(10),
        dob: formattedDate, 
        subjects: faker.helpers.arrayElements(['Maths', 'Physics', 'English'], 2),
        hobbies: faker.helpers.arrayElements(['Sports', 'Reading', 'Music'], 1),
        picturePath: path.join('utils', 'sampleFile.jpeg'), 
        address: faker.location.streetAddress(),
        state: 'NCR',
        city: 'Delhi'
    };
};