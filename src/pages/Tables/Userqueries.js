import React from 'react'
import "bulma/css/bulma.css";
import { useState } from 'react';
import * as AiFillDelete from 'react-icons/ai'
import "../Tables/tablestyle.css";
import * as AiOutlineArrowRight from 'react-icons/ai'
import CircleLoader from "react-spinners/CircleLoader";
import { useEffect } from 'react';
import { auth, db } from "../../firebase";
import * as AiOutlineArrowLeft from 'react-icons/ai'
import * as BiShowAlt from 'react-icons/bi';
import * as MdCancel from 'react-icons/md';

// const INITIAL_VALUES = [
//   { id: "PB-314", name: "Aown", number: "03229948664" },
//   { id: "PC-321", name: "Saad", number: "03217738448" },
//   { id: "SU-456", name: "Usman", number: "03007789462" },
//   { id: "SU-456", name: "Usman", number: "03007789462" },
// ];

function UserQueries() {
  const [showSureModal, setShowSureModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedComplaint, setselectedComplaint] = useState(null);
  const [deletionID, setDeletionID] = useState(null);
  // const [showSureModal, setShowSureModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [errorMessage, seterrorMessage] = useState("");



  const handleModal = () => {

    setShowErrorModal(true);



    setTimeout(() => {
      setShowErrorModal(false);
    }, 1000);
  }

  useEffect(() => {
    let temp = [];
    db.collection('complaints').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = {
            uid: doc.id,
            data: doc.data()
          }
          temp.push(obj);
        })
        console.log("Complaints", temp);
        setData(temp)
      })
      .catch(error => {
        console.log("Error", error);
      })
  }, [showSureModal, selectedComplaint])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])


  return (
    <div>
      <div className="columns"
        style={{
          padding: 5,
          marginLeft: "`10`px"
        }}>
        <div className="column is-two-quarter" >
          <div class="card mt-5" style={{ borderRadius: 15, marginLeft: "1px" }}>
            <div class="card-content has-text-centered">
              <div class="content">
                <h5><strong>Users List</strong></h5>
                {loading ?
                  <CircleLoader className="loader" color={"#8624DB"} loading={loading} size={100} />

                  :

                  <div className='tableFixHead'>
                    <table style={{

                      marginTop: "50px",

                    }}>
                      <thead>
                        <tr>
                          <th>User Name</th>
                          <th>Delete</th>
                          <th>Show</th>
                        </tr>
                      </thead>
                      {data.map((val, key) => {
                        return (
                          <tr key={key}>
                            <td>{val?.data?.userFullName}</td>
                            <td>
                              <button
                                onClick={() => {
                                  setShowSureModal(true);
                                  setDeletionID(val);
                                }}
                                className="dbtn"
                              ><AiFillDelete.AiFillDelete />

                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setselectedComplaint(val)
                                  console.log("Selected Complaint is ", val);
                                }}
                                className="ebtn"
                              >
                                <BiShowAlt.BiShowAlt />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>}

              </div>
            </div>
          </div>
        </div>

        <div className="column is-two-thirds" style={{ marginRight: "30px" }}>
          <div class="card mt-5" style={{ borderRadius: 15 }}>
            <div class="card-content has-text-centered">
              <div class="content">
                <h5 style={{ fontSize: "x-large" }}><strong>Details</strong></h5>
                <p>Select User to Show Complain.</p>
                {selectedComplaint &&
                  // <div className="profile">
                  //   <div className="profile_body">
                  //     <div className="body_left">
                  //       <div className="body_left_header">

                  //         <div className="profile_card" style={{
                  //           marginRight: "20px"
                  //         }}>
                  //  <div className="column is-two-thirds" style={{ marginRight: "30px" }}>
                  //     <div class="card mt-5" style={{ borderRadius: 15 }}>
                  //       <div class="card-content has-text-centered">
                  //         <div class="content">

                  <div>
                    <h1>------------------------------------------------------------</h1>

                    <button
                      onClick={() => {
                        setselectedComplaint(false)
                      }}
                      className="dbtn"
                      style={{
                        marginLeft: "690px",
                      }}
                    >
                      <MdCancel.MdCancel />
                    </button>
                    <span style={{ fontSize: "large", marginLeft: "50px" }} ><strong>Complaint ID:</strong></span>
                    <p> {selectedComplaint.uid}</p>

                    <br />
                    <span style={{ fontSize: "large" }}  ><strong>User Name:</strong></span>
                    <p>{selectedComplaint.data.userFullName}</p>
                    <br />
                    <span style={{ fontSize: "large" }}  ><strong>Date:</strong></span>
                    <p>{selectedComplaint.data.date}</p>
                    <br />
                    <span style={{ fontSize: "large" }}  ><strong>User Complain:</strong></span>
                    <div class="notification is-info">
                      {selectedComplaint.data.complaint}
                    </div>
                  </div>
                  // </div>
                  // </div>

                  // </div>

                  // </div>
                }
              </div>
            </div>
          </div>
        </div>
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
                      console.log("The selected stop to be deleted is", deletionID);
                      db
                        .collection('complaints')
                        .doc(deletionID.uid)
                        .delete()
                        .then(() => {
                          setShowSureModal(false);
                          console.log("Complaint has been deleted successfully");
                          setDeletionID({});
                          seterrorMessage("The User has been deleted successfully");
                          // setShowErrorModal(true);


                          handleModal();
                        })
                        .catch(error => {
                          console.log("Error", error);
                        })

                    }}
                    class="button is-success"
                  >
                    Yes
                  </button>
                  <button onClick={() => {
                    setShowSureModal(false)
                    // db
                    //   .collection('complaints')
                    //   .doc(deletionID.uid)
                    //   .delete()
                    //   .then(() => {
                    //     setShowSureModal(false);
                    //     console.log("Complaint has been deleted successfully");
                    //     setDeletionID({});
                    //   })
                    //   .catch(error => {
                    //     console.log("Error", error);
                    //   })

                    // setShowSureModal(false)
                  }} class="button">
                    No
                  </button>
                </footer>
              </div >
            </div >
          )
        }
      </div>
    </div >
  )
}


export default UserQueries











