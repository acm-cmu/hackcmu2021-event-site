import React from 'react';
import classNames from 'classnames';
import './text.scss';

export type SizeType = "big" | "medium" | "small";
type Props = {
    size?: SizeType;
    link?: string;
    onClick?: () => void;
    className?: string;
};

export class Text extends React.Component<Props> {
    render() {
        const { size, link, onClick, className, children } = this.props;
        let classes = classNames("text", size);
        classes = classNames(classes, className);
        if (link || onClick) {
            classes = classNames(classes, "link");
        }

        let output = <div className={classes}>{children}</div>;
        if (link || onClick) {
            output = <a className={classes} href={link} onClick={onClick}>{output}</a>
        }
        return output;
    };
};
