'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  email: string;
  name: string;
  title: string;
}

export async function sendConfirmationEmail({ email, name, title }: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'ITPLC 2025 <registration@itplc2025.org>',
      to: email,
      subject: 'ITPLC 2025 Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a365d; text-align: center; margin-bottom: 30px;">
            Registration Confirmation
          </h1>
          
          <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
            Dear ${title} ${name},
          </p>
          
          <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
            Thank you for registering for the International Teens, Pastors' & Leaders Conference (ITPLC) 2025. 
            Your registration has been successfully received and processed.
          </p>
          
          <div style="background-color: #f7fafc; border-left: 4px solid #4299e1; padding: 20px; margin: 30px 0;">
            <p style="color: #2d3748; margin: 0;">
              We look forward to your participation in this life-transforming conference.
              Further details about the conference will be communicated to you via email.
            </p>
          </div>
          
          <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
            If you have any questions, please don't hesitate to reach out to us.
          </p>
          
          <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin-top: 30px;">
            Best regards,<br>
            ITPLC 2025 Organizing Committee
          </p>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}