

var pacientes=[]; // Toda la lista de pacientes registrados
var contXLogIn;


function registrarPaciente(nombre,apellido,dni,fechaNac,planMed,coberturaMed,email,contraseña){
  var newUser ={
    nombre: nombre,
    apellido: apellido,
    dni:dni,
    fechaNac: fechaNac,
    planMed:planMed,
    coberturaMed: coberturaMed,
    
    email: email,
    contraseña: contraseña,
    contLogIn:0 //Para contar los intentos de logueos erroneos
  };

 pacientes=getUsuarios();
 pacientes.push(newUser);
  
  storedUsuarios(pacientes);
}

function verificarPaciente(){
  
  var nombre=document.getElementById("nombreid").value;
  var apellido=document.getElementById("apellidoid").value;
  var dni=document.getElementById("dniid").value;
  var fechaNac=document.getElementById("fechaid").value;
  var planMed=document.getElementById("planid").value;
  var coberturaMed=document.getElementById("coberturaid").value;
  
  var email=document.getElementById('emailid').value;
  var contraseña=document.getElementById('contraseñaid').value;

 pacientes=getUsuarios();

 if (verificacionCampos(nombre,apellido,dni,fechaNac,planMed,coberturaMed,email,contraseña)){


   for(var i=0;i<pacientes.length;i++){
     if(email== pacientes[i].email || dni==pacientes[i].dni){
       alert("Email y/o DNI ya registrado")
       i=pacientes.length;
       document.location.href="registrarse.html";
       
     }else{
       if(i== pacientes.length-1 && pacientes.length!=0){
       registrarPaciente(nombre,apellido,dni,fechaNac,planMed,coberturaMed,email,contraseña);
       i=pacientes.length;
       alert("Registro exitoso, por favor inice sesion");
       document.location.href="login.html";
        }
       }
    }
  if (pacientes.length==0){
    registrarPaciente(nombre,apellido,dni,fechaNac,planMed,coberturaMed,email,contraseña);
    alert("Registro exitoso, por favor inice sesion");
    document.location.href="login.html";

  }
}


}

function storedUsuarios(lista){

   localStorage.setItem("Usuarios",JSON.stringify(lista));
}

function getUsuarios(){
  var storedUsers=localStorage.getItem("Usuarios");
  if(storedUsers==null){
   pacientes=[];
  }
  else{
   pacientes=JSON.parse(storedUsers);
  }
  return pacientes;
}

function verificacionCampos(nombre,apellido,dni,fechaNac,planMed,coberturaMed,email,contraseña){

  var soloLetras = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/;
  var soloNum=/^\d*$/;
  var soloEmail = /^([a-z]+[a-z1-9._-]*)@{1}([a-z1-9\.]{2,})\.([a-z]{2,3})$/;
  
 //Nombre
  if(nombre.length>30){
    alert("Nombre muy largo");
    return false;
  }
  if(nombre.length<1){
    alert("Ingrese su nombre por favor");
    return false;
  }
  if(!soloLetras.test(nombre)){
    alert("Nombre invalido");
    return false;
  }
  //Apellido
  if(apellido.length>30){
    alert("Apellido muy largo");
    return false;
  }
  if(apellido.length<1){
    alert("Ingrese su apellido por favor");
    return false;
  }
  if(!soloLetras.test(apellido)){
    alert("Apellido invalido");
    return false;
  }
  //DNI
  if(dni.length!=8){
    alert("DNI Invalido");
    return false;
  }
  if(!soloNum.test(dni)){
    alert("DNI invalido");
    return false;
  }
 
  //Fecha
  
  if( !isNaN(fechaNac) ) {
    alert("Fecah Invalida");
    return false;
  }
  //Email
  if(!soloEmail.test(email)){
    alert("Email invalido");
    return false;
  }
  //Contraseña
  if(contraseña.length!=8){
    alert("Contraseña Invalida");
    return false;

  }
 //Plan Medico
  if(planMed.length<1){
    alert("Ingrese su plan medico por favor");
    return false;
  }
  //Cobertura Medica
  if(coberturaMed.length<1){
    alert("Ingrese su coberutra por favor");
    return false;
  }

   return true;
  
   

}



// Inicio de sesion

function ingresarCuenta(){
  var email=document.getElementById('emailLog').value;
  var contraseña=document.getElementById('contraseñaLog').value;

  if(verificarCampoEmail(email)){
       if(validacionEmail(email,contraseña) ){
           alert("Log In Exitoso");
           document.location.href="vistaPaciente.html";
   }
  }

}

function validacionEmail(email,contraseña){
  pacientes=getUsuarios();
  for(var i=0;i<pacientes.length;i++){
    
     if(email==pacientes[i].email ){
      
       if( contraseña==pacientes[i].contraseña){
           if(pacientes[i].contLogIn>5){
          
          bloquearUsuario();
          return false;
        
           }else{   return true;
          }
       }else{
        alert("Contraseña Incorrecta");
         pacientes[i].contLogIn++;
         
         if(pacientes[i].contLogIn>5){
          
           bloquearUsuario();
           return false;
         }else{
          storedUsuarios(pacientes);
         return false;
        }
       }
     }
  }
  alert("Usuario Incorrecto");
  return false;
}

function bloquearUsuario(){
  document.location.href="bloqueado.html";
}

function validacionContraseña(contraseña){
  pacientes=getUsuarios();
  for(var i=0;i<pacientes.length;i++){
     if( contraseña==pacientes[i].contraseña){
       return true;
     }
  }
  alert("ContraseñaIncorrecta");
  return false;
}

function verificarCampoEmail(email){
  var soloEmail = /^([a-z]+[a-z1-9._-]*)@{1}([a-z1-9\.]{2,})\.([a-z]{2,3})$/;
//Email
  if(!soloEmail.test(email)){
    alert("Email invalido");
    return false;
  }

 return true;


}


