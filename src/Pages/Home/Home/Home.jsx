import React from 'react';
import Slider from '../Slider/Slider';
import LatestServices from '../LatestServices/LatestServices';
import AreaOfCoverage from '../AreaOfCoverage/AreaOfCoverage';
import { useLoaderData } from 'react-router';

const Home = () => {
    const locations = useLoaderData();
    return (
        <div>
            <section>
                <Slider></Slider>
            </section>
            <section>
                <LatestServices></LatestServices>
            </section>
            <section>
                <AreaOfCoverage locations={locations
                }></AreaOfCoverage>
            </section>
        </div>
    );
};

export default Home;