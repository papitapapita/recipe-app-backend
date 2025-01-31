/*Problem: checking if the name is unique
1. Create a function to check if a value already exists on a database
1.1 Receive the value to check, the property and the table
1.2 Consult the database with the requested info
*/

export default async function validateUniqueness(
  value: any,
  property: string,
  table: string
): boolean {}

/*Problem: Should the user create the ingredient and then
add it to the recipe or he just can type within the recipe
creation whatever he wants on the ingredient field. When
making a POST request should he create an ingredient with
only the necessary fields or also the amount and the
measurment type of the joining table recipeIngredients


This decision depends on the requirements of your application and the user experience you want to deliver. Let me break it down for you:

Option 1: Predefined Ingredients (More Controlled)
User Experience: The user first creates ingredients in the system and then selects them when creating a recipe. This ensures data consistency and avoids duplicate ingredient names.
Backend Logic:
When making a POST request for the recipe, the user includes the existing ingredient IDs along with the amount and measurementType for the recipeIngredients table.
Example:
json
Copiar
Editar
{
  "title": "Pasta",
  "ingredients": [
    { "ingredientId": 1, "amount": 200, "measurementType": "grams" },
    { "ingredientId": 2, "amount": 1, "measurementType": "unit" }
  ]
}
The backend would handle the relation by checking the ingredient IDs and updating the recipeIngredients table accordingly.
Option 2: Ad-Hoc Ingredient Creation (More Flexible)
User Experience: The user can type new ingredient names directly when creating a recipe. If the ingredient doesn’t exist in the database, it’s created dynamically along with the amount and measurementType in the recipeIngredients table.
Backend Logic:
When making a POST request for the recipe, the user includes the ingredient names along with amount and measurementType.
Example:
json
Copiar
Editar
{
  "title": "Pasta",
  "ingredients": [
    { "name": "Tomato", "amount": 200, "measurementType": "grams" },
    { "name": "Garlic", "amount": 2, "measurementType": "cloves" }
  ]
}
The backend would:
Check if the ingredient already exists.
If it doesn’t, create it in the ingredients table.
Add the relationship in the recipeIngredients table.
Considerations:
Data Consistency:
Option 1 is more controlled, as it avoids duplicate ingredients (e.g., "Tomato" vs. "tomatoes").
Option 2 requires extra checks to prevent duplicates and improve user input (e.g., trimming spaces, normalizing case).
User Experience:
Option 1 is ideal for apps targeting advanced users or those managing a fixed inventory of ingredients.
Option 2 is better for casual users who want simplicity.
Amount and Measurement in recipeIngredients:
Regardless of the approach, the amount and measurementType should always belong to the recipeIngredients table because:

These values describe the relationship between a recipe and its ingredients.
The same ingredient can appear in multiple recipes with different amounts and measurements (e.g., "200g of sugar" in one recipe and "1 tsp of sugar" in another).
Recommendation:
Start with Option 1: Let users select predefined ingredients to ensure consistency. Over time, you can add functionality to allow ad-hoc ingredient creation if needed.
Structure Your API:
Separate POST requests for creating ingredients and recipes.
The recipe POST request should reference existing ingredients by ID and specify amount and measurementType.
This approach balances flexibility, data integrity, and scalability.
*/
