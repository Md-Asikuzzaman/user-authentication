import { NextPage } from 'next';
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { MdLockOutline, MdAlternateEmail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebookOption } from 'react-icons/gr';
import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';
import { getSession, signIn } from 'next-auth/react';
import { useFormik, FormikProps } from 'formik';
import { signInValidate } from '@/lib/validation';
import { useRouter } from 'next/router';

interface Props {}

const Index: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleShowPassword = (): void => {
    setShow(true);
  };

  const handleHiddenPassword = (): void => {
    setShow(false);
  };

  // All sign in handler
  const handleGoogle = (): void => {
    signIn('google', {
      callbackUrl: '/',
    });
  };

  const handleGithub = (): void => {
    signIn('github', {
      callbackUrl: '/',
    });
  };

  // Form validation
  interface SignUpType {
    email: string;
    password: string;
  }

  const formik: FormikProps<SignUpType> = useFormik<SignUpType>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: signInValidate,

    onSubmit: async (values) => {
      const status = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: '/',
      });

      if (status?.error) {
        setError(status?.error);
      }

      formik.resetForm();

      if (status?.ok) {
        router.replace('/');
      }
    },
  });

  return (
    <>
      <Head>
        <title>Log in with your account</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className='h-screen bg-gradient-to-tr to-indigo-500 from-teal-500 flex items-center justify-center'>
        <div className='shrink-0 max-w-[450px] w-full px-3'>
          <form
            className='bg-white rounded-md overflow-hidden shadow-md py-8 px-6'
            onSubmit={formik.handleSubmit}
          >
            <h2 className='text-center text-2xl font-semibold mb-6 text-fuchsia-800'>
              Sign in
            </h2>

            {error && (
              <p className='text-center bg-rose-400 py-1.5 rounded-sm mb-3 text-white'>
                {error}
              </p>
            )}

            <label htmlFor='email'>Email *</label>
            <div className='relative mb-1 mt-1'>
              <MdAlternateEmail className='absolute top-0 left-3 bottom-0 my-auto text-base' />
              <input
                type='text'
                placeholder='Email Address'
                id='email'
                className='w-full outline-none bg-slate-100 pl-10 py-2 pr-2 rounded-sm border-slate-100 focus:border-fuchsia-800 border-b-2'
                {...formik.getFieldProps('email')}
              />
            </div>
            <p className='text-sm mb-2 text-rose-500'>
              {formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null}
            </p>

            <label htmlFor='password'>Password *</label>
            <div className='relative mb-1 mt-1'>
              <MdLockOutline className='absolute top-0 left-3 bottom-0 my-auto text-base' />
              <input
                type={show ? 'text' : 'password'}
                placeholder='Password'
                id='password'
                className='w-full outline-none bg-slate-100 pl-10 py-2 pr-10 rounded-sm border-slate-100 focus:border-fuchsia-800 border-b-2'
                {...formik.getFieldProps('password')}
              />
              <div className='absolute top-0 right-3 bottom-0 my-auto text-base  grid place-content-center'>
                {show ? (
                  <AiOutlineEyeInvisible
                    onClick={handleHiddenPassword}
                    className='cursor-pointer'
                  />
                ) : (
                  <AiOutlineEye
                    onClick={handleShowPassword}
                    className='cursor-pointer'
                  />
                )}
              </div>
            </div>
            <p className='text-sm mb-2 text-rose-500'>
              {formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null}
            </p>

            <p className='mt-4 text-right cursor-pointer text-sm text-slate-600'>
              Forgot password?
            </p>
            <button
              type='submit'
              className='uppercase bg-fuchsia-800 w-full mt-5 py-1 text-white rounded-3xl'
            >
              Sign in
            </button>
            <p className='text-center py-4'>Or</p>
            <div className='flex justify-center gap-3'>
              <span
                onClick={handleGoogle}
                className='h-9 w-9 bg-slate-200 rounded-full grid place-content-center cursor-pointer shadow-md'
              >
                <FcGoogle className='text-xl' />
              </span>

              <span className='h-9 w-9 bg-blue-800 rounded-full grid place-content-center cursor-pointer shadow-md'>
                <GrFacebookOption className='text-xl text-white' />
              </span>

              <span
                onClick={handleGithub}
                className='h-9 w-9 bg-black rounded-full grid place-content-center cursor-pointer shadow-md'
              >
                <AiOutlineGithub className='text-xl text-white' />
              </span>

              <span className='h-9 w-9 bg-sky-600 rounded-full grid place-content-center cursor-pointer shadow-md'>
                <AiOutlineTwitter className='text-xl text-white' />
              </span>
            </div>
            <p className='text-center mt-10 text-slate-600 text-sm'>
              Don't have an account?
              <Link
                className='hover:underline text-fuchsia-800 ml-1'
                href='/signup'
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession({ req: ctx.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
