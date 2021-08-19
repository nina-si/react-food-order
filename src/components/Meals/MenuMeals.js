import React, { useEffect, useState } from "react";

import classes from "./MenuMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const MenuMeals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealsList = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://react-order-f8ccf-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error(`Couldn't load the menu`);
      }
      const responseData = await response.json();
      const mealsList = [];
      for (let key in responseData) {
        mealsList.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(mealsList);
      setIsLoading(false);
    };

    fetchMealsList().catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        name={meal.name}
        key={meal.id}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <React.Fragment>
      {isLoading && (
        <section className={classes.loading}>
          <p>Loading menu...</p>
        </section>
      )}
      {error && (
        <section className={classes.mealsError}>
          <p>{error}</p>
        </section>
      )}
      {!isLoading && mealsList.length > 0 && (
        <section className={classes.meals}>
          <Card>
            <ul>{mealsList}</ul>
          </Card>
        </section>
      )}
    </React.Fragment>
  );
};

export default MenuMeals;
