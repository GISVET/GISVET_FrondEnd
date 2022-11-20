export const itemsNav = [
    {
       label:'Dependencias',
       icon:'img_dependencies',
       command:()=>{ window.location="/AdminDependencies"; }
    },
    {
       label:'Usuarios',
       icon:'img_users',
       command:()=>{ window.location="/AdminUser"; }
    },
    {
        label:'Pacientes',
        icon:'img_patients',
        command:()=>{ window.location="/AdminPatients"; }
     },
     {
        label:'Productos',
        icon:'img_products',
        command:()=>{ window.location="/AdminProducts"; }
     }
 ];

 export const itemsNavBodega = [
   {
      label:'Productos en Bodega',
      icon:'img_bodega',
      command:()=>{ window.location="/AdminDependencies"; }
   },
   {
      label:'Mis Productos',
      icon:'img_products',
      command:()=>{ window.location="/AdminUser"; }
   },
   {
      label:'Productos en Consultorios',
      icon:'img_consultory',
      command:()=>{ window.location="/AdminUser"; }
   }
];