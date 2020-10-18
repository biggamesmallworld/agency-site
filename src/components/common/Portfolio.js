import React, {Component} from 'react';
import SinglePortfolio from './SinglePortfolio';

import img1 from '../assets/img/portfolio/01-thumbnail.jpg';
import img2 from '../assets/img/portfolio/02-thumbnail.jpg';
import img3 from '../assets/img/portfolio/03-thumbnail.jpg';
import img4 from '../assets/img/portfolio/04-thumbnail.jpg';
import img5 from '../assets/img/portfolio/05-thumbnail.jpg';
import img6 from '../assets/img/portfolio/06-thumbnail.jpg';

const portfolios = [
    {
        heading: 'Threads',
        subHeading: 'Illustration',
        thumbnail: img1
    },
    {
        heading: 'Explore',
        subHeading: 'Graphic Design',
        thumbnail: img2
    },
    {
        heading: 'Finish',
        subHeading: 'Identity',
        thumbnail: img3
    },
    {
        heading: 'Lines',
        subHeading: 'Branding',
        thumbnail: img4
    },
    {
        heading: 'Southwest',
        subHeading: 'Web Design',
        thumbnail: img5
    },
    {
        heading: 'Window',
        subHeading: 'Photography',
        thumbnail: img6
    }

];

class Portfolio extends Component {
    render() {
        return (
            <div>
                <section className="page-section bg-light" id="portfolio">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-heading text-uppercase">Portfolio</h2>
                            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                        </div>
                        <div className="row">
                            {portfolios.map((portfolio, index) => {
                                return <SinglePortfolio {...portfolio} key={index}/>;
                            })}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Portfolio;