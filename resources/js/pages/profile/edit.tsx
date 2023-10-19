import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import DeleteUserForm from './partials/deleteUserForm';
import UpdatePasswordForm from './partials/updatePasswordForm';
import UpdateProfileInformationForm from './partials/updateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight">Профiль</h2>}
        >
            <Head title="Profile" />

            <div className="py-6">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                  <UpdateProfileInformationForm

                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                  />

                  <UpdatePasswordForm className="max-w-xl" />

                  <DeleteUserForm className="max-w-xl" /> 
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
