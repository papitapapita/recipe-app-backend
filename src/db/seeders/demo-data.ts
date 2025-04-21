import { IngredientDTO } from '../../types/Ingredient';
import { InstructionDTO } from '../../types/Instruction';
import { RecipeDTO } from '../../types/Recipe';
import { RecipeIngredientDTO } from '../../types/RecipeIngredient';
import { RecipeTag } from '../../types/RecipeTag';
import { TagDTO } from '../../types/Tag';

export const INGREDIENTS: IngredientDTO[] = [
  { name: 'Chicken breast' },
  { name: 'Ground beef' },
  { name: 'Salmon' },
  { name: 'Tofu' },
  { name: 'Eggs' },
  { name: 'Shrimp' },
  { name: 'Lentils' },
  { name: 'Chickpeas' },
  { name: 'Almonds' },
  { name: 'Greek yogurt' },
  { name: 'Spinach' },
  { name: 'Broccoli' },
  { name: 'Carrots' },
  { name: 'Bell peppers' },
  { name: 'Onions' },
  { name: 'Tomatoes' },
  { name: 'Garlic' },
  { name: 'Mushrooms' },
  { name: 'Zucchini' },
  { name: 'Cabbage' },
  { name: 'Bananas' },
  { name: 'Apples' },
  { name: 'Strawberries' },
  { name: 'Avocados' },
  { name: 'Blueberries' },
  { name: 'Lemons' },
  { name: 'Oranges' },
  { name: 'Pineapple' },
  { name: 'Mangoes' },
  { name: 'Grapes' },
  { name: 'Rice' },
  { name: 'Quinoa' },
  { name: 'Oats' },
  { name: 'Pasta' },
  { name: 'Bread' },
  { name: 'Cornmeal' },
  { name: 'Sweet potatoes' },
  { name: 'Potatoes' },
  { name: 'Barley' },
  { name: 'Couscous' },
  { name: 'Salt' },
  { name: 'Black pepper' },
  { name: 'Cumin' },
  { name: 'Cinnamon' },
  { name: 'Basil' },
  { name: 'Oregano' },
  { name: 'Paprika' },
  { name: 'Ginger' },
  { name: 'Turmeric' },
  { name: 'Chili powder' },
  { name: 'Honey' },
  { name: 'Maple syrup' },
  { name: 'Butter' },
  { name: 'Olive oil' },
  { name: 'Sunflower oil' },
  { name: 'Vinegar' },
  { name: 'Soy sauce' },
  { name: 'Mustard' },
  { name: 'Mayonnaise' },
  { name: 'Ketchup' },
  { name: 'Coconut milk' },
  { name: 'Heavy cream' },
  { name: 'Parmesan cheese' },
  { name: 'Cheddar cheese' },
  { name: 'Mozzarella cheese' },
  { name: 'Feta cheese' },
  { name: 'Brown sugar' },
  { name: 'White sugar' },
  { name: 'Nutmeg' },
  { name: 'Cardamom' },
  { name: 'Cloves' },
  { name: 'Bay leaves' },
  { name: 'Thyme' },
  { name: 'Rosemary' },
  { name: 'Coriander' },
  { name: 'Dill' },
  { name: 'Parsley' },
  { name: 'Chia seeds' },
  { name: 'Flaxseeds' },
  { name: 'Walnuts' },
  { name: 'Peanuts' },
  { name: 'Cashews' },
  { name: 'Pecans' },
  { name: 'Pistachios' },
  { name: 'Pumpkin seeds' },
  { name: 'Sesame seeds' },
  { name: 'Cocoa powder' },
  { name: 'Dark chocolate' },
  { name: 'White chocolate' },
  { name: 'Raisins' },
  { name: 'Dates' },
  { name: 'Figs' },
  { name: 'Prunes' },
  { name: 'Cranberries' },
  { name: 'Green tea' },
  { name: 'Black tea' },
  { name: 'Coffee beans' },
  { name: 'Coconut flour' },
  { name: 'Almond flour' },
  { name: 'Wheat flour' }
];

