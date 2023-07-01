# Mindful Pizza Co. - A StrongMind Technical Challenge

Use this dashboard to manage the specialty pizzas and available toppings at Mindful Pizza Co.! This project serves as my technical assessment for potential employment at StrongMind.

The live version of the app can be found here!

## Local Install

1. Open the `strongmind-pizza` repository on your computer.
2. Start the local server switching into the server directory (`cd server`) and run:

```bash
npm start
```

3. Start the client side application by switching into the client directory (`cd client`) and run:

```bash
npm start
```

4. Navigate to `http://localhost:3000/` to access the app locally.

## Running Tests

1. Navigate to the server directory (`cd server`) within the `strongmind-pizza` repository.
2. Ensure the database migrations are updated by running:

```bash
npm run migrate
```

3. Seed the database by running:

```bash
npm run seed
```

4. Begin the sequence of tests by running:

```bash
npm run test
```

## User Stories

### Story 1: Manage Toppings

**As a pizza store owner I should be able to manage toppings available for my pizza chefs.**

- It should allow me to see a list of available toppings
- It should allow me to add a new topping
- It should allow me to delete an existing topping
- It should allow me to update an existing topping
- It should not allow me to enter duplicate toppings

### Story 2: Manage Pizzas

**As a pizza chef I should be able to create new pizza master pieces.**

It should allow me to see a list of existing pizzas and their toppings
It should allow me to create a new pizza and add toppings to it
It should allow me to delete an existing pizza
It should allow me to update an existing pizza
It should allow me to update toppings on an existing pizza
It should not allow me to enter duplicate pizzas
