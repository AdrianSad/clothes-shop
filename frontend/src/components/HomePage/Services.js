import React, {Component} from 'react';
import styled from "styled-components";
import {FaDolly, FaRedo, FaDollarSign} from "react-icons/fa";

class Services extends Component {
    state={
        services: [
            {
                id: 1,
                icon: <FaDolly/>,
                title: 'free shipping',
                text: 'Free delivery on purchases over 100 PLN.'
            },
            {
                id: 2,
                icon: <FaRedo/>,
                title: '30 days return policy',
                text: 'The option of returning the goods without giving a reason.'
            },
            {
                id: 3,
                icon: <FaDollarSign/>,
                title: 'secured payment',
                text: '100% safety when buying.'
            }
        ]
    }
    render() {
        return (
            <ServicesWrapper className="py-5">
                <div className="container">
                    <div className="row">
                        {this.state.services.map(item => {
                            return (
                                    <div className="col-10 mx-auto col-sm-6 col-md-4 text-center my-3" key={item.id}>

                                        <div className="service-icon">
                                            {item.icon}
                                        </div>

                                        <div className="mt-3 text-capitalize">
                                            {item.title}
                                        </div>

                                        <div className="mt-3">
                                            <p>{item.text}</p>
                                        </div>

                                    </div>
                            )
                        })}
                    </div>
                </div>
            </ServicesWrapper>
        );
    }
}

export default Services;

const ServicesWrapper = styled.section`
background: rgba(253,197,115,0.5);
.service-icon {
font-size: 2.5rem;
color: var(--primaryColor);
}
p{
color: var(--darkGrey);
}
`;
