import React from 'react';
import './input.scss';

type Props = {
    text: string;
    delay: number;
    active: boolean;
    finish: () => void;
    isGlitch: boolean;
};

type State = {
    display: string;
    index: number;
    timeout: number;
};

export class Input extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            display: " ",
            index: 0,
            timeout: 0,
        };
    };

    addChar = () => {
        const { text, delay, finish } = this.props;
        const { display, index } = this.state;

        if (index !== text.length) {
            this.setState({
                display: display + text[index],
                index: index + 1,
                timeout: window.setTimeout(this.addChar, delay),
            });
        } else {
            finish();
        }
    };

    componentDidMount() {
        const { active, delay } = this.props;
        if (active) {
            this.setState({
                display: "",
                timeout: window.setTimeout(this.addChar, delay),
            });
        }
    };

    componentDidUpdate(prevProps: Props) {
        const { active, delay } = this.props;
        if (prevProps.active !== active && active) {
            this.setState({
                display: "",
                timeout: window.setTimeout(this.addChar, delay),
            });
        }
    };

    componentWillUnmount() {
        const { timeout } = this.state;
        window.clearTimeout(timeout);
    };

    render() {
        const { isGlitch } = this.props;
        const { display } = this.state;
        let classes;
        if (isGlitch) {
            classes = "glitch";
        }
        return (
            <div className={classes} data-text={display}>{display}</div>
        );
    };
};