export const TAGS: TagDTO[] = [
  { name: 'easy-recipes' },
  { name: 'healthy-meals' },
  { name: 'quick-dinners' },
  { name: 'vegetarian-recipes' },
  { name: 'vegan-meals' },
  { name: 'gluten-free' },
  { name: 'keto-friendly' },
  { name: 'low-carb' },
  { name: 'high-protein' },
  { name: 'dairy-free' },
  { name: 'one-pot-meals' },
  { name: 'budget-friendly' },
  { name: 'family-friendly' },
  { name: 'comfort-food' },
  { name: 'meal-prep' },
  { name: 'breakfast-ideas' },
  { name: 'lunch-recipes' },
  { name: 'dinner-inspiration' },
  { name: 'instant-pot' },
  { name: 'slow-cooker' },
  { name: 'air-fryer' },
  { name: 'grilling-recipes' },
  { name: 'pasta-dishes' },
  { name: 'dessert-lovers' },
  { name: 'homemade-cooking' }
];

export const RECIPES: RecipeDTO[] = [
  {
    title: 'Spaghetti Carbonara',
    description:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    preparingTime: 158,
    cookingTime: 53,
    imageUrl: 'http://dummyimage.com/189x100.png/5fa2dd/ffffff',
    calories: 715,
    carbs: 612,
    protein: 714,
    fat: 492
  },
  {
    title: 'Chicken Alfredo Pasta',
    description:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    preparingTime: 74,
    cookingTime: 16,
    imageUrl: 'http://dummyimage.com/234x100.png/5fa2dd/ffffff',
    calories: 390,
    carbs: 596,
    protein: 710,
    fat: 141
  },
  {
    title: 'Beef Stroganoff',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    preparingTime: 49,
    cookingTime: 42,
    imageUrl: 'http://dummyimage.com/185x100.png/cc0000/ffffff',
    calories: 535,
    carbs: 525,
    protein: 90,
    fat: 364
  },
  {
    title: 'Vegetable Stir-Fry',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    preparingTime: 25,
    cookingTime: 109,
    imageUrl: 'http://dummyimage.com/234x100.png/cc0000/ffffff',
    calories: 45,
    carbs: 145,
    protein: 658,
    fat: 898
  },
  {
    title: 'Shrimp Scampi',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    preparingTime: 156,
    cookingTime: 93,
    imageUrl: 'http://dummyimage.com/226x100.png/dddddd/000000',
    calories: 793,
    carbs: 711,
    protein: 953,
    fat: 76
  },
  {
    title: 'Chicken Parmesan',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    preparingTime: 177,
    cookingTime: 117,
    imageUrl: 'http://dummyimage.com/161x100.png/5fa2dd/ffffff',
    calories: 620,
    carbs: 474,
    protein: 906,
    fat: 364
  },
  {
    title: 'Grilled Salmon with Lemon Butter',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    preparingTime: 50,
    cookingTime: 178,
    imageUrl: 'http://dummyimage.com/163x100.png/ff4444/ffffff',
    calories: 569,
    carbs: 650,
    protein: 430,
    fat: 720
  },
  {
    title: 'Garlic Butter Steak',
    description:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    preparingTime: 66,
    cookingTime: 67,
    imageUrl: 'http://dummyimage.com/221x100.png/5fa2dd/ffffff',
    calories: 516,
    carbs: 170,
    protein: 230,
    fat: 234
  },
  {
    title: 'Creamy Mushroom Risotto',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    preparingTime: 161,
    cookingTime: 7,
    imageUrl: 'http://dummyimage.com/104x100.png/dddddd/000000',
    calories: 851,
    carbs: 150,
    protein: 171,
    fat: 385
  },
  {
    title: 'Baked Ziti',
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae, Mauris viverra diam vitae quam. Suspendisse potenti.',
    preparingTime: 120,
    cookingTime: 68,
    imageUrl: 'http://dummyimage.com/173x100.png/5fa2dd/ffffff',
    calories: 825,
    carbs: 85,
    protein: 769,
    fat: 296
  },
  {
    title: 'Classic Lasagna',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    preparingTime: 26,
    cookingTime: 81,
    imageUrl: 'http://dummyimage.com/117x100.png/ff4444/ffffff',
    calories: 300,
    carbs: 374,
    protein: 953,
    fat: 285
  },
  {
    title: 'Chicken Tikka Masala',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    preparingTime: 1,
    cookingTime: 124,
    imageUrl: 'http://dummyimage.com/197x100.png/ff4444/ffffff',
    calories: 746,
    carbs: 148,
    protein: 452,
    fat: 79
  },
  {
    title: 'BBQ Pulled Pork Sandwiches',
    description:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    preparingTime: 96,
    cookingTime: 151,
    imageUrl: 'http://dummyimage.com/172x100.png/5fa2dd/ffffff',
    calories: 915,
    carbs: 178,
    protein: 82,
    fat: 36
  },
  {
    title: 'Stuffed Bell Peppers',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    preparingTime: 41,
    cookingTime: 112,
    imageUrl: 'http://dummyimage.com/183x100.png/dddddd/000000',
    calories: 150,
    carbs: 730,
    protein: 17,
    fat: 186
  },
  {
    title: 'Thai Green Curry',
    description:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    preparingTime: 124,
    cookingTime: 90,
    imageUrl: 'http://dummyimage.com/158x100.png/5fa2dd/ffffff',
    calories: 749,
    carbs: 327,
    protein: 839,
    fat: 846
  },
  {
    title: 'Homemade Margherita Pizza',
    description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    preparingTime: 101,
    cookingTime: 94,
    imageUrl: 'http://dummyimage.com/200x100.png/dddddd/000000',
    calories: 46,
    carbs: 311,
    protein: 822,
    fat: 174
  },
  {
    title: 'Beef and Broccoli',
    description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    preparingTime: 147,
    cookingTime: 122,
    imageUrl: 'http://dummyimage.com/173x100.png/5fa2dd/ffffff',
    calories: 569,
    carbs: 330,
    protein: 602,
    fat: 495
  },
  {
    title: 'Teriyaki Chicken',
    description:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    preparingTime: 116,
    cookingTime: 20,
    imageUrl: 'http://dummyimage.com/221x100.png/cc0000/ffffff',
    calories: 470,
    carbs: 528,
    protein: 260,
    fat: 208
  },
  {
    title: 'Shepherd’s Pie',
    description:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    preparingTime: 51,
    cookingTime: 176,
    imageUrl: 'http://dummyimage.com/112x100.png/ff4444/ffffff',
    calories: 111,
    carbs: 196,
    protein: 143,
    fat: 814
  },
  {
    title: 'Chicken Fajitas',
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    preparingTime: 39,
    cookingTime: 146,
    imageUrl: 'http://dummyimage.com/248x100.png/cc0000/ffffff',
    calories: 246,
    carbs: 211,
    protein: 529,
    fat: 317
  },
  {
    title: 'Chili Con Carne',
    description:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    preparingTime: 30,
    cookingTime: 72,
    imageUrl: 'http://dummyimage.com/226x100.png/dddddd/000000',
    calories: 631,
    carbs: 593,
    protein: 677,
    fat: 338
  },
  {
    title: 'Greek Gyro Wraps',
    description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    preparingTime: 9,
    cookingTime: 116,
    imageUrl: 'http://dummyimage.com/223x100.png/5fa2dd/ffffff',
    calories: 76,
    carbs: 117,
    protein: 127,
    fat: 211
  },
  {
    title: 'Tuna Casserole',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    preparingTime: 127,
    cookingTime: 104,
    imageUrl: 'http://dummyimage.com/240x100.png/ff4444/ffffff',
    calories: 866,
    carbs: 132,
    protein: 693,
    fat: 102
  },
  {
    title: 'Lemon Garlic Roasted Chicken',
    description:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    preparingTime: 120,
    cookingTime: 163,
    imageUrl: 'http://dummyimage.com/250x100.png/ff4444/ffffff',
    calories: 233,
    carbs: 907,
    protein: 772,
    fat: 901
  },
  {
    title: 'Shrimp and Grits',
    description:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae, Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    preparingTime: 93,
    cookingTime: 44,
    imageUrl: 'http://dummyimage.com/185x100.png/dddddd/000000',
    calories: 509,
    carbs: 391,
    protein: 70,
    fat: 199
  },
  {
    title: 'Butternut Squash Soup',
    description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    preparingTime: 15,
    cookingTime: 39,
    imageUrl: 'http://dummyimage.com/124x100.png/ff4444/ffffff',
    calories: 649,
    carbs: 591,
    protein: 197,
    fat: 857
  },
  {
    title: 'Classic Caesar Salad',
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae, Duis faucibus accumsan odio. Curabitur convallis.',
    preparingTime: 30,
    cookingTime: 7,
    imageUrl: 'http://dummyimage.com/160x100.png/5fa2dd/ffffff',
    calories: 558,
    carbs: 62,
    protein: 967,
    fat: 325
  },
  {
    title: 'Avocado Toast with Poached Egg',
    description:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    preparingTime: 22,
    cookingTime: 32,
    imageUrl: 'http://dummyimage.com/225x100.png/ff4444/ffffff',
    calories: 832,
    carbs: 333,
    protein: 660,
    fat: 314
  },
  {
    title: 'Pancakes with Maple Syrup',
    description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    preparingTime: 6,
    cookingTime: 91,
    imageUrl: 'http://dummyimage.com/248x100.png/5fa2dd/ffffff',
    calories: 855,
    carbs: 839,
    protein: 438,
    fat: 339
  },
  {
    title: 'French Toast',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae, Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    preparingTime: 59,
    cookingTime: 44,
    imageUrl: 'http://dummyimage.com/105x100.png/cc0000/ffffff',
    calories: 692,
    carbs: 92,
    protein: 358,
    fat: 955
  },
  {
    title: 'Banana Bread',
    description:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    preparingTime: 88,
    cookingTime: 139,
    imageUrl: 'http://dummyimage.com/164x100.png/5fa2dd/ffffff',
    calories: 910,
    carbs: 88,
    protein: 879,
    fat: 277
  },
  {
    title: 'Blueberry Muffins',
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    preparingTime: 93,
    cookingTime: 101,
    imageUrl: 'http://dummyimage.com/134x100.png/dddddd/000000',
    calories: 825,
    carbs: 213,
    protein: 177,
    fat: 22
  },
  {
    title: 'Apple Pie',
    description:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    preparingTime: 27,
    cookingTime: 143,
    imageUrl: 'http://dummyimage.com/230x100.png/dddddd/000000',
    calories: 794,
    carbs: 402,
    protein: 188,
    fat: 151
  },
  {
    title: 'Chocolate Chip Cookies',
    description:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    preparingTime: 168,
    cookingTime: 150,
    imageUrl: 'http://dummyimage.com/177x100.png/cc0000/ffffff',
    calories: 547,
    carbs: 514,
    protein: 859,
    fat: 755
  },
  {
    title: 'Brownie Sundae',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    preparingTime: 109,
    cookingTime: 88,
    imageUrl: 'http://dummyimage.com/118x100.png/dddddd/000000',
    calories: 850,
    carbs: 511,
    protein: 865,
    fat: 425
  },
  {
    title: 'Tiramisu',
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    preparingTime: 107,
    cookingTime: 38,
    imageUrl: 'http://dummyimage.com/121x100.png/5fa2dd/ffffff',
    calories: 769,
    carbs: 776,
    protein: 668,
    fat: 305
  },
  {
    title: 'Cheesecake',
    description:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    preparingTime: 128,
    cookingTime: 67,
    imageUrl: 'http://dummyimage.com/114x100.png/5fa2dd/ffffff',
    calories: 948,
    carbs: 814,
    protein: 424,
    fat: 992
  },
  {
    title: 'Carrot Cake',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    preparingTime: 123,
    cookingTime: 80,
    imageUrl: 'http://dummyimage.com/207x100.png/cc0000/ffffff',
    calories: 111,
    carbs: 721,
    protein: 561,
    fat: 95
  },
  {
    title: 'Pumpkin Pie',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    preparingTime: 122,
    cookingTime: 37,
    imageUrl: 'http://dummyimage.com/247x100.png/ff4444/ffffff',
    calories: 985,
    carbs: 37,
    protein: 739,
    fat: 783
  },
  {
    title: 'Smoothie Bowl',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    preparingTime: 19,
    cookingTime: 174,
    imageUrl: 'http://dummyimage.com/211x100.png/dddddd/000000',
    calories: 405,
    carbs: 834,
    protein: 705,
    fat: 377
  },
  {
    title: 'Guacamole and Chips',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    preparingTime: 76,
    cookingTime: 87,
    imageUrl: 'http://dummyimage.com/145x100.png/cc0000/ffffff',
    calories: 760,
    carbs: 653,
    protein: 106,
    fat: 186
  },
  {
    title: 'Hummus with Pita Bread',
    description:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    preparingTime: 134,
    cookingTime: 52,
    imageUrl: 'http://dummyimage.com/120x100.png/ff4444/ffffff',
    calories: 858,
    carbs: 380,
    protein: 837,
    fat: 200
  },
  {
    title: 'Deviled Eggs',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    preparingTime: 77,
    cookingTime: 121,
    imageUrl: 'http://dummyimage.com/136x100.png/5fa2dd/ffffff',
    calories: 447,
    carbs: 122,
    protein: 988,
    fat: 559
  },
  {
    title: 'Stuffed Mushrooms',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    preparingTime: 21,
    cookingTime: 93,
    imageUrl: 'http://dummyimage.com/176x100.png/cc0000/ffffff',
    calories: 360,
    carbs: 866,
    protein: 945,
    fat: 409
  },
  {
    title: 'Caprese Salad',
    description:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    preparingTime: 126,
    cookingTime: 94,
    imageUrl: 'http://dummyimage.com/219x100.png/dddddd/000000',
    calories: 429,
    carbs: 9,
    protein: 476,
    fat: 243
  },
  {
    title: 'Bruschetta',
    description:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae, Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    preparingTime: 72,
    cookingTime: 128,
    imageUrl: 'http://dummyimage.com/243x100.png/dddddd/000000',
    calories: 244,
    carbs: 978,
    protein: 183,
    fat: 252
  },
  {
    title: 'Clam Chowder',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    preparingTime: 101,
    cookingTime: 143,
    imageUrl: 'http://dummyimage.com/244x100.png/ff4444/ffffff',
    calories: 366,
    carbs: 342,
    protein: 972,
    fat: 626
  },
  {
    title: 'Lobster Roll',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    preparingTime: 147,
    cookingTime: 27,
    imageUrl: 'http://dummyimage.com/193x100.png/ff4444/ffffff',
    calories: 934,
    carbs: 833,
    protein: 809,
    fat: 363
  },
  {
    title: 'Sushi Rolls',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    preparingTime: 104,
    cookingTime: 27,
    imageUrl: 'http://dummyimage.com/214x100.png/cc0000/ffffff',
    calories: 578,
    carbs: 141,
    protein: 723,
    fat: 452
  },
  {
    title: 'Pad Thai',
    description:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    preparingTime: 22,
    cookingTime: 35,
    imageUrl: 'http://dummyimage.com/180x100.png/ff4444/ffffff',
    calories: 131,
    carbs: 32,
    protein: 512,
    fat: 883
  }
];

