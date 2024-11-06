import md5 from 'md5'



export const publicKey = import.meta.env.VITE_PUBLIC_KEY
const privateKey = import.meta.env.VITE_PRIVATE_KEY


export const generateHash = (timeStamp: number): JSX.Element => {
  
  return md5(timeStamp + publicKey + privateKey)
  
};




