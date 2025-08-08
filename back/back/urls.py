from clicker.views import ClickerPlayerViewSet, ClickerGameViewSet, ClickerMatchViewSet
from pong.views import PongPlayerViewSet, PongGameViewSet
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include
from users.views import register_user, login_user, logout_user, get_authenticated_user, is_logged_in
from .api_root import CustomAPIRootView

router = DefaultRouter()
router.register(r'clicker-players', ClickerPlayerViewSet, basename='clicker-players')
router.register(r'clicker-games', ClickerGameViewSet, basename='clicker-games')
router.register(r'clicker-matches', ClickerMatchViewSet, basename='clicker-matches')
router.register(r'pong-players', PongPlayerViewSet, basename='pong-players')
router.register(r'pong-games', PongGameViewSet, basename='pong-games')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', CustomAPIRootView.as_view(), name='api-root'),
    path('api/', include(router.urls)),
    path('auth/user/', get_authenticated_user, name='get_authenticated_user'),
    path('auth/register/', register_user, name='register_user'),
    path('auth/login/', login_user, name='login_user'),
    path('auth/logout/', logout_user, name='logout_user'),
    path('is_logged_in/', is_logged_in, name='is_logged_in')
]