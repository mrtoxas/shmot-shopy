import { Button } from '@/components/shadcn/ui/button';

export const LandingSettingsForm = () => {
	const { landingId } = usePage().props;

	const submitHandler = () => {
		const formData = new FormData();
		formData.append('landing_id', landingId);
		formData.append('is_pub', 1);
		formData.append('meta_title', 'Мета тайтл');
		formData.append('meta_description', 'Мета дескрипшн');
		formData.append('fb_pixel_key', '11111');
		formData.append('telegram_chat_id', '22222');
		formData.append('crm_api_key', '33333');
		formData.append('telegram_token', '44444');

		window.axios.post('landing.settings.store', landingId)
			.then((res)=>console.log(res))
	}

	return (
		<>
			<div>landingSettingsForm</div>
			<Button onClick={submitHandler}>Send test data</Button>
		</>
		)
}