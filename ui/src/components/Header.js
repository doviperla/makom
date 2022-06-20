import React from 'react';
import CENDEL_ICON from '../images/candle-icon.png';
import LOGO from '../images/makom_logo_small.jpg'
import {
    Image,
} from 'semantic-ui-react';
export class AppHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    retrun_sub_header = () => {
        if (!this.props.print_mode)
            return '';

        return (
            <h3 style={{ marginTop: '20px' }}> מפת מקומות {this.props.selected_time === 'kipur' ? ' יום כיפור' : ' ראש השנה'}
                &nbsp; {this.props.pepole_list_data.find(d => d.id === this.props.selected_year).name}
            </h3>
        )

    }

    render() {
        return (
            <section className='header-row'>
                <div style={{ flex: '15%' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginTop: '25px' }}>
                            <Image src={CENDEL_ICON} />
                        </div>
                        <div>
                            <span>לע"נ</span>
                            <br />
                            <span>אמי מורתי הצנועה והצדקנית</span>
                            <br />
                            <span>מרת שרה הענטשא פרלא ע"ה</span>
                            <br />
                            <span>נלב"ע טז כסלו תשפ"א</span>
                            <br />
                            <span>תנצב"ה</span>
                        </div>
                    </div>
                </div>
                <div style={{ flex: '75%', fontSize: 'xxx-large', margin: 'auto' }}>
                    {this.props.user ? this.props.user.account_name : ''}
                    {
                        this.retrun_sub_header()
                    }

                </div>
                <div style={{ flex: '10%' }}>
                    <Image style={{ margin: 'auto' }} src={LOGO}></Image>
                </div>
            </section >
        )
    }
}