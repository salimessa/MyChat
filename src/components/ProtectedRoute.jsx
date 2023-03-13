import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoader, ShowLoader } from "../redux/loaderSlice";
import { SetAllChats, SetAllUsers, SetUser } from "../redux/userSlice";
import * as usersService from "../utilities/users-service";
import * as chatsService from "../utilities/chats-service";
import { toast } from "react-hot-toast";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoader());
      const response = await usersService.getCurrentUser();
      const allUsersResponse = await usersService.getAllUsers();
      const allChatsResponse = await chatsService.getAllChats();
      dispatch(HideLoader());
      if (response.success) {
        dispatch(SetUser(response.data));
        dispatch(SetAllUsers(allUsersResponse.data));
        dispatch(SetAllChats(allChatsResponse.data));
      } else {
        toast.error(response.message);
        localStorage.removeItem("token");
        navigate("/auth");
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
      localStorage.removeItem("token");
      navigate("/auth");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-screen w-screen bg-gray-100 p-2">
      <div className="flex justify-between p-5 bg-primary rounded">
        <div className="flex items-center gap-1">
          <i className="ri-message-3-line text-2xl text-white"></i>
          <h1 className="text-white text-2xl uppercase font-bold">Chat App</h1>
        </div>
        <div className="flex gap-1 text-md items-center text-white">
          <i className="ri-shield-user-fill text-white"></i>
          <h1 className="underline text-white">{user?.name}</h1>
          <i
            className="ri-logout-circle-r-line ml-5 text-xl cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          ></i>
        </div>
      </div>
      <div className="py-5">{children}</div>
    </div>
  );
}

export default ProtectedRoute;
