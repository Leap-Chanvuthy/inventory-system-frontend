import { useSelector } from 'react-redux';

const useToken = () => {
    const {currentUser} = useSelector((state) => state.auth);

    const token = currentUser?.authorisation?.token || null;
    return token;
}
 
export default useToken;