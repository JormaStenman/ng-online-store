import initialProducts from '../assets/data/products.json';
import {random} from 'lodash/number';
import {v4 as uuid} from 'uuid';

const storage = window.localStorage;

// noinspection SpellCheckingInspection
const ordersKey = 'me.stenman.orders';

// noinspection SpellCheckingInspection
const productsKey = 'me.stenman.products';

export const getProductById = id => {
  return promiseToReturn({
    resultFunc: () => {
      const products = loadProducts();
      if (id in products) {
        return {
          product: products[id],
        }
      }
      throw new Error(`no product found matching id ${id}`);
    },
  });
};

export const getProductsByIds = ids => {
  return promiseToReturn({
    resultFunc: () => {
      const idSet = new Set(ids);
      const products = loadProducts();
      const requestedProducts = idSet.keys().reduce((ary, productId) => {
        if (products[productId]) {
          ary.push(products[productId]);
        }
        return ary;
      }, []);
      return {
        products: requestedProducts,
      };
    },
  });
};

export const getAllProducts = () => {
  return promiseToReturn({
    resultFunc: () => ({
      products: Object.values(loadProducts())
    }),
  });
};

export const updateProduct = update => {
  return promiseToReturn({
    resultFunc: () => {
      const products = loadProducts();
      if (update.id in products) {
        products[update.id] = {
          ...products[update.id],
          ...update,
        };
        storeProducts(products);
        return {
          updated: products[update.id],
        };
      }
      throw new Error(`No product found with id ${update.id}.`);
    },
  });
};

export const getAllOrders = () => {
  return promiseToReturn({
    resultFunc: () => ({
      orders: Object.values(loadOrders())
    }),
  });
};

export const createOrder = newOrder => {
  return promiseToReturn({
    resultFunc: () => {
      const id = uuid();
      const order = {
        ...newOrder,
        id,
        date: new Date().toISOString().substr(0, 10),
        createdAt: Date.now(),
      };
      const orders = loadOrders();
      orders[id] = order;
      storeOrders(orders);
      return {
        order,
      }
    },
  });
};

export const deleteOrder = orderId => {
  return promiseToReturn({
    resultFunc: () => {
      const orders = loadOrders();
      delete orders[orderId]
      storeOrders(orders);
      return {
        deleted: orderId,
      }
    },
  });
};

const clearOrders = () => promiseToReturn({
  resultFunc: () => {
    storage.removeItem(ordersKey);
  },
});

const clearProducts = () => promiseToReturn({
  resultFunc: () => {
    storage.removeItem(productsKey);
  },
});

export const hasDataInStorage = () => storage.getItem(ordersKey) !== null || storage.getItem(productsKey) !== null;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  clearOrders,
  clearProducts,
  createOrder,
  deleteOrder,
  getAllOrders,
  getAllProducts,
  getProductById,
  getProductsByIds,
  updateProduct,
};

function getError(errorProb) {
  if (random(1, true) <= errorProb) {
    return `A fake API error occurred. Error probability
        ${(errorProb * 100).toFixed()}% is adjustable in client.js.`;
  }
  return null;
}

function promiseToReturn({resultFunc = () => undefined, maxDelay = 2000, errorProb = 0.0}) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          const error = getError(errorProb);
          if (error) {
            reject(new Error(error))
          } else {
            let result;
            try {
              result = resultFunc();
            } catch (e) {
              reject(e);
            }
            resolve(result);
          }
        },
        random(maxDelay)
      );
    }
  );
}

function loadOrders() {
  return JSON.parse(storage.getItem(ordersKey) || '{}');
}

function storeOrders(orders) {
  storage.setItem(ordersKey, JSON.stringify(orders));
}

function initProducts() {
  const productsById = initialProducts.reduce((productsById, product) => {
    productsById[product.id] = product;
    return productsById;
  }, {});
  storeProducts(productsById);
  return productsById;
}

function loadProducts() {
  const item = storage.getItem(productsKey);
  return item ? JSON.parse(item) : initProducts();
}

function storeProducts(products) {
  storage.setItem(productsKey, JSON.stringify(products));
}
