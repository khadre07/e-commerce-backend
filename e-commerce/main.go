package main

import (
	"commerce/controllers"
	"commerce/database"
	"commerce/middleware"
	"commerce/routes"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	app := controllers.NewApplication(database.ProductData(database.Client, "Products"), database.UserData(database.Client, "Users"))

	router := gin.New()
	router.Use(gin.Logger())

	routes.UserRoutes(router)

	router.Use(middleware.Authentification())

	router.GET("/addtocart", app.AddToCart())
	router.GET("/removefromcart", app.RemoveItem())
	router.GET("/cartcheckout", app.BuyFromCart())
	router.GET("/instantBuy", app.InstantBuy())

	log.Fatal(router.Run(":" + port))

}
