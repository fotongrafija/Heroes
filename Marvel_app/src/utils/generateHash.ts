import md5 from 'md5'



export const publicKey = import.meta.env.VITE_PUBLIC_KEY
const privateKey = import.meta.env.VITE_PRIVATE_KEY


export const generateHash = (ts: number) => {
  
  return md5(ts + privateKey + publicKey)
  
};




