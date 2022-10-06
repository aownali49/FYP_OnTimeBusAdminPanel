import React, { useState, useEffect } from "react";
import "../Tables/tablestyle.css";
import "bulma/css/bulma.css";
import * as AiFillDelete from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faDeleteLeft, faDollar, faMoneyBill, faMoneyCheckDollar, faTrash } from "@fortawesome/free-solid-svg-icons";
import CircleLoader from "react-spinners/CircleLoader";
import { auth, db, realdb } from "../../firebase";

function Users() {

  // const INITIAL_VALUES = [
  //   { id: "1", name: "Aown", email: "aown@gmail.com", phno: "03669948374", dob: "12/02/2005", password: "*****", account: "200 rs" },
  //   { id: "2", name: "Saad", email: "saad@gmail.com", phno: "03779948356", dob: "02/12/2002", password: "*****", account: "500 rs" },
  //   { id: "3", name: "Usman", email: "usmann@gmail.com", phno: "03889948323", dob: "22/082/2003", password: "*****", account: "1000 rs" },
  // ];
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSureModal, setShowSureModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [errorMessage, seterrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idDisabled, setIdDisabled] = useState(true);

  const [updateAmount, setUpdateAmount] = useState(0);


  var [selectedItem, setSelectedItem] = useState({});
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])


  const handleModal = () => {

    setShowErrorModal(true);



    setTimeout(() => {
      setShowErrorModal(false);
    }, 1000);
  }


  useEffect(() => {
    let temp = [];
    db.collection('users').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = {
            uid: doc.id,
            data: doc.data()
          }
          temp.push(obj)
          console.log("User: ", doc.id, ":", doc.data());
        })
        console.log("Data", temp);
        setData(temp)
        setDisplayData(temp)
      })
      .catch(error => {
        console.log("Error", error);
      })
  }, [showPaymentModal, showSureModal])

  // const handleDelete = (value) => {
  //   setData((prev) => {
  //     const newData = [...prev].filter((item) => item.id !== value.id);
  //     return newData;
  //   });
  // };
  // const handleEditSave = () => {
  //   setShowPaymentModal(false);
  //   setData((prev) => {
  //     const index = prev.findIndex((item) => item.id === selectedItem.id);
  //     const newData = [...prev];
  //     newData[index] = selectedItem;
  //     return newData;
  //   });
  // };


  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <div class="card "    >
        <div className="container">
          <div>
            <input
              class="input is-rounded mt-2"
              type="text"
              style={{ border: "1px solid black" }}
              placeholder="Search By CardNumber/PhoneNumber/Email/Name"
              value={searchFilter}
              onChange={(event) => {
                const val = event.target.value;
                setSearchFilter(val);
                // console.log("Value in Search bar",searchFilter);
                // console.log("data",data);
                if (searchFilter !== "") {
                  const filteredData = data.filter((item) => {
                    return (
                      item.data?.fullName?.toLowerCase().includes(val.toLowerCase()) ||
                      item.data?.cardNumber?.includes(val) ||
                      item.data?.phoneNumber?.includes(val) ||
                      item.data?.email?.toLowerCase().includes(val.toLowerCase())
                    );
                  });
                  setDisplayData(filteredData);
                }
                else if (searchFilter === "") {
                  setDisplayData(data);
                }

              }}

            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                marginTop: "10px",
              }}
            >
              {loading ?
                <CircleLoader className="loader" color={"#8624DB"} loading={loading} size={100} />
                :
                <div style={{ marginTop: "15px" }}>
                  <div className='tableFixHeadUser'>
                    <table >

                      <thead>

                        <tr>
                          <th>Card Number</th>
                          <th>Full name</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Date Of Birth</th>
                          <th>Amount</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      {displayData.map((val, key) => {
                        return (
                          <tr key={key}>
                            <td>{val.data.cardNumber}</td>
                            <td>{val.data.fullName}</td>
                            <td>{val.data.email}</td>
                            <td>{val.data.phoneNumber}</td>
                            <td>{val.data.dob}</td>
                            <td>{val.data.amount}</td>
                            <td>
                              <FontAwesomeIcon
                                onClick={() => {
                                  // selectedItem = val;
                                  setSelectedItem(val);
                                  setShowPaymentModal(true);
                                }}
                                className="ebtn"
                                icon={faMoneyCheckDollar}
                              />
                              <FontAwesomeIcon
                                onClick={() => {
                                  setSelectedItem(val);
                                  setShowSureModal(true);
                                  console.log("selected USer ID to delete", selectedItem.uid);

                                }}
                                className="dbtn"
                                icon={faTrash} />
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                </div>
              }

              {showPaymentModal && (
                <div class="modal is-active">
                  <div class="modal-background"></div>
                  <div class="modal-card">
                    <header style={{ backgroundColor: "#8624DB" }} class="modal-card-head">
                      <p class="modal-card-title"><strong>Add Payment</strong></p>
                      <button
                        onClick={() => setShowPaymentModal(false)}
                        class="delete"
                        aria-label="close"
                      ></button>
                    </header>
                    <section class="modal-card-body">
                      <div class="field">
                        <label class="label">Payment</label>
                        <div class="control">
                          <input
                            class="input"
                            type="number"
                            placeholder="account"
                            value={updateAmount}
                            onChange={(event) => {
                              setUpdateAmount(event.target.value)
                            }}
                          />
                        </div>
                      </div>
                    </section>
                    <footer class="modal-card-foot" >
                      <button
                        onClick={() => {
                          console.log("Running");
                          console.log("current amount:", selectedItem.data.amount);
                          console.log("updated amount:", parseInt(selectedItem.data.amount) + parseInt(updateAmount));

                          db
                            .collection('users')
                            .doc(selectedItem.uid)
                            .update({
                              amount: (parseInt(selectedItem.data.amount) + parseInt(updateAmount)).toString()
                            })
                            .then(() => {
                              setShowPaymentModal(false);
                              console.log("The amount has been updated successfully");
                              seterrorMessage("The amount has been updated successfully");
                              // setShowErrorModal(true);

                              setSelectedItem({});
                              handleModal();
                            })
                            .catch(error => {
                              console.log("Error", error);
                            })
                          db
                            .collection('card')
                            .doc(selectedItem.data.cardNumber)
                            .update({
                              amount: (parseInt(selectedItem.data.amount) + parseInt(updateAmount)).toString()
                            })
                          realdb
                            .ref(selectedItem.data.cardNumber + "/Amount")
                            .set(parseInt(selectedItem.data.amount) + parseInt(updateAmount))
                            .catch(error => { console.log("Errorupdating realtimeDB", error); });

                        }}
                        class="button is-success"
                      >
                        Save changes
                      </button>
                      <button
                        onClick={() => setShowPaymentModal(false)}
                        class="button"
                      >
                        Cancel
                      </button>
                    </footer>
                  </div>
                </div>
              )}
              {showErrorModal && (
                <div class="modal is-active">
                  <div class="modal-background"></div>
                  <div class="modal-card">
                    <header
                      style={{ backgroundColor: "#8624DB" }}
                      class="modal-card-head"
                    >
                      <p class="modal-card-title">
                        <strong></strong>
                      </p>
                      <span
                        onClick={() => {
                          setShowErrorModal(false);
                        }}
                        class="delete"
                        aria-label="close"
                      ></span>
                    </header>
                    <section class="modal-card-body">
                      <h1
                        style={{
                          color: "black",
                          fontSize: 25,
                          textAlign: "center",
                        }}
                      >
                        <strong>{errorMessage}</strong>
                      </h1>
                    </section>
                  </div>
                </div>
              )}
              {
                showSureModal && (
                  <div class="modal is-active">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                      <header style={{ backgroundColor: "#8624DB" }} class="modal-card-head">
                        <p style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "x-large"
                        }} class="modal-card-title">Confirmation</p>
                        <button
                          onClick={() => setShowSureModal(false)}
                          class="delete"
                          aria-label="close" ></button>
                      </header>
                      <section class="modal-card-body">
                        <div>
                          <h1>  <strong>Are you Sure you want to delete this User</strong></h1>
                        </div>
                      </section>
                      <footer class="modal-card-foot">
                        <button
                          onClick={() => {
                            console.log("The selected user to be deleted is", selectedItem);
                            db
                              .collection('users')
                              .doc(selectedItem.uid)
                              .delete()
                              .then(() => {
                                setShowSureModal(false);
                                console.log("User has been deleted successfully");
                                seterrorMessage("The User has been deleted successfully");
                                // setShowErrorModal(true);

                                setSelectedItem({});
                                handleModal();
                                // setShowErrorModal(true);
                              })
                              .catch(error => {
                                console.log("Error", error);
                              })
                          }}
                          class="button is-success"
                        >
                          Yes
                        </button>
                        <button onClick={() => setShowSureModal(false)} class="button">
                          No
                        </button>
                      </footer>
                    </div >
                  </div >
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
