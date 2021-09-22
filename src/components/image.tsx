import React from 'react';

type Props = {
    minOpacity: number;
    maxOpacity: number;
    img_face: string;
    img_hack: string;
};

type State = {
    imageStatus: boolean;
    isDim: boolean;
    isAltImg: boolean,
    currFlicker: number;
    flickerDuration: Array<number>;
    timeout: number;
};

export class Image extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            imageStatus: false,
            isDim: true,
            isAltImg: true,
            currFlicker: 0,
            flickerDuration: [1.3, 0.1, 0.5, 0.15, 0.1, 0.4, 0.1],
            timeout: 0,
        }
    };

    flicker = () => {
        const { isDim, isAltImg, currFlicker, flickerDuration } = this.state;
        
        if (currFlicker < flickerDuration.length - 1) {
            this.setState({
                isDim: !isDim,
                isAltImg: !isAltImg,
            });

            let delay = flickerDuration[currFlicker + 1]
            this.setState({
                currFlicker: currFlicker + 1,
                timeout: window.setTimeout(this.flicker, delay * 1000),
            });

        } else {
            this.setState({
                isDim: false,
                isAltImg: !isAltImg,
            });

            let delay = 500 * (Math.floor(Math.random() * 1) + 4)
            if (!isAltImg) {
                delay = 300 * (Math.floor(Math.random() * 2) + 1)
            }
            this.setState({
                timeout: window.setTimeout(this.flicker, delay),
            });
        }
    };

    componentDidMount() {
        const { currFlicker, flickerDuration } = this.state;
        let delay = flickerDuration[currFlicker];
        this.setState({
            timeout: window.setTimeout(this.flicker, delay * 1000),
        });
    };

    componentWillUnmount() {
        const { timeout } = this.state;
        window.clearTimeout(timeout);
    };

    handleImageLoaded() {
        this.setState({ imageStatus: true });
    }
    
    handleImageErrored() {
        this.setState({ imageStatus: false });
    }

    render() {
        const { minOpacity, maxOpacity, img_hack, img_face } = this.props;
        const { imageStatus, isDim, isAltImg } = this.state;
        let opacity = maxOpacity;
        let img = img_hack;
        if (isDim) {
            opacity = minOpacity;
        }
        if (isAltImg) {
            img = img_face;
        }
        return (
            <img
                className="logo"
                src={img}
                alt={img}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
                style={{
                    opacity: opacity,
                    // display: (imageStatus ? undefined : "none"),
                }}
            />
        );
    };
};
