import React from 'react';
import { useState, useEffect } from "react";
import "../Tables/tablestyle.css";
import "bulma/css/bulma.css";
import * as TiTickOutline from "react-icons/ti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faDeleteLeft, faDollar, faMoneyBill, faMoneyCheckDollar, faTrash } from "@fortawesome/free-solid-svg-icons";
import CircleLoader from "react-spinners/CircleLoader";
import { auth, db } from "../../firebase";
import tickpic from "./images/tick.png";
import crosspic from "./images/cross.png";



function Admins() {



    const [data, setData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSureModal, setShowSureModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [superAdmin, setSuperAdmin] = useState(false);

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
        }, 1000)
    }, [])


    const handleModal = () => {

        setShowErrorModal(true);
        setTimeout(() => {
            setShowErrorModal(false);
        }, 1000);
    }


    useEffect(() => {
        let temp = [];
        db.collection('admins').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let obj = {
                        uid: doc.id,
                        data: doc.data()
                    }
                    temp.push(obj)
                    console.log("Admins: ", doc.id, ":", doc.data());
                })
                console.log("Data", temp);
                setData(temp)
                setDisplayData(temp)

            })
            .catch(error => {
                console.log("Error", error);
            })
    }, [showSureModal])



    // useEffect(() => {
    //     let temp1 = "";
    //     db.collection('admins').get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 let obj = {
    //                     superAdmin: doc.data().superAdmin,
    //                 }
    //                 temp1.push(obj)
    //                 console.log("superAdmins: ",temp1);


    //             })



    //         })
    //         .catch(error => {
    //             console.log("Error", error);
    //         })
    // }, [])

   


    return (
        <div class="card ">
            <div className="container">
                <div>
                    <input
                        class="input is-rounded mt-2"
                        type="text"
                        style={{ border: "1px solid black" }}
                        placeholder="Search By name/Email/PhoneNumber"
                        value={searchFilter}
                        onChange={(event) => {
                            const val = event.target.value;
                            setSearchFilter(val);
                            // console.log("Value in Search bar",searchFilter);
                            // console.log("data",data);
                            if (searchFilter !== "") {
                                const filteredData = data.filter((item) => {
                                    return (
                                        item.data?.username?.toLowerCase().includes(val.toLowerCase()) ||
                                        item.data?.phone?.includes(val) ||
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
                        }}
                    >
                        {loading ?
                            <CircleLoader className="loader" color={"#8624DB"} loading={loading} size={100} />
                            :

                            <table style={{
                                backgroundColor: "#F0F0F0",
                                // position: "absolute",
                                // direction:"flex",
                                marginTop: "30px",
                                // marginRight: "-5%",
                                // alignContent:"center",
                                // alignItems:"center",
                                // padding: "5%",
                                // left: "5%",
                                // marginLeft:"305px",
                                // top: "500%",
                                // transform: "translate(-50 %, -30 %)",
                                // width: "109%",
                                // height: "100%",
                                // borderCollapse: "collapse",
                                // borderSpacing: 0,
                                // boxShadow: "0 2px 15px rgba(64, 64, 64, .7)",
                                // borderRadius: "12px 12px 0 0",
                                // overflow: "hidden",
                                // marginBottom: "5%"

                            }}>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Super Admin</th>
                                    <th>Actions</th>
                                </tr>
                                {displayData.map((val, key) => {
                                    return (
                                        <tr key={key}>

                                            <td>{val.data.username}</td>
                                            <td>{val.data.email}</td>
                                            <td>{val.data.phone}</td>
                                            <td>{val.data.address}</td>
                                            <td>{val.data.superAdmin ? <img src={tickpic} alt="" className="tbpic" /> : <img src={crosspic} alt="" className="tbpic" /> } </td>
                                            <td>
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
                        }
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
                                                        .collection('admins')
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


                                                    // const deluser = auth.selectedItem.uid
                                                    // deluser.delete().then(() => {
                                                    //     // User deleted.
                                                    //     console.log("Deleted from auth successfully")
                                                    // }).catch((error) => {
                                                    //     console.log("Error Deleting Auth", error)
                                                    // });

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
    );
}

export default Admins
