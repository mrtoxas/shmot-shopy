
interface Axios {
    req: () => Promise<void>,
    method: 'post' | 'get' | 'put' | 'delete'
}

export const axiosReq = async (req: Axios) => {
    try {
        req
    }
}