import { faker } from '@faker-js/faker';
import { TagDTO } from '../types/Tag';
import { objectGenerator } from './objectGenerator';

const createTags = objectGenerator<TagDTO>(() => ({
  name: faker.food.ethnicCategory() + faker.string.alphanumeric()
}));

export { createTags };
