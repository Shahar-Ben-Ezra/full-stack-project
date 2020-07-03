# README
The mail and the password for log-in are:
>    email: "iS@gmail.com" 
     password: "12345"
---

Table explanation
---
I created 3 tables 

.user with email (key),nickName ,phone ,password.
.productList with id(key), productName,amount ,status,listId(fk),email(fk)
i added email column because when i want to get all the products that the users
added to his lists besides the current list, and i must a column that have the data which users 
added this product. another options is to get all the list that the user created and in each one to get all the product in the list. 
.lists listid (key),listName,email(FK)

when copy from exiced list to new list all the products will be in need to buy status 