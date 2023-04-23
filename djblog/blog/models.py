from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Post(models.Model):
     user = models.ForeignKey(User,on_delete=models.CASCADE)
     title = models.CharField( max_length=200)
     description = models.TextField()
     image = models.ImageField( upload_to="post/",null=True,blank=True)
     date = models.DateField(  auto_now_add=True)
     
     def __str__(self):
          return self.title
     
     
     
class Profile(models.Model):
     user = models.OneToOneField(User,on_delete=models.CASCADE)
     about = models.TextField(default="about")
     image = models.ImageField( upload_to="profile/",default="default.jpg",null=True,blank=True)
          
     def __str__(self):
          return self.user.username
     
     
     