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
	search: async ({ request }) => {
		const form = await request.formData()
		const s = form.get('text')
		const response = await api('GET', `search?query=${s}&limit=10`)
		if (response.status === 200) {
			const r = await response.json()
			return r
		}
	}
}
