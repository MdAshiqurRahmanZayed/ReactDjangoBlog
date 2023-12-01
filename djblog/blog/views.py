from django.shortcuts import render
from rest_framework import viewsets,views
from .models import Post,Profile
from .serializers import PostSerializer,UserSerializer,ProfileSerializer,PostProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

class PostView(viewsets.ModelViewSet):
     permission_classes = [IsAuthenticated, ]
     authentication_classes = [TokenAuthentication, ]
     queryset = Post.objects.all().order_by('-id')
     serializer_class = PostSerializer

class ProfileView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

     
    def get(self,request):
          user  = request.user
          pquery = Profile.objects.get(user=user)
          serializer = ProfileSerializer(pquery)
          return Response({"message":"Request is get","userdata":serializer.data})
     
class RegisterView(APIView):
     def post(self,request):
          serializers = UserSerializer(data=request.data)
          if serializers.is_valid():
               serializers.save()
               return Response({"error":False, "message":"User successfully created","data":serializers.data})
          return Response({"error":True, "message":"A user already created"})
               
               
class userDataUpdate(APIView):
     permission_classes = [IsAuthenticated, ]
     authentication_classes = [TokenAuthentication, ]
     
     def post(self,request):
          user = request.user
          data = request.data 
          user_obj = User.objects.get(username=user)
          user_obj.first_name = data['first_name']
          user_obj.last_name = data['last_name']
          user_obj.save()
          return Response({"message":"User data is updated"})
     
class profileDataUpdate(APIView):
     permission_classes = [IsAuthenticated, ]
     authentication_classes = [TokenAuthentication, ]
     
     def post(self,request):
          try:
               user = request.user
               query = Profile.objects.get(user=user)
               serializer = ProfileSerializer(query,data=request.data,context={'request':request})
               if serializer.is_valid():
                    serializer.save()
                    response_msg ={"error":False,"messge":"Profile is Updated"}
          except: 
               response_msg ={"error":True,"messge":"Profile is not Updated"} 
          return Response(response_msg)
          
          
class allPost(APIView):
     def get(self,request):
          posts = Post.objects.all().order_by('-id')
          serializer = PostSerializer(posts,many = True)
          return Response(serializer.data)
     
     
@api_view(['GET'])
def ToDoDetail(request,pk):
	todo = Post.objects.get(id=pk)
	serializer = PostSerializer(todo, many = False)
	return Response(serializer.data)

class postProfileView(APIView):
    def get(self,request,username):
          user  = User.objects.get(username=username)
          pquery = Profile.objects.get(user=user)
          serializer = ProfileSerializer(pquery)
          return Response({"message":"Request is get","userdata":serializer.data})
     
     
     
class login(APIView):
     def post(self,request):
          email = request.data['username']
          password = request.data['password']
          user = authenticate( email=email, password=password)
          print(user)
          # if User.objects.get(email = email,password=password):
          #      token = Token.objects.get(User.objects.get(email = email,password=password))
          #      return Response({"error":False, "message":"User successfully created","data":token})
          print(password)
          # if serializers.is_valid():
          #      serializers.save()
          return Response({"error":True, "message":"A user already created"})  
# class PostUserProfileView(APIView):
#     permission_classes = [IsAuthenticated, ]
#     authentication_classes = [TokenAuthentication, ]

     
#     def get(self,request):
#           user  = request.user
#           pquery = Profile.objects.get(user=user)
#           serializer = ProfileSerializer(pquery)
#           return Response({"message":"Request is get","userdata":serializer.data})