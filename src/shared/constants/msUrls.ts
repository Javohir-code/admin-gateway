<<<<<<< HEAD
export const ownerMsUrl = 'localhost:80';
export const productMsUrl = 'localhost:82';
export const userMsUrl = 'localhost:83';
=======
require('dotenv').config({ path: '.env' })

// console.log("asddddddddddddddddddd",process.env.OWNER_MS_URl)
export const ownerMsUrl = process.env.OWNER_MS_URl;
export const productMsUrl = process.env.PRODUCT_MS_URl;
export const helperMsUrl = process.env.HELPER_MS_URl;
export const userMsUrl = process.env.USER_MS_URl;
export const shopMsUrl = process.env.SHOP_MS_URl;
>>>>>>> 2798091f42d1cd21c1653592331f18370147f7a0
