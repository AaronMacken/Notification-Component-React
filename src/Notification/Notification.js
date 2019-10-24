import React, { Component, Fragment } from 'react'
import styled from "styled-components";

const Container = styled.div`
    background-color: #444;
    color: white;
    padding: 16px;
    position: absolute;
    top: ${props => props.top}px;
    right: 16px;
    z-index: 999;
    transition: top .5s ease;
    > i {
        margin-left: 8px;
    }
`;

const initialState = {
    top: -100
}

export default class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
        this.timeout = null;
    }

    onShow = () => {
        if(this.timeout) {
            clearTimeout(this.timeout);
            this.setState(initialState, () => {
                this.timeout = setTimeout(() => {
                    this.showNotification();
                }, 500)
            })
        } else {
            this.showNotification();
        }
    }

    // show notification function, passed into the button's on click prop
    // changes the state from -100(px) -> 16(px)
    // animates in via the Container (styled.div) component's transition css properties
    // setState is given a callback function
    // this callback function runs set time out (.. which takes another callback)
    // runs set state once more at end of timeout to set state to its initial value
    showNotification = () => {
        this.setState({
            top: 16
        }, () => {
           this.timeout = setTimeout(() => {
                this.setState(initialState)
            }, 3000)
        });
    }
    
    render() {
        return (
            // Destructured React.Fragment
            // Acts as an automated parent component creator to containing child elements
            <Fragment>
                <Container top={this.state.top}>Hi from myNotification<i>@</i></Container>

                <button onClick={this.onShow}>Click me</button>
            </Fragment>
            
        )
    }
}
