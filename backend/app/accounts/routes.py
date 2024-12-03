from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import User, db
from .schemas import UserSchema, UserCreateSchema, UserUpdateSchema

accounts_ns = Namespace('accounts', description='Accounts related operations')

user_schema = UserSchema()
user_create_schema = UserCreateSchema()
user_update_schema = UserUpdateSchema()

user_model = accounts_ns.model('User', {
    'id': fields.Integer(readOnly=True, description='The unique identifier of a user'),
    'username': fields.String(required=True, description='The username of the user'),
    'email': fields.String(required=True, description='The email of the user'),
    'bio': fields.String(description='The bio of the user'),
    'profile_picture': fields.String(description='The profile picture of the user'),
    'created_at': fields.DateTime(readOnly=True, description='The date the user was created'),
    'updated_at': fields.DateTime(readOnly=True, description='The date the user was last updated')
})

@accounts_ns.route('/register')
class Register(Resource):
    @accounts_ns.expect(user_model)
    @accounts_ns.response(201, 'User created successfully')
    @accounts_ns.response(400, 'Validation Error')
    def post(self):
        data = request.get_json()
        errors = user_create_schema.validate(data)
        if errors:
            return jsonify(errors), 400

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
            return jsonify({"message": "Username or email already taken"}), 400

        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return user_schema.jsonify(user), 201

@accounts_ns.route('/login')
class Login(Resource):
    @accounts_ns.expect(user_model)
    @accounts_ns.response(200, 'Login successful')
    @accounts_ns.response(401, 'Invalid credentials')
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({"message": "Invalid credentials"}), 401

        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200

@accounts_ns.route('/profile')
class Profile(Resource):
    @jwt_required()
    @accounts_ns.response(200, 'Profile retrieved successfully')
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        return user_schema.jsonify(user), 200

    @jwt_required()
    @accounts_ns.expect(user_model)
    @accounts_ns.response(200, 'Profile updated successfully')
    @accounts_ns.response(400, 'Validation Error')
    def put(self):
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        errors = user_update_schema.validate(data)
        if errors:
            return jsonify(errors), 400

        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'bio' in data:
            user.bio = data['bio']
        if 'profile_picture' in data:
            user.profile_picture = data['profile_picture']
        if 'password' in data:
            user.set_password(data['password'])

        db.session.commit()
        return user_schema.jsonify(user), 200

@accounts_ns.route('/users')
class Users(Resource):
    @jwt_required()
    @accounts_ns.response(200, 'Users retrieved successfully')
    def get(self):
        users = User.query.all()
        return user_schema.jsonify(users, many=True), 200

@accounts_ns.route('/users/<int:id>')
class UserResource(Resource):
    @jwt_required()
    @accounts_ns.response(200, 'User retrieved successfully')
    def get(self, id):
        user = User.query.get_or_404(id)
        return user_schema.jsonify(user), 200

    @jwt_required()
    @accounts_ns.response(200, 'User deleted successfully')
    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200

@accounts_ns.route('/logout')
class Logout(Resource):
    @jwt_required()
    @accounts_ns.response(200, 'Logged out successfully')
    def post(self):
        return jsonify({"message": "Logged out successfully"}), 200

@accounts_ns.route('/token-refresh')
class TokenRefresh(Resource):
    @jwt_required(refresh=True)
    @accounts_ns.response(200, 'Token refreshed successfully')
    def post(self):
        user_id = get_jwt_identity()
        new_token = create_access_token(identity=user_id)
        return jsonify(access_token=new_token), 200

@accounts_ns.route('/protected')
class Protected(Resource):
    @jwt_required()
    @accounts_ns.response(200, 'Access granted')
    def get(self):
        return jsonify({"message": "Access granted"}), 200