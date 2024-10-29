export const enum Feature {
  SEND_EMAIL = 'SEND_EMAIL',
  GITHUB_AUTH = 'GITHUB_AUTH',
  GOOGLE_AUTH = 'GOOGLE_AUTH',
  EMAIL_AUTH = 'EMAIL_AUTH',
  WORKSPACE = 'WORKSPACE',
  SUPABASE = 'SUPABASE',
  POSTHOG = 'POSTHOG',
  LOCAL_DB = 'LOCAL_DB',
  FULL_BUILD = 'FULL_BUILD',
}

// right now all managed-version features are disabled in local environment
export const isFeatureEnabled = (feature: Feature) => {
  if (feature === Feature.EMAIL_AUTH) {
    return process.env.ENVIRONMENT === 'PRODUCTION' ? false : true;
  }

  if (feature === Feature.LOCAL_DB) {
    return process.env.ENVIRONMENT === 'PRODUCTION' ? false : true;
  }

  if (feature === Feature.FULL_BUILD) {
    const environment = process.env.ENVIRONMENT;
    if (!environment) {
      throw new Error('ENVIRONMENT is not set');
    }
    return ['FULL', 'PRODUCTION'].includes(environment);
  }

  return process.env.ENVIRONMENT === 'PRODUCTION' ? true : false;
};
