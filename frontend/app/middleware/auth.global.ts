
import { useAuthStore } from '~~/stores/auth/authStore'

// call backend and ask if logged in because we cant read a httpOnly cookie with js
export default defineNuxtRouteMiddleware(async (to, _from)=> {
    const protectedPaths = ['/settings']

	if (!protectedPaths.includes(to.path)) return

	const authStore = useAuthStore();
 try {
	 const isAuthenticated = await authStore.checkAuthStatus()

	 if (!isAuthenticated) return navigateTo('/login')
 } catch (error) {
	console.error('Auth check failed:', error)
        return navigateTo('/login')
 }


})