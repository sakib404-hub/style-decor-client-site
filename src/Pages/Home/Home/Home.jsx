import React from 'react';
import Slider from '../Slider/Slider';
import LatestServices from '../LatestServices/LatestServices';

const Home = () => {
    return (
        <div>
            <section>
                <Slider></Slider>
            </section>
            <section>
                <LatestServices></LatestServices>
            </section>
        </div>
    );
};

export default Home;