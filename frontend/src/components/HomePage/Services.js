import React, {Component} from 'react';
import styled from "styled-components";
import {FaDolly, FaRedo, FaDollarSign} from "react-icons/fa";
import wave from "../../images/wave.svg";

class Services extends Component {
    state = {
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
                                <>

                                <div className="col-8 mx-auto col-sm-4 col-md-3 text-center my-3 card" key={item.id}>

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
                            </>
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
//background: rgba(253,197,115,0.5);
//background: linear-gradient(to top, rgba(255,0,0,0), rgb(255,200,130));
.service-icon {
font-size: 2.5rem;
color: var(--primaryColor);
}
p{
color: var(--darkGrey);
}

.card{
border-radius: 1rem;
box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.02),
  0 6.7px 5.3px rgba(0, 0, 0, 0.028),
  0 12.5px 10px rgba(0, 0, 0, 0.035),
  0 22.3px 17.9px rgba(0, 0, 0, 0.042),
  0 41.8px 33.4px rgba(0, 0, 0, 0.05),
  0 100px 80px rgba(0, 0, 0, 0.07)
;
padding: 1rem;
transition: var(--mainTransition);
}

.card:hover{
box-shadow:
  0 1.4px 2.2px rgba(0, 0, 0, 0.039),
  0 3.4px 5.3px rgba(0, 0, 0, 0.057),
  0 6.4px 10px rgba(0, 0, 0, 0.07),
  0 11.4px 17.9px rgba(0, 0, 0, 0.083),
  0 21.3px 33.4px rgba(0, 0, 0, 0.101),
  0 51px 80px rgba(0, 0, 0, 0.14)
;
}
`;
