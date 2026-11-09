// Expo inlines EXPO_PUBLIC_ variables from .env.local when it bundles the app.
export const MAP_TOKEN = process.env.EXPO_PUBLIC_PARSIMAP_MAP_TOKEN ?? '';
export const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';
export const MISSING_TOKEN_MESSAGE = 'Set your Parsimap and Mapbox tokens in .env.local.';
