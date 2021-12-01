export const environment = {
  production: true,
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
