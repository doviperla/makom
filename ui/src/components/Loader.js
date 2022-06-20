import React from 'react';
import { BallTriangle } from 'react-loader-spinner'

export class Loader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div style={{
            width: "100%",
            height: window.innerHeight + 'px',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <BallTriangle
                height="100"
                width="100"
                color='#283673'
                ariaLabel='loading'
            />
        </div>)
    }
}