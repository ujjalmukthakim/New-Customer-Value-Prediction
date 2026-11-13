from django.db import models
from django.contrib.auth.models import AbstractUser
from account.managers import CustomUserManager
from django.conf import settings

# Create your models here.



class Brance(models.Model):
    name=models.CharField(max_length=50,unique=True)
    address=models.TextField(blank=True,null=True)
    is_active=models.BooleanField(default=True)

    def __str__(self):
        return self.name
    

class User(AbstractUser):

    class Role(models.TextChoices):
        Customer = "Customer", "customer"
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
    


class CustomerProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="customer_profile")
    rank=models.CharField(max_length=20,default="Bronze")
    lifetime_spend=models.DecimalField(max_digits=12, decimal_places=2,default=0)

    def __str__(self):
        return f"{self.user.email} - {self.rank}"
    

    
class Product(models.Model):
    name=models.CharField(max_length=150,unique=True)
    sku=models.CharField(max_length=50,unique=True)
    is_active=models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
class BranchProductPrice(models.Model):
    brance=models.ForeignKey(Brance,on_delete=models.PROTECT)
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    buying_price=models.DecimalField(max_digits=10, decimal_places=2)
    selling_price=models.DecimalField(max_digits=10, decimal_places=2)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        constraints=[
            models.UniqueConstraint(
                fields=["branch","product"],
                name="unique_product_price_per_brance",
            )
        ]

class PriceChange(models.Model):
    branch_product_price=models.ForeignKey(BranchProductPrice,on_delete=models.PROTECT,related_name="price_history")
    buying_price=models.DecimalField(max_digits=10, decimal_places=2)
    selling_price=models.DecimalField(max_digits=10, decimal_places=2)
    changed_by=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT)
    changed_at=models.DateTimeField(auto_now_add=True)



class Sale(models.Model):
    brance=models.ForeignKey(Brance,on_delete=models.PROTECT)
    employee=models.ForeignKey(User,on_delete=models.PROTECT,related_name="sales_recorded")
    customer=models.ForeignKey(CustomerProfile,on_delete=models.PROTECT,related_name="sales")
    created_at=models.DateTimeField(auto_now=True)


class SaleItem(models.Model):
    sale=models.ForeignKey(Sale,on_delete=models.CASCADE,related_name="Items")
    product=models.ForeignKey(Product,on_delete=models.PROTECT)
    quantity=models.PositiveIntegerField()
    buying_price_at_sale=models.DecimalField(max_digits=10, decimal_places=2)
    selling_price_at_sale=models.DecimalField(max_digits=10, decimal_places=2)


    @property
    def total(self):
        return(
            self.selling_price_at_sale * self.quantity
        )

    @property
    def profit(self):
        return(
            self.selling_price_at_sale - self.buying_price_at_sale
        )*self.quantity