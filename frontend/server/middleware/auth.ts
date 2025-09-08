export default defineEventHandler((event)=>{
    const path = event.path;
    const protectedPaths = ['/settings'];
    const token = getCookie(event, 'access_token');
    if(protectedPaths.includes(path) && !token){
        return sendRedirect(event, '/login')
    }
})

// TODO was ist der unterrschied zwischen dieser middleware und der auth.global