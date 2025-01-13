"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipesService = void 0;
var recipesGenerator_1 = require("../data/recipesGenerator");
var index_1 = require("../../node_modules/@hapi/boom/lib/index");
var RecipesService = /** @class */ (function () {
    function RecipesService(recipes) {
        this.recipes = [];
        this.recipes = recipes !== null && recipes !== void 0 ? recipes : [];
    }
    RecipesService.prototype.generate = function () {
        return __awaiter(this, arguments, void 0, function (amount) {
            if (amount === void 0) { amount = 100; }
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, recipesGenerator_1.createRecipes)(amount)];
            });
        });
    };
    RecipesService.prototype.initialize = function () {
        return __awaiter(this, arguments, void 0, function (amount) {
            var _a;
            if (amount === void 0) { amount = 100; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.generate(amount)];
                    case 1:
                        _a.recipes = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RecipesService.prototype.ensureInitialized = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.recipes || this.recipes.length === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize(100)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    RecipesService.prototype.getRecipes = function (limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        if (!limit) {
                            return [2 /*return*/, this.recipes];
                        }
                        return [2 /*return*/, this.recipes.slice(0, limit)];
                }
            });
        });
    };
    RecipesService.prototype.findRecipe = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.recipes.find(function (recipe) { return recipe.id === id; })];
            });
        });
    };
    RecipesService.prototype.findRecipeIndex = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.recipes.findIndex(function (recipe) { return recipe.id === id; })];
            });
        });
    };
    RecipesService.prototype.getRecipe = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findRecipe(id)];
                    case 1:
                        recipe = _a.sent();
                        if (!recipe) {
                            throw index_1.default.notFound("Recipe with ID ".concat(id, " not found"));
                        }
                        return [2 /*return*/, recipe];
                }
            });
        });
    };
    RecipesService.prototype.validate = function (recipe, isPartial) {
        if (isPartial === void 0) { isPartial = false; }
        var requiredProperties = Object.keys((0, recipesGenerator_1.createRecipes)(1)[0]);
        for (var _i = 0, _a = Object.keys(recipe); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!requiredProperties.includes(key)) {
                throw index_1.default.badData("Invalid property: ".concat(key));
            }
        }
        if (!isPartial) {
            for (var _b = 0, requiredProperties_1 = requiredProperties; _b < requiredProperties_1.length; _b++) {
                var prop = requiredProperties_1[_b];
                if (!(prop in recipe)) {
                    throw index_1.default.expectationFailed("Missing property: ".concat(prop));
                }
            }
        }
        return recipe;
    };
    RecipesService.prototype.updateRecipe = function (id, recipeUpdates) {
        return __awaiter(this, void 0, void 0, function () {
            var recipeIndex, validUpdates, updatedRecipe, validatedRecipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findRecipeIndex(id)];
                    case 1:
                        recipeIndex = _a.sent();
                        if (recipeIndex === -1) {
                            throw index_1.default.notFound("Recipe with ID ".concat(id, " not found"));
                        }
                        validUpdates = this.validate(recipeUpdates, true);
                        updatedRecipe = this.validate(__assign(__assign({}, this.recipes[recipeIndex]), validUpdates));
                        validatedRecipe = this.validate(updatedRecipe);
                        this.recipes[recipeIndex] = validatedRecipe;
                        return [2 /*return*/, validatedRecipe];
                }
            });
        });
    };
    RecipesService.prototype.replaceRecipe = function (id, recipe) {
        return __awaiter(this, void 0, void 0, function () {
            var recipeIndex, validatedRecipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findRecipeIndex(id)];
                    case 1:
                        recipeIndex = _a.sent();
                        if (recipeIndex === -1) {
                            throw index_1.default.notFound("Recipe with ID ".concat(id, " not found"));
                        }
                        validatedRecipe = this.validate(recipe);
                        this.recipes[recipeIndex] =
                            validatedRecipe;
                        return [2 /*return*/, validatedRecipe];
                }
            });
        });
    };
    RecipesService.prototype.createRecipe = function (recipe) {
        return __awaiter(this, void 0, void 0, function () {
            var derivedRecipe, createdRecipe;
            return __generator(this, function (_a) {
                derivedRecipe = __assign(__assign({}, recipe), { id: this.recipes.length });
                createdRecipe = this.validate(derivedRecipe);
                this.recipes.push(createdRecipe);
                return [2 /*return*/, createdRecipe];
            });
        });
    };
    RecipesService.prototype.deleteRecipe = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var recipeIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findRecipeIndex(id)];
                    case 1:
                        recipeIndex = _a.sent();
                        if (recipeIndex === -1) {
                            throw index_1.default.notFound("Recipe with ID ".concat(id, " not found"));
                        }
                        this.recipes = this.recipes.filter(function (recipe) { return recipe.id !== id; });
                        return [2 /*return*/];
                }
            });
        });
    };
    return RecipesService;
}());
var recipesService = new RecipesService();
exports.recipesService = recipesService;
recipesService.initialize();
console.log('------------ GET ------------');
console.log(await recipesService.getRecipes(2));
console.log('------------ FIND ------------');
console.log(await recipesService.findRecipe(2));
console.log('------------ CREATE -----------');
console.log(await recipesService.createRecipe((0, recipesGenerator_1.createRecipes)(1)[0]));
console.log('--------- UPDATE -----------');
console.log(await recipesService.updateRecipe(1, {
    title: 'New Title'
}));
console.log(await recipesService.getRecipe(1));
console.log('---------- REPLACE ------------');
console.log(await recipesService.getRecipes(2));
console.log(await recipesService.replaceRecipe(1, (0, recipesGenerator_1.createRecipes)(1)[0]));
console.log('---------- DELETE ------------');
console.log(await recipesService.deleteRecipe(2));
console.error(await recipesService.getRecipe(2));
