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


function UserJourney() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [selectedJourney, setselectedJourney] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setselectedUser] = useState(null);

    const [displayData, setDisplayData] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");



    useEffect(() => {
        let temp = [];
        db.collection('users').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let obj = {
                        uid: doc.id,
                        data: doc.data(),
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
    }, [])

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    function getJourneys(oIncomingUser) {
        console.log("Selected User is", oIncomingUser.uid);
        let journey = []
        journey = data[data.findIndex((item) => { return item.uid === oIncomingUser.uid })].data.transactionInfo;
        console.log("Selected users journeys are:", journey);
        setselectedJourney(journey);
    }



    return (
        <div>
            <div className="columns">
                <div className="column is-two-quarter" >
                    <div class="card mt-5" style={{ borderRadius: 15 }}>
                        <div class="card-content has-text-centered">
                            <div class="content">
                                <h5><strong>Users List</strong></h5>
                                <input
                                    class="input is-rounded mt-2"
                                    type="text"
                                    style={{ border: "1px solid black", marginLeft: "5px" }}
                                    placeholder="Search By CardNumber/Name"
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
                                                    item.data?.cardNumber?.includes(val)
                                                );
                                            });
                                            setDisplayData(filteredData);
                                        }
                                        else if (searchFilter === "") {
                                            setDisplayData(data);
                                        }

                                    }}

                                />
                                {loading ?
                                    <CircleLoader className="loader" color={"#8624DB"} loading={loading} size={100} />

                                    :

                                    <div className='tableFixHead'>
                                        <table style={{
                                            marginTop: "50px",
                                        }}>
                                            <thead>
                                                <tr>
                                                    <th>Card Number</th>
                                                    <th>User Name</th>
                                                    <th>Show Journey</th>
                                                </tr>
                                            </thead>
                                            {displayData.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{val.data.cardNumber}</td>
                                                        <td>{val.data.fullName}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => {
                                                                    setselectedUser(val)
                                                                    getJourneys(val)
                                                                    setShowModal(true);
                                                                    // console.log("Selected Complaint is ", val);
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
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <div className="column is-two-thirds">
                    <div class="card mt-5" style={{ borderRadius: 15, marginRight: "10px" }}>
                        <div className="container">
                            <div class="card-content has-text-centered">
                                <div class="content">
                                    <h5 style={{ fontSize: "x-large", }}><strong>Journey Details</strong></h5>
                                    <p>Select User to show Journey</p>
                                    {showModal &&

                                        <div>
                                            <button
                                                onClick={() => {
                                                    setShowModal(false);

                                                }}
                                                className="dbtn"
                                                style={{
                                                    marginLeft: "690px",
                                                }}
                                            >
                                                <MdCancel.MdCancel />
                                            </button>
                                            <div style={{ marginTop: "10px" }}>
                                                <div className='tableFixHead'>
                                                    <table  >
                                                        <thead>
                                                            <tr>
                                                                <th>Journey No</th>
                                                                <th>Date</th>
                                                                <th>Boarding Time</th>
                                                                <th>Source Stop Name</th>
                                                                <th>Disembarking Time</th>
                                                                <th>Destination Name</th>
                                                                <th>Fare</th>
                                                            </tr>
                                                        </thead>
                                                        {selectedJourney.map((val, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index}</td>
                                                                    <td>{val.date}</td>
                                                                    <td>{val.boardingTime}</td>
                                                                    <td>{val.origStopName}</td>
                                                                    <td>{val.disembarkingTime}</td>
                                                                    <td>{val.destStopName}</td>
                                                                    <td>{val.amount}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </table>

                                                </div>
                                            </div>
                                        </div>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserJourney
















