// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
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
    resetRoute: '/resetPassword',
    requestRoute: '/requestPasswordReset',
    parishRoute: '/parishes',
    commonUrl: `${_baseUrl}/common`,
    webUrl: `${_baseUrl}/web`,
    adminUrl: `${_baseUrl}/admin`,
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
