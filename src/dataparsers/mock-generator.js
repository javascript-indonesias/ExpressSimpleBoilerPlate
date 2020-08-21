import faker from 'faker';

const generateRandomData = (length = 10) => {
    return new Promise((resolve) => {
        const randomArrayData = [];
        for (let i = 0; i < length; i += 1) {
            const dataRandom = {
                name: faker.name.findName(),
                address: `${faker.address.streetAddress()}, ${faker.address.country()} `,
                company: faker.company.companyName(),
            };
            randomArrayData.push(dataRandom);
        }
        resolve(randomArrayData);
    });
};

export { generateRandomData };
