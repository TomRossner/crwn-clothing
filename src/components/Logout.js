import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { signOutUser } from '../utils/firebase';

const Logout = () => {
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);

    useEffect(() => {
      const handleSignOut = async () => {
        await signOutUser();
        setCurrentUser(null);
      }
      if (currentUser === null) return navigate("/CRWN-Clothing/");
      handleSignOut();
    }, [currentUser, setCurrentUser]);

  return null;
}

export default Logout;