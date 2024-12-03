import os

class Config:
  SECRET_KEY = os.getenv("SECRET_KEY") or "you-will-never-guess"
  SQLALCHEMY_DATABASE_URI =os.getenv("DATABASE_URI") or "sqlite:///gallery.db"
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY") or "super-secret-key"
  JWT_BLACKLIST_ENABLED = True
  JWT_BLACKLIST_TOKEN_CHECKS = ["access", "refresh"]
