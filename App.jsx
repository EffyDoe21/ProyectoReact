import {useForm} from 'react-hook-form';

function App() {

  const { register, handleSubmit, formState: {errors}, watch, setValue, reset } = useForm()

  console.log(errors)

  const onSubmit = handleSubmit((data) => {
    console.log(data)

    alert('Enviando datos...')

    reset()

    
  })

  return (
    <form onSubmit={onSubmit}>

      {/* Nombre */}
      <label htmlFor="Nombre">Nombre: </label>
      <input type="text" {...register("Nombre", {required: {value: true, message: "Nombre es requerido"}, minLength: { value: 2, message: "Nombre debe tener al menos 2 caracteres" }, maxLength: {value: 20, message: "Nombre debe tener máximo 20 caracteres  "}})} />

      {errors.Nombre && <span>{errors.Nombre.message}</span> }
      

      {/* Apellido */}
      <label htmlFor="Apellido">Apellido: </label>
      <input type="text" {...register("Apellido", {required: true})} />

      {errors.Apellido && <span>Apellido es Requerido</span> }

      {/* Email */}
      <label htmlFor="Email">Correo: </label>
      <input type="email" {...register("Email", {required: {value: true, message:"Correo es requerido"}, pattern:{ value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Correo electrónico no válido"}})} />

      {errors.Email && <span>{errors.Email.message}</span> }

      {/* Password */}
      <label htmlFor="Password">Contraseña: </label>
      <input type="password" {...register("Password", {required: {value: true, message: "Contraseña es requerida",}, minLength: { value: 6, message: "La contraseña debe de tener al menos 6 caracteres", }})}/>

      {errors.Password && <span>{errors.Password.message}</span> }

      {/* Confirmar Password */}
      <label htmlFor="Confirmar_Password">Confirmar Contraseña: </label>
      <input type="password" {...register("Confirmar_Password", {required: {value: true, message:"Confirmar contraseña es requerido", }, validate: value => value === watch ('Password') || 'Las contraseñas no coinciden' })}/>

      {errors.Confirmar_Password && <span>{errors.Confirmar_Password.message}</span> }

      {/* Fecha Nacimiento */}
      <label htmlFor="Fecha_Nacimiento">Fecha de Nacimiento: </label>
      <input type="date" {...register("Fecha_Nacimiento", { required: {value: true, message: "Fecha de nacimiento requerida"}, validate: (value) => { 
        const Fecha_Nacimi = new Date(value)
        const Fecha_Actual = new Date() 
        const Edad = Fecha_Actual.getFullYear() - Fecha_Nacimi.getFullYear()

        return Edad >= 18 || "Debe ser mayor de edad"


        }})} />
                  

      {errors.Fecha_Nacimiento && <span>{errors.Fecha_Nacimiento.message}</span> }

      {/* Pais */}
      <label htmlFor="Pais">Pais: </label>
      <select {...register("Pais")}>

        <option value="usa">Estados Unidos</option>   
        <option value="col">Colombia</option>
        <option value="per">Perú</option>
        <option value="mex">México</option>
        <option value="esp">España</option>        
        <option value="can">Canadá</option>
        <option value="bra">Brasil</option>
        <option value="chi">Chile</option>
        <option value="ecu">Ecuador</option>
        <option value="uru">Uruguay</option>
        <option value="ven">Venezuela</option>
        <option value="par">Paraguay</option>
        <option value="arg">Argentina</option>
        <option value="bol">Bolivia</option>

      </select>

      {
        watch('Pais') == 'col' && (
          <>
            <input 
              type="text" 
              placeholder="Departamento"          
              {...register('departamento', {
              required: {
                value: true,
                message: 'Departamento es requerido'
              }
              })}
          />
          {errors.departamento && <span>{errors.departamento.message}</span> }
          </>
        )}

      {/* Foto */}
      <label htmlFor="Foto">Foto Perfil: </label>
      <input type="file" onChange = {(e) => {console.log(e.target.files[0]) 
        setValue('Foto_Usuario', e.target.files[0].name)}}/>

      {/* Terminos y Condiciones */}
      <label htmlFor="Terminos">Acepto términos y condiciones: </label>
      <input type="checkbox" {...register("Terminos", {required: { value: true, message: "Debe aceptar términos y condiciones"}})}/>
          {errors.Terminos && <span>{errors.Terminos.message} </span>}
      <button type="submit" >Enviar</button>

        <pre>
          {JSON.stringify(watch(), null, 2)}
        </pre>
    </form>
  )
}

export default App

