export default async function handler(req, res) {
  try {
    const clientId = process.env.SOUNDCHARTS_CLIENT_ID;
    const clientSecret = process.env.SOUNDCHARTS_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({
        error: "Soundcharts credentials are missing."
      });
    }

    const tokenResponse = await fetch(
      "https://customer.api.soundcharts.com/api/v2.9/auth/access-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientId: clientId,
          clientSecret: clientSecret
        })
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json({
        error: "Soundcharts authentication failed.",
        details: tokenData
      });
    }

    return res.status(200).json({
      connected: true,
      message: "RM Streaming Hub is connected to Soundcharts."
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
      details: error.message
    });
  }
}
