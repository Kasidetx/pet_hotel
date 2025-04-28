// lib/emailjs.js
import emailjs from '@emailjs/browser'

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)

export function sendOtpEmail(toEmail, otp) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

    return emailjs.send(serviceId, templateId, {
        user_email: toEmail,
        from_name: 'Pet Hotel',
        otp
    })
}