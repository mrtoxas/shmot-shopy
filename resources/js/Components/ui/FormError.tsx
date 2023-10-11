export const FormError = ({ msg }: {    
    msg: string | undefined;
}) => {
    return Boolean(msg) && <p className='text-sm text-red-600 mt-2'>{msg}</p>
}