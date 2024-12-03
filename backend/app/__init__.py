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

    api = Api(app, doc='/', title='SnapStore API', version='1.0', description='API documentation for SnapStore')
    api.add_namespace(accounts_ns, path='/api/accounts')
    @app.route("/healthcheck", methods=["GET"])
    def healthcheck():
        return jsonify({"message": "Server is healthy"}), 200

    return app