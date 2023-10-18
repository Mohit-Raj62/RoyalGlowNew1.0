import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
// import { BiMailSend, BiPhoneCall, BiServer } from 'react-icons/bi';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //  form functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/contact`,
        { name, email, message }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/user/status");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Contact - ROYAL GLOW"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">CONTACT FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="First and last name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="mb-3"
              type="text"
              inputMode="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="exampleInputEmail"
              placeholder="Message "
            ></textarea>
          </div>
          <p>Your problem resolved will be 2-3 working days Only </p>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
