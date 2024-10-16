// src/components/Dashboard.js
import React from 'react';
// import { useSelector } from 'react-redux';
// import { NEWS_API_KEY } from "../config";
// import { clearState } from '../features/auth/authSlice';


// import { logout } from '../features/auth/authSlice';

const Dashboard = () => {
  // const auth = useSelector((state) => state.auth)
  // const message = useSelector((state) => state.auth.message);
  // const dispatch = useDispatch();
  // console.log(NEWS_API_KEY);
  // useEffect(() => {
  //   if (message) {
  //     const timer = setTimeout(() => {
  //       dispatch(clearState());
  //     }, 2000); // Clear the message after 2 seconds
  //     return () => clearTimeout(timer); // Cleanup timer on unmount
  //   }
  // }, [message, dispatch]);
  
  return (
    <div>
      <h2>Dashboard</h2>
      {/*
        auth.message &&
        <h5>{auth.message}</h5>
      */}
    </div>
  );
};

export default Dashboard;
