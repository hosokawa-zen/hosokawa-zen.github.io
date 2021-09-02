import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js//bootstrap.bundle'

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import {firebase, firebaseDB, firebaseUsers} from "./firebase";
import {useState} from "react";

function App(props) {
    const [userInfo, setUserInfo] = useState(null);

    firebase.auth().onAuthStateChanged((user) => {
        if (user && !userInfo) {
            firebaseDB.collection(firebaseUsers).get()
                .then((snapshot) => {
                    snapshot.forEach(doc => {
                        const user_info = doc.data();
                        if (user_info._id === user.uid) {
                            setUserInfo(user_info);
                            console.log('userInfo',user_info);
                        }
                    });
                }).catch(e => {
                console.log(e)
            })
        } else if (userInfo && !user) {
            setUserInfo(null);
        }
    });

    return (
    <BrowserRouter>
      <Routes user={userInfo} />
    </BrowserRouter>
  );
}

export default App;
