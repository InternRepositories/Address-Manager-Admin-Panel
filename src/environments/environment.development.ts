const _baseUrl = 'http://localhost:5000/api/v1';

export const environment = {
  production: false,
  recaptcha: {
    siteKey: '6Ld-MYAkAAAAAMCDBBblEUy2_Yp_A487GDuPitXt',
  },
  API_SERVER: 'http://localhost:5000/api/v1',
  api: {
    commonBaseUrl: 'http://localhost:5000/api/v1/common',
    adminBaseUrl: 'http://localhost:5000/api/v1/admin',
    usersRoute: '/users/',
    loginRoute: '/login/',
    addressRoute: '/addresses',
    parishRoute: '/parishes'
  },

  commonUrl: `${_baseUrl}/common`,
  webUrl: `${_baseUrl}/web`,
  adminUrl: `${_baseUrl}/admin`,

}
