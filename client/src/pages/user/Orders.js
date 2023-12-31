import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  //eslint-disable-next-line
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"ORDERS - ROYAL GLOW"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center title "> ALL ORDERS </h1>
            <div className="card d-flex flex-wrap">
              {orders?.map((o, i) => {
                return (
                  <div className="border shadow ">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      <div className="col-md-9 ">
                        {o?.products?.map((p, i) => (
                          <div className="row card flex-row" key={p._id}>
                            <div className="col-md-4 mt-3">
                              <img
                                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                                width="100%"
                                height={"130px"}
                              />
                            </div>
                            <div className="col-md-8 mt-2">
                              <p>{p.name}</p>
                              <p>{p.description.substring(0, 15)}...</p>
                              <p> ₹ : {p.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
