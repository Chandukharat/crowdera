import axios from "axios";
import React from "react";
import style from "./style.css";
import { useNavigate, useParams } from "react-router";

const Verify = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const verifyEmail = () => {
    axios.put(`http://localhost:8001/verify/${id}`).then((x) => {
      alert("Email Verified Successfully");
      navigate("/");
    });
  };

  return (
    <>
      <button class="container" class="btn btn-warning" onClick={() => verifyEmail()}>Verify Email</button>
    </>
  );
};

export default Verify;
