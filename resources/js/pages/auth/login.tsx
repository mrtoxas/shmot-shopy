import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/layouts/guestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/shadcn/ui/label';
import { Input } from '@/components/shadcn/ui/input';
import { Button } from '@/components/shadcn/ui/button';
import { Checkbox } from '@/components/shadcn/ui/checkbox';
import { FormError } from '@/components/ui/formError';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <div>
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            autoFocus={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <FormError msg={errors.email} />             
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Пароль</Label>

          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <FormError msg={errors.password} />     
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onCheckedChange={(e)=> setData('remember', Boolean(e))}
              //onChange={(e) => setData('remember', e.currentTarget.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Запам'ятати мене</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {/* {canResetPassword && (
            <Link
              href={route('password.request')}
              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Forgot your password?
            </Link>
          )} */}

          <Button className="ml-4" disabled={processing}>
            Увійти
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
