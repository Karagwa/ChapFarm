import typer

from app.scripts.create_super_admin import create_super_admin

app = typer.Typer()

@app.command()
def create_super():
    """Creates a super admin user and admin record"""
    create_super_admin()

if __name__ == "__main__":
    app()
