import { Form, redirect } from 'react-router'
import type { Route } from './+types/_home.user.group.$id_.post'

export default function PostPage() {
	return (
		<div>
			<h2>új esemény létrehozása</h2>
			<Form method='POST'>
				<input type='hidden' name='groupId' value='1' />
				<input type='text' name='title' id='title' placeholder='esemény neve' />
				<input type='date' name='startdate' id='startdate' />
				<input type='time' name='starttime' id='' />
				<p>esemény plakátja</p>
				<input type='file' name='attachment' accept='image/jpeg' required />
				<br />
				<input type='submit' value='letrehozás' />
			</Form>
		</div>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData()

	return redirect('/user/group/1')
}
