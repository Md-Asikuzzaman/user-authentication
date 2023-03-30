import { NextPage } from 'next';
import {
  AiOutlineUser,
  AiOutlineGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { MdLockOutline, MdAlternateEmail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebookOption } from 'react-icons/gr';
import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';
import { useFormik, FormikProps } from 'formik';
import { signUpValidate } from '@/lib/validation';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

interface Props {}

const Index: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleShowPassword = (): void => {
    setShowPassword(true);
  };

  const handleHiddenPassword = (): void => {
    setShowPassword(false);
  };

  const handleConfirmShowPassword = (): void => {
    setShowConfirmPassword(true);
  };

  const handleConfirmHiddenPassword = (): void => {
    setShowConfirmPassword(false);
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

  const handleFacebook = (): void => {
    // signIn('facebook', {
    //   callbackUrl: '/',
    // });
    console.log('facebook');
  };

  // Form validation
  interface SignUpType {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const formik: FormikProps<SignUpType> = useFormik<SignUpType>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: signUpValidate,

    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          'http://localhost:3000/api/signup',
          values
        );

        if (res.status === 201) {
          router.replace('/signin');
        }
      } catch (error: any) {
        setError(error?.response.data.message);
      }

      formik.resetForm();
    },
  });

  return (
    <>
      <Head>
        <title>Create a new account</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <div className='h-screen bg-gradient-to-tr to-indigo-500 from-teal-500 flex justify-center items-center'>
        <div className='shrink-0 max-w-[450px] w-full px-3'>
          <form
            className='bg-white rounded-md overflow-hidden shadow-md py-7 px-6'
            onSubmit={formik.handleSubmit}
          >
            <h2 className='text-center text-2xl font-semibold mb-5 text-fuchsia-800'>
              Sign Up
            </h2>

            {error && (
              <p className='text-center bg-rose-400 py-1.5 rounded-sm mb-3 text-white'>
                {error}
              </p>
            )}

            <label htmlFor='username'>Username *</label>
            <div className='relative mb-1 mt-1'>
              <AiOutlineUser className='absolute top-0 left-3 bottom-0 my-auto text-base' />
              <input
                type='text'
                placeholder='Username'
                id='username'
                className='w-full outline-none bg-slate-100 pl-10 py-2 pr-2 rounded-sm border-slate-100 focus:border-fuchsia-800 border-b-2'
                name='username'
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </div>
            <p className='text-sm mb-2 text-rose-500'>
              {formik.errors.username && formik.touched.username
                ? formik.errors.username
                : null}
            </p>

            <label htmlFor='email'>Email *</label>
            <div className='relative mb-1 mt-1'>
              <MdAlternateEmail className='absolute top-0 left-3 bottom-0 my-auto text-base' />
              <input
                type='text'
                placeholder='Email Address'
                name='email'
                id='email'
                className='w-full outline-none bg-slate-100 pl-10 py-2 pr-2 rounded-sm border-slate-100 focus:border-fuchsia-800 border-b-2'
                onChange={formik.handleChange}
                value={formik.values.email}
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
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                id='password'
                className='w-full outline-none bg-slate-100 pl-10 py-2 pr-10 rounded-sm border-slate-100 focus:border-fuchsia-800 border-b-2'
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <div className='absolute top-0 right-3 bottom-0 my-auto text-base  grid place-content-center'>
                {showPassword ? (
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

            <label htmlFor='confirmPassword'>Confirm Password *</label>
            <div className='relative mb-1 mt-1'>
              <MdLockOutline className='absolute top-0 left-3 bottom-0 my-auto text-base' />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm Password'
                name='confirmPassword'
                id='confirmPassword'
                className='w-full outline-none bg-slate-100 pl-10 py-2 pr-10 rounded-sm border-slate-100 focus:border-fuchsia-800 border-b-2'
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <div className='absolute top-0 right-3 bottom-0 my-auto text-base  grid place-content-center'>
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible
                    onClick={handleConfirmHiddenPassword}
                    className='cursor-pointer'
                  />
                ) : (
                  <AiOutlineEye
                    onClick={handleConfirmShowPassword}
                    className='cursor-pointer'
                  />
                )}
              </div>
            </div>
            <p className='text-sm mb-2 text-rose-500'>
              {formik.errors.confirmPassword && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : null}
            </p>

            <button
              type='submit'
              className='uppercase bg-fuchsia-800 w-full mt-5 py-1 text-white rounded-3xl select-none'
            >
              Sign Up
            </button>
            <p className='text-center py-4'>Or</p>
            <div className='flex justify-center gap-3'>
              <span
                onClick={() => handleGoogle()}
                className='h-9 w-9 bg-slate-200 rounded-full grid place-content-center cursor-pointer shadow-md'
              >
                <FcGoogle className='text-xl' />
              </span>

              <span
                onClick={() => handleFacebook()}
                className='h-9 w-9 bg-blue-800 rounded-full grid place-content-center cursor-pointer shadow-md'
              >
                <GrFacebookOption className='text-xl text-white' />
              </span>

              <span
                onClick={() => handleGithub()}
                className='h-9 w-9 bg-black rounded-full grid place-content-center cursor-pointer shadow-md'
              >
                <AiOutlineGithub className='text-xl text-white' />
              </span>
            </div>
            <p className='text-center mt-5 text-slate-600 text-sm'>
              Already have an account?
              <Link
                className='hover:underline text-fuchsia-800 ml-1'
                href='/signin'
              >
                Sign in
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
