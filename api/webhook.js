// API Route pour faire un proxy vers Make.com
// Cela permet de contourner les erreurs CORS

export default async function handler(req, res) {
  // Accepter seulement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // URL du webhook Make
    const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/71lfwmogmrsqdt6ydcied9vpg72ys0wm';

    // Faire la requête au webhook Make depuis le serveur
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    // Retourner la réponse au client
    return res.status(response.status).json({
      success: response.ok,
      message: 'Notification envoyée à Make'
    });
  } catch (error) {
    console.error('Erreur webhook:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
