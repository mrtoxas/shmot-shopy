import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { NewLandingModal } from '@/Components/Modals/NewLandingModal';
import { PageHead } from '@/Components/ui/PageHead';

export default function Dashboard({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className="flex justify-between align-center">
					
					<PageHead message="Мої сайти" />
					<NewLandingModal />
				</div>
			}
		>
			<Head title="Мої сайти" />

			<div className="py-12">

				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900">You're logged in!</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
