import { FormEventHandler, useRef } from "react"
import { useForm } from "@inertiajs/react"
import { Button } from '@/Components/shadcn/ui/button'
import { Label } from '@/Components/shadcn/ui/label'
import { Input } from '@/Components/shadcn/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/shadcn/ui/select';
import { DialogFooter } from "../shadcn/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"

export const NewLandingForm = () => {	
	const { data, setData, post, processing, errors } = useForm({
		name: '',
		clone: '',
	})

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route('password.confirm'));
	};

	return (
		<form onSubmit={submit}>
			<div className="grid gap-4 py-4">
				<div>
					<Label htmlFor="name" className="text-right">
						Назва сайту (пiддомен)
					</Label>
					<Input id="name" className="col-span-3 mt-1" required />
				</div>
				<div>
					<Label htmlFor="clone" className="text-right">
						Сайт для клонування
					</Label>
					<Select>
						<SelectTrigger className="mt-1">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</form>
	)

}