'use server';

import { Resend } from 'resend';

import { getErrorMessage } from '@/lib/utils';

import React from 'react';

import ContactFormEmail from '@/email/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (FormData: FormData) => {
  const name = FormData.get('name');
  const email = FormData.get('email');
  const subject = FormData.get('subject');
  const message = FormData.get('message');

  if (!name || typeof name !== 'string' || name.length > 500) {
    return {
      error: 'Invalid Subject'
    }
  };

  if (!email || typeof email !== 'string' || email.length > 500) {
    return {
      error: 'Invalid Subject'
    }
  };

  if (!subject || typeof subject !== 'string' || subject.length > 500) {
    return {
      error: 'Invalid Subject'
    }
  };

  if (!message || typeof message !== 'string' || message.length > 10000) {
    return {
      error: 'Invalid Message'
    }
  };

  let data;

  try {
    data = await resend.emails.send({
      from: `[SUNSET] New Message from ${name} <onboarding@resend.dev>`,
      to: 'fodriniagustin@gmail.com',
      subject: subject,
      reply_to: email,
      react: React.createElement(
        ContactFormEmail,
        {
          name: name,
          email: email,
          message: message
        }
      )
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error)
    };
  }

  return {
    data
  };
};