from app import create_app
from app.extensions import db
from app.accounts.models import User

app = create_app()

with app.app_context():
    # Drop all tables and recreate them
    db.drop_all()
    db.create_all()

    # Create some users
    user1 = User(username='user1', email='user1@example.com')
    user1.set_password('password123')

    user2 = User(username='user2', email='user2@example.com')
    user2.set_password('password123')

    user3 = User(username='user3', email='user3@example.com')
    user3.set_password('password123')

    # Add users to the session
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)

    # Commit the session
    db.session.commit()

    print("Database seeded successfully!")