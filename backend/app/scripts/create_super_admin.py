# app/scripts/create_super_admin.py
import sys
import os
from pathlib import Path
# Add the backend directory to Python path
backend_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(backend_dir))

try:
    from app.models import Admin, User
    from app.database import get_session
    
    from app.schemas import UserRole
except ImportError as e:
    print(f"Import error: {e}")
    print("Please ensure you're running from the backend directory")
    sys.exit(1)
import typer
from sqlmodel import Session, SQLModel, create_engine, select
from datetime import datetime, timedelta
from getpass import getpass
# from app.models import Admin, User
# from app.schemas import UserRole
from passlib.context import CryptContext

# --- Typer App ---
app = typer.Typer()

# --- Config ---
DATABASE_URL = "sqlite:///./app.db"
engine = create_engine(DATABASE_URL, echo=True)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

@app.command("create-super-admin")
def create_super_admin():
    """Creates a super admin user and admin entry."""

    typer.echo("👤 Creating super admin...")
    password = getpass("Password [supersecurepassword123]: ") or "supersecurepassword123"
    confirm = getpass("Repeat for confirmation: ")

    if password != confirm:
        typer.echo("❌ Passwords do not match. Aborting.")
        raise typer.Exit(code=1)

    with Session(engine) as session:
        super_email = "super@admin.com"
        super_username = "superadmin"

        user = session.exec(select(User).where(User.email == super_email)).first()
        if not user:
            user = User(
                username=super_username,
                email=super_email,
                password=get_password_hash(password),
                role=UserRole.admin,
                created_at=datetime.utcnow(),
                reset_code=None,
                reset_code_expiry=datetime.utcnow() + timedelta(minutes=30),
            )
            session.add(user)
            session.commit()
            session.refresh(user)
            typer.echo("✅ Super admin User created.")
        else:
            typer.echo("ℹ️ Super admin User already exists.")

        admin = session.exec(select(Admin).where(Admin.email == super_email)).first()
        if not admin:
            admin = Admin(
                name="Super Admin",
                email=super_email,
                phone="0700000000",
                user_id=user.id,
                registered_at=datetime.utcnow()
            )
            session.add(admin)
            session.commit()
            typer.echo("✅ Admin profile created.")
        else:
            typer.echo("ℹ️ Admin profile already exists.")

if __name__ == "__main__":
    SQLModel.metadata.create_all(engine)
    app()
