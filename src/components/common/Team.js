import React, {Component} from 'react';
import SingleTeam from './SingleTeam';


import img1 from '../assets/img/team/1.jpg';
import img2 from '../assets/img/team/2.jpg';
import img3 from '../assets/img/team/3.jpg';

const members = [
    {
        name: "Kay Garland", 
        position: "Lead Designer", 
        thumbnail: img1
    },
    {
        name: "Larry Parker", 
        position: "Lead Marketer", 
        thumbnail: img2
    },
    {
        name: "Diana Petersen", 
        position: "Lead Developer", 
        thumbnail: img3
    }

];

class Team extends Component {
    render() {
        return (
            <div>
                <section className="page-section bg-light" id="team">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                        </div>
                        <div className="row">
                            {members.map((member, index) =>
                                <SingleTeam key={index} {...member} />
                            )}
                        </div>
                        <div className="row">
                            <div className="col-lg-8 mx-auto text-center"><p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p></div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Team;