export const INSTRUCTIONS: InstructionDTO[] = [
  {
    recipeId: 1,
    step: 1,
    title: 'Boil pasta until al dente',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.'
  },
  {
    recipeId: 1,
    step: 2,
    title: 'sauté onions and garlic',
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.'
  },
  {
    recipeId: 2,
    step: 1,
    title: 'marinate chicken for 30 minutes',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.'
  },
  {
    recipeId: 2,
    step: 2,
    title: 'grill steak to desired doneness',
    description:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.'
  },
  {
    recipeId: 3,
    step: 1,
    title: 'bake at 375°F for 25 minutes',
    description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.'
  },
  {
    recipeId: 3,
    step: 2,
    title: 'whisk eggs until fluffy',
    description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.'
  },
  {
    recipeId: 4,
    step: 1,
    title: 'mix dry and wet ingredients',
    description:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.'
  },
  {
    recipeId: 4,
    step: 2,
    title: 'simmer sauce for 15 minutes',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.'
  },
  {
    recipeId: 5,
    step: 1,
    title: 'chop vegetables finely',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.'
  },
  {
    recipeId: 5,
    step: 2,
    title: 'season to taste',
    description:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.'
  },
  {
    recipeId: 6,
    step: 1,
    title: 'blend until smooth',
    description:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.'
  },
  {
    recipeId: 6,
    step: 2,
    title: 'knead dough until elastic',
    description:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.'
  },
  {
    recipeId: 7,
    step: 1,
    title: 'let dough rise for an hour',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.'
  },
  {
    recipeId: 7,
    step: 2,
    title: 'roast at 400°F until golden',
    description:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.'
  },
  {
    recipeId: 8,
    step: 1,
    title: 'stir continuously to avoid burning',
    description: 'Fusce consequat. Nulla nisl. Nunc nisl.'
  },
  {
    recipeId: 8,
    step: 2,
    title: 'melt butter in a pan',
    description:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.'
  },
  {
    recipeId: 9,
    step: 1,
    title: 'preheat oven to 350°F',
    description:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.'
  },
  {
    recipeId: 9,
    step: 2,
    title: 'dice tomatoes and onions',
    description:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.'
  },
  {
    recipeId: 10,
    step: 1,
    title: 'coat evenly with breadcrumbs',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.'
  },
  {
    recipeId: 10,
    step: 2,
    title: 'drizzle with olive oil',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.'
  },
  {
    recipeId: 11,
    step: 1,
    title: 'mix well and refrigerate',
    description:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.'
  },
  {
    recipeId: 11,
    step: 2,
    title: 'fold gently to keep fluffy',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.'
  },
  {
    recipeId: 12,
    step: 1,
    title: 'spread evenly in a baking dish',
    description:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.'
  },
  {
    recipeId: 12,
    step: 2,
    title: 'sear on high heat for 2 minutes',
    description:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.'
  },
  {
    recipeId: 13,
    step: 1,
    title: 'let meat rest before slicing',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.'
  },
  {
    recipeId: 13,
    step: 2,
    title: 'toss salad with dressing',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.'
  },
  {
    recipeId: 14,
    step: 1,
    title: 'zest lemon for extra flavor',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.'
  },
  {
    recipeId: 14,
    step: 2,
    title: 'mash until creamy',
    description:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.'
  },
  {
    recipeId: 15,
    step: 1,
    title: 'grate cheese finely',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.'
  },
  {
    recipeId: 15,
    step: 2,
    title: 'pour batter evenly into pan',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae, Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.'
  },
  {
    recipeId: 16,
    step: 1,
    title: 'steam for 10 minutes',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.'
  },
  {
    recipeId: 16,
    step: 2,
    title: 'glaze with honey before serving',
    description:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.'
  },
  {
    recipeId: 17,
    step: 1,
    title: 'garnish with fresh herbs',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.'
  },
  {
    recipeId: 17,
    step: 2,
    title: 'chill for at least an hour',
    description:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.'
  },
  {
    recipeId: 18,
    step: 1,
    title: 'caramelize onions slowly',
    description:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.'
  },
  {
    recipeId: 18,
    step: 2,
    title: 'pulse in a food processor',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.'
  },
  {
    recipeId: 19,
    step: 1,
    title: 'layer ingredients neatly',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.'
  },
  {
    recipeId: 19,
    step: 2,
    title: 'coat with sauce before baking',
    description:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.'
  },
  {
    recipeId: 20,
    step: 1,
    title: 'beat until stiff peaks form',
    description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.'
  },
  {
    recipeId: 20,
    step: 2,
    title: 'broil for extra crispiness',
    description:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.'
  },
  {
    recipeId: 21,
    step: 1,
    title: 'infuse with spices for more flavor',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.'
  },
  {
    recipeId: 21,
    step: 2,
    title: 'press firmly into a baking tray',
    description:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.'
  },
  {
    recipeId: 22,
    step: 1,
    title: 'soak overnight for best results',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.'
  },
  {
    recipeId: 22,
    step: 2,
    title: 'baste frequently while roasting',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.'
  },
  {
    recipeId: 23,
    step: 1,
    title: 'wrap tightly in foil',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae, Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.'
  },
  {
    recipeId: 23,
    step: 2,
    title: 'dust with powdered sugar',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.'
  },
  {
    recipeId: 24,
    step: 1,
    title: 'whisk continuously for a smooth texture',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.'
  },
  {
    recipeId: 24,
    step: 2,
    title: 'skewer and grill until charred',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.'
  },
  {
    recipeId: 25,
    step: 1,
    title: 'crumble topping over dessert',
    description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
  },
  {
    recipeId: 25,
    step: 2,
    title: 'strain before serving',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.'
  }
];

