

var pacientes=[]; // Toda la lista de pacientes registrados
var contXLogIn;
//

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
 var mensajesError=[];
  mensaje.style.color="red";

 if (verificacionCampos(nombre,apellido,dni,fechaNac,planMed,coberturaMed,email,contraseña)){


   for(var i=0;i<pacientes.length;i++){
     if(email== pacientes[i].email || dni==pacientes[i].dni){
      // alert("Email y/o DNI ya registrado")
       mensajesError.push("Email y/o DNI ya registrado");
    mensaje.innerHTML=mensajesError.join(", ");
       i=pacientes.length;
       document.location.href="registrarse.html";
       
     }else{
       if(i== pacientes.length-1 && pacientes.length!=0){
       registrarPaciente(nombre,apellido,dni,fechaNac,planMed,coberturaMed,email,contraseña);
       i=pacientes.length;
       //alert("Registro exitoso, por favor inice sesion");
       mensaje.style.color="green";
       mensajesError.push("Registro exitoso por favor inicie sesion");
    mensaje.innerHTML=mensajesError.join(", ");
       document.location.href="login.html";
        }
       }
    }
  if (pacientes.length==0){
    registrarPaciente(nombre,apellido,dni,fechaNac,planMed,coberturaMed,email,contraseña);
    //alert("Registro exitoso, por favor inice sesion");
    mensaje.style.color="green";
       mensajesError.push("Registro exitoso por favor inicie sesion");
    mensaje.innerHTML=mensajesError.join(", ");
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

var mensaje=document.getElementById("error");

function verificacionCampos(nombre,apellido,dni,fechaNac,planMed,coberturaMed,email,contraseña){

  var soloLetras = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/;
  var soloNum=/^\d*$/;
  var soloEmail = /^([a-z]+[a-z1-9._-]*)@{1}([a-z1-9\.]{2,})\.([a-z]{2,3})$/;
  var mensajesError=[];
  mensaje.style.color="red";
  
 //Nombre
  if(nombre.length>20){
   //alert("Nombre muy largo");
    mensajesError.push("Nombre Muy largo");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  if(nombre.length<1){
    //alert("Ingrese su nombre por favor");
    mensajesError.push("Ingrese su nombre por favor");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  if(!soloLetras.test(nombre)){
    //alert("Nombre invalido");
    mensajesError.push("Nombre invalido");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  //Apellido
  if(apellido.length>30){
    //alert("Apellido muy largo");
    mensajesError.push("Apellido Muy largo");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  if(apellido.length<1){
    //alert("Ingrese su apellido por favor");
    mensajesError.push("Ingrese su apellido por favor");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  if(!soloLetras.test(apellido)){
   // alert("Apellido invalido");
    mensajesError.push("Apellido invalido");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  //DNI
  if(dni.length!=8){
    //alert("DNI Invalido");
    mensajesError.push("DNI invalido");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  if(!soloNum.test(dni)){
   // alert("DNI invalido");
    mensajesError.push("DNI invalido");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  
  
  //Fecha
  
  if( !isNaN(fechaNac) ) {
   // alert("Fecah Invalida");
    mensajesError.push("Fecha invalida");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  //Email
  if(!soloEmail.test(email)){
    //alert("Email invalido");
    mensajesError.push("Email invalido");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  //Contraseña
  if(contraseña.length!=8){
   // alert("Contraseña Invalida");
    mensajesError.push("contraseña invalida");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;

  }
 //Plan Medico
  if(planMed.length<1){
   // alert("Ingrese su plan medico por favor");
    mensajesError.push("Ingrese su planmedico por favor");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
  //Cobertura Medica
  if(coberturaMed.length<1){
   // alert("Ingrese su coberutra por favor");
    mensajesError.push("Ingrse su cobertura por favor");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }
//mensaje.innerHTML=mensajesError.join(", ");
   return true;
  
   

}



// Inicio de sesion

function ingresarCuenta(){
  var email=document.getElementById('emailLog').value;
  var contraseña=document.getElementById('contraseñaLog').value;
  var mensajesError=[];
  mensaje.style.color="green";

  if(verificarCampoEmail(email)){
       if(validacionEmail(email,contraseña) ){
           //alert("Log In Exitoso");
           mensajesError.push("Login exitoso");
            mensaje.innerHTML=mensajesError.join(", ");
           document.location.href="vistaPaciente.html";
   }
  }

}

function validacionEmail(email,contraseña){
  pacientes=getUsuarios();
  var mensajesError=[];
  mensaje.style.color="red";


  for(var i=0;i<pacientes.length;i++){
    
     if(email==pacientes[i].email ){
      
       if( contraseña==pacientes[i].contraseña){
           if(pacientes[i].contLogIn>5){
          
          bloquearUsuario();
          return false;
        
           }else{   return true;
          }
       }else{
            mensajesError.push("contraseña invalida");
            mensaje.innerHTML=mensajesError.join(", ");
         pacientes[i].contLogIn++;
         
         if(pacientes[i].contLogIn>4){
          
           bloquearUsuario();
           return false;
         }else{
          storedUsuarios(pacientes);
         return false;
        }
       }
     }
  }
  //alert("Usuario Incorrecto");
  mensajesError.push("Usuario Incorrecto");
    mensaje.innerHTML=mensajesError.join(", ");
  return false;
}
//
function bloquearUsuario(){
  document.location.href="bloqueado.html";
}

function validacionContraseña(contraseña){
  pacientes=getUsuarios();
  var mensajesError=[];
  mensaje.style.color="red";
  for(var i=0;i<pacientes.length;i++){
     if( contraseña==pacientes[i].contraseña){
       return true;
     }
  }
  //alert("ContraseñaIncorrecta");
  mensajesError.push("Contraseña Incorrecta");
  mensaje.innerHTML=mensajesError.join(", ");

  return false;
}

function verificarCampoEmail(email){
  var soloEmail = /^([a-z]+[a-z1-9._-]*)@{1}([a-z1-9\.]{2,})\.([a-z]{2,3})$/;
//Email
  var mensajesError=[];
  mensaje.style.color="red";
  if(!soloEmail.test(email)){
    //alert("Email invalido");
    mensajesError.push("Email invalido");
    mensaje.innerHTML=mensajesError.join(", ");
    return false;
  }

 return true;


}


