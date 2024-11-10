package routes

import (
	"commerce/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/users/signup", controllers.SignUp())
	incomingRoutes.POST("/users/login", controllers.Login())
	incomingRoutes.POST("/admin/addproduct", controllers.ProductViewerAdmin())
	incomingRoutes.GET("/users/productview", controllers.SearchProduct())
	incomingRoutes.GET("users/search", controllers.SearchProductByQueryByName())
	incomingRoutes.GET("users/searchno", controllers.SearchProductByQueryByNo())
	incomingRoutes.PUT("admin/update", controllers.UpdateProduct())
	incomingRoutes.DELETE("admin/delete", controllers.DeleteProduct())

}
