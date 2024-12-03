# import pytest
# from flask import Flask, Blueprint
# from flask_jwt_extended import create_access_token
# from .routes import accounts_ns
# from .models import db, User
# from flask_restx import Api

# @pytest.fixture
# def app():
#     app = Flask(__name__)
#     app.config['TESTING'] = True
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
#     app.config['JWT_SECRET_KEY'] = 'test-secret-key'
#     db.init_app(app)

#     blueprint = Blueprint('api', __name__, url_prefix='/api')
#     api = Api(blueprint, doc='/docs', title='SnapStore API', version='1.0', description='API documentation for SnapStore')
#     api.add_namespace(accounts_ns, path='/accounts')
#     app.register_blueprint(blueprint)

#     with app.app_context():
#         db.create_all()
#     yield app
#     with app.app_context():
#         db.drop_all()

# @pytest.fixture
# def client(app):
#     return app.test_client()

# def test_register(client):
#     response = client.post('/api/accounts/register', json={
#         'username': 'testuser',
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     assert response.status_code == 201

# def test_login(client):
#     client.post('/api/accounts/register', json={
#         'username': 'testuser',
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     response = client.post('/api/accounts/login', json={
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     assert response.status_code == 200
#     assert 'access_token' in response.get_json()

# def test_profile(client):
#     client.post('/api/accounts/register', json={
#         'username': 'testuser',
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     login_response = client.post('/api/accounts/login', json={
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     access_token = login_response.get_json()['access_token']
#     response = client.get('/api/accounts/profile', headers={
#         'Authorization': f'Bearer {access_token}'
#     })
#     assert response.status_code == 200

# def test_update_profile(client):
#     client.post('/api/accounts/register', json={
#         'username': 'testuser',
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     login_response = client.post('/api/accounts/login', json={
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     access_token = login_response.get_json()['access_token']
#     response = client.put('/api/accounts/profile', json={
#         'bio': 'Updated bio'
#     }, headers={
#         'Authorization': f'Bearer {access_token}'
#     })
#     assert response.status_code == 200

# def test_get_users(client):
#     client.post('/api/accounts/register', json={
#         'username': 'testuser',
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     login_response = client.post('/api/accounts/login', json={
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     access_token = login_response.get_json()['access_token']
#     response = client.get('/api/accounts/users', headers={
#         'Authorization': f'Bearer {access_token}'
#     })
#     assert response.status_code == 200

# def test_delete_user(client):
#     client.post('/api/accounts/register', json={
#         'username': 'testuser',
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     login_response = client.post('/api/accounts/login', json={
#         'email': 'testuser@example.com',
#         'password': 'password123'
#     })
#     access_token = login_response.get_json()['access_token']
#     user = User.query.filter_by(email='testuser@example.com').first()
#     response = client.delete(f'/api/accounts/users/{user.id}', headers={
#         'Authorization': f'Bearer {access_token}'
#     })
#     assert response.status_code == 200