const _baseUrl = 'http://localhost:5000/api/v1';

export const environment = {
  production: true,
  recaptcha: {
    siteKey: '6Ld-MYAkAAAAAMCDBBblEUy2_Yp_A487GDuPitXt',
  },
  API_SERVER: 'http://localhost:5000/api/v1',
  api: {
    commonUrl: `${_baseUrl}/common`,
    webUrl: `${_baseUrl}/web`,
    adminUrl: `${_baseUrl}/admin`,
  },
};