import React from 'react';
import axios from 'axios';
import { CURRENT_VERSION, API } from '../utils/constants';
import {
    Message,
    Label,
    Button,
    Icon,
    Container,
    Form,
    Image
} from 'semantic-ui-react';
import LOGO from '../images/makom_logo.jpg'

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: null,
            login_success: false
        };
    }

    componentDidMount() {

    }

    login = () => {
        this.setState({ error: null });
        if (!this.state.email || !this.state.password) {
            this.setState({ error: "חובה להזין מייל משתמש וסיסמה" });
            return
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            this.setState({ error: "אימייל לא תקין" });
            return
        }
        axios.post(`${API}auth/login`, { email: this.state.email, password: this.state.password })
            .then(response => {
                console.log(response);
                if (response.data) {
                    if (!response.data.success) {
                        this.setState({ error: response.data.error == "Auth Error" ? "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" : "משתמש לא קיים" })
                    }
                    else {
                        localStorage.setItem('user_data', JSON.stringify(response.data));
                        this.setState({ login_success: true });
                    }
                }
            })
            .catch(error => {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
                console.error('There was an error!', error);
            });
    };

    render() {
        const env = 'DEV';
        const versionLabel = `VER  ${CURRENT_VERSION} - ${env}`;
        const login_success = this.state.login_success;

        if (login_success)
            window.location.reload();
        return (
            <div style={{ backgroundColor: '#E8E8E8', height: '100%' }} >
                {/* <Label content={versionLabel} attached="top right" size={'large'} /> */}
                <Label attached="bottom right" size={'large'}>
                    Copyright
                    <Icon name={'copyright outline'} style={{ marginLeft: '5px', marginRight: '5px' }} />
                    {new Date().getFullYear()} Dovi Perla All Rights Reserved
                </Label>

                <Container textAlign={'center'} text>
                    <br />
                    <Image style={{ margin: 'auto' }} src={LOGO} rounded></Image>
                    <br />

                    <Form error={this.state.error != null}>
                        {/* <Image src={LOGO} centered inline circular /> */}
                        <Message floating>
                            <Form.Field>
                                <Form.Input
                                    placeholder="מייל"
                                    icon="user"
                                    iconPosition="left"
                                    onChange={(e, data) => {
                                        this.setState({ email: data.value.trim() });
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    type={'password'}
                                    placeholder="סיסמה"
                                    icon="lock"
                                    iconPosition="left"
                                    onChange={(e, data) => {
                                        this.setState({ password: data.value });
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button type="submit"
                                    color={'yellow'}
                                    content={"כניסה"}
                                    fluid
                                    size={'massive'}
                                    onClick={this.login}
                                />
                            </Form.Field>
                            {this.state.error != null &&
                                <Message
                                    error
                                    header=' שגיאה '
                                    content={this.state.error}
                                />
                            }
                        </Message>
                    </Form>
                </Container>
            </div>
        );
    }
}