
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from blog.views import ProfileView,RegisterView,PostView,userDataUpdate,profileDataUpdate,allPost,ToDoDetail,postProfileView,login
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="Django Blog API",
      default_version='v1',
      description="Django React Blog",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register("",PostView,'post')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/',include(router.urls),name='api'),
    path('profile/',ProfileView.as_view(),name='Profile'),
    path('login/',obtain_auth_token,name='Login'),
    path('login-test/',login.as_view(),name='Login test'),
    path('register/',RegisterView.as_view(),name='Register'),
    path('user-data-update/',userDataUpdate.as_view(),name='user data update'),
    path('profile-data-update/',profileDataUpdate.as_view(),name='Profile update'),
    path('all-posts/',allPost.as_view(),name='All posts'),
    path('todo-detail/<int:pk>',  ToDoDetail, name="todo-detail"),
    path('post-user-profile/<str:username>/',  postProfileView.as_view(), name="postProfileView"),
    path('swagger.json/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    
]
urlpatterns+=static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)
urlpatterns+=static(settings.STATIC_URL,document_root = settings.STATIC_ROOT)
