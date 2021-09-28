import React from 'react';
import './info.scss';

type TabType = "schedule" | "faq" | "perks & prizes";

type Props = {
    active: boolean;
    hidePopup: () => void;
}

type State = {
    tab: TabType;
}

export class Info extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            tab: "schedule",
        };
    };

    renderTab() {
        const { tab } = this.state;
        if (tab === "schedule") {
            return (
                <>
                    <div className="content-title">schedule of events</div>
                    <div className="note">Note: all times in eastern time (EST)</div>
                    <div className="schedule">
                        <div className="day-events">
                            <div className="dow">Friday, October 1</div>
                            <div className="tod">Afternoon:</div>
                            <div className="entry">5:00 Opening ceremony</div>
                            <div className="entry">5:30 Team formation + hacking starts! Mentors available</div>
                            <div className="entry">6:00 Piada Catering</div>
                            <div className="entry">7:30 Tutorial / workshop</div>
                            <div className="tod">Night:</div>
                            <div className="entry">12:00-12:30 Midnight Starbucks</div>
                        </div>
                        <div className="day-events">
                            <div className="dow">Saturday, October 2</div>
                            <div className="tod">Morning:</div>
                            <div className="entry">9:00-10:00 Bruegger's Bagels & Starbucks</div>
                            <div className="entry">12:30 Chipotle</div>
                            <div className="tod">Afternoon:</div>
                            <div className="entry">6:00 Hacking ends!</div>
                            <div className="entry">7:30 Video submission deadline</div>
                            <div className="entry">8:00 Optional demo watch party</div>
                        </div>
                        <div className="day-events">
                            <div className="dow">Sunday, October 3</div>
                            <div className="tod">Afternoon:</div>
                            <div className="entry">3:00 Closing ceremony (virtual)</div>
                        </div>
                    </div>
                </>
            );
        } else if (tab === "faq") {
            return (
                <>
                    <div className="content-title">faq</div>
                    <div className="question">Q: What is HackCMU?</div>
                    <div className="answer">HackCMU is a 24-hour event where students from across campus come together to make something awesome — like an app, website or hardware hack.</div>
                    <div className="question">Q: Where will this be held?</div>
                    <div className="answer">Hacking will take place at Gates, with teams scattered across classrooms for distancing.</div>
                    <div className="question">Q: Who can attend?</div>
                    <div className="answer">Any student is welcome to apply. HackCMU is a beginner-focused hackathon, and preference will be given to first years. More experienced hackers are encouraged to sign up as mentors.</div>
                    <div className="question">Q: How much does this cost?</div>
                    <div className="answer">$0! We'll provide meals, snacks, drinks, and lots of swag, thanks to the support of our wonderful sponsors.</div>
                    <div className="question">Q: I’m not a “hacker”, can I still participate?</div>
                    <div className="answer">Students of all skill levels are encouraged to attend, even if you’ve never written a line of code! Creative individuals of all kinds are welcome to apply — such as designers, ECE majors, statistics, etc. The only requirement is your attitude to learn!</div>
                    <div className="question">Q: Are there teams? Do I need one to sign up!</div>
                    <div className="answer">Working as a team is highly encouraged, but not required. We'll be facilitating team-forming the day-of, so don't be discouraged if you don't have a team!</div>
                    <div className="question">Q: How big can a team be?</div>
                    <div className="answer">Up to 4 people.</div>
                    <div className="question">Q: What are the rules? Can I work on my project ahead of time?</div>
                    <div className="answer">All work must be original, and you are not permitted to start building or designing your project until the event. Brainstorming ideas and forming teams beforehand is fine, though.</div>
                    <div className="question">Q: Who runs this event?</div>
                    <div className="answer">You can learn more about us <a href="http://acmatcmu.com">over here.</a></div>
                    <div className="question">Q: Any other questions, comments, or concerns?</div>
                    <div className="answer">Email us at acm-exec[at]cs.cmu.edu.</div>
                </>
            );
        } else {
            return (
                <>
                    <div className="content-title">perks & prizes</div>
                    <div className="perks">
                        <div className="perk">
                            <div className="dow">Food & Swag</div>
                            <div className="entry">~ Friday, dinner: Piada </div>
                            <div className="entry">~ Friday, midnight: Starbucks</div>
                            <div className="entry">~ Saturday, breakfast: Bruegger's Bagels</div>
                            <div className="entry">~ Saturday, lunch: Chipotle</div>
                            <div className="entry">~ Hack-CMU T-shirts, stickers, blankets, waterbottles, maybe more idk</div>
                        </div>
                        <div className="perk">
                            <div className="dow">Raffle and Winning Prizes</div>
                            <div className="entry">~ Mechanical Keyboard</div>
                            <div className="entry">~ JBL Clip 4</div>
                            <div className="entry">~ Anker Soundcore 2</div>
                            <div className="entry">~ Backpack</div>
                            <div className="entry">~ Massive Plushie</div>
                        </div>
                        <div className="perk">
                            <div className="dow">Mentors</div>
                            <div className="entry">~ We will have experienced hackers signed up to camp out at Gates to help you!</div>
                        </div>
                        <div className="perk">
                            <div className="dow">Awards</div>
                            <div className="entry">~ 1st, 2nd, 3rd, Honorable Mentions overall</div>
                            <div className="entry">~ Sponsor-Specific Challenge Awards</div>
                        </div>
                    </div>
                </>
            );
        }
    };

    changeTab(newTab: TabType) {
        this.setState({ tab: newTab });
    };

    renderTabs() {
        let tabs: Array<TabType> = ["schedule", "faq", "perks & prizes"];
        let buttons = []
        for (let i = 0; i < tabs.length; i++) {
            let clickFn = () => this.changeTab(tabs[i]);
            let button = <div className="tab-button" onClick={clickFn}>{tabs[i]}</div>
            buttons.push(button);
        }
        return (
            <div className="tabs">{buttons}</div>
        );
    };

    render() {
        const { active, hidePopup } = this.props;
        if (active) {
            return (
                <div className="info">
                    <div className="info-container">
                        <a className="close-info" onClick={hidePopup} />
                        <div className="navbar">
                            {this.renderTabs()}
                        </div>
                        <div className="content">
                            {this.renderTab()}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };
};
