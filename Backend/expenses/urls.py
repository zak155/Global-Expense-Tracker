from django.urls import path
from .views import expense_list_create

urlpatterns = [
    path('expenses/', expense_list_create, name='expenses'),
]