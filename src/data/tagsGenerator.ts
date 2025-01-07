import { faker } from '@faker-js/faker';
import { Tag } from '../types/Tag';
import { objectGenerator } from './objectGenerator';

const createTags = objectGenerator<Tag>((index?) => ({
  tagId: index ?? faker.number.int(100),
  name: faker.food.ethnicCategory()
}));

export { createTags };
