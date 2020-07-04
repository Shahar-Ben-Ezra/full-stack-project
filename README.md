# README

>   sql-
     $servername = "localhost";
     $username = "root";
     $password = "1234";


### Table explanation
I created 3 tables 

1. user with email (key),nickName ,phone ,password.

1. productList with id(key), productName,amount ,status,listId(fk),email(fk)
i added email column because when i want to get all the products that the users
added to his lists besides the current list, and i must a column that have the data which users added this product.

1. lists listid (key),listName,email(FK)

* when copy from exiced list to new list all the products will be in need to buy status 