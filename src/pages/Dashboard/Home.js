import React, { useState, useEffect } from "react";
// import "../pages/Tables/tablesyles.css";
// import Maps from "./Maps";
import "bulma/css/bulma.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// // import { GiBusStop } from "react-icons/gi";
// import { busStop } from './Icons'
// import * as GiIcons from "react-icons/gi";

import stops from "./Icons/stop.png"

import stop from "./Icons/busStop.jpg"
import user from "./Icons/user.png"


import { auth, db } from "../../firebase";

// import {
//   faBus,

//   faLocationDot,

//   faLocationPin,

//   faUser,

// } from "@fortawesome/free-solid-svg-icons";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
// } from "chart.js";
// import { Doughnut, Line } from "react-chartjs-2";
// import CircleLoader from "react-spinners/CircleLoader";


// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "",
//     },
//   },
// };

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const lineChartData = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [-62, -52, -12, 37, -32, 92, 62],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: [37, -32, 92, 62, -62, -52, -12],
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

function Home() {
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 3000)
  // }, [])
  const [userData, setUserData] = useState([]);
  const [stopsInfo, setStopsInfo] = useState([]);
  useEffect(() => {
    let tempUsers = [];
    db.collection('users').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = {
            uid: doc.id,
            data: doc.data()
          }
          tempUsers.push(obj)
          console.log("User: ", doc.id, ":", doc.data());
        })
        console.log("Data", tempUsers);
        setUserData(tempUsers)
      })
      .catch(error => {
        console.log("Error", error);
      })

    let tempStops = [];
    db.collection('stops').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = {
            uid: doc.id,
            data: doc.data(),
            coordinates: {
              lat: doc.data().stopCoordinates.latitude,
              lng: doc.data().stopCoordinates.longitude
            }
          }
          tempStops.push(obj)
          // console.log("User: ", doc.id, ":", doc.data());
        })
        console.log("Data", tempStops);
        setStopsInfo(tempStops)
      })
      .catch(error => {
        console.log("Error", error);
      })



  }, [])


  return (
    // <>
    //   {loading ?
    //     <CircleLoader className="loader" color={"#8624DB"} loading={loading} size={100} />

    //     :

    <div style={{ padding: "20px 20px", backgroundColor: "#F0F0F0" }}>
      <div className="hero is-fullscreen">
        <div className="columns">
          <div className="column is-half">
            <div className="card" style={{ borderRadius: 15 }}>
              <p className="card-header-title">Users</p>
              <div className="card-content">
                <div className="content has-text-centered">
                  {/* <FontAwesomeIcon icon={faUser} color="#000" size="5x" /> */}
                  <img src={user} style={{
                    height: 150,
                    width: 150
                  }} />
                  <div className="title is-1">{userData.length}</div>
                  <div className="subtitle">Total Users</div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="card " style={{ borderRadius: 15 }}>
              <p className="card-header-title">Stops</p>
              <div className="card-content has-text-centered">
                <div className="content">
                  {/* <FontAwesomeIcon icon={faLocationDot} color="#000" size="5x" /> */}
                  <img src={stop} style={{
                    height: 150,
                    width: 150
                  }} />
                  <div className="title is-1">{stopsInfo.length}</div>
                  <div className="subtitle">Total Stops</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="column is-full">
        <div className="card" style={{ borderRadius: 15 }}>
          <div className="card-content has-text-centered">
            <div className="content">
              <LoadScript googleMapsApiKey="AIzaSyCc-u9f8sMzo7ETUnr2LEWt47zC9hk-r4w">
                <GoogleMap mapContainerStyle={{
                  overflow: "hidden",
                  borderRadius: "2px",
                  height: "100vh",
                  width: "100%",
                  padding: "1px",
                  alignItem: "center",
                  justifyContnet: "center",
                }}
                  zoom={15}
                  center={{
                    lat: 33.660176,
                    lng: 73.027551,
                  }}>
                  {
                    stopsInfo.map((item) => {
                      return <Marker
                        key={item?.data?.stopName}
                        position={item?.coordinates}
                        icon={stops}
                      >
                      </Marker>

                    })
                  }
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="columns">
        <div className="column is-half">
          <div class="card mt-5" style={{ borderRadius: 15 }}>
            <div class="card-content has-text-centered">
              <div class="content">
                <Doughnut
                  style={{
                    // width:"400px",
                    height: "300px"
                  }}
                  options={{
                    maintainAspectRatio: false,
                  }}
                  data={data}
                />
              </div>

            </div>
          </div>
        </div>
        <div className="column is-half">
          <div class="card mt-5" style={{ borderRadius: 15 }}>
            <div class="card-content has-text-centered">
              <div class="content">
                <Line options={options} data={lineChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </div>

  );
}

export default Home;
