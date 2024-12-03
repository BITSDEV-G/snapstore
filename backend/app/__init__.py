from flask import Flask, request, jsonify
from .extensions import db,migrate,jwt
from .accounts.routes import accounts_bp

def create_app():
  app = Flask(__name__)
  app.config.from_object('config')

  db.init_app(app)
  migrate.init_app(app, db)
  jwt.init_app(app)

  app.register_blueprint(accounts_bp, url_prefix="/api")

  @app.route("/healthcheck", methods=["GET"])
  def healthcheck():
    return jsonify({"message": "Server is healthy"}), 200

  healthcheck()
  return app