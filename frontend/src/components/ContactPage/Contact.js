import React from "react";
import Title from "../Title";
export default function Contact() {
    return (
        <section className="py-5">
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    
                    <Title title="contact us"/>

                    <form className="mt-5" action="https://formspree.io/mrgyozey" method="POST">

                        <div className="form-group">
                            <input type="text" className="form-control" name="firstName" placeholder="Jan Kowalski"/>
                        </div>

                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="email@example.com"/>
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" name="subject" placeholder="Message subject"/>
                        </div>

                        <div className="form-group">
                            <textarea rows="10" className="form-control" name="message" placeholder="Your message"/>
                        </div>

                        <div className="form-group mt-3">
                            <input type="submit" value="Send" className="form-control bg-primary text-white"/>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}