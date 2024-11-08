package controllers

import (
	"commerce/database"
	"commerce/models"
	generate "commerce/tokens"
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var UserCollection *mongo.Collection = database.UserData(database.Client, "Users")
var ProductCollection *mongo.Collection = database.ProductData(database.Client, "Products")
var Validate = validator.New()

func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	if err != nil {
		log.Fatal(err)
	}
	return string(bytes)

}

func VerifyPassword(userPasswor string, givenPassword string) (bool, string) {

	err := bcrypt.CompareHashAndPassword([]byte(givenPassword), []byte(userPasswor))

	msg := ""
	var valid = true

	if err != nil {
		msg = "Login or Password is not valid"
		valid = false

	}

	return valid, msg

}

func SignUp() gin.HandlerFunc {

	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var user models.User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error:": err.Error()})
			return
		}
		validationErr := Validate.Struct(user)
		//generated.TokenGeneator()

		if validationErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": validationErr})
			return
		}
		count, err := UserCollection.CountDocuments(ctx, bson.M{"email": user.Email})
		fmt.Println(bson.M{"email": user.Email}, count)
		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": user.Email})
			return
		}

		if count > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "email already exist"})
			return
		}

		count, err = UserCollection.CountDocuments(ctx, bson.M{"phone": user.Phone})

		defer cancel()

		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusBadRequest, gin.H{"errorSign": err})
			return
		}

		if count > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "this phone no. is already exist in use"})
			return
		}
		user.Created_At, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.Updated_At, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.ID = primitive.NewObjectID()
		user.User_ID = user.ID.Hex()

		token, refreshtoken, _ := generate.TokenGeneator(*user.Email, *user.First_Name, *user.Last_Name, user.User_ID)
		user.Token = &token
		user.Refresh_Token = &refreshtoken
		user.UserCart = make([]models.ProductUser, 0)
		user.Address_Details = make([]models.Address, 0)
		user.Order_Status = make([]models.Order, 0)

		_, inserterr := UserCollection.InsertOne(ctx, user)

		if inserterr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "the user did not created"})
			return
		}
		defer cancel()

		c.JSON(http.StatusCreated, "Successfully signed in!")
	}

}

func Login() gin.HandlerFunc {

	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

		defer cancel()

		var user models.User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}
		var founduser *models.User
		err := UserCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&founduser)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Login or password incorrect"})
			return
		}

		PasswordInvalid, msg := VerifyPassword(*user.Password, *founduser.Password)
		fmt.Println(PasswordInvalid)

		defer cancel()

		if PasswordInvalid {
			c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
			fmt.Println(msg)
			return
		}
		token, refreshtoken, _ := generate.TokenGeneator(*founduser.Email, *founduser.First_Name, *founduser.Last_Name, founduser.User_ID)

		defer cancel()

		generate.UpdateAllTokens(token, refreshtoken, founduser.User_ID)

		c.JSON(http.StatusFound, founduser)

	}

}

func ProductViewerAdmin() gin.HandlerFunc {

	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var products models.Product

		if err := c.BindJSON(&products); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		count, err := ProductCollection.CountDocuments(ctx, bson.M{"noserie": products.Num})
		fmt.Println(count)
		if err != nil {
			log.Panic(err)
			return
		}
		if count > 0 {

			c.JSON(http.StatusInternalServerError, gin.H{"error": "numero serie already exist"})
			return
		}

		products.Product_ID = primitive.NewObjectID()

		_, err = ProductCollection.InsertOne(ctx, products)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Not Created"})
			return
		}
		defer cancel()
		c.JSON(http.StatusOK, "Successfully added our Product Admin!!")
	}

}

func SearchProduct() gin.HandlerFunc {

	return func(c *gin.Context) {

		var productList []models.Product

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

		defer cancel()

		cursor, err := ProductCollection.Find(ctx, bson.D{})

		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, "Something went wrong, please try after some time")

			return

		}

		err = cursor.All(ctx, &productList)

		if err != nil {
			log.Println(err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		defer cursor.Close(ctx)

		if err := cursor.Err(); err != nil {
			log.Println(err)
			c.IndentedJSON(400, "invalid")
			return
		}
		defer cancel()

		c.IndentedJSON(200, "Successfully ")

	}

}

func SearchProductByQueryByName() gin.HandlerFunc {
	return func(c *gin.Context) {
		var searchProduct []models.Product

		queryParam := c.Query("name")
		//queryParamno := c.Query("no")

		//check you want check if its empty
		fmt.Println(queryParam)

		if queryParam == "" {
			log.Panic("query is empty")
			c.Header("Content-Type", "application/json")
			c.JSON(http.StatusNotFound, gin.H{"Error": "Invalid search index"})
			c.Abort()
			return
		}
		// if queryParamno == "" {
		// 	log.Panic("query is empty")
		// 	c.Header("Content-Type", "application/json")
		// 	c.JSON(http.StatusNotFound, gin.H{"Error": "Invalid search index"})
		// 	c.Abort()
		// 	return
		// }
		//fmt.Println(queryParamno)

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

		defer cancel()

		serachquerydb, err := ProductCollection.Find(ctx, bson.M{"product_name": bson.M{"$regex": queryParam}})

		if err != nil {
			c.IndentedJSON(404, "Something went wrong while fetching data")

		}
		err = serachquerydb.All(ctx, &searchProduct)

		if err != nil {
			log.Println(err)
			c.IndentedJSON(400, "invalid")
			return

		}
		c.IndentedJSON(200, &searchProduct)

	}

}
func SearchProductByQueryByNo() gin.HandlerFunc {
	return func(c *gin.Context) {
		var searchProduct []models.Product

		queryParam := c.Query("no")
		//queryParamno := c.Query("no")

		//check you want check if its empty
		fmt.Println(queryParam)

		if queryParam == "" {
			log.Panic("query is empty")
			c.Header("Content-Type", "application/json")
			c.JSON(http.StatusNotFound, gin.H{"Error": "Invalid search index"})
			c.Abort()
			return
		}
		// if queryParamno == "" {
		// 	log.Panic("query is empty")
		// 	c.Header("Content-Type", "application/json")
		// 	c.JSON(http.StatusNotFound, gin.H{"Error": "Invalid search index"})
		// 	c.Abort()
		// 	return
		// }
		//fmt.Println(queryParamno)

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

		defer cancel()

		serachquerydb, err := ProductCollection.Find(ctx, bson.M{"noserie": bson.M{"$regex": queryParam}})

		if err != nil {
			c.IndentedJSON(404, "Something went wrong while fetching data")

		}
		err = serachquerydb.All(ctx, &searchProduct)

		if err != nil {
			log.Println(err)
			c.IndentedJSON(400, "invalid")
			return

		}
		c.IndentedJSON(200, &searchProduct)

	}

}
