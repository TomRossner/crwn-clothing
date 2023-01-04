import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../store/user/userSelector';
import { signOutUser } from '../utils/firebase';
import { setCurrentUser } from "../store/user/userAction";

const Logout = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
      const handleSignOut = async () => {
        await signOutUser();
        dispatch(setCurrentUser(null));
      }
      if (currentUser === null) return navigate("/CRWN-Clothing/");
      handleSignOut();
    }, [currentUser]);

  return null;
}

export default Logout;