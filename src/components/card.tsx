import React from 'react';

import classNames from 'classnames';

import { Image } from './image';
import { Sponsors } from './sponsors';
import { Input } from './input';
import { Info } from './info';
import { SizeType, Text } from './text';

import png_face from '../logoface.png';
import png_hack from '../logohack.png';
import './card.scss';

type Line = {
    size: SizeType;
    content: string;
    delay: number;
    isGlitched: boolean;
    link?: string;
    onClick?: () => void;
    className?: string;
};

type Props = {
    delay: number;
};

type State = {
    imgmain: string;
    imgalt: string;
    imgThreshold: number;
    currActive: number;
    lines: Array<Line>;
    timeout: number;
    overlay: boolean;
};

export class Card extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            imgmain: png_hack,
            imgalt: png_face,
            imgThreshold: 1,
            currActive: 0,
            lines: [
                {
                    size: "medium",
                    delay: 65,
                    content: "welcome to...",
                    isGlitched: false,
                },
                {
                    size: "big",
                    delay: 75,
                    content: "hackCMU",
                    isGlitched: true,
                },
                {
                    size: "medium",
                    delay: 10,
                    content: "2021 edition, brought to you by ACM@CMU",
                    isGlitched: false,
                    className: "acm-msg",
                },
                {
                    size: "small",
                    delay: 10,
                    content: "with support from ScottyLabs",
                    link: "https://scottylabs.org/",
                    isGlitched: false,
                    className: "scotty-msg",
                },
                {
                    size: "small",
                    delay: 7,
                    content: "location: Gates Building - food and swag will be provided!",
                    isGlitched: false,
                },
                {
                    size: "small",
                    delay: 7,
                    content: "start: friday, october 1, 5:00 pm",
                    isGlitched: false,
                },
                {
                    size: "small",
                    delay: 7,
                    content: "end: saturday, october 2, 8:00 pm",
                    isGlitched: false,
                },
                {
                    size: "small",
                    delay: 7,
                    content: "> ready? click here to register",
                    isGlitched: false,
                    link: "https://forms.gle/QF1enymZdbpKmjhq5",
                    className: "wide-top",
                },
                {
                    size: "small",
                    delay: 7,
                    content: "> click here to register as a mentor instead",
                    isGlitched: false,
                    link: "https://forms.gle/16PJ3wgEhuZzqeDj9",
                },
                {
                    size: "small",
                    delay: 7,
                    content: "> not ready yet? click here for more info",
                    isGlitched: false,
                    onClick: this.showPopup,
                }
            ],
            timeout: 0,
            overlay: false,
        };
    };

    showPopup = () => {
        this.setState({ overlay: true });
    };

    hidePopup = () => {
        this.setState({ overlay: false });
    }

    onFinish = () => {
        const { delay } = this.props;
        const { currActive } = this.state;
        this.setState({
            timeout: window.setTimeout(() => {
                this.setState({ currActive: currActive + 1 })
            }, delay),
        });
    };

    componentWillUnmount() {
        const { timeout } = this.state;
        window.clearTimeout(timeout);
    };

    renderRight() {
        const { currActive, lines } = this.state;
        let output = [];

        for (let i = 0; i < lines.length; i++) {
            const { size, content, delay, isGlitched, link, onClick, className } = lines[i];
            let text = (
                <Text size={size} className={className} link={link} onClick={onClick} key={i}>
                    <Input
                        text={content}
                        delay={delay}
                        active={i <= currActive}
                        finish={this.onFinish}
                        isGlitch={isGlitched}
                    />
                </Text>
            )
            output.push(text);
        }
        return output;
    };

    render() {
        const { overlay, imgalt, imgmain} = this.state;
        let cardClasses = "card"
        if (overlay) {
            cardClasses = classNames(cardClasses, "blur");
        }
        return (
            <>
                <Info active={overlay} hidePopup={this.hidePopup} />
                <div className={cardClasses}>
                    <div className="left"><Image minOpacity={0.2} maxOpacity={1} img_face={imgalt} img_hack={imgmain} /></div>
                    <div className="right">{this.renderRight()}</div>
                </div>
                <Sponsors delay={10}/>
            </>
        );
    };
};
