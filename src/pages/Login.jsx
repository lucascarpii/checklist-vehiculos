import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../utils/auth';
import { Navigate } from 'react-router-dom';


// Components
import { Button, Input, Loader, runCode } from 'tamnora-react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

function Login() {

  const auth = useAuth();
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);


  const validarUsuario = async (thePass) => {
    try {
      const val = await runCode(`-sl id, nombre_usuario, tipo_usuario -fr usuarios -wr contraseña = '${thePass}'`);
      const user = val[0];
      if (user.resp == 'error') return { response: false, msg: user.msgError }
      if (user.ninguno) return { response: false, msg: 'La contraseña no es válida' }

      return { response: true, user: user };

    } catch (error) {
      console.log('error', error);
      return { response: false, msg: error.message || 'Error al traer datos' };
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resp = await validarUsuario(password);
    if (resp.response) {
      auth.login(resp.user);
    } else {
      setMsg('No hay usuario registrado con esa contraseña.');
    }
    setLoading(false);
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  const PasswordSwitch = () => {
    return (
      <button tabIndex="-1" onClick={() => setShowPass(!showPass)} className='opacity-60 hover:opacity-100'>
        {showPass ?
          <EyeSlashIcon className='h-5' />
          :
          <EyeIcon className='h-5' />
        }
      </button>
    )
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      login(e);
    }
  };
  const handleChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <section className="absolute top-0 left-0 h-dvh w-full flex items-center justify-center bg-gradient-to-tr from-zinc-200 dark:from-black to-white dark:to-zinc-900">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-5 px-6 py-10 rounded-xl">
        <div className="flex flex-col items-center justify-center text-center ">
          <h2 className="text-xl font-medium text-zinc-700 dark:text-zinc-300 tmn-fadeIn mt-2">Checklist Vehicular</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-6 mb-3 tmn-fadeIn">Acceda a su cuenta para continuar</p>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={login} className=" w-full flex flex-col gap-3 select-none">
            <Input
              variant='bordered'
              defaultValue={password}
              name="password"
              onChange={handleChange}
              label='Contraseña'
              placeholder='Ingrese su contraseña'
              type={showPass ? 'text' : 'password'}
              endContent={<PasswordSwitch />}
              onKeyDown={handleKeyDown}
            />
            <Button variant='solid' color='yellow' radius='rounded-xl'>
              Iniciar Sesión
            </Button>
            <p className="text-center text-sm font-semibold text-red-600 dark:text-red-500">{msg}</p>
          </form>
        )}
      </div>
    </section>
  );
}

export { Login };