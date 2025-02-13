import { Tag } from '../src/models';
import { describe, test, expect, beforeEach } from '@jest/globals';

const testTag = {
  name: 'Italian'
};

describe('Tag Model', () => {
  beforeEach(async () => {
    await Tag.destroy({ where: {} });
  });

  test('should create a tag succesfully', async () => {
    const tag = await Tag.create(testTag);

    expect(tag.id).toBeDefined();
    expect(tag.name).toBe(testTag.name);
  });

  test('should autoincrement the id for every instance', async () => {
    const tag1 = await Tag.create(testTag);

    const tag2 = await Tag.create({
      name: 'Another tag'
    });

    expect(tag2.id).toBe(tag1.id + 1);
  });

  test('should not allow duplicate titles', async () => {
    await expect(async () => {
      await Tag.create(testTag);
      await Tag.create(testTag);
    }).rejects.toThrow();
  });

  test('should enforce name as required', async () => {
    await expect(Tag.create({})).rejects.toThrow();
  });

  test('should update a tag', async () => {
    const tag = await Tag.create(testTag);

    await tag.update({ name: 'Mexican' });

    expect(tag.name).toBe('Mexican');
  });

  test('should delete a tag', async () => {
    const tag = await Tag.create(testTag);

    await tag.destroy();
    const deletedTag = await Tag.findByPk(tag.id);

    expect(deletedTag).toBeNull();
  });
});
