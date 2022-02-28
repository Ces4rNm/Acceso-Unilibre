export const environment = {
  production: true,
  serverUrl: 'https://covidapp-server.herokuapp.com/api',
  rolRoute: [
    //User
    [
      {
        name: 'Inicio',
        url: '/content/home',
        icon: 'home'
      },
      {
        name: 'Actualizar Datos',
        url: '/content/update-data',
        icon: 'person-circle'
      },
    ],
    //Nurse
    [
      {
        name: 'Inicio',
        url: '/content/home',
        icon: 'home'
      },
      {
        name: 'Actualizar Datos',
        url: '/content/update-data',
        icon: 'person-circle'
      },
      {
        name: 'Permitir Acceso',
        url: '/content/qr-scan',
        icon: 'key'
      },
    ],
    //Doctor
    [
      {
        name: 'Inicio',
        url: '/content/home',
        icon: 'home'
      },
      {
        name: 'Actualizar Datos',
        url: '/content/update-data',
        icon: 'person-circle'
      },
      {
        name: 'Permitir Acceso',
        url: '/content/qr-scan',
        icon: 'key'
      },
      {
        name: 'Seguimiento de Encuesta',
        url: '/content/survey-list',
        icon: 'medkit'
      },
      {
        name: 'Gráfico de Encuesta',
        url: '/content/survey-chart',
        icon: 'bar-chart'
      },
    ],
    //Admin
    [
      {
        name: 'Inicio',
        url: '/content/home',
        icon: 'home'
      },
      {
        name: 'Actualizar Datos',
        url: '/content/update-data',
        icon: 'person-circle'
      },
      {
        name: 'Permitir Acceso',
        url: '/content/qr-scan',
        icon: 'key'
      },
      {
        name: 'Seguimiento de Encuesta',
        url: '/content/survey-list',
        icon: 'medkit'
      },
      {
        name: 'Gráfico de Encuesta',
        url: '/content/survey-chart',
        icon: 'bar-chart'
      },
      {
        name: 'Permisos de Rol',
        url: '/content/role-permissions',
        icon: 'id-card'
      },
    ]
  ]
};
