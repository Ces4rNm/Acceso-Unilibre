// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'https://covidapp-server.herokuapp.com/api',
  rolRoute: [
    //User
    [
      {
        name: 'Inicio',
        url: '/home',
        icon: 'home'
      },
      {
        name: 'Actualizar Datos',
        url: '/home/update-data',
        icon: 'person-circle'
      },
    ],
    //Nurse
    [
      {
        name: 'Inicio',
        url: '/home',
        icon: 'home'
      },
      {
        name: 'Actualizar Datos',
        url: '/home/update-data',
        icon: 'person-circle'
      },
      {
        name: 'Permitir Acceso',
        url: '/home/qr-scan',
        icon: 'key'
      },
    ],
    //Doctor
    [
      {
        name: 'Inicio',
        url: '/home',
        icon: 'home'
      },
      {
        name: 'Actualizar Datos',
        url: '/home/update-data',
        icon: 'person-circle'
      },
      {
        name: 'Permitir Acceso',
        url: '/home/qr-scan',
        icon: 'key'
      },
      {
        name: 'Seguimiento de Encuesta',
        url: '/home/survey-list',
        icon: 'medkit'
      },
      {
        name: 'Gráfico de Encuesta',
        url: '/home/survey-chart',
        icon: 'bar-chart'
      },
    ],
    //Admin
    [
      {
        name: 'Inicio',
        url: '/home',
        icon: 'home'
      },
      {
        name: 'Actualizar Datos',
        url: '/home/update-data',
        icon: 'person-circle'
      },
      {
        name: 'Permitir Acceso',
        url: '/home/qr-scan',
        icon: 'key'
      },
      {
        name: 'Seguimiento de Encuesta',
        url: '/home/survey-list',
        icon: 'medkit'
      },
      {
        name: 'Gráfico de Encuesta',
        url: '/home/survey-chart',
        icon: 'bar-chart'
      },
      {
        name: 'Permisos de Rol',
        url: '/home/role-permissions',
        icon: 'id-card'
      },
    ]
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
