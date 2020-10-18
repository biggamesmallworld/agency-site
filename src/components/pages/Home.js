import React, {Component} from 'react';
import Header from '../common/Header';
import Image from '../assets/img/header-bg.jpg';

//reusable components
import Services from '../common/Services';
import Portfolio from '../common/Portfolio';
import Team from '../common/Team';
import Timeline from '../common/Timeline';

class Home extends Component {
    render() {
        return(
            <div>
                <Header 
                    title="Welcome to our studio!"
                    subTitle="It's nice to meet you"
                    btnText="Tell me more"
                    link="/services"
                    showButton={true}
                    image={Image}
                />
                <Services />
                <Portfolio />
                <Timeline />
                <Team />
            </div>
        )
    }
}
export default Home;