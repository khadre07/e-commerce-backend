##Ecommerce With Golang 

# You can start the project with below commands
docker-compose up -d does not work insted try with below command
go run main.go 

    *** SIGNUP FUNCTION API CALL (POST REQUEST) ***
    

http://localhost:8080/users/signup

{
  "first_name": "papa",
  "last_name": "Sarr",
  "email": "psarr@gmail.com",
  "password": "psarr1234",
  "phone": "+45345433"
}

Response :"Successfully Signed Up!!"

    LOGIN FUNCTION API CALL (POST REQUEST)

    http://localhost:8080/users/login

{
  "email": "psarr@gmail.com",
  "password": "psarr1234"
}

response will be like this

{
  "_id": "***********************",
  "first_name": "papa",
  "last_name": "sarr",
  "password": "$2a$14$UIYjkTfnFnhg4qhIfhtYnuK9qsBQifPKgu/WPZAYBaaN17j0eTQZa",
  "email": "psarr@gmail.com",
  "phone": "+45345433",
  "token": "eyJc0Bwcm90b25vbWFpbC5jb20iLCJGaXJzdF9OYW1lIjoiam9zZXBoIiwiTGFzdF9OYW1lIjoiaGVybWlzIiwiVWlkIjoiNjE2MTRmNTM5ZjI5YmU5NDJiZDlkZjhlIiwiZXhwIjoxNjMzODUzNjUxfQ.NbcpVtPLJJqRF44OLwoanynoejsjdJb5_v2qB41SmB8",
  "Refresh_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IiIsIkZpcnLCJVaWQiOiIiLCJleHAiOjE2MzQzNzIwNTF9.ocpU8-0gCJsejmCeeEiL8DXhFcZsW7Z3OCN34HgIf2c",
  "created_at": "2024-11-09T08:14:11Z",
  "updtaed_at": "2024-11-09T08:14:11Z",
  "user_id": "61614f539f29be942bd9df8e",
  "usercart": [],
  "address": [],
  "orders": []
}

    Admin add Product Function (POST REQUEST)

    http://localhost:8080/admin/addproduct

{
  "product_name": "jaguar x15",
  "price": 2540,
  "rating": 11,
  "image": "jaguar.jpg",
  "noserie": "2344"
}

Response : "Successfully added our Product Admin!!"

    View all the Products in db GET REQUEST

    http://localhost:8000/users/productview

Response

[
  {
    "Product_ID": "6153ff8edef2c3c0a02ae39a",
    "product_name": "jaguarx15",
    "price": 1500,
    "rating": 10,
    "image": "jaguar.jpg",
    "noserie":"2344"
  },
  {
    "Product_ID": "616152679f29be942bd9df8f",
    "product_name": "opel axae",
    "price": 900,
    "rating": 5,
    "image": "gin.jpg",
     "noserie":"2344433"
    
  },
  {
    "Product_ID": "616152ee9f29be942bd9df90",
    "product_name": "iphone 13",
    "price": 1700,
    "rating": 4,
    "image": "ipho.jpg",
     "noserie":"237756rtg"
  },
  {
    "Product_ID": "616152fa9f29be942bd9df91",
    "product_name": "samsung",
    "price": 100,
    "rating": 7,
    "image": "whis.jpg",
     "noserie":"234455"
  },
  {
    "Product_ID": "616153039f29be942bd9df92",
    "product_name": "acer predator",
    "price": 3000,
    "rating": 10,
    "image": "acer.jpg",
     "noserie":"23443456886"
  }
]

    Search Product by regex function (GET REQUEST)

defines the word search sorting http://localhost:8080/users/search?name=ja

response:

[
  {
    "Product_ID": "616152fa9f29be942bd9df91",
    "product_name": "jaguar x15",
    "price": 1500,
    "rating": 10,
    "image": "jaguar.jpg"
     "noserie":"2344"
  }
]

 Search Product by regex function (GET REQUEST)

defines the word search sorting http://localhost:8080/users/searchno?name=2344

response:

[
  {
    "Product_ID": "616152fa9f29be942bd9df91",
    "product_name": "jaguar x15",
    "price": 1500,
    "rating": 10,
    "image": "jaguar.jpg"
     "noserie":"2344"
  }
]
