import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  PUBLIC_PMI_MAP_TOKEN: { public: true, schema: (value) => value ?? '' },
});
