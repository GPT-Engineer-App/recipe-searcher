import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const recipesData = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish.",
    image: "/placeholder.svg",
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan cheese", "Black pepper"],
    steps: [
      "Cook the spaghetti.",
      "Fry the pancetta.",
      "Mix eggs and cheese.",
      "Combine all ingredients.",
      "Serve with black pepper."
    ]
  },
  {
    id: 2,
    title: "Chicken Curry",
    description: "A spicy and flavorful dish.",
    image: "/placeholder.svg",
    ingredients: ["Chicken", "Curry powder", "Coconut milk", "Onions", "Garlic"],
    steps: [
      "Cook the chicken.",
      "Sauté onions and garlic.",
      "Add curry powder.",
      "Pour in coconut milk.",
      "Simmer until cooked."
    ]
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = () => {
    const filtered = recipesData.filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleIngredientClick = (index) => {
    const updatedIngredients = selectedRecipe.ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, purchased: !ingredient.purchased };
      }
      return ingredient;
    });
    setSelectedRecipe({ ...selectedRecipe, ingredients: updatedIngredients });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="mb-4">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} className="mb-2 cursor-pointer" onClick={() => handleRecipeClick(recipe)}>
            <CardHeader>
              <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedRecipe && (
        <div className="mt-4">
          <Separator />
          <h2 className="text-2xl mt-4">{selectedRecipe.title}</h2>
          <img src={selectedRecipe.image} alt={selectedRecipe.title} className="mx-auto object-cover w-full h-[400px] mt-4" />
          <div className="mt-4">
            <h3 className="text-xl">Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  onClick={() => handleIngredientClick(index)}
                  className={`cursor-pointer ${ingredient.purchased ? "line-through text-gray-500" : ""}`}
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl">Steps</h3>
            <ol>
              {selectedRecipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          <Button onClick={handlePrint} className="mt-4">Print Recipe</Button>
        </div>
      )}
    </div>
  );
};

export default Index;