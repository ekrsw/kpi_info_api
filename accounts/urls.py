from django.urls import path
from django.contrib.auth.views import (
    LoginView,
    LogoutView,
    )
from django.urls import reverse_lazy
from .views import SignUpView, SignUpSuccessView, CustomPasswordChangeView, CustomPasswordChangeDoneView

app_name = 'accounts'
urlpatterns = [
    path('login/', LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', LogoutView.as_view(template_name='accounts/logout.html'), name='logout'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signup_success/', SignUpSuccessView.as_view(), name='signup_success'),
    path('password_change/', CustomPasswordChangeView.as_view(), name='password_change'),
    path('password_change_done/', CustomPasswordChangeDoneView.as_view(),name='password_change_done'),
]