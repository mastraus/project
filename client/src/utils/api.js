const API_BASE_URL = process.env.REACT_APP_DATABASE_URL;

const headers = new Headers();
headers.append("Content-Type", "application/json");

async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

export async function deleteTopping(toppingId) {
  const url = `${API_BASE_URL}/toppings/${toppingId}`;
  return await fetchJson(url, { method: "DELETE", headers }, {});
}

export async function deletePizza(pizzaId) {
  const url = `${API_BASE_URL}/pizzas/${pizzaId}`;
  return await fetchJson(url, { method: "DELETE", headers }, {});
}

export async function updateTopping(toppingId, data) {
  const url = `${API_BASE_URL}/toppings/${toppingId}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
  };
  return await fetchJson(url, options, {});
}

export async function updatePizza(pizzaId, data) {
  const url = `${API_BASE_URL}/toppings/${pizzaId}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
  };
  return await fetchJson(url, options, {});
}

export async function createTopping(topping, signal) {
  const url = `${API_BASE_URL}/toppings`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(topping),
    signal,
  };
  return await fetchJson(url, options, topping);
}

//   export async function readCard(cardId, signal) {
//     const url = `${API_BASE_URL}/cards/${cardId}`;
//     return await fetchJson(url, { signal }, {});
//   }
