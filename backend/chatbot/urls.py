
from django.urls import path
from .views import ChatView, VoiceToText, ChatStreamView

urlpatterns = [
    path('', ChatView.as_view(), name='chat'),
    path('stream/', ChatStreamView.as_view(), name='chat-stream'),
    path('voice-to-text/', VoiceToText.as_view(), name='voice-to-text'),
]