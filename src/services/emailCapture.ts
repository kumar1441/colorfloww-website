// Uses the MailerLite embedded-form endpoint — no API key needed in the browser.
// The form ID comes from your MailerLite embedded form (sAR6eh → form ID 169080460183340542).
// If you ever need to swap forms, update FORM_URL below.
const FORM_URL =
  'https://assets.mailerlite.com/jsonp/1450670/forms/169080460183340542/subscribe';

export async function captureEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const body = new FormData();
    body.append('fields[email]', email);
    body.append('ml-submit', '1');
    body.append('anticsrf', 'true');

    const res = await fetch(FORM_URL, {
      method: 'POST',
      body,
    });

    // MailerLite returns 200 on success and on "already subscribed"
    if (res.ok) {
      return { success: true };
    }

    console.error('[emailCapture] MailerLite returned', res.status);
    return { success: false, error: 'Could not save your email. Please try again.' };
  } catch (err) {
    console.error('[emailCapture] Network error:', err);
    return { success: false, error: 'Network error. Please try again.' };
  }
}
