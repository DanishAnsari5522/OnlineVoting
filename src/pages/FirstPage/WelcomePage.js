
import React from 'react'
import './WelcomePage.css'
import Carousel from 'react-bootstrap/Carousel';
import evoting from '../../assets/evoting1.jpeg';
import GroupExample from './Cards';

const CarousalComp = () => {
    return (
        <Carousel variant="dark">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=First slide&bg=f5f5f5"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h5>First slide label</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Second slide&bg=eee"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h5>Second slide label</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Third slide&bg=e5e5e5"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h5>Third slide label</h5>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}


const Course = () => {
    return (
        <div id="course">
            <div class="flex justify-between px-10">
                <img src={evoting} alt="E-Voting" class="w-2/5 h-41 rounded-lg" />
                <div class="w-1/2">
                    <p>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
                    </p>
                </div>
            </div>
        </div>
    )
}


const Testimonial = () => {
    return (
        <div id="testimonial">
            <p class="mt-40">Testimonial</p>
            <div class="flex">
                <div >
                    <img src={evoting} alt="image" class="w-20 h-20 rounded-full" />
                </div>
                <div>
                    <img src={evoting} alt="image" class="w-20 h-20 rounded-full" />
                </div>
                <div>
                    <img src={evoting} alt="image" class="w-20 h-20 rounded-full" />
                </div> <div>
                    <img src={evoting} alt="image" class="w-20 h-20 rounded-full" />
                </div> <div>
                    <img src={evoting} alt="image" class="w-20 h-20 rounded-full" />
                </div>
            </div>
            <GroupExample />
        </div>
    )
}

const Event = () => {
    return (
        <div id="event">
            <p class="mt-40">Event</p>
        </div>
    )
}

const OurClient = () => {
    return (
        <div id="ourclient">
            <p class="mt-40">OurClient</p>
        </div>
    )
}



const WelcomePage = () => {
    return (
        <div>
            <CarousalComp />
            <Course />
            <Testimonial />
            <Event />
            <OurClient />
        </div>
    )
}

export default WelcomePage