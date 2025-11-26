import userModel from '../models/userModel.js';
import { faker } from '@faker-js/faker';

export const createUser = async (numUsers) => {
  try {
    const userPromises = [];

    for (let i = 0; i < numUsers; i++) {
      const temperuser = new userModel({
        name: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: 'Password123',
        bio: faker.lorem.sentence(),
        avater: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      userPromises.push(temperuser.save());
    }
    await Promise.all(userPromises);
    console.log(`${numUsers} users created successfully`);
    process.exit(1);
  } catch (error) {
    console.error('Error creating users:', error);
  }
};
