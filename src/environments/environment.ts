// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'https://covidapp-server.herokuapp.com/api',
  rolRoute: [
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
        name: 'Registros de Usuarios',
        url: '/soporte',
        icon: 'medkit'
      },
    ],
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
        name: 'Listado de Registros',
        url: '/soporte',
        icon: 'medkit'
      },
      {
        name: 'Administrar Datos',
        url: '/soporte',
        icon: 'bar-chart'
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
