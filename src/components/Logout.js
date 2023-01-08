import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOutStart } from "../store/user/userAction";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(signOutStart());
      navigate("/CRWN-Clothing/");
    }, []);

  return null;
}

export default Logout;