export const RECIPE_INGREDIENTS: RecipeIngredientDTO[] = [
  {
    recipeId: 16,
    ingredientId: 82,
    quantity: 337,
    measurement: 'g'
  },
  {
    recipeId: 5,
    ingredientId: 54,
    quantity: 372,
    measurement: 'g'
  },
  {
    recipeId: 19,
    ingredientId: 6,
    quantity: 210,
    measurement: 'mg'
  },
  {
    recipeId: 22,
    ingredientId: 29,
    quantity: 332,
    measurement: 'quart'
  },
  {
    recipeId: 12,
    ingredientId: 72,
    quantity: 381,
    measurement: 'dash'
  },
  {
    recipeId: 21,
    ingredientId: 38,
    quantity: 41,
    measurement: 'l'
  },
  {
    recipeId: 15,
    ingredientId: 14,
    quantity: 287,
    measurement: 'quart'
  },
  {
    recipeId: 8,
    ingredientId: 16,
    quantity: 338,
    measurement: 'kg'
  },
  {
    recipeId: 10,
    ingredientId: 11,
    quantity: 140,
    measurement: 'oz'
  },
  {
    recipeId: 25,
    ingredientId: 80,
    quantity: 320,
    measurement: 'ml'
  },
  {
    recipeId: 5,
    ingredientId: 2,
    quantity: 337,
    measurement: 'oz'
  },
  {
    recipeId: 20,
    ingredientId: 45,
    quantity: 237,
    measurement: 'g'
  },
  {
    recipeId: 15,
    ingredientId: 81,
    quantity: 59,
    measurement: 'fl oz'
  },
  {
    recipeId: 11,
    ingredientId: 45,
    quantity: 90,
    measurement: 'oz'
  },
  {
    recipeId: 19,
    ingredientId: 16,
    quantity: 16,
    measurement: 'dash'
  },
  {
    recipeId: 5,
    ingredientId: 69,
    quantity: 159,
    measurement: 'mg'
  },
  {
    recipeId: 24,
    ingredientId: 5,
    quantity: 349,
    measurement: 'pint'
  },
  {
    recipeId: 13,
    ingredientId: 30,
    quantity: 2,
    measurement: 'gallon'
  },
  {
    recipeId: 13,
    ingredientId: 7,
    quantity: 422,
    measurement: 'lb'
  },
  {
    recipeId: 11,
    ingredientId: 44,
    quantity: 349,
    measurement: 'cup'
  },
  {
    recipeId: 6,
    ingredientId: 19,
    quantity: 366,
    measurement: 'dash'
  },
  {
    recipeId: 17,
    ingredientId: 47,
    quantity: 257,
    measurement: 'tbsp'
  },
  {
    recipeId: 11,
    ingredientId: 17,
    quantity: 351,
    measurement: 'ml'
  },
  {
    recipeId: 4,
    ingredientId: 34,
    quantity: 392,
    measurement: 'mg'
  },
  {
    recipeId: 1,
    ingredientId: 46,
    quantity: 63,
    measurement: 'oz'
  },
  {
    recipeId: 10,
    ingredientId: 81,
    quantity: 15,
    measurement: 'pint'
  },
  {
    recipeId: 8,
    ingredientId: 92,
    quantity: 139,
    measurement: 'cup'
  },
  {
    recipeId: 16,
    ingredientId: 26,
    quantity: 262,
    measurement: 'tbsp'
  },
  {
    recipeId: 21,
    ingredientId: 35,
    quantity: 72,
    measurement: 'cup'
  },
  {
    recipeId: 11,
    ingredientId: 2,
    quantity: 206,
    measurement: 'quart'
  },
  {
    recipeId: 18,
    ingredientId: 71,
    quantity: 383,
    measurement: 'kg'
  },
  {
    recipeId: 3,
    ingredientId: 92,
    quantity: 437,
    measurement: 'kg'
  },
  {
    recipeId: 13,
    ingredientId: 60,
    quantity: 89,
    measurement: 'lb'
  },
  {
    recipeId: 7,
    ingredientId: 47,
    quantity: 96,
    measurement: 'tbsp'
  },
  {
    recipeId: 19,
    ingredientId: 78,
    quantity: 205,
    measurement: 'lb'
  },
  {
    recipeId: 10,
    ingredientId: 20,
    quantity: 325,
    measurement: 'lb'
  },
  {
    recipeId: 15,
    ingredientId: 51,
    quantity: 162,
    measurement: 'gallon'
  },
  {
    recipeId: 13,
    ingredientId: 75,
    quantity: 40,
    measurement: 'tbsp'
  },
  {
    recipeId: 7,
    ingredientId: 11,
    quantity: 275,
    measurement: 'cup'
  },
  {
    recipeId: 8,
    ingredientId: 3,
    quantity: 232,
    measurement: 'tsp'
  },
  {
    recipeId: 18,
    ingredientId: 72,
    quantity: 257,
    measurement: 'dash'
  },
  {
    recipeId: 19,
    ingredientId: 7,
    quantity: 54,
    measurement: 'tsp'
  },
  {
    recipeId: 24,
    ingredientId: 91,
    quantity: 211,
    measurement: 'mg'
  },
  {
    recipeId: 12,
    ingredientId: 30,
    quantity: 92,
    measurement: 'lb'
  },
  {
    recipeId: 5,
    ingredientId: 28,
    quantity: 25,
    measurement: 'cup'
  },
  {
    recipeId: 19,
    ingredientId: 96,
    quantity: 306,
    measurement: 'pint'
  },
  {
    recipeId: 9,
    ingredientId: 66,
    quantity: 376,
    measurement: 'pint'
  },
  {
    recipeId: 24,
    ingredientId: 43,
    quantity: 329,
    measurement: 'fl oz'
  },
  {
    recipeId: 9,
    ingredientId: 15,
    quantity: 317,
    measurement: 'g'
  },
  {
    recipeId: 19,
    ingredientId: 45,
    quantity: 394,
    measurement: 'gallon'
  }
];

