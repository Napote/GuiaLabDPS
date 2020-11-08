export default function validate(values) {
    let errors = {};
    if (!values.nombre) {
        errors.nombre = 'Este campo es requerido';
    }
    
    return errors;

};
