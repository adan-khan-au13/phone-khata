/*
The purpose of creating this file is when the user tries to logout,
his token will be stored in array and if it is stored in array, 
he will not be able to send any other request as in auth.js file, 
it will check for the index and if there is token in an array, he will be logged out
else he can continue with his operations.

It will store all the logged-out bearer tokens, once the user is logged out
and tries to access any APIs, he won't be able to access and has to login in again.
*/ 

let logoutTokens=[]

module.exports=logoutTokens