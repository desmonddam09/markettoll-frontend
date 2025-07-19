import ReactPixel from 'react-facebook-pixel';
import { v4 as uuidv4 } from 'uuid';
import { BASE_URL } from '../api/api';

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
console.log("<><<><><>", userEmail, data, event_id)
  // Send to backend for CAPI if needed
  if (userEmail) {
    await fetch(`${BASE_URL}/meta/track-event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: eventType,
        email: userEmail,
        eventId: event_id,
        data: data,
      }),
    });
  }
  return event_id;
}; 