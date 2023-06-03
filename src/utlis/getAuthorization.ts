export const getAuthorization = async(accessToken: string) => {
        const rawRes = await fetch('http://localhost:3001/', {
            method: 'GET',
            headers: {'authorization': `Bearer: ${accessToken}`}
        });
        
        return await rawRes.json();
}