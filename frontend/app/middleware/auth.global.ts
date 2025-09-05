// read cookie server side
// call backend and ask if logged in because we cant read a httpOnly cookie with js
export default defineNuxtRouteMiddleware(async (to, from)=> {
    const protectedPaths = ['/settings']
	if (!protectedPaths.includes(to.path)) return
    const config = useRuntimeConfig()
	const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined
    const apiBase = config.public.apiBase
	try {
		await $fetch('/user/profile', {
			method: 'GET',
			credentials: 'include',
			headers,
            baseURL: apiBase
		})
	} catch (e: any) {
		if (e?.status === 401) return navigateTo('/login')
	}
})