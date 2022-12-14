/*
	This module is used by the /todos endpoint to
	make calls to api.svelte.dev, which stores todos
	for each user.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

const base = import.meta.env.VITE_API

export function api(method, resource, data) {
	return fetch(`${base}/${resource}`, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});
}
