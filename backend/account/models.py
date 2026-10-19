from django.db import models
from django.contrib.auth.models import AbstractUser
from account.managers import CustomUserManager

# Create your models here.



class Brance(models.Model):
    name=models.CharField(max_length=50,unique=True)
    address=models.TextField(blank=True,null=True)
    is_active=models.BooleanField(default=True)

    def __str__(self):
        return self.name
    

class User(AbstractUser):

    class Role(models.TextChoices):
        Employee="Employee","employee"
        Manager="Manager","manager"
        Director="Director","director"

    username=None
    email=models.EmailField(unique=True)
    address=models.TextField(blank=True,null=True)
    phone_number=models.TextField(max_length=15,blank=True,null=True)

    role=models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.Employee,
        
        )
    
    brance=models.ForeignKey(Brance, on_delete=models.PROTECT,related_name="user",null=True,blank=True)
    is_active=models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]

    objects=CustomUserManager()

    def __str__(self):
        return f'{self.email} - {self.role}'
    

