import React from 'react';
import { useState, useEffect } from 'react';
import '../Tables/tablestyle.css';
import 'bulma/css/bulma.css';
import * as AiFillDelete from 'react-icons/ai';
import * as AiFillEdit from 'react-icons/ai';
import CircleLoader from "react-spinners/CircleLoader";
import { auth, db } from "../../firebase";






function Stops() {
  // const INITIAL_VALUES =
  //   [
  //     {
  //       "stopName": "Admin Stop",
  //       "stopCoordinates": {
  //         "longitude": 73.031017,
  //         "latitude": 33.662854
  //       },
  //       "distance": "",
  //       "stopAddress": "H-10, Islamabad, ICT, Pakistan",
  //       "stopId": 8,
  //       "tta": "10 mins"
  //     },
  //     {
  //       "stopAddress": "qwertyu",
  //       "stopName": "Non Stop",
  //       "distance": "poiuytrew",
  //       "stopCoordinates": {
  //         "longitude": "123441325143513",
  //         "latitude": 12312312352345
  //       },
  //       "tta": "qwetfh",
  //       "stopId": "10"
  //     },
  //     {
  //       "distance": "",
  //       "stopName": "SMS stop",
  //       "tta": "10 mins",
  //       "stopAddress": "H-10, Islamabad, ICT, Pakistan",
  //       "stopId": 7,
  //       "stopCoordinates": {
  //         "latitude": 33.66374,
  //         "longitude": 73.024782
  //       }
  //     },
  //     {
  //       "stopAddress": "Imam-Hanifa Rd, H-10, ICT, Pakistan",
  //       "stopCoordinates": {
  //         "longitude": 73.031897,
  //         "latitude": 33.657259
  //       },
  //       "distance": "",
  //       "stopName": "Girl's Hostel Stop",
  //       "stopId": 2,
  //       "tta": "15 mins"
  //     },
  //     {
  //       "stopId": 5,
  //       "stopAddress": "H-10, Islamabad, ICT, Pakistan",
  //       "stopName": "Hostel 5,6 Stop",
  //       "distance": "",
  //       "tta": "10 mins",
  //       "stopCoordinates": {
  //         "longitude": 73.021422,
  //         "latitude": 33.660778
  //       }
  //     },
  //     {
  //       "distance": "",
  //       "stopId": 1,
  //       "stopCoordinates": {
  //         "latitude": 33.659123,
  //         "longitude": 73.034217
  //       },
  //       "tta": "2 mins",
  //       "stopName": "Hostel E,F,G",
  //       "stopAddress": "H-10, Islamabad, ICT, Pakistan"
  //     },
  //     {
  //       "stopId": 6,
  //       "stopName": "IIUI Security Camp",
  //       "tta": "10 mins",
  //       "stopAddress": "H-10, Islamabad, ICT, Pakistan",
  //       "stopCoordinates": {
  //         "longitude": 73.019017,
  //         "latitude": 33.662285
  //       },
  //       "distance": ""
  //     },
  //     {
  //       "tta": "N/A",
  //       "stopName": "Margalla Station",
  //       "stopCoordinates": {
  //         "latitude": 33.741283,
  //         "longitude": 73.0178854
  //       },
  //       "stopAddress": "Margalla Town, Islamabad ICT",
  //       "stopId": "9",
  //       "distance": "N/A"
  //     },
  //     {
  //       "stopCoordinates": {
  //         "longitude": 73.023094,
  //         "latitude": 33.655689
  //       },
  //       "stopId": 3,
  //       "stopAddress": "Imam-Hanifa Rd, H-10, ICT, Pakistan",
  //       "distance": "",
  //       "tta": "25 mins",
  //       "stopName": "Water Tank Stop"
  //     },
  //     {
  //       "stopCoordinates": {
  //         "longitude": 73.022226,
  //         "latitude": 33.657067
  //       },
  //       "stopId": 4,
  //       "stopAddress": "H-10, ICT, Pakistan",
  //       "distance": "",
  //       "stopName": "Zero Point IIUI",
  //       "tta": "25 mins"
  //     },
  //     {
  //       "tta": "45345",
  //       "distance": "s534534",
  //       "stopCoordinates": {
  //         "longitude": "343423",
  //         "latitude": 4543534
  //       },
  //       "stopName": "marksersdbdfb",
  //       "stopId": "11",
  //       "stopAddress": "afsdgsdgdsgsfb"
  //     }
  //   ]


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [idDisabled, setIdDisabled] = useState(true);

  const [selectedItem, setSelectedItem] = useState({});
  const [modalType, setModalType] = useState('');

  const [searchFilter, setSearchFilter] = useState('');

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const [showSureModal, setShowSureModal] = useState(false)

  const [addStop, setAddStop] = useState({
    // distance: "",
    stopAddress: "",
    stopCoordinates: { longitude: "", latitude: "" },
    stopId: "",
    stopName: "",
    // tta: ""
  })



  const handleModal = () => {

    setShowErrorModal(true);

    setTimeout(() => {
      setShowErrorModal(false);
    }, 1000);
  }

  useEffect(() => {
    let temp = [];
    db.collection('stops').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = {
            uid: doc.id,
            data: doc.data()
          }
          temp.push(obj);
        })
        console.log("Data", temp);
        setData(temp)
        setDisplayData(temp)
      })
      .catch(error => {
        console.log("Error", error);
      })
  }, [showErrorModal])

  // useEffect(() => {
  //   for (let index = 0; index < INITIAL_VALUES.length; index++) {
  //     const element = INITIAL_VALUES[index];
  //     console.log(element);
  //     db.collection("stops").add(element)
  //   }


  // }, [])



  // const handleEditSave = () => {
  //   setShowModal(false);
  //   setData(prev => {
  //     const index = prev.findIndex(item => item.sid === selectedItem.sid);
  //     const newData = [...prev];
  //     newData[index] = selectedItem;
  //     return newData;
  //   });
  // };

  // const handleOnAdd = () => {
  //   setData(prev => {
  //     const newData = [...prev];
  //     newData.push(selectedItem);
  //     return newData;
  //   });
  //   setShowModal(false);
  // // };

  // const handleDelete = value => {
  //   setData(prev => {
  //     const newData = [...prev].filter(item => item.sid !== value.sid);
  //     return newData;
  //   });
  // };

  // const handleOnChange = e => {
  //   setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  //   console.log('selectedItem', selectedItem);
  // };

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])


  return (
    <div class="card">
      <div className="container">
        <div>
          <input
            class="input is-rounded mt-2"
            type="text"
            style={{ border: "1px solid black" }}
            placeholder="Search by Name or Address"
            value={searchFilter}
            onChange={(event) => {
              const val = event.target.value;
              setSearchFilter(val);
              // console.log("Data",data);
              const filteredData = data.filter((item) => {
                return (
                  item.data.stopName.toLowerCase().includes(val.toLowerCase()) ||
                  item.data.stopAddress.toLowerCase().includes(val.toLowerCase())
                );
              });
              setDisplayData(filteredData);
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}>
            <button
              className="button is-primary mt-3 mb-2"
              onClick={() => {
                setModalType('add');
                setShowModal(true);
                setSelectedItem({
                  sid: '',
                  sname: '',
                  saddress: '',
                  // distance: '',
                  // tta: '',
                  latitude: '',
                  longitude: '',
                });
                setIdDisabled(false);
              }}>
              Add Stop (+)
            </button>
          </div>

          {loading ?
            <CircleLoader className="loader" color={"#8624DB"} loading={loading} size={100} />

            :
            <div className='tableFixHead'>
              <table>
                <thead>
                  <tr>
                    <th>Stop ID</th>
                    <th>Stop Name</th>
                    <th>Stop Address</th>
                    <th>Stop Latitude</th>
                    <th>Stop Longitude</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {displayData.map((val, key) => {
                  return (
                    <tr key={key} >
                      <td>{val.data.stopId}</td>
                      <td>{val.data.stopName}</td>
                      <td>{val.data.stopAddress}</td>
                      <td>{val.data.stopCoordinates.latitude}</td>
                      <td>{val.data.stopCoordinates.longitude}</td>
                      <td>
                        <button
                          onClick={() => {
                            setModalType('edit');
                            setShowModal(true);
                            setSelectedItem(val);
                            setAddStop({
                              // distance: val.data.distance,
                              stopAddress: val.data.stopAddress,
                              stopCoordinates: { longitude: val.data.stopCoordinates.longitude, latitude: val.data.stopCoordinates.latitude },
                              stopId: val.data.stopId,
                              stopName: val.data.stopName,
                              // tta: val.data.tta
                            })
                            setIdDisabled(true);
                          }}
                          className="ebtn">
                          <AiFillEdit.AiFillEdit />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            console.log("Selected Item", val);
                            setSelectedItem(val);
                            setShowSureModal(true);
                          }}
                          className="dbtn">
                          <AiFillDelete.AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          }

        </div>


        {/* Modal */}
        {showModal && (
          <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header
                style={{ backgroundColor: '#8624DB' }}
                class="modal-card-head">
                <p style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "x-large"
                }} class="modal-card-title">Add/Edit Bus</p>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setAddStop({
                      // distance: "",
                      stopAddress: "",
                      stopCoordinates: { longitude: "", latitude: "" },
                      stopId: "",
                      stopName: "",
                      // tta: ""
                    })
                  }}
                  class="delete"
                  aria-label="close"></button>
              </header>
              <section class="modal-card-body">
                <div class="field">
                  <label class="label">Stop ID</label>
                  <div class="control">
                    <input
                      value={addStop.stopId}
                      class="input"
                      type="number"
                      required
                      name="sid"
                      placeholder="Stop ID"
                      onChange={(event) => {
                        setAddStop({
                          ...addStop,
                          stopId: event.target.value
                        })
                      }}
                      disabled={idDisabled}
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Stop Name</label>
                  <div class="control">
                    <input
                      value={addStop.stopName}
                      class="input"
                      type="text"
                      required
                      onChange={(event) => {
                        setAddStop({
                          ...addStop,
                          stopName: event.target.value
                        })
                      }}
                      name="sname"
                      placeholder="Stop Name"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Stop Address</label>
                  <div class="control">
                    <input
                      value={addStop.stopAddress}
                      class="input"
                      type="text"
                      onChange={(event) => {
                        setAddStop({
                          ...addStop,
                          stopAddress: event.target.value
                        })
                      }}
                      required
                      name="saddress"
                      placeholder="Number"
                    />
                  </div>
                </div>
                <div class="field">
                  {/* <label class="label">Stop Distance</label>
                  <div class="control">
                    <input
                      value={addStop.distance}
                      class="input"
                      type="text"
                      onChange={(event) => {
                        setAddStop({
                          ...addStop,
                          distance: event.target.value
                        })
                      }}
                      required
                      name="distance"
                      placeholder="Stop Distance"
                    />
                  </div>

                  <div class="field">
                    <label class="label">Stop TTA</label>
                    <div class="control">
                      <input
                        value={addStop?.tta}
                        class="input"
                        type="text"
                        required
                        onChange={(event) => {
                          setAddStop({
                            ...addStop,
                            tta: event.target.value
                          })
                        }}
                        name="tta"
                        placeholder="Stop TTa"
                      />
                    </div>
                  </div> */}

                  <div class="field">
                    <label class="label">Stop Latitude</label>
                    <div class="control">
                      <input
                        value={addStop?.stopCoordinates.latitude}
                        class="input"
                        type="number"
                        required
                        onChange={(event) => {
                          setAddStop({
                            ...addStop,
                            stopCoordinates: {
                              // longitude: parseInt(addStop.stopCoordinates.longitude),
                              ...addStop.stopCoordinates,
                              latitude: parseFloat(event.target.value)
                            }
                          })
                        }}
                        name="latitude"
                        placeholder="Stop Latitude"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Stop Longitude</label>
                    <div class="control">
                      <input
                        value={addStop?.stopCoordinates.longitude}
                        class="input"
                        type="number"
                        onChange={(event) => {
                          setAddStop({
                            ...addStop,
                            stopCoordinates: {
                              // latitude: parseInt(addStop.stopCoordinates.latitude)
                              ...addStop.stopCoordinates,
                              longitude: parseFloat(event.target.value)
                            }
                          })
                        }}
                        required
                        name="longitude"
                        placeholder="Stop Longitude"
                      />
                    </div>
                  </div>
                </div>
              </section>
              <footer class="modal-card-foot">
                <button
                  disabled={addStop.stopAddress === "" || addStop.stopId === "" || addStop.stopCoordinates.latitude === "" || addStop.stopCoordinates.longitude === "" || addStop.stopName === ""}
                  onClick={() => {
                    if (modalType === "add") {
                      db.collection("stops").add(addStop)
                        .then(() => {
                          seterrorMessage("The Stop has been added successfully")
                          handleModal();
                          console.log("Stop Added Successfully!");
                          setAddStop({
                            // distance: "",
                            stopAddress: "",
                            stopCoordinates: { longitude: "", latitude: "" },
                            stopId: "",
                            stopName: "",
                            // tta: ""
                          })
                        })
                        .catch((error) => {
                          console.error("Error writing document: ", error);
                          seterrorMessage(error.message)
                          handleModal()
                        });
                      console.log("Add stop", addStop);
                    }
                    else {
                      console.log("Selected Item values", selectedItem);
                      console.log("Patched values", addStop);
                      db
                        .collection('stops')
                        .doc(selectedItem.uid)
                        .update(addStop)
                        .then(() => {
                          seterrorMessage("The Stop Information has been updated successfully")
                          handleModal();
                          console.log("The stop Information has been updated");
                        })
                        .catch(error => {
                          seterrorMessage(error.message)
                          handleModal();
                        })
                    }
                  }}
                  class="button is-success">
                  Save changes
                </button>
                <button onClick={() => {
                  setShowModal(false)
                  setAddStop({
                    // distance: "",
                    stopAddress: "",
                    stopCoordinates: { longitude: "", latitude: "" },
                    stopId: "",
                    stopName: "",
                    // tta: ""
                  })
                }} class="button">
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
                      console.log("The selected stop to be deleted is", selectedItem);
                      db
                        .collection('stops')
                        .doc(selectedItem.uid)
                        .delete()
                        .then(() => {
                          setShowSureModal(false);
                          console.log("Stop has been deleted successfully");
                          seterrorMessage("The Stop has been deleted successfully");
                          handleModal();
                          setSelectedItem({});
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
    </div >
  );
}

export default Stops;