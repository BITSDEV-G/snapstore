from marshmallow import Schema, fields, validates, ValidationError, validate
from .models import User

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True, validate=validate.Length(min=1, max=100))
    bio = fields.Str(required=False, validate=validate.Length(min=0, max=500))
    profile_picture = fields.Str(required=False, validate=validate.Length(min=0, max=200))
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

    @validates("username")
    def validate_username(self, value):
        if User.query.filter_by(username=value).first():
            raise ValidationError("Username already taken")

    @validates("email")
    def validate_email(self, value):
        if User.query.filter_by(email=value).first():
            raise ValidationError("Email already taken")
        if not "@" in value:
            raise ValidationError("Invalid email format")

class UserCreateSchema(UserSchema):
    password = fields.Str(required=True, validate=validate.Length(min=6))

class UserUpdateSchema(Schema):
    username = fields.Str(validate=validate.Length(min=1, max=100))
    email = fields.Email(validate=validate.Length(min=1, max=100))
    bio = fields.Str(validate=validate.Length(min=0, max=500))
    profile_picture = fields.Str(validate=validate.Length(min=0, max=200))
    password = fields.Str(validate=validate.Length(min=6))