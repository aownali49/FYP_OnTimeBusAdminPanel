import React from 'react'
import "bulma/css/bulma.css";
import { useState } from 'react';
// import * as AiFillDelete from 'react-icons/ai'
import "../Tables/tablestyle.css";
// import * as AiOutlineArrowRight from 'react-icons/ai'
import CircleLoader from "react-spinners/CircleLoader";
import { useEffect } from 'react';
import { auth, db, realdb } from "../../firebase";
// import * as AiOutlineArrowLeft from 'react-icons/ai'
import * as BiShowAlt from 'react-icons/bi';
import * as MdCancel from 'react-icons/md';
function Useracount() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    // const [selectedJourney, setselectedJourney] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setselectedCard] = useState(null);
    const [addModal, setAddModal] = useState(false);
    const [displayData, setDisplayData] = useState([]);
    // const [searchFilter, setSearchFilter] = useState("");
    const [errorMessage, seterrorMessage] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [newCard, setNewCard] = useState({
        cardNumber: "",
        amount: 0,
        userId: ""
    })

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
        db.collection('card').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let obj = {
                        uid: doc.id,
                        data: doc.data(),
                    }
                    temp.push(obj)
                    console.log("Card: ", doc.id, ":", doc.data());
                })
                console.log("Data", temp);
                setData(temp)
                setDisplayData(temp)
            })
            .catch(error => {
                console.log("Error", error);
            })
    }, [addModal])

    return (
        <div>
            <div className="columns">
                <div className="column is-two-quarter" >
                    <div class="card mt-5" style={{ borderRadius: 15 }}>
                        <div class="card-content has-text-centered">
                            <div class="content">
                                <h5><strong>Cards List</strong></h5>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                    }}>
                                    <button
                                        className="button is-primary mt-3 mb-2"
                                        onClick={() => {
                                            setAddModal(true);
                                            //   setModalType('add');
                                            //   setShowModal(true);
                                            //   setSelectedItem({
                                            //       sid: '',
                                            //       sname: '',
                                            //       saddress: '',
                                            //       // distance: '',
                                            //       // tta: '',
                                            //       latitude: '',
                                            //       longitude: '',
                                            //   });
                                            //   setIdDisabled(false);
                                        }}
                                    >
                                        Add Card (+)
                                    </button>
                                </div>
                                {loading ?
                                    <CircleLoader className="loader" color={"#8624DB"} loading={loading} size={100} />

                                    :

                                    <div className='tableFixHead'>
                                        <table style={{
                                            marginTop: "50px",
                                        }}>
                                            <thead>
                                                <tr>
                                                    <th>Card ID</th>
                                                    <th>Show Journey</th>
                                                </tr>
                                            </thead>
                                            {displayData.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{val.uid}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => {
                                                                    //     setselectedUser(val)
                                                                    //     getJourneys(val)
                                                                    setselectedCard(val);
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
                                    <h5 style={{ fontSize: "x-large", }}><strong>Card Details</strong></h5>

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
                                                                <th>Card Number</th>
                                                                <th>User ID</th>
                                                                <th>Amount</th>

                                                            </tr>
                                                        </thead>
                                                        <tr>
                                                            <td>{selectedCard.uid}</td>
                                                            <td>{selectedCard.data.userId}</td>
                                                            <td>{selectedCard.data.amount}</td>
                                                        </tr>
                                                    </table>

                                                </div>
                                            </div>
                                        </div>

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

                                    {addModal && (
                                        <div class="modal is-active">
                                            <div class="modal-background"></div>
                                            <div class="modal-card">
                                                <header
                                                    style={{ backgroundColor: '#8624DB' }}
                                                    class="modal-card-head">
                                                    <p style={{
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        fontSize: "x-large",
                                                        marginRight: "5000px",
                                                    }} class="modal-card-title">Add Card</p>
                                                    <button
                                                        onClick={() => {
                                                            setAddModal(false)

                                                        }}
                                                        class="delete"
                                                        aria-label="close"></button>
                                                </header>
                                                <section class="modal-card-body">

                                                    <div class="field">
                                                        <label class="label" style={{ marginRight: "480px" }}>Card Number: </label>
                                                        <div class="control">
                                                            <input
                                                                // value={addStop.stopName}
                                                                class="input"
                                                                type="text"
                                                                required
                                                                value={newCard.cardNumber}
                                                                onChange={(event) => {
                                                                    setNewCard({
                                                                        ...newCard,
                                                                        cardNumber: event.target.value
                                                                    })
                                                                }}
                                                                // name="sname"
                                                                placeholder="Card Number Show Here"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="field">
                                                        <label class="label" style={{
                                                            marginRight: "520px"
                                                        }} >User ID: </label>
                                                        <div class="control">
                                                            <input
                                                                disabled
                                                                value={newCard.userId}
                                                                class="input"
                                                                type="text"
                                                                // onChange={(event) => {
                                                                //     setNewCard({
                                                                //         ...newCard,
                                                                //         userId: event.target.value
                                                                //     })
                                                                // }}
                                                                // required
                                                                placeholder="User ID Shows Here"
                                                            />
                                                        </div>
                                                    </div>
                                                </section>

                                                <footer class="modal-card-foot">
                                                    <button
                                                        disabled={newCard.cardNumber === ""}
                                                        class="button is-success"
                                                        onClick={() => {

                                                            db.collection("card")
                                                                .doc(newCard.cardNumber)
                                                                .set(newCard)
                                                                .then(() => {
                                                                    seterrorMessage("The Card has been added successfully")
                                                                    setAddModal(false)
                                                                    handleModal();
                                                                    console.log("Card Added Successfully!");
                                                                    setNewCard({
                                                                        cardNumber: '',
                                                                        amount: 0
                                                                    })
                                                                })
                                                                .catch((error) => {
                                                                    console.error("Error writing document: ", error);
                                                                    seterrorMessage(error.message)
                                                                    handleModal();
                                                                    setAddModal(false)
                                                                });
                                                            realdb.ref(newCard.cardNumber)
                                                                .set({
                                                                    CardNumber: newCard.cardNumber,
                                                                    Amount: newCard.amount,
                                                                });



                                                        }}
                                                    >
                                                        Save Card
                                                    </button>
                                                    <button onClick={() => {

                                                        setAddModal(false)
                                                    }} class="button">
                                                        Cancel
                                                    </button>
                                                </footer>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Useracount