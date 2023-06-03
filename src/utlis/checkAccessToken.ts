export const checkAccessToken = async() => {
    try {
        const rawRes = await fetch('http://localhost:3001/refresh', {
            credentials: 'include',
        });

        if(rawRes.status === 401) {
            throw new Error('Access denied');
        }
        return await rawRes.json();
    } catch (err: any) {
        throw new Error(err.message);
    }
}