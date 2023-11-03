import { useRef, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Label } from '@/components/shadcn/ui/label';
import { Input } from '@/components/shadcn/ui/input';
import { FormError } from '@/components/ui/formError';
import { DialogClose } from '@radix-ui/react-dialog';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: '',
  });


  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onError: () => {
        passwordInput.current?.focus()
      },
      onFinish: () => reset(),
    });
  };


  return (
    <Card>
    <CardHeader>
      <CardTitle>Видалити аккаунт</CardTitle>
      <CardDescription>Після видалення вашого облікового запису всі його ресурси та дані буде остаточно видалено. 
      Перш ніж видаляти свій обліковий запис, завантажте будь-які дані чи інформацію, які ви хочете зберегти.</CardDescription>
    </CardHeader>
    <CardContent>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Видалити аккаунт</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Видалити аккаунт</DialogTitle>
            <DialogDescription>
              Ви впевнені, що хочете видалити свій обліковий запис?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form onSubmit={deleteUser}>
              <p className="mt-1 text-sm text-gray-600">
                Once your account is deleted, all of its resources and data will be permanently deleted. 
                Please enter your password to confirm you would like to permanently delete your account.
              </p>

              <div className="mt-6">
                <Label htmlFor="password" className="sr-only">Пароль</Label>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  ref={passwordInput}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="mt-1 block"
                  autoFocus
                  placeholder="Password"
                />

                <FormError msg={errors.password} />
              </div>
              <div className="mt-6 flex justify-end">
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>

                <Button className="ml-3" disabled={processing} variant="destructive">
                  Видалити аккаунт
                </Button>
              </div>
            </form>
          </div>

        </DialogContent>
      </Dialog>
    </CardContent>
  </Card>
    
  );
}
