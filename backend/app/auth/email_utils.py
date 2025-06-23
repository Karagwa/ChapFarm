import datetime
import os
import aiosmtplib
from email.message import EmailMessage
async def send_reset_email(to_email: str, code: str):
    msg = EmailMessage()
    msg["From"] = "ChapFarm Support <annkaragwa@gmail.com>"
    msg["To"] = to_email
    msg["Subject"] = "Your Password Reset Code - ChapFarm"

    html_content = f"""
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background-color: #2e7d32; padding: 25px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">ChapFarm Account Recovery</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">Hello,</p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              We received a request to reset your ChapFarm account password. Please use the 
              verification code below to proceed:
            </p>
            
            <div style="background-color: #f1f8e9; border-left: 4px solid #2e7d32; padding: 15px; margin: 25px 0; border-radius: 0 4px 4px 0;">
              <p style="font-size: 14px; color: #555; margin: 0 0 10px 0;">Your verification code:</p>
              <div style="font-size: 28px; font-weight: bold, color: #2e7d32; letter-spacing: 2px;">{code}</div>
            </div>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              This code will expire in <strong>15 minutes</strong>. If you didn't request this, 
              please ignore this email or contact support if you have concerns.
            </p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">
              Happy farming!<br>
              <strong>The ChapFarm Team</strong>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">© {datetime.datetime.now().year} ChapFarm. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">
              <a href="#" style="color: #2e7d32; text-decoration: none;">Help Center</a> | 
              <a href="#" style="color: #2e7d32; text-decoration: none;">Privacy Policy</a>
            </p>
          </div>
        </div>
      </body>
    </html>
    """

    plain_text = f"""
    ChapFarm Password Reset
    
    Hello,
    
    We received a request to reset your password. Your verification code is:
    
    {code}
    
    This code expires in 15 minutes. If you didn't request this, please ignore this email.
    
    The ChapFarm Team
    """

    msg.set_content(plain_text)
    msg.add_alternative(html_content, subtype="html")

    await aiosmtplib.send(
        msg,
        hostname="smtp.gmail.com",
        port=587,
        start_tls=True,
        username=os.getenv("EMAIL_USERNAME"),
        password=os.getenv("EMAIL_PASSWORD")
    )

async def send_success_email(to_email: str, message: str):
    msg = EmailMessage()
    msg["From"] = f"ChapFarm Support <{os.getenv('EMAIL_USERNAME')}>"
    msg["To"] = to_email
    msg["Subject"] = "Password Reset Success - ChapFarm"

    html_content = f"""
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background-color: #2e7d32; padding: 25px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">ChapFarm Notification</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">Hello,</p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              {message}
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background-color: #2e7d32; padding: 12px 25px; border-radius: 4px;">
                <a href="http://localhost:5173/" style="color: white; text-decoration: none; font-weight: bold;">Go to Dashboard</a>
              </div>
            </div>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Thank you for using ChapFarm!
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">Need help? Contact us at support@chapfarm.com</p>
          </div>
        </div>
      </body>
    </html>
    """

    plain_text = f"""
    ChapFarm Notification
    
    Hello,
    
    {message}
    
    Thank you for using ChapFarm!
    
    The ChapFarm Team
    """

    msg.set_content(plain_text)
    msg.add_alternative(html_content, subtype="html")

    await aiosmtplib.send(
        msg,
        hostname="smtp.gmail.com",
        port=587,
        start_tls=True,
        username= os.getenv("EMAIL_USERNAME"),  # Store in environment variables!
        password=os.getenv("EMAIL_PASSWORD")  # Store in environment variables!
    )

