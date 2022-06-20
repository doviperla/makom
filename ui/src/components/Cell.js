import React from 'react';

export class Cell extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: false,
            text: '',
            style: {}
        }
    }
    //this method tell to react if is need to rerandering the component
    //render only cells with text or selected changes
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.selected !== nextProps.selected) {
            this.setState({ selected: nextProps.selected });
            return true;
        }
        if ((this.state.text !== nextProps.text && nextProps.text !== '') || (this.state.text !== '' && nextProps.text === '')) {
            this.setState({ text: nextProps.text });
            return true;
        }
        if (JSON.stringify(this.state.style) !== JSON.stringify(nextProps.style)) {
            this.setState({ style: nextProps.style });
            return true;
        }
        return false
    }

    _on_key_down = (event) => {
        let text = this.state.text;
        if ((event.which >= 48 && event.which <= 57) || (event.which >= 65 && event.which <= 90)
            || (event.which >= 97 && event.which <= 122) || (event.which >= 128 && event.which <= 155) || event.which === 32) {
            text += event.key;
        }
        //enter
        if (event.which === 13) {
            text = text + '\n';
        }
        //backspace
        if (event.which === 8) {
            if (text.length >= 0) {
                text = text.slice(0, -1)
            }
        }
        return text
    }

    render() {
        let style = { ...this.state.style };
        if (this.state.selected) {
            style.border = '3px solid #4B89FF';
        }
        else {
            style.border = '1px solid #A5A5A5';
        }
        return (
            <div tabIndex="0"
                style={style}
                onMouseUp={this.props.onMouseUp}
                onMouseDown={() => {
                    // this.setState({ selected: true })
                    this.props.onMouseDown(this.props.cell_key)
                }}
                onMouseOver={this.props.onMouseOver}
                onMouseOut={this.props.onMouseOut}
                onKeyDown={event => {
                    const text = this._on_key_down(event);
                    this.props.onKeyDown(text)
                }}
            >
                {this.state.text}
                {/* {key} */}
            </div>
        )
    }
}