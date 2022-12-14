export async function Login(email: string, password: string) {
    return new Promise(async (resolve, reject) => {
        fetch("/api/auth/login" , {
            method: "POST",
            
            body: JSON.stringify({
                email,
                password
            }),
            cache: "no-cache"
            
        }).then(async res => {
            let dat = res;
            let body = await res.json();
            if (dat.status != 200) return reject(body.metadata);
            return resolve(body.metadata)
        }).catch(err => {
            return reject(err)
        })      
    })
}