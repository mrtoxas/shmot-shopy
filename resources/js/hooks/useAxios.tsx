


export const useAxios = () => {
    window.axios.interceptors.request.use(request => {
        console.log('Starting Request', request)
        return request
    })

    window.axios.interceptors.response.use(response => {
        console.log('Response:', response)
        return response
    })

}