export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const rawBody = new URLSearchParams(req.body).toString();
  const verificationBody = `cmd=_notify-validate&${rawBody}`;

  try {
    const paypalRes = await fetch('https://ipnpb.paypal.com/cgi-bin/webscr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verificationBody
    });

    const text = await paypalRes.text();

    if (text === 'VERIFIED') {
      console.log("✅ VERIFIED IPN:", req.body);
    } else {
      console.warn("❌ INVALID IPN:", req.body);
    }

    res.status(200).end();
  } catch (err) {
    console.error("💥 IPN Error:", err);
    res.status(500).end('Server Error');
  }
}
