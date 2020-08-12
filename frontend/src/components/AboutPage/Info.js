import React from 'react';
import Title from "../Title";
import aboutBG from "../../images/shoppingBG.jpg";

export default function Info() {

    return (
        <section className="py-5">
            <div className="container">
                <div className="row">

                    <div className="col-10 mx-auto col-md-6 my-3">
                        <img src={aboutBG} className="img-fluid img-thumbnail" alt="About us"
                        style={{background: "var(--darkGrey)"}}/>
                    </div>

                    <div className="col-10 mx-auto col-md-6 my-3">
                        <Title title="About Us"/>

                        <p className="text-lead text-muted my-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie lorem eu nisl euismod, eu mollis tortor pretium. Etiam urna quam, lacinia ac scelerisque nec, scelerisque sed mi. Donec convallis purus vel sapien lobortis mattis. Nam malesuada tincidunt blandit. Maecenas aliquam placerat ligula et ultrices. Vestibulum vitae faucibus diam. Integer ac arcu justo. Morbi neque orci, vehicula ac nulla ultrices, bibendum dictum augue. Vivamus blandit lobortis lectus vitae eleifend. Etiam ut pellentesque justo. Integer placerat nibh non felis porta faucibus.</p>

                        <button className="main-link" type="button" style={{marginTop: "2rem"}}>more info</button>
                    </div>

                </div>
            </div>
        </section>
    )
}