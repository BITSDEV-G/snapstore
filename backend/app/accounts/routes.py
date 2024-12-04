from flask import request, jsonify, make_response
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import User, db
from .schemas import UserSchema, UserCreateSchema, UserUpdateSchema

# Namespace for accounts related operations
accounts_ns = Namespace('accounts', description='Accounts related operations')

# Initialize schemas for serialization
user_schema = UserSchema()
user_create_schema = UserCreateSchema()
user_update_schema = UserUpdateSchema()

# Define the user model for Flask-RESTX
user_model = accounts_ns.model('User', {
    'username': fields.String(required=True, description='The username of the user'),
    'email': fields.String(required=True, description='The email of the user'),
    'bio': fields.String(description='The bio of the user'),
    'profile_picture': fields.String(description='The profile picture of the user'),
    'password': fields.String(required=True, description='The password of the user')
})

login_model = accounts_ns.model('Login', {
    'email': fields.String(required=True, description='User email'),
    'password': fields.String(required=True, description='User password')
})

# Register Route
# Register Route
@accounts_ns.route('/register')
class Register(Resource):
    @accounts_ns.expect(user_model)
    @accounts_ns.response(201, 'User created successfully')
    @accounts_ns.response(400, 'Validation Error')
    def post(self):
        data = request.get_json()
        errors = user_create_schema.validate(data)
        if errors:
            return {"errors": errors}, 400

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
            return {"message": "Username or email already taken"}, 400

        user = User(username=username, email=email, bio=data.get("bio"), profile_picture=data.get("profile_picture"))
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return {"message": "User created successfully", "user": user_schema.dump(user)}, 201
# Login Route
@accounts_ns.route('/login')
class Login(Resource):
    @accounts_ns.expect(login_model)
    @accounts_ns.response(200, 'Login successful')
    @accounts_ns.response(401, 'Invalid credentials')
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return {
                'message': 'Login successful',
                'access_token': access_token,
                'user': user_schema.dump(user)
            }, 200
        else:
            return {'message': 'Invalid email or password'}, 401
# Profile Route (GET & PUT)
@accounts_ns.route('/profile')
class Profile(Resource):
    @jwt_required()
    @accounts_ns.response(200, 'Profile retrieved successfully')
    def get(self):
        """Get the current user's profile"""
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        return jsonify(user_schema.dump(user)), 200

    @jwt_required()
    @accounts_ns.expect(user_model)
    @accounts_ns.response(200, 'Profile updated successfully')
    @accounts_ns.response(400, 'Validation Error')
    def put(self):
        """Update the current user's profile"""
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        errors = user_update_schema.validate(data)
        if errors:
            return jsonify(errors), 400

        # Update the user data
        for field in ['username', 'email', 'bio', 'profile_picture']:
            if field in data:
                setattr(user, field, data[field])
        if 'password' in data:
            user.set_password(data['password'])

        db.session.commit()
        return jsonify(user_schema.dump(user)), 200

# Users List Route (GET)
@accounts_ns.route('/users')
class Users(Resource):
    @jwt_required()
    @accounts_ns.response(200, 'Users retrieved successfully')
    def get(self):
        """Get a list of all users"""
        users = User.query.all()
        return jsonify(user_schema.dump(users, many=True)), 200

# Single User Route (GET & DELETE)
@accounts_ns.route('/users/<int:id>')
class UserResource(Resource):
    @jwt_required()
    @accounts_ns.response(200, 'User retrieved successfully')
    @accounts_ns.response(404, 'User not found')
    def get(self, id):
        """Get a specific user by ID"""
        user = User.query.get_or_404(id)
        return jsonify(user_schema.dump(user)), 200

    @jwt_required()
    @accounts_ns.response(200, 'User deleted successfully')
    @accounts_ns.response(404, 'User not found')
    def delete(self, id):
        """Delete a specific user by ID"""
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200

# Logout Route
@accounts_ns.route('/logout')
class Logout(Resource):
    @jwt_required()
    @accounts_ns.response(200, 'Logged out successfully')
    def post(self):
        """Logout the current user"""
        # Note: With JWT, typically you'd handle logout on the client-side
        # by removing the token. This endpoint is more for consistency.
        return jsonify({"message": "Logged out successfully"}), 200

# Token Refresh Route
@accounts_ns.route('/token-refresh')
class TokenRefresh(Resource):
    @jwt_required(refresh=True)
    @accounts_ns.response(200, 'Token refreshed successfully')
    def post(self):
        """Refresh the access token"""
        user_id = get_jwt_identity()
        new_token = create_access_token(identity=user_id)
        return jsonify(access_token=new_token), 200

# Protected Route
@accounts_ns.route('/protected')
class Protected(Resource):
    @jwt_required()
    @accounts_ns.response(200, 'Access granted')
    def get(self):
        """A protected route that requires authentication"""
        return jsonify({"message": "Access granted"}), 200