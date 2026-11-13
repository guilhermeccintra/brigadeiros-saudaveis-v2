// Vercel Serverless Function for Meta Conversions API (CAPI)
const https = require('https');

const PIXEL_ID = process.env.META_PIXEL_ID || '2131888377628007';
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN || 'EAAedLpYiTYMBS6SdYHK6L5B2qnR1jLKQKwjoYnmVdbhO8XlOwkWKCZCX5csQzkXzZBfHtZCZADaq5LxCHXlbtBo0Ff7S4ApKJHUZCoKVn3wN9oOcjRIrXjMvgZBd7jkxyOU8iUEqJV359G0ZBBEi0aEtZCnzai4lke6O1Ek4x2ZASldZAZCEUSdDQMnqfU1UQlGYa2y4gZDZD';
const GRAPH_API_VERSION = 'v19.0';

function getCookie(cookieHeader, name) {
    if (!cookieHeader) return null;
    const match = cookieHeader.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        let body = req.body;
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                // Keep as is
            }
        }
        body = body || {};

        const eventName = body.eventName || 'PageView';
        const eventId = body.eventId || null;
        const eventTime = Math.floor(Date.now() / 1000);
        const eventSourceUrl = body.eventSourceUrl || req.headers.referer || 'https://brigadeirossaudaveis.com.br';
        const customData = body.customData || {};
        const testEventCode = body.testEventCode || req.query?.test_event_code || null;

        // Extract Client IP & User Agent
        const forwarded = req.headers['x-forwarded-for'];
        const clientIp = forwarded ? forwarded.split(',')[0].trim() : (req.headers['x-real-ip'] || req.socket?.remoteAddress || null);
        const userAgent = req.headers['user-agent'] || null;

        // Extract fbp and fbc
        const cookieHeader = req.headers.cookie || '';
        const fbp = body.fbp || getCookie(cookieHeader, '_fbp') || null;
        let fbc = body.fbc || getCookie(cookieHeader, '_fbc') || null;

        if (!fbc && eventSourceUrl) {
            try {
                const url = new URL(eventSourceUrl);
                const fbclid = url.searchParams.get('fbclid');
                if (fbclid) {
                    fbc = `fb.1.${Date.now()}.${fbclid}`;
                }
            } catch (e) {
                // Ignore URL parsing errors
            }
        }

        const userData = {};
        if (clientIp) userData.client_ip_address = clientIp;
        if (userAgent) userData.client_user_agent = userAgent;
        if (fbp) userData.fbp = fbp;
        if (fbc) userData.fbc = fbc;

        const eventData = {
            event_name: eventName,
            event_time: eventTime,
            action_source: 'website',
            event_source_url: eventSourceUrl,
            user_data: userData
        };

        if (eventId) {
            eventData.event_id = eventId;
        }

        if (Object.keys(customData).length > 0) {
            eventData.custom_data = customData;
        }

        const payloadObj = {
            data: [eventData]
        };

        if (testEventCode) {
            payloadObj.test_event_code = testEventCode;
        }

        const payload = JSON.stringify(payloadObj);
        const metaUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

        const metaResponse = await new Promise((resolve, reject) => {
            const parsedUrl = new URL(metaUrl);
            const metaReq = https.request(parsedUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload)
                }
            }, (metaRes) => {
                let responseData = '';
                metaRes.on('data', chunk => responseData += chunk);
                metaRes.on('end', () => {
                    resolve({
                        statusCode: metaRes.statusCode,
                        data: responseData
                    });
                });
            });

            metaReq.on('error', (err) => reject(err));
            metaReq.write(payload);
            metaReq.end();
        });

        return res.status(200).json({
            success: true,
            metaStatus: metaResponse.statusCode,
            eventId: eventId,
            eventName: eventName
        });

    } catch (err) {
        console.error('Meta CAPI Error:', err);
        return res.status(200).json({
            success: false,
            error: err.message
        });
    }
};
