import {
  Recipe,
  Ingredient,
  Tag,
  Instruction,
  RecipeIngredient,
  RecipeTag
} from '../src/models';
import { describe, test, expect } from '@jest/globals';

jest.mock('../src/models');

describe('Recipe Model');
