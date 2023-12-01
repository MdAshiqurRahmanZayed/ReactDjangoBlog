from rest_framework import serializers
from .models import Post,Profile
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
# from django.contrib.auth.models import User
User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
     class Meta:
          model = User
          fields = ('id','username','password','first_name','last_name','email')
          extra_kwargs = {'password':{'write_only':True ,'required':True}}
          
          
     def create(self,validated_data):
          user = User.objects.create_user(**validated_data)
          Token.objects.create(user=user)
          Profile.objects.create(user=user)
          return user

class ProfileSerializer(serializers.ModelSerializer):
     class Meta:
          model = Profile
          fields = "__all__"
          read_only_fields= ['user']
     
     def validate(self,obj):
          obj['user'] = self.context['request'].user
          # print(obj)
          return obj
          
     def to_representation(self,instance):
          data = super().to_representation(instance)
          data['user'] = UserSerializer(instance.user).data
          return data


class PostSerializer(serializers.ModelSerializer):
     class Meta:
          model = Post
          fields = "__all__"
          read_only_fields= ['user']
          depth = 1
          
     def validate(self,obj):
          obj['user'] = self.context['request'].user
          # print(obj)
          return obj
     
     
     def to_representation(self,instance):
          data = super().to_representation(instance)
          data['user'] = ProfileSerializer(instance.user.profile).data
          return data
     
class PostProfileSerializer(serializers.ModelSerializer):
     class Meta:
          model = Profile
          fields = "__all__"
          read_only_fields= ['user']
          
     def to_representation(self,instance):
          data = super().to_representation(instance)
          data['user'] = UserSerializer(instance.user).data
          return data