async def send_contact_email(name: str, email: str, message: str):
    """Send contact form email to support team"""
    msg = EmailMessage()
    msg["From"] = f"ChapFarm Contact Form <{os.getenv('EMAIL_USERNAME')}>"
    msg["To"] = "annkaragwa@gmail.com"  
    msg["Reply-To"] = email 
    msg["Subject"] = f"New Contact Form Submission from {name}"

    html_content = f"""
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background-color: #2e7d32; padding: 25px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <div style="background-color: #f1f8e9; border-left: 4px solid #2e7d32; padding: 15px; margin: 25px 0; border-radius: 0 4px 4px 0;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #2e7d32;">Contact Details:</p>
              <p style="margin: 5px 0; color: #333;"><strong>Name:</strong> {name}</p>
              <p style="margin: 5px 0; color: #333;"><strong>Email:</strong> {email}</p>
              <p style="margin: 5px 0; color: #333;"><strong>Submitted:</strong> {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            </div>
            
            <div style="margin: 25px 0;">
              <p style="font-weight: bold; color: #333; margin-bottom: 10px;">Message:</p>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; border: 1px solid #e9ecef;">
                <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">{message}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:{email}?subject=Re: Your ChapFarm Inquiry" 
                 style="display: inline-block; background-color: #2e7d32; color: white; text-decoration: none; padding: 12px 25px; border-radius: 4px; font-weight: bold;">
                Reply to {name}
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">© {datetime.datetime.now().year} ChapFarm Support System</p>
          </div>
        </div>
      </body>
    </html>
    """

    plain_text = f"""
    New Contact Form Submission - ChapFarm
    
    Contact Details:
    Name: {name}
    Email: {email}
    Submitted: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
    
    Message:
    {message}
    
    ---
    ChapFarm Support System
    """

    msg.set_content(plain_text)
    msg.add_alternative(html_content, subtype="html")

    await aiosmtplib.send(
        msg,
        hostname="smtp.gmail.com",
        port=587,
        start_tls=True,
        username=os.getenv("EMAIL_USERNAME"),
        password=os.getenv("EMAIL_PASSWORD")
    )

async def send_contact_confirmation_email(to_email: str, name: str):
    """Send confirmation email to user who submitted contact form"""
    msg = EmailMessage()
    msg["From"] = f"ChapFarm Support <{os.getenv('EMAIL_USERNAME')}>"
    msg["To"] = to_email
    msg["Subject"] = "Thank you for contacting ChapFarm"

    html_content = f"""
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background-color: #2e7d32; padding: 25px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">Hello {name},</p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Thank you for contacting ChapFarm! We've received your message and appreciate you taking the time to reach out to us.
            </p>
            
            <div style="background-color: #f1f8e9; border-left: 4px solid #2e7d32; padding: 15px; margin: 25px 0; border-radius: 0 4px 4px 0;">
              <p style="font-size: 14px; color: #555; margin: 0 0 10px 0;">What happens next:</p>
              <ul style="color: #333; margin: 0; padding-left: 20px;">
                <li>Our support team will review your message</li>
                <li>We'll respond within 24-48 hours</li>
                <li>You'll receive a reply at this email address</li>
              </ul>
            </div>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              If you have any urgent concerns, please don't hesitate to call us at <strong>+256 700 123 456</strong> during business hours.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:5173/" 
                 style="display: inline-block; background-color: #2e7d32; color: white; text-decoration: none; padding: 12px 25px; border-radius: 4px; font-weight: bold;">
                Visit ChapFarm
              </a>
            </div>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">
              Happy farming!<br>
              <strong>The ChapFarm Team</strong>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">© {datetime.datetime.now().year} ChapFarm. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">
              <a href="#" style="color: #2e7d32; text-decoration: none;">Help Center</a> | 
              <a href="#" style="color: #2e7d32; text-decoration: none;">Privacy Policy</a>
            </p>
          </div>
        </div>
      </body>
    </html>
    """

    plain_text = f"""
    Thank You for Contacting ChapFarm!
    
    Hello {name},
    
    Thank you for contacting ChapFarm! We've received your message and appreciate you taking the time to reach out to us.
    
    What happens next:
    • Our support team will review your message
    • We'll respond within 24-48 hours
    • You'll receive a reply at this email address
    
    If you have any urgent concerns, please call us at +256 700 123 456 during business hours.
    
    Happy farming!
    The ChapFarm Team
    """

    msg.set_content(plain_text)
    msg.add_alternative(html_content, subtype="html")

    await aiosmtplib.send(
        msg,
        hostname="smtp.gmail.com",
        port=587,
        start_tls=True,
        username=os.getenv("EMAIL_USERNAME"),
        password=os.getenv("EMAIL_PASSWORD")
    )