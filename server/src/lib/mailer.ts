import nodemailer from 'nodemailer'

const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL } = process.env

export const isMailerConfigured = Boolean(GMAIL_USER && GMAIL_APP_PASSWORD)

const transporter = isMailerConfigured
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    })
  : null

export async function sendContactEmail(name: string, email: string, message: string) {
  if (!transporter) return

  await transporter.sendMail({
    from: `"Portfolio Contact" <${GMAIL_USER}>`,
    to: CONTACT_TO_EMAIL || GMAIL_USER,
    replyTo: email,
    subject: `New transmission from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, '<br>')}</p>`,
  })
}
