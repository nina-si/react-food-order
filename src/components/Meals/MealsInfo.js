import classes from "./MealsInfo.module.css";

const MealsInfo = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
    </section>
  );
};

export default MealsInfo;
