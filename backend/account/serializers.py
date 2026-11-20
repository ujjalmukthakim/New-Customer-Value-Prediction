from rest_framework import serializers
from django.contrib.auth import authenticate
from django.db import transaction



from .models import (
    User,
    Branch,
    BranchProductPrice,
    CustomerProfile,
    Product,
    Sale,
    SaleItem,
    
)


class RegistrationSerializer(serializers.ModelSerializer):

    password=serializers.CharField(write_only=True,min_length=8)

    brance=serializers.PrimaryKeyRelatedField(
        queryset=Branch.objects.filter(is_active=True)
    )

    class Meta:
        model = User
        fields= [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "phone_number",
            "address",
            "role",
            "brance"
        ]
        read_only_fields=["id"]

        
    @transaction.atomic
    def create(self,validated_data):
            password=validated_data.pop("password")

            user=User.objects.create_user(
                password=password,
                role=User.Role.Customer,
                is_active=False,
                **validated_data
            )
            # after creating user , instantly i create customer profile .
            CustomerProfile.objects.create(user=user)
            # i am returning user for save 
            return user


class StaffCreateCustomerSerializer(RegistrationSerializer):
     
     password=serializers.CharField(
          write_only=True,
          min_length=8,
          required=False,
     )




class LoginSerializer(serializers.Serializer):
    email=serializers.EmailField(trim_whitespace=True)
    password=serializers.CharField(write_only=True,trim_whitespace=False)

    def validate(self, data):
        request=self.context.get("request")
        data["email"] = data["email"].strip().lower()

        user=authenticate(
            request=request,
            email=data["email"],
            password=data["password"]
        )

        if user is None or not user.is_active:
            raise serializers.ValidationError(
                "Invalid User...or your account is not active"
            )
        data["user"]=user
        return data


class CustomerListSerializer(serializers.ModelSerializer):
     first_name=serializers.CharField(source="user.first_name",read_only=True)
     last_name=serializers.CharField(source="user.last_name",read_only=True)
     email=serializers.EmailField(source="user.email",read_only=True)

     class Meta :
          model = CustomerProfile
          fields=["id","first_name","last_name","email","rank","lifetime_spend"]



     