package middleware

import (
	token "commerce/tokens"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authentification() gin.HandlerFunc {
	return func(c *gin.Context) {
		ClientToken := c.Request.Header.Get("token")

		if ClientToken == "" {
			c.JSON(http.StatusInternalServerError, gin.H{"Error": "No authorization head"})
			c.Abort()
			return

		}

		claims, msg := token.ValidateToken(ClientToken)

		if msg != "" {
			c.JSON(http.StatusInternalServerError, gin.H{"Error": msg})
			c.Abort()
			return

		}

		c.Set("email", claims.Email)
		c.Set("uid", claims.Uid)
		c.Next()

	}

}
