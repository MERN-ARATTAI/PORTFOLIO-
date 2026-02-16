// const axios = require('axios');

// class BrevoEmailService {
//   constructor() {
//     this.apiKey = process.env.BREVO_API_KEY;
//     this.apiUrl = 'https://api.brevo.com/v3/smtp/email';
//     this.senderEmail = process.env.BREVO_SENDER_EMAIL;
//     this.senderName = process.env.BREVO_SENDER_NAME;
//   }

//   async sendEmail(to, subject, htmlContent) {
//     try {
//       const response = await axios.post(
//         this.apiUrl,
//         {
//           sender: {
//             name: this.senderName,
//             email: this.senderEmail,
//           },
//           to: [{ email: to }],
//           subject: subject,
//           htmlContent: htmlContent,
//         },
//         {
//           headers: {
//             'api-key': this.apiKey,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       return {
//         success: true,
//         messageId: response.data.messageId,
//       };
//     } catch (error) {
//       console.error('Brevo Email Error:', error.response?.data || error.message);
//       throw new Error('Failed to send email');
//     }
//   }

//   // Send notification to admin
//   async sendAdminNotification(contactData) {
//     const subject = `🔔 New Contact Form Submission from ${contactData.name}`;
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           .header { background: linear-gradient(135deg, #4ade80 0%, #10b981 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
//           .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
//           .field { margin-bottom: 20px; }
//           .label { font-weight: bold; color: #4ade80; margin-bottom: 5px; }
//           .value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #4ade80; }
//           .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1 style="margin: 0;">📬 New Contact Message</h1>
//             <p style="margin: 10px 0 0 0; opacity: 0.9;">You've received a new message from your portfolio!</p>
//           </div>
//           <div class="content">
//             <div class="field">
//               <div class="label">👤 Name</div>
//               <div class="value">${contactData.name}</div>
//             </div>
//             <div class="field">
//               <div class="label">📧 Email</div>
//               <div class="value">${contactData.email}</div>
//             </div>
//             <div class="field">
//               <div class="label">💬 Message</div>
//               <div class="value">${contactData.message.replace(/\n/g, '<br>')}</div>
//             </div>
//             <div class="field">
//               <div class="label">🕐 Received At</div>
//               <div class="value">${new Date(contactData.createdAt).toLocaleString()}</div>
//             </div>
//           </div>
//           <div class="footer">
//             <p>This is an automated notification from your portfolio contact form.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;

//     return await this.sendEmail(process.env.ADMIN_EMAIL, subject, htmlContent);
//   }

//   // Send confirmation to the person who contacted
//   async sendUserConfirmation(contactData) {
//     const subject = `✅ Thanks for reaching out, ${contactData.name.split(' ')[0]}!`;
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           .header { background: linear-gradient(135deg, #4ade80 0%, #10b981 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
//           .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
//           .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4ade80; }
//           .button { display: inline-block; background: #4ade80; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; font-weight: bold; }
//           .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1 style="margin: 0;">🎉 Message Received!</h1>
//           </div>
//           <div class="content">
//             <p>Hi <strong>${contactData.name.split(' ')[0]}</strong>,</p>
//             <p>Thank you for reaching out! I've received your message and I'm excited to hear from you.</p>
            
//             <div class="message-box">
//               <strong>Your message:</strong><br><br>
//               ${contactData.message.replace(/\n/g, '<br>')}
//             </div>
            
//             <p>I'll get back to you within <strong>24 hours</strong>. In the meantime, feel free to:</p>
//             <ul>
//               <li>Check out my latest projects</li>
//               <li>Connect with me on LinkedIn</li>
//               <li>Follow me on GitHub</li>
//             </ul>
            
//             <p>Looking forward to connecting with you!</p>
//             <p>Best regards,<br><strong>Your Name</strong></p>
//           </div>
//           <div class="footer">
//             <p>This is an automated confirmation email.</p>
//             <p>If you didn't send this message, please ignore this email.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;

//     return await this.sendEmail(contactData.email, subject, htmlContent);
//   }
// }

// module.exports = new BrevoEmailService();


const axios = require('axios');

class BrevoEmailService {
  constructor() {      
    this.apiKey = process.env.BREVO_API_KEY;
    this.apiUrl = 'https://api.brevo.com/v3/smtp/email';
    this.senderEmail = process.env.BREVO_SENDER_EMAIL;
    this.senderName = process.env.BREVO_SENDER_NAME;
  }

  async sendEmail(to, subject, htmlContent, replyTo = null) {
    try {
      const emailData = {
        sender: {
          name: this.senderName,
          email: this.senderEmail,
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent,
      };

      // Add reply-to header to avoid spam
      if (replyTo) {
        emailData.replyTo = { email: replyTo };
      }

      const response = await axios.post(
        this.apiUrl,
        emailData,
        {
          headers: {
            'api-key': this.apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        messageId: response.data.messageId,
      };
    } catch (error) {
      console.error('Brevo Email Error:', error.response?.data || error.message);
      throw new Error('Failed to send email');
    }
  }

  // Send notification to admin
  async sendAdminNotification(contactData) {
    const subject = `🔔 New Contact: ${contactData.name}`;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6; 
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #4ade80 0%, #10b981 100%); 
            color: white; 
            padding: 30px; 
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .header p {
            margin: 10px 0 0 0;
            opacity: 0.95;
            font-size: 14px;
          }
          .content { 
            background: white;
            padding: 30px;
          }
          .field { 
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
          }
          .field:last-child {
            border-bottom: none;
          }
          .label { 
            font-weight: 600;
            color: #10b981;
            margin-bottom: 8px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value { 
            color: #333;
            font-size: 15px;
            word-wrap: break-word;
          }
          .message-value {
            background: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #4ade80;
            white-space: pre-wrap;
          }
          .footer { 
            text-align: center; 
            padding: 20px;
            background: #f9fafb;
            color: #666;
            font-size: 12px;
          }
          .reply-button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 30px;
            background: #4ade80;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 New Contact Message</h1>
            <p>You've received a new message from your portfolio</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 Name</div>
              <div class="value">${contactData.name}</div>
            </div>
            <div class="field">
              <div class="label">📧 Email Address</div>
              <div class="value"><a href="mailto:${contactData.email}" style="color: #10b981; text-decoration: none;">${contactData.email}</a></div>
            </div>
            <div class="field">
              <div class="label">💬 Message</div>
              <div class="message-value">${contactData.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
              <div class="label">🕐 Received At</div>
              <div class="value">${new Date(contactData.createdAt).toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</div>
            </div>
            <div style="text-align: center;">
              <a href="mailto:${contactData.email}?subject=Re: Your message from my portfolio" class="reply-button">Reply to ${contactData.name}</a>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated notification from your portfolio contact form.</p>
            <p style="margin-top: 10px; color: #999;">You can reply directly by clicking the button above.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Set reply-to as the contact person's email
    return await this.sendEmail(
      process.env.ADMIN_EMAIL, 
      subject, 
      htmlContent,
      contactData.email // Reply-to header
    );
  }

  // Send confirmation to the person who contacted
  async sendUserConfirmation(contactData) {
    const firstName = contactData.name.split(' ')[0];
    const subject = `✅ Thanks for reaching out, ${firstName}!`;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #4ade80 0%, #10b981 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content { 
            padding: 40px 30px;
          }
          .content p {
            margin: 0 0 15px 0;
            color: #333;
            font-size: 15px;
          }
          .message-box { 
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            border-left: 4px solid #4ade80;
          }
          .message-box strong {
            color: #10b981;
            display: block;
            margin-bottom: 10px;
          }
          .highlight {
            background: #ecfdf5;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            text-align: center;
          }
          .highlight strong {
            color: #10b981;
            font-size: 16px;
          }
          ul {
            margin: 15px 0;
            padding-left: 25px;
          }
          li {
            margin: 8px 0;
            color: #555;
          }
          .footer { 
            text-align: center;
            padding: 25px;
            background: #f9fafb;
            color: #666;
            font-size: 13px;
          }
          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Message Received!</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${firstName}</strong>,</p>
            
            <p>Thank you for reaching out through my portfolio! I've successfully received your message and I'm excited to connect with you.</p>
            
            <div class="message-box">
              <strong>Your message:</strong>
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
            
            <div class="highlight">
              <strong>⏱️ I'll get back to you within 24 hours!</strong>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Check out my latest projects on my portfolio</li>
              <li>Connect with me on LinkedIn</li>
              <li>Follow me on GitHub for my latest work</li>
            </ul>
            
            <div class="signature">
              <p>Looking forward to connecting with you!</p>
              <p><strong>Best regards,<br>Portfolio Team</strong></p>
            </div>
          </div>
          <div class="footer">
            <p><strong>This is an automated confirmation email.</strong></p>
            <p style="margin-top: 8px;">If you didn't send this message, please disregard this email.</p>
            <p style="margin-top: 15px; color: #999;">© 2024 Portfolio. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await this.sendEmail(contactData.email, subject, htmlContent);
  }
}

module.exports = new BrevoEmailService();