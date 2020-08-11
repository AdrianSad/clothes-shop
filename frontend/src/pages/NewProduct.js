import React, {Component} from 'react';
import styled from "styled-components";
import Title from "../components/Title";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import ReactTooltip from 'react-tooltip';
import {sizes} from "../context/sizes";
import {FaTimesCircle, FaSync, FaUpload, FaTrash} from "react-icons/all";
import ImageUploading from "react-images-uploading";
import {login, registerUser} from "../api/user";
import CheckButton from "react-validation/build/button";
import submitProduct from "../api/product";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vtitle = value => {
    if (value.length < 5 || value.length > 80) {
        return (
            <div className="alert alert-danger" role="alert">
                The title must be between 5 and 80 characters.
            </div>
        );
    }
};

const vdesc = value => {
    if (value.length !== 0 && (value.length < 10 || value.length > 500)) {
        return (
            <div className="alert alert-danger mt-3" role="alert">
                The description must be between 10 and 500 characters.
            </div>
        );
    }
};

class NewProduct extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeShipping = this.onChangeShipping.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChange = this.onChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            loading: false,
            successful: false,
            message: "",
            title: "",
            featured: false,
            description: "",
            size: "NONE",
            shipping: false,
            price: 0.00,
            images: []
        };
    }

    onChange = (imageList) => {
        // data for submit
        this.setState({
            images: imageList
        })
        console.log(imageList);
    };
    onError = (errors, files) => {
        console.log(errors, files);
    };

    onChangeSize(e) {
        this.setState({
            size: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeShipping() {
        this.setState({
            shipping: !this.state.shipping
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.form.validateAll();

        this.setState({
            message: "",
            successful: false,
            loading: true
        });

        if(this.state.images.length !== 0) {
            if (this.checkBtn.context._errors.length === 0) {

                let product = await submitProduct({
                    title: this.state.title,
                    price: this.state.price,
                    description: this.state.description,
                    size: this.state.size,
                    featured: this.state.featured,
                    freeShipping: this.state.shipping,
                    main_image: this.state.images[0].dataURL,
                    image2: this.state.images.length > 1 ? this.state.images[1].dataURL : null,
                    image3: this.state.images.length > 2 ? this.state.images[2].dataURL : null
                });

                if (product) {
                    this.setState({
                        message: "",
                        successful: true,
                        loading: false
                    });

                    this.props.history.push("/products");
                    window.location.reload();
                    return;
                } else {
                    this.setState({
                        message: "There was an error with your product. please try again!",
                        successful: false,
                        loading: false
                    });
                }
            }
        } else {
            this.setState({
                message: "You have to upload at least 1 image",
                successful: false,
                loading: false
            });
        }

    }

    render() {

        const maxNumber = 3;
        const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

        return (
            <FormWrapper>
                <div className="container">
                    <div className="col-12 mx-auto col-sm-12 col-md-10 col-lg-10">
                        <Title center={true} title="Add new product"/>
                        <Form className="mt-3 product-form" onSubmit={this.handleSubmit} ref={c => {
                            this.form = c;
                        }}>

                            <div className="form-container">
                                <div className="form-input"
                                     data-tip="Title should be as short as possible <br/> and remember to not overuse Capslock">
                                    <label htmlFor="title">
                                        title
                                    </label>
                                    <Input type="text" id="title"
                                           onChange={this.onChangeTitle} value={this.state.title}
                                           className="form-control" validations={[required, vtitle]}/>
                                    <ReactTooltip place="right" type="dark" effect="solid" multiline={true}/>
                                </div>

                                <div className="form-input"
                                     data-tip="Describe your product with <br/> a concise and accurate description">
                                    <label htmlFor="title">
                                        description
                                    </label>
                                    <textarea id="title" rows={5}
                                              onChange={this.onChangeDescription} value={this.state.description}
                                              className="form-control"/>

                                    {vdesc(this.state.description)}
                                    <ReactTooltip place="right" type="dark" effect="solid" multiline={true}/>
                                </div>
                            </div>

                            <div className="form-container">

                                <div className="form-input"
                                     data-tip="Check twice if size is correct">
                                    <label htmlFor="size">size</label>
                                    <select name="size"
                                            id="size"
                                            className="filter-item"
                                            onChange={this.onChangeSize}
                                            value={this.state.size}>
                                        {
                                            sizes.map((size, index) => {
                                                if (size !== "ALL") {
                                                    return <option key={index} value={size}>{size}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-checkbox"
                                     data-tip="Free shipping will surely <br/> encourage others to buy">
                                    <label htmlFor="freeShipping">free shipping
                                        <Input type="checkbox" id="freeShipping" name="freeShipping"
                                               onChange={this.onChangeShipping} checked={this.state.shipping && true}/>
                                    </label>
                                </div>

                            </div>

                            <div className="form-container">
                                <div className="form-input"
                                     data-tip="How much would you like <br/> to receive for the product?">
                                    <label htmlFor="price">
                                        price
                                    </label>
                                    <Input type="number" id="price"
                                           onChange={this.onChangePrice} value={this.state.price}
                                           className="form-control" validations={[required]}/>
                                    <ReactTooltip place="right" type="dark" effect="solid" multiline={true}/>
                                </div>

                                <div className="form-input"
                                     data-tip="Images should be of good quality and not blurred.<br/> First image is your main image.">
                                    <label htmlFor="images">
                                        images
                                    </label>
                                    <ImageUploading
                                        onChange={this.onChange}
                                        maxNumber={maxNumber}
                                        multiple
                                        maxFileSize={maxMbFileSize}
                                        acceptType={["jpg", "gif", "png"]}
                                        onError={this.onError}
                                    >
                                        {({imageList, onImageUpload, onImageRemoveAll}) => (
                                            // write your building UI
                                            <div>
                                                <button type="button" onClick={onImageUpload}>
                                                    <FaUpload class="btn-icon"/> Upload images
                                                </button>
                                                <button type="button" onClick={onImageRemoveAll}>
                                                    <FaTrash class="btn-icon"/>
                                                    Remove all images
                                                </button>
                                                <div>

                                                    {imageList.map((image) => (
                                                        <div className="img-container">

                                                            <div key={image.key}>
                                                                <img src={image.dataURL} key={image.key}/>
                                                                <div className="image-icons">
                                                                    <FaSync className="image-icon"
                                                                            onClick={image.onUpdate}/>
                                                                    <FaTimesCircle className="image-icon"
                                                                                   onClick={image.onRemove}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    </ImageUploading>
                                    <ReactTooltip place="right" type="dark" effect="solid" multiline={true}/>
                                </div>
                            </div>


                            <CheckButton
                                style={{display: "none"}}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />

                            <div className="row">

                                {
                                    this.state.message.length > 0 ?
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.message}
                                        </div>
                                        : null
                                }

                            </div>
                            <div className="row">
                                <button type="submit" className="main-link submit-link" disabled={this.state.loading}>
                                    {this.state.loading ? (
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : <span>submit</span>}

                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </FormWrapper>
        );
    }
}

const FormWrapper = styled.div`
padding: 10rem 2rem 2rem 2rem;
* {
  box-sizing: border-box;
}

.form-container{
  background: var(--mainWhite);
  border-radius: 1rem;
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.02),
  0 6.7px 5.3px rgba(0, 0, 0, 0.028),
  0 12.5px 10px rgba(0, 0, 0, 0.035),
  0 22.3px 17.9px rgba(0, 0, 0, 0.042),
  0 41.8px 33.4px rgba(0, 0, 0, 0.05),
  0 100px 80px rgba(0, 0, 0, 0.07);
  padding: 2rem;
  margin-top: 2rem;
}

.product-form input{
width: 100%;
margin-bottom: 1.25rem;
border: none;
border-bottom: 1px solid var(--primaryColor);
background: transparent;
outline: none;
}

.form-container button{
margin: 1rem 1rem 1rem 0rem;
padding: 0.5rem;
background: var(--mainWhite);
border: 2px solid var(--primaryColor);
color: var(--primaryColor);
}

.btn-icon{
margin-right: 0.5rem;
align-items: center;
}

.form-container button:hover{
background: var(--primaryColor);
color: var(--mainWhite);
}

.filter-item{
width: 100%;
margin-bottom: 1.25rem;
padding: 0.5rem;
}

.product-form label{
text-transform: capitalize;
}

.product-form img{
width: 200px;
height: 200px;
}

.form-input{
padding: 1rem 1rem;
 -webkit-animation: animatezoom 0.6s;
 animation: animatezoom 0.6s;
 
 .icon{
 transform: scale(4);
 }
}

.img-container{
position:relative;
display: inline-block;
padding: 0.5rem;
border: 2px solid var(--primaryColor);
margin: 1rem 1rem 1rem 1rem;
}

.form-checkbox{
margin-bottom: 1.25rem;
}

.form-checkbox label{
padding-left: 1rem;
position: relative;
}

.form-checkbox input{
margin-top: 0.5rem;
transform: scale(1.5);
}

.image-icons{
transition: var(--mainTransition);
position: absolute;
top: 50%;
left: 55%;
transform: translate(-50%, -50%);
opacity: 0;
}

.image-icon{
font-size: 2.5rem;
margin: 1rem;
padding: 0.5rem;
color: var(--primaryColor);
background: var(--mainBlack);
border-radius: 0.5rem;
}

.image-icon:hover{
cursor: pointer;
}

.img-container:hover .image-icons{
opacity: 1;
}

.submit-link{
text-align: center;
margin: 2rem auto;
}
`;

export default NewProduct;