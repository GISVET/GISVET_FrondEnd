
export function getItemsAdmin(navigate){
   return [
      {
         label:'Dependencias',
         icon:'img_dependencies',
         command:()=>{ navigate("/AdminDependencies") }
      },
      {
         label:'Usuarios',
         icon:'img_users',
         command:()=>{ navigate("/AdminUser") }
      },
      {
          label:'Pacientes',
          icon:'img_patients',
          command:()=>{ navigate("/AdminPatients") }
       },
       {
          label:'Productos',
          icon:'img_products',
          command:()=>{ navigate("/AdminProducts") }
       }
   ];
}

export function getItemsAuditor(navigate){
   return [
      {
         label:'Dependencias',
         icon:'img_dependencies',
         command:()=>{ navigate("/AdminDependencies") }
      },
      {
         label:'Usuarios',
         icon:'img_users',
         command:()=>{ navigate("/AdminUser") }
      },
      {
          label:'Pacientes',
          icon:'img_patients',
          command:()=>{ navigate("/AdminPatients") }
       },
       {
          label:'Productos',
          icon:'img_products',
          command:()=>{ navigate("/AdminProducts") }
       },
       {
         label:'Seguimiento',
         icon:'img_products',
         command:()=>{ navigate("/AdminProducts") }
      }
   ];
}

export function getItemsBodega(navigate){
   const other =[
      {
         label:'Productos en Bodega',
         icon:'img_bodega',
         command:()=>{ navigate("/AdminDependencies") }
      },
      {
         label:'Productos en Consultorios',
         icon:'img_consultory',
         command:()=>{ navigate("/AdminUser")}
      }

   ]
   return [
      
      {
         label:'Mis Productos',
         icon:'img_products',
         command:()=>{ navigate("/user/grocery") }
      }
   ];
}

export function getItemsFarmacia(navigate){
   const other =[
      {
         label:'Productos en Bodega',
         icon:'img_bodega',
         command:()=>{ navigate("/AdminDependencies") }
      },
      {
         label:'Productos en Consultorios',
         icon:'img_consultory',
         command:()=>{ navigate("/AdminUser")}
      }

   ]
   return [
      {
         label:'Mis Productos',
         icon:'img_products',
         command:()=>{ navigate("/user/farmacy") }
      }
   ];
}

export function getItemsConsultorio(navigate){
   const other =[
      {
         label:'Productos en Bodega',
         icon:'img_bodega',
         command:()=>{ navigate("/AdminDependencies") }
      },
      {
         label:'Productos en Consultorios',
         icon:'img_consultory',
         command:()=>{ navigate("/AdminUser")}
      }

   ]
   return [
      
      {
         label:'Mis Productos',
         icon:'img_products',
         command:()=>{ navigate("/user/consultory") }
      }
   ];
}