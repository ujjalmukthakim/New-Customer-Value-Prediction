from rest_framework import serializers
from django.contrib.auth import authenticate



from .models import User,Brance


class RegistrationSerializer(serializers.ModelSerializer):

    password=serializers.CharField(write_only=True,min_length=8)

    brance=serializers.PrimaryKeyRelatedField(
        queryset=Brance.objects.filter(is_active=True)
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

        

    def create(self,validated_data):
            password=validated_data.pop("password")

            user=User.objects.create_user(
                password=password,
                is_active=False,
                **validated_data
            )
            return user



class LoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True,trim_whitespace=False)

    def validate(self, data):
        request=self.context.get("request")

        user=authenticate(
            request=request,
            email=data["email"],
            password=data["password"]
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid User...or your account is not active"
            )
        data["user"]=user
        return data


