"""djblog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from blog.views import ProfileView,RegisterView,PostView,userDataUpdate,profileDataUpdate,allPost,ToDoDetail,postProfileView
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register("",PostView,'post')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/',include(router.urls)),
    path('profile/',ProfileView.as_view()),
    path('login/',obtain_auth_token),
    path('register/',RegisterView.as_view()),
    path('user-data-update/',userDataUpdate.as_view()),
    path('profile-data-update/',profileDataUpdate.as_view()),
    path('all-posts/',allPost.as_view()),
    path('todo-detail/<int:pk>',  ToDoDetail, name="todo-detail"),
    path('post-user-profile/<str:username>/',  postProfileView.as_view(), name="PostUserProfileView"),
    
]
urlpatterns+=static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)
urlpatterns+=static(settings.STATIC_URL,document_root = settings.STATIC_ROOT)
