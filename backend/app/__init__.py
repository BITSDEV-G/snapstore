from flask import Flask, jsonify, Blueprint
from flask_restx import Api
from .extensions import db, migrate, jwt
from .accounts.routes import accounts_ns

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return str(user)  # Convert user ID to string

    @jwt.user_lookup_loader
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return None

    api = Api(app, doc='/', title='SnapStore API', version='1.0', description='API documentation for SnapStore')
    api.add_namespace(accounts_ns, path='/api/accounts')

    @app.route("/healthcheck", methods=["GET"])
    def healthcheck():
        return jsonify({"message": "Server is healthy"}), 200

    return app