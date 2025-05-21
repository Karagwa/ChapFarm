import aiosmtplib
from email.message import EmailMessage

async def send_reset_email(to_email: str, token: str):
    msg = EmailMessage()
    msg["From"] = "annkaragwa@gmail.com"
    msg["To"] = to_email
    msg["Subject"] = "Chap Farm Password Reset Request"
    msg.set_content(f"""Hello,\n\n"
We received a request to reset your password. If you did not make this request, please ignore this email.\n\n"
Use this token to reset your password: {token}""")

    await aiosmtplib.send(
        msg,
        sender="annkaragwa@gmail.com",
        hostname="smtp.gmail.com",
        port=587,
        start_tls=True,
        username="annkaragwa@gmail.com",
        password="jrajllshlftzntgu"  # Use environment variables or a secure vault in production
    )
