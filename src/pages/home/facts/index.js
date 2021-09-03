import React, { Component } from 'react';
import {firebaseDB, firebaseFacts} from '../../../firebase';
import { Tag, firebaseLooper, reverseArray } from '../../../components/misc';
import FactCounder from './FactCounder';


class Facts extends Component {

    state = {
        countDown: []
    }

    componentDidMount() {
        firebaseDB.collection(firebaseFacts).get().then(snapshot => {
            const facts = firebaseLooper(snapshot);
            this.setState({
                countDown: reverseArray(facts)
            })
        })
    }

    showCounter = () => (
        this.state.countDown.map( (item, i)=>{
            return <FactCounder
            key={i}
            name={item.title}
            end={item.counter}
            aosDelay={item.aosDelay}
            icon={item.icon}
            />
        } )
    )

    render() {
        return (
            <section id="facts" className="facts">
                <div className="container">
                    <Tag title="Facts" />

                    <div className="row no-gutters">
                        { this.showCounter() }
                    </div>
                </div>
            </section>
        );
    }
}

export default Facts;
