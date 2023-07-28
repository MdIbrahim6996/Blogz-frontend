import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccountAction } from "../../../redux/slices/accountVerification/accVerificationSlices";
import { logoutAction } from "../../../redux/slices/users/usersSlices";



const AccountVerificationConfirmation = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate()

  const { appErr } = useSelector((state) => state.account);
  useEffect(() => {
    dispatch(verifyAccountAction(token));
  }, [dispatch, token]);
  return (
    <div className="bg-black/30 h-screen flex justify-between items-center w-screen">
      <div className="bg-white rounded-md p-5 w-[25rem] flex flex-col space-y-2 mx-auto">
        {appErr ? (
          <p className="capitalize text-xl font-bold text-center">{appErr}</p>
        ) : (
          <p className="capitalize text-xl font-bold text-center">
            account verified
          </p>
        )}
        {!appErr && (
          <p className="text-center text-gray-700">
            Your account is verified. Logout and login back to see the chabger
          </p>
        )}
        <button
          onClick={() => {
            dispatch(logoutAction())
            navigate('/')
        }}
          className="bg-purple-700 capitalize text-white py-2 rounded-md font-semibold"
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default AccountVerificationConfirmation;
