import validator from 'validator';

/*
 * This class contains methods for validating fields using 'validator.js' library methods
 * The methods return error message if validation failed and false otherwise
 * You can use all supported validators and sanitizers of 'validator.js' libaray
 * See their docs here https://github.com/validatorjs/validator.js
 */

class ValidacionCampos { 


    validarFormulario = (errores) => {
        let valid = true;
        Object.values(errores).forEach(
          // if we have an error string set valid to false
          (val) => val  && (valid = false)
        );
        return valid;
    }

      
    validarCorreo(correo) {
      if (validator.isEmpty(correo)) {
        return 'Este campo es requerido.';
      } else if (!validator.isEmail(correo)) {
        return 'Correo invalido.';
      }
      return false;
    }


    validarNombre(nombre){
        if(validator.isEmpty(nombre))   
            return 'Este campo es requerido.'; 
        else if (!validator.isLength(nombre, {min:3, max:16}))
            return 'El nombre debe contener entre 3 y 16 caracteres.';
    } 


    validarCodigo(codigo){
        if (!codigo)
            return 'Código invalido.';
        else if (codigo%1 !== 0)
            return 'Código invalido, no se aceptan decimales.';
        else if (codigo < 100)
            return 'Código invalido, debe de tener 3 cifras como minimo'; 
    }


    validarHoras(horas){
        if (!horas)
            return 'Información no valida.';
        else if (horas%1 !== 0)
            return 'Las horas no pueden contener decimales.';
        else if (horas > 300  )
            return 'El máximo de horas permitidas es 300.';
        else if (horas <= 0)
            return 'El mínimo de horas debe ser 1'
    }
}
  
const validarCampos = new ValidacionCampos();
   
export { validarCampos };