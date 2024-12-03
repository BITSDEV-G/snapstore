from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import User, db
from .schemas import UserSchema, UserCreateSchema, UserUpdateSchema

accounts_bp = Blueprint("accounts", __name__)

user_schema = UserSchema()
user_create_schema = UserCreateSchema()
user_update_schema = UserUpdateSchema()

@accounts_bp.route("/register", methods=["POST"])
def register():
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

@accounts_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@accounts_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    return user_schema.jsonify(user), 200

@accounts_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
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

@accounts_bp.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200

@accounts_bp.route("/users/<int:id>", methods=["GET"])
@jwt_required()
def get_user(id):
    user = User.query.get_or_404(id)
    return user_schema.jsonify(user), 200

@accounts_bp.route("/users/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

@accounts_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return jsonify({"message": "Logged out successfully"}), 200

@accounts_bp.route("/token-refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_token():
    user_id = get_jwt_identity()
    new_token = create_access_token(identity=user_id)
    return jsonify(access_token=new_token), 200

@accounts_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify({"message": "Access granted"}), 200