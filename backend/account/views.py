from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegistrationSerializer,LoginSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class=RegistrationSerializer
    permission_classes=[AllowAny]

    def create(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        return Response(
            {
                "message":"Registration complete. Now wait for admin approval .",
                "email":user.email,
                "role":user.role,
                "is_active":user.is_active,
            },
            status=status.HTTP_201_CREATED,
        )

class LoginView(APIView):
    permission_classes=[AllowAny]

    def post(self,request):
        serializer=LoginSerializer(
            data=request.data,
            context={"request":request}

        )
        serializer.is_valid(raise_exception=True)
        user=serializer.validated_data["user"]
        refresh=RefreshToken.for_user(user)

        return Response(
            {
                "message":"Login Sucessful",
                "access":str(refresh.access_token),
                "refresh":str(refresh),
                "user":{
                    "id":user.id,
                    "email":user.email,
                    "role":user.role,
                    "brance":user.brance_id
                }
            },
            status=status.HTTP_200_OK
        )


