import React, {Component} from 'react';
import Header from '../common/Header';
import Image from '../assets/img/Bluebird.jpg';
import Timeline from '../common/Timeline';


class About extends Component {
    render() {
        return (
            <div>
                <Header 
                    title="About Us"
                    subTitle="It's really a great story"
                    showButton={false}
                    image={Image}
                />
                <Timeline />
            </div>
        )
    }
}

export default About;