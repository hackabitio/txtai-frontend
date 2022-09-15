import { error } from '@sveltejs/kit'
import { api } from './api'

export const load = async () => {
	const response = await api('GET', `count`)

	if (response.status !== 200) {
		return {
			count: []
		}
	}

	if (response.status === 200) {
		return {
			count: await response.json()
		}
	}

	throw error(response.status);
};

export const actions = {
	add: async ({ request }) => {
		const form = await request.formData()
		let indexData = form.get('indexData')
		let dataArray = indexData.split(/\r?\n/);
		dataArray = dataArray.map(text => ({id: crypto.randomUUID(), text: text}))
		console.log(dataArray)
		await api('POST', 'add', dataArray)
		await api('GET', 'upsert')
	}
};
