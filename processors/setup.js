const playwright = require('playwright');

async function setUserData(context, ee, next) {
  const apiContext = await playwright.request.newContext({
    baseURL: context.vars.target,
    ignoreHTTPSErrors: true,
  });
  const userLoginData = {
    username: process.env.USER,
    password: process.env.PASSWORD,
  };
  // get user data
  const response = await apiContext.post('/login', {
    data: userLoginData,
  });
  const loginResponse = await response.json();
  // get a cookie, token, auth value from response
  const tokenString = loginResponse.split(': ')[1];
  // save user token value as variable in context used in tests
  context.vars.$processEnvironment.token = tokenString;

  // if auth is stored in headers you can use an example below
  // const headers = response.headersArray();
  // const cookie = headers.find((obj) => obj.name === 'Set-Cookie').value;
  // // save a cookie value
  // context.vars.$processEnvironment.cookies = cookie;

  // do the same with any other response attributes that can be useful to keep let's say user id
  next();
}

async function setHeaders(requestParams, context, ee, next) {
  requestParams.cookies = { tokenp_: context.vars.$processEnvironment.token };
  next();
}

module.exports = {
  setUserData,
  setHeaders,
};
