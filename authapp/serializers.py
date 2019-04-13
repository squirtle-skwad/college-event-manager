from rest_framework import serializers
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from .token import account_activation_token
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"})

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "email",
            "username",
            "password",
            "department",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        if "djsce.ac.in" in validated_data["email"]:
            user = User(
                first_name=validated_data["first_name"],
                last_name=validated_data["last_name"],
                email=validated_data["email"] + "@djsce.ac.in",  # + 'djsce.ac.in'
                username=validated_data["username"],
                department=validated_data["department"],
            )
            user.set_password(validated_data["password"])
            user.is_active = False
            user.save()
            mail_subject = "Activate your account."
            message = render_to_string(
                "acc_active_email.html",
                {
                    "user": user,
                    "uidb64": user.pk,
                    "token": account_activation_token.make_token(user),
                },
            )
            to_email = user.email
            email = EmailMessage(mail_subject, message, to=[to_email])
            email.send()
            return user
        else:
            raise serializers.ValidationError(
                "Email Id does not match the domain @djsce.ac.in"
            )


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=10)
    password = serializers.CharField(style={"input_type": "password"})
