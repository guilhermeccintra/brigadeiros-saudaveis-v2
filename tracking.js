/**
 * Sistema de Rastreamento Avançado: Meta Pixel + API de Conversões (CAPI) + TikTok Pixel
 * Garante deduplicação de eventos (eventID), envio duplo (Browser + Servidor)
 * e melhoria no Event Match Quality (EMQ).
 */
(function() {
    'use strict';

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    function generateEventId(prefix) {
        return (prefix || 'evt') + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    }

    function sendToCapi(eventName, eventId, customData) {
        try {
            var payload = JSON.stringify({
                eventName: eventName,
                eventId: eventId,
                eventSourceUrl: window.location.href,
                fbp: getCookie('_fbp'),
                fbc: getCookie('_fbc'),
                customData: customData || {}
            });

            if (navigator.sendBeacon) {
                var blob = new Blob([payload], { type: 'application/json' });
                navigator.sendBeacon('/api/capi', blob);
            } else {
                fetch('/api/capi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: payload,
                    keepalive: true
                }).catch(function() {});
            }
        } catch (e) {
            // Fail-safe silencioso
        }
    }

    function trackDualEvent(eventName, customData, existingEventId) {
        var eventId = existingEventId || generateEventId(eventName.toLowerCase());

        // 1. Meta Pixel no Navegador (com eventID para deduplicação)
        if (typeof window.fbq === 'function') {
            window.fbq('track', eventName, customData || {}, { eventID: eventId });
        }

        // 2. Meta Conversions API via Servidor (com o mesmo eventID)
        sendToCapi(eventName, eventId, customData);

        // 3. TikTok Pixel (se disponível)
        if (typeof window.ttq === 'object' && typeof window.ttq.track === 'function') {
            var ttData = {
                content_id: '100_receitas_saudaveis',
                content_type: 'product',
                content_name: customData?.content_name || 'Coleção 100 Receitas Saudáveis',
                value: customData?.value || 37.90,
                currency: customData?.currency || 'BRL'
            };
            if (eventName === 'PageView') {
                // TikTok dispara page() automaticamente no head
            } else {
                window.ttq.track(eventName, ttData);
            }
        }
    }

    // A. Enviar PageView para CAPI sincronizado com o Pixel do Head
    var pageViewEventId = window._fbPageViewId || generateEventId('pv');
    sendToCapi('PageView', pageViewEventId, {});

    // B. Rastreamento de ViewContent (após rolagem ou permanência na página)
    var viewContentFired = false;
    var defaultProductData = {
        content_name: 'Coleção 100 Receitas Saudáveis',
        content_category: 'E-book de Receitas',
        content_type: 'product',
        value: 37.90,
        currency: 'BRL'
    };

    function triggerViewContent() {
        if (viewContentFired) return;
        viewContentFired = true;
        trackDualEvent('ViewContent', defaultProductData);
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 150) {
            triggerViewContent();
        }
    }, { passive: true });

    // Fallback: se o usuário ficar mais de 3.5 segundos lendo sem rolar
    setTimeout(triggerViewContent, 3500);

    // C. Rastreamento de InitiateCheckout nos botões de compra direta
    document.addEventListener('DOMContentLoaded', function() {
        var checkoutButtons = document.querySelectorAll('a[data-checkout]');
        checkoutButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                trackDualEvent('InitiateCheckout', defaultProductData);
            });
        });
    });

    // Expor função global caso outros scripts necessitem
    window.trackDualEvent = trackDualEvent;
})();
