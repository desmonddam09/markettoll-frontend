import ReactPixel from 'react-facebook-pixel';
import { v4 as uuidv4 } from 'uuid';

const options = {
  autoConfig: true,
  debug: false,
};

export const initMetaPixel = () => {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (pixelId) {
    ReactPixel.init(pixelId, {}, options);
  } else {
    console.warn('Meta Pixel ID is not set in environment variables.');
  }
};

/**
 * Track a Meta Pixel event with a unique event_id and dynamic parameters.
 * Optionally send to backend for CAPI if eventType is 'Subscribe' and userEmail is provided.
 * @param {string} eventType - The Meta Pixel event type (e.g., 'ViewContent', 'AddToCart')
 * @param {object} data - The event data (should match backend structure)
 * @param {string|null} userEmail - The user's email for CAPI (optional)
 * @returns {string} event_id - The unique event ID generated for this event
 */
export const trackMetaPixel = async (eventType, data = {}, userEmail = null) => {
  const event_id = uuidv4();
  const params = {
    ...data,
    event_id, // Unique event ID for backend/frontend correlation
  };
  ReactPixel.track(eventType, params);

  // Send to backend for CAPI if needed
  if (eventType === 'Subscribe' && userEmail) {
    await fetch('/api/track-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        eventId: event_id,
        value: data.value,
        currency: data.currency,
      }),
    });
  }

  return event_id;
}; 