export const RECIPE_TAGS: RecipeTag[] = [
  { recipeId: 14, tagId: 19 },
  { recipeId: 7, tagId: 23 },
  { recipeId: 24, tagId: 14 },
  { recipeId: 5, tagId: 2 },
  { recipeId: 25, tagId: 10 },
  { recipeId: 12, tagId: 3 },
  { recipeId: 22, tagId: 11 },
  { recipeId: 19, tagId: 3 },
  { recipeId: 20, tagId: 8 },
  { recipeId: 22, tagId: 14 },
  { recipeId: 10, tagId: 3 },
  { recipeId: 18, tagId: 9 },
  { recipeId: 18, tagId: 6 },
  { recipeId: 4, tagId: 10 },
  { recipeId: 9, tagId: 18 },
  { recipeId: 5, tagId: 4 },
  { recipeId: 10, tagId: 2 },
  { recipeId: 18, tagId: 8 },
  { recipeId: 7, tagId: 16 },
  { recipeId: 24, tagId: 22 },
  { recipeId: 5, tagId: 3 },
  { recipeId: 24, tagId: 4 },
  { recipeId: 9, tagId: 13 },
  { recipeId: 13, tagId: 3 },
  { recipeId: 6, tagId: 13 },
  { recipeId: 23, tagId: 22 },
  { recipeId: 8, tagId: 24 },
  { recipeId: 1, tagId: 4 },
  { recipeId: 18, tagId: 7 },
  { recipeId: 10, tagId: 8 },
  { recipeId: 6, tagId: 25 },
  { recipeId: 7, tagId: 12 },
  { recipeId: 8, tagId: 7 },
  { recipeId: 20, tagId: 4 },
  { recipeId: 22, tagId: 12 },
  { recipeId: 17, tagId: 19 },
  { recipeId: 12, tagId: 24 },
  { recipeId: 7, tagId: 17 },
  { recipeId: 22, tagId: 22 },
  { recipeId: 13, tagId: 23 },
  { recipeId: 14, tagId: 2 },
  { recipeId: 16, tagId: 19 },
  { recipeId: 21, tagId: 19 },
  { recipeId: 25, tagId: 25 },
  { recipeId: 9, tagId: 20 },
  { recipeId: 4, tagId: 11 },
  { recipeId: 17, tagId: 16 },
  { recipeId: 7, tagId: 9 },
  { recipeId: 12, tagId: 17 },
  { recipeId: 7, tagId: 8 }
];
