import React from 'react';
import _ from 'lodash'
import axios from 'axios';
import { API, HEADERS, EMPTY_PERSON } from '../utils/constants';
import {
    Segment,
    Table,
    Image,
    Button,
    Icon,
    Pagination,
    Dropdown,
    Menu,
    Popup,
    Search,
    Form,
    Input,
    Modal,
    Message,
    Dimmer,
    Loader,
    List
} from 'semantic-ui-react';
import ContentEditable from 'react-contenteditable'
import { CSVLink } from "react-csv";
import CSVReader from 'react-csv-reader';
import { Route } from 'react-router-dom';
import CENDEL_ICON from '../images/candle-icon.png';
import LOGO from '../images/makom_logo_small.jpg';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { get_pepole_data, get_pepole_lists, update_list, delete_row, add_new_list, delete_list, change_name_list } from '../services/lists.service';

let search_timeout;

export class ListPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pepole: [],
            isLoading: true,
            error: null,
            itemsPerPage: 10,
            pageData: [],
            currentPage: 1,
            totalPages: 1,
            user: '',
            token: null,
            contextMenuOpen: false,
            selectedRow: null,
            contextRef: null,
            addRow: false,
            search_loading: false,
            search_value: '',
            search_results: [],
            sort_coulmn: null,
            sort_direction: null,
            openExportModal: false,
            exportData: [],
            exportFileName: '',
            importFileName: '',
            account_name: '',
            account_logo: '',
            account_id: null,
            pepole_lists_options: [],
            pepole_list_selected: null,
            openDeleteModel: false,
            new_list_name: "",
            errorList: [],
            openNewNameModel: false,
            success: null
        };
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        try {
            let user = localStorage.getItem('user_data');

            user = JSON.parse(user).user;

            this.setState({
                user: `${user.firstName} - ${user.lastName}`,
                token: user.token, account_name: user.account_name, account_logo: user.account_logo,
                account_id: user.account_id,
            }, () => {
                this.refresh();
            })
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
            console.error('There was an error!', error);
        }
    }

    refresh = async () => {
        try {
            const response = await get_pepole_lists(this.state.token);

            if (response.data.success) {
                const pepole_lists = response.data.pepole_lists;

                let pepole_lists_options = pepole_lists.map(p => {
                    return {
                        key: p.id,
                        text: p.name,
                        value: p.id
                    }
                })

                this.setState({
                    pepole_lists_options: pepole_lists_options, pepole_list_selected: null,
                    pepole: [...[EMPTY_PERSON]], pageData: [...[EMPTY_PERSON]], isLoading: false
                })
                console.log(this.state.pageData)
            }
            else
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
            console.error('There was an error!', error);
        }
    }

    newRow = () => {
        let row = {};
        const rowKeys = Object.keys(this.state.pepole[0]);
        rowKeys.forEach(prop => {
            row[prop] = '';
        });
        row.id = new Date().getDate();
        row.added = true;

        row.pepole_list_id = this.state.pepole_list_selected?.key;
        return row;
    }

    handleContentEditable = event => {
        const value = event.target.value;
        const column = event.currentTarget.dataset.column;
        const row = event.currentTarget.dataset.row;
        const added = event.currentTarget.dataset.new_row === 'true';

        let { pageData } = this.state;

        if (added === false) {
            let updatedRow = pageData.find((item, i) => item.id === row);
            updatedRow[column] = value;
            updatedRow.changed = true;
        }
        else {
            pageData[0][column] = value;
        }
        this.setState({
            pageData: pageData
        })
    }

    downloadCsv = () => {
        let data = [];
        data.push(HEADERS.map(h => h.title));
        const pepole = this.state.pepole;

        for (let p of pepole) {
            let arr = [];
            for (let index = 0; index < HEADERS.length; index++) {
                const header = HEADERS[index];
                arr.push(p[header.key]);
            }
            // for (let key in p) {
            //     if (key != 'id' && key != 'changed' && key != 'pepole_list_id')
            //         arr.push(p[key]);
            // }
            data.push(arr);
        }
        this.setState({ exportData: data, openExportModal: true })
    }

    validate = (changesList, index) => {
        this.setState({ errorList: [] })
        const required_feild = ["first_name", "last_name"];

        let errorList = [];
        let isNotNumber;
        let isValidate = true;

        for (const element of changesList) {
            for (const header of HEADERS) {
                if (header.type === "number") {
                    isNotNumber = isNaN(element[header.key]);
                    if (isNotNumber && element[header.key] != '') {
                        isValidate = false;
                        errorList.push(`חובה להזין מספרים בלבד בשדה "${header.title}"`)

                    }
                }
                if (required_feild.includes(header.key)) {
                    if (!element[header.key]) {
                        isValidate = false;
                        errorList.push(`חובה להזין ערך בשדה "${header.title}"`)
                    }
                }
            }
            if (!element["mens_rosh_ashana"] && !element["womens_rosh_ashana"] && !element["mens_kipur"] && !element["womens_kipur"]) {
                isValidate = false;
                errorList.push(`חובה להזין ערך בלפחות אחד משדות המקומות`)
            }
            if ((element["womens_rosh_ashana"] || element["womens_kipur"]) && !element["wife_name"]) {
                isValidate = false;
                errorList.push(`חובה להזין את שם האישה`)
            }
        }
        if (index)
            errorList.unshift(`שורה ${index}`)
        this.setState({ errorList: errorList })
        return isValidate;
    }

    saveChanges = async () => {
        try {
            const changesList = this.state.pageData.filter(p => p.changed || p.added);
            const validation = this.validate(changesList);
            if (validation) {
                //if is new list open model to recuve name
                if (!this.state.pepole_list_selected) {
                    this.setState({ openNewNameModel: true });
                    return
                }
                const response = await update_list(this.state.token, changesList)
                if (response.data.success) {
                    //update pepole list
                    let pepole = this.state.pepole;
                    changesList.forEach(element => {
                        if (element.changed) {
                            const index = _.findIndex(pepole, { id: element.id });
                            pepole.splice(index, 1, element);
                        }
                        else {
                            pepole.push(element);
                        }
                    });
                    const totalPages = parseInt(pepole.length / this.state.itemsPerPage);

                    this.setState({
                        pepole: pepole, pageData: pepole.slice(0, this.state.itemsPerPage),
                        totalPages: totalPages, currentPage: 1, success: true
                    })
                    setTimeout(() => {
                        this.setState({ success: null })
                    }, 3000)
                }
                else {
                    this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
                    console.error('There was an error!', response.data.error);
                }
            }
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
            console.error('There was an error!', error);
        };
    }


    deleteRow = async () => {
        try {
            const response = await delete_row(this.state.token, this.state.selectedRow)

            if (response.data.success) {
                this.setState({
                    contextMenuOpen: false,
                    pepole: this.state.pepole.filter(item => item.id != this.state.selectedRow),
                    pageData: this.state.pageData.filter(item => item.id != this.state.selectedRow)
                });
            }
            else {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
            }
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
            console.error('There was an error!', error);
        }
    }

    createContextFromEvent = (e) => {
        const left = e.clientX
        const top = e.clientY
        const right = left + 1
        const bottom = top + 1

        return {
            getBoundingClientRect: () => ({
                left,
                top,
                right,
                bottom,

                height: 0,
                width: 0,
            }),
        }
    }

    switchPage = (event, data) => {
        const pepole = this.state.pepole;
        const start = (this.state.itemsPerPage * (data.activePage - 1));
        const end = this.state.itemsPerPage * data.activePage;
        const pageData = pepole.slice(start, end);

        this.setState({ pageData: pageData, currentPage: data.activePage });
    }

    updateItemsPerPage = (event, data) => {
        const itemsPerPage = data.value;
        const pepole = this.state.pepole;
        const totalPages = parseInt(pepole.length / itemsPerPage);
        const pageData = pepole.slice(0, itemsPerPage);

        this.setState({ itemsPerPage: itemsPerPage, totalPages: totalPages, pageData, pageData, currentPage: 1 })
    }

    signOut = () => {
        axios.get(`${API}auth/logout`)
            .then(response => {
                if (response.data) {
                    localStorage.removeItem('user_data');
                    window.location.reload();
                }
            })
            .catch(error => {
                this.setState({ error: error.response });
                console.error('There was an error!', error);
            });
    }

    addRow = () => {
        let pageData = this.state.pageData;
        if (this.validate(pageData)) {
            const newRow = this.newRow();
            pageData.splice(0, 0, newRow);
            this.setState({ pageData: pageData});
        }
    }

    handleSearchChange = (e, data) => {
        //clearTimeout(search_timeout);
        //this.setState({ search_loading: true, search_value: data.value })

        //search_timeout = setTimeout(() => {
        if (data.value.length === 0) {
            const pepole = this.state.pepole;
            this.setState({
                pageData: pepole.slice(0, this.state.itemsPerPage),
                currentPage: 1,
            })
            return
        }

        const re = new RegExp(_.escapeRegExp(data.value), 'i')
        const isMatch = (result) => re.test(result.last_name) || re.test(result.first_name)
        const pepole = _.filter(this.state.pepole, isMatch);
        const totalPages = parseInt(pepole.length / this.state.itemsPerPage);
        this.setState({ pageData: pepole, totalPages: totalPages })
        // }, 300)
    };

    importFile = async (data, fileInfo) => {
        try {
            this.setState({ error: null, isLoading: true })

            let uploadError = "";
            console.log(fileInfo.type)
            // if (fileInfo.type != "application/vnd.ms-excel")
            //     uploadError = "סוג הקובץ אינו נתמך"

            // if (data.length > 0) {
            //     for (let header of HEADERS) {
            //         const headerFind = data[0].find((d) => d.replace('"', '') === header.title.replace('"', ''));
            //         if (!headerFind) {
            //             uploadError += `הכותרת "${header.title}" אינה קיימת`
            //         }
            //     }
            // }


            // if (uploadError === "") {
            const pepole_list_id = new Date().getTime()
            const pepole_list = {
                id: pepole_list_id,
                name: fileInfo.name.split('.')[0], account_id: this.state.account_id
            }

            let pepole_list_data = [];

            for (let index = 1; index < data.length; index++) {
                const element = data[index];

                let pepole_row = {};
                pepole_row.id = new Date().getTime() + index;

                pepole_row.pepole_list_id = pepole_list_id;
                for (let header_index = 0; header_index < HEADERS.length; header_index++) {

                    const header = HEADERS[header_index];
                    if (header.key === 'amount_per_place') {
                        console.log('t')
                    }
                    if (header.type === "number" && element[header_index] != "")
                        pepole_row[header.key] = parseInt(element[header_index]);
                    else
                        pepole_row[header.key] = element[header_index];
                }
                if (this.validate([pepole_row], index))
                    pepole_list_data.push(pepole_row);
                else {
                    this.setState({ isLoading: false })
                    return
                }
            }

            const response = await add_new_list(this.state.token, pepole_list, pepole_list_data);
            if (response.data.success) {
                window.location.reload();
            }
            else {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                console.error('There was an error!', response.data.error);
            }
            // }
            // else {
            //     this.setState({ error: uploadError, isLoading: false });
            //     toast({
            //         type: 'error',
            //         title: 'שגיאה',
            //         description: uploadError,
            //         time: 5000,
            //     });
            // }
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
            console.error('There was an error!', error);
        }
    }

    deleteList = async () => {
        try {
            this.setState({ error: null, isLoading: true, openDeleteModel: false })
            const response = await delete_list(this.state.token, this.state.pepole_list_selected.key);
            if (response.data.success) {
                this.setState({ success: true });
                await this.refresh();
                setTimeout(() => {
                    this.setState({ success: null })
                }, 3000)
            }
            else {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                console.error('There was an error!', response.data.error);
            }
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
            console.error('There was an error!', error);
        }
    }

    changeListName = async () => {
        try {
            this.setState({ error: null, isLoading: true, openChangeNameModel: false })
            const response = await change_name_list(this.state.token, this.state.pepole_list_selected.key, this.state.new_list_name);
            if (response.data.success) {
                const new_pepole_list_selected = {
                    key: this.state.pepole_list_selected.key,
                    text: this.state.new_list_name,
                    value: this.state.pepole_list_selected.value
                }

                let pepole_lists_options = this.state.pepole_lists_options;
                const index = _.findIndex(pepole_lists_options, { key: new_pepole_list_selected.key });
                pepole_lists_options.splice(index, 1, new_pepole_list_selected);
                pepole_lists_options = JSON.stringify(pepole_lists_options);

                this.setState({
                    pepole_list_selected: new_pepole_list_selected,
                    pepole_lists_options: JSON.parse(pepole_lists_options),
                    isLoading: false
                })
            }
            else {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                console.error('There was an error!', response.data.error);
            }
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
            console.error('There was an error!', error);
        }
    }

    changePepoleList = async (e, data) => {
        try {
            this.setState({ error: null, isLoading: true })
            console.log('t')
            const response = await get_pepole_data(this.state.token, data.value);

            if (response.data.success) {
                const pepole = response.data.pepole_data;
                const totalPages = parseInt(pepole.length / this.state.itemsPerPage);

                const selectedPepoleList = this.state.pepole_lists_options.find((list) => list.key === data.value);
                this.setState({
                    pepole: pepole, pageData: pepole.slice(0, this.state.itemsPerPage),
                    totalPages: totalPages, pepole_list_selected: selectedPepoleList, isLoading: false
                })
            }
            else
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
            console.error('There was an error!', error);
        }
    }

    render() {
        const pepole = this.state.pepole;
        const pageData = this.state.pageData;
        const headers = HEADERS;
        const rowKeys = pepole.length > 0 ? Object.keys(pepole[0]) : [];
        const totalPages = this.state.totalPages;
        let hedear = this.state.account_name;
        let pepole_list_selected_name = this.state.pepole_list_selected ? this.state.pepole_list_selected.text : ""

        return (
            <div dir="rtl">
                <Dimmer active={this.state.isLoading}>
                    <Loader size="large">נא המתן...</Loader>
                </Dimmer>
                {/* <SemanticToastContainer position="top-left" /> */}
                <section className='header-row'>
                    <div style={{ flex: '30%' }}>
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
                    <div style={{ flex: '60%', fontSize: 'xxx-large', margin: 'auto' }}>
                        {this.state.account_name}
                    </div>
                    <div style={{ flex: '10%' }}>
                        <Image style={{ margin: 'auto' }} src={LOGO}></Image>
                    </div>
                </section >
                <section className="functions-row">
                    <div style={{ display: 'flex' }}>
                        <div className="search">
                            <Input icon='search' iconPosition='left' placeholder='חיפוש'
                                onChange={this.handleSearchChange}></Input>
                        </div>
                        {/* <div className="search">
                            <Search
                                title={''}
                                loading={this.state.search_loading}
                                onSearchChange={this.handleSearchChange}
                                results={[{ first_name: 'tal', last_name: 'per' }]}
                                value={this.state.search_value}
                                resultRenderer={(props) => {
                                    console.log(props)
                                    return `${props.first_name} ${props.last_name}`
                                }}
                                placeholder={"חיפוש לפי שם "}
                                onResultSelect={(e, data) => {
                                    console.log('tlllal');
                                    const selected = this.state.pepole.find((row) => row.id === data.result.id);
                                    console.log(selected)
                                    this.setState({ pageData: [selected], currentPage: 1 });
                                }}
                            />
                        </div> */}
                        <div className="pepole-list-ddl">
                            <Dropdown placeholder="בחר רשימה"
                                selection
                                options={this.state.pepole_lists_options}
                                value={this.state.pepole_list_selected?.value}
                                onChange={this.changePepoleList}
                            />
                        </div>
                    </div>

                    <div className="bottuns-row">
                        {this.state.pageData.length > 0 &&
                            <Button onClick={this.addRow} style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                            >
                                הוספת שורה
                                <Icon name='add' />
                            </Button>
                        }
                        {this.state.pageData.length > 0 &&
                            <Button onClick={this.downloadCsv} style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                            >
                                הוצא לקובץ
                                <Icon name='file excel outline' />
                            </Button>
                        }
                        {/* <Button style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                        >
                            <CSVReader onFileLoaded={this.importFile} inputId="file" inputName="file" cssInputClass="inputfile" />
                            <label className="inputlabel" htmlFor="file">טען קובץ</label>
                            <Icon name='file excel outline' />
                        </Button> */}
                        {this.state.pepole_list_selected &&
                            <Button onClick={() => { this.setState({ openDeleteModel: true }) }} style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                            >
                                מחק רשימה
                                <Icon name='file excel outline' />
                            </Button>
                        }
                        {this.state.pepole_list_selected &&
                            <Button onClick={() => { this.setState({ openChangeNameModel: true }) }} style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                            >
                                שנה שם רשימה
                                <Icon name='file excel outline' />
                            </Button>
                        }
                        {this.state.pageData.filter(p => p.changed || p.added).length > 0 &&
                            <Button onClick={() => this.saveChanges()} style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                            >
                                שמירה
                                <Icon name='save outline' />
                            </Button>
                        }

                        <Route render={({ history }) => (
                            <Button onClick={() => {
                                history.push('/')
                            }} style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                            >
                                מעבר למפה
                                <Icon name='map' />
                            </Button>
                        )} />

                        <Button onClick={this.signOut} style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                        >
                            יציאה
                            <Icon name='sign-out' />
                        </Button>

                    </div>

                </section>
                {this.state.pageData.length > 0 &&
                    <section>
                        <div>
                            <Segment basic style={{ overflow: 'auto', maxHeight: '65vh' }}>
                                {this.state.success != null &&
                                    <Message
                                        positive
                                        content={'הפעולה בוצעה בהצלחה'}
                                    />
                                }
                                {this.state.error != null &&
                                    <Message
                                        error
                                        header=' שגיאה '
                                        content={this.state.error}
                                    />
                                }
                                {this.state.errorList.length > 0 &&
                                    <Message error>
                                        <ul>
                                            {
                                                this.state.errorList.map(error => {
                                                    return (
                                                        <li>
                                                            {error}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </Message>
                                }
                                {/* {this.state.search_results.length > 0 &&
                                    < List divided relaxed>
                                        {
                                            this.state.search_results.map(r =>
                                                <List.Item>
                                                    {`${r.name} : ${r.value}`}
                                                </List.Item>
                                            )
                                        }
                                    </List>
                                } */}

                                <Table className="pepole-table" align='left' style={{
                                    width: this.state.search_value === '' ? '100%' : '85%'
                                }}
                                    celled
                                    selectable
                                    striped
                                    singleLine
                                    sortable
                                >
                                    <Table.Header>
                                        <Table.Row>
                                            {headers.map((header, i) => {
                                                return (
                                                    <Table.HeaderCell key={i}
                                                        sorted={this.state.sort_coulmn === header.key ? this.state.sort_direction : null}
                                                        onClick={() => {
                                                            if (this.state.sort_coulmn === header.key) {
                                                                const pepole = this.state.pepole.slice().reverse()

                                                                this.setState({
                                                                    sort_direction: this.state.sort_direction === 'ascending' ? 'descending' : 'ascending',
                                                                    pepole: pepole,
                                                                    pageData: pepole.slice(0, this.state.itemsPerPage),
                                                                    currentPage: 1
                                                                })
                                                            }
                                                            else {
                                                                const pepole = _.sortBy(this.state.pepole, [header.key])
                                                                this.setState({
                                                                    sort_coulmn: header.key,
                                                                    pepole: pepole,
                                                                    pageData: pepole.slice(0, this.state.itemsPerPage),
                                                                    sort_direction: 'ascending',
                                                                    currentPage: 1
                                                                })
                                                            }
                                                        }}>{header.title}</Table.HeaderCell>
                                                )
                                            })}
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            this.state.pageData.map((row, row_index) => {
                                                return (
                                                    <Table.Row key={row.id}
                                                        onContextMenu={(e) => {
                                                            e.preventDefault()
                                                            this.setState({
                                                                contextMenuOpen: true,
                                                                contextRef: this.createContextFromEvent(e),
                                                                selectedRow: row.id
                                                            });
                                                        }}>
                                                        {
                                                            headers.map((header, index) => {
                                                                return (
                                                                    <Table.Cell key={row.id + '_' + index}>
                                                                        <ContentEditable
                                                                            html={row[header.key] ? row[header.key].toString() : ''}
                                                                            data-column={header.key}
                                                                            data-row={row.id}
                                                                            data-new_row={row.added ? true : false}
                                                                            className="content-editable"
                                                                            onChange={this.handleContentEditable}
                                                                        />
                                                                    </Table.Cell>
                                                                )
                                                            })}
                                                    </Table.Row>
                                                )
                                            })
                                        }
                                    </Table.Body>
                                </Table>
                            </Segment>
                            <Segment basic dir="ltr" textAlign="center">
                                <Pagination
                                    onPageChange={this.switchPage}
                                    pageItem={<Button style={{ backgroundColor: '#FAAF40', color: 'WHITE' }} size={'large'} />}
                                    ellipsisItem={<Button icon="ellipsis horizontal" disabled style={{ backgroundColor: '#FAAF40', color: 'WHITE' }} />}
                                    firstItem={<Button disabled={this.state.currentPage <= 1}
                                        content="ראשון"
                                        icon="angle double left" labelPosition="left" style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                                    />}
                                    lastItem={<Button disabled={this.state.currentPage >= totalPages}
                                        content="אחרון"
                                        icon="angle double right" labelPosition="right" style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                                    />}
                                    prevItem={<Button disabled={this.state.currentPage <= 1}
                                        content="הקודם" icon="left arrow"
                                        labelPosition="left" style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                                    />}
                                    nextItem={<Button disabled={this.state.currentPage >= totalPages}
                                        content="הבא" icon="right arrow"
                                        labelPosition="right" style={{ backgroundColor: '#FAAF40', color: 'WHITE' }}
                                    />}
                                    totalPages={totalPages}
                                    secondary
                                />
                            </Segment>
                        </div>
                    </section>
                }

                <Popup
                    basic
                    context={this.state.contextRef}
                    onClose={() => this.setState({ contextMenuOpen: false })}
                    open={this.state.contextMenuOpen}
                >
                    <Menu style={{ width: '100px' }} dir="rtl"
                        items={[
                            { key: '1', content: "מחק שורה" },
                        ]}
                        onItemClick={(e, item) => {
                            this.deleteRow();
                        }}
                        secondary
                        vertical
                    />
                </Popup>
                <Modal
                    closeIcon={true} dimmer={'blurring'}
                    onClose={() => {
                        this.setState({ openExportModal: false });
                    }}
                    open={this.state.openExportModal}
                    className='export-modal'
                >
                    <Modal.Header>הוצא את המידע לקובץ</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Button>
                                <CSVLink className="btn btn-primary" filename={`${this.state.exportFileName}.csv`} data={this.state.exportData}
                                    onClick={(event) => {
                                        this.setState({ openExportModal: false })
                                    }}>הורד</CSVLink>
                            </Button>
                            &nbsp; &nbsp; &nbsp;
                            <Input placeholder="שם הקובץ" onChange={(e) => {
                                this.setState({ exportFileName: e.target.value });
                            }}></Input>
                        </Form>
                    </Modal.Content>
                </Modal>
                <Modal closeIcon={true} dimmer={'blurring'} style={{ textAlign: 'right' }}
                    onClose={() => {
                        this.setState({ openDeleteModel: false });
                    }}
                    open={this.state.openDeleteModel}>
                    <Modal.Header>
                        מחיקת רשימה
                    </Modal.Header>
                    <Modal.Content >
                        ? מחיקת הרשימה תמחוק את כל הנתונים השייכים לרשימה <b>"{pepole_list_selected_name}"</b>, האם תרצה להמשיך
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            content="כן"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={this.deleteList}
                            positive
                        />
                        <Button color='black' onClick={() => this.setState({ openDeleteModel: false })}>
                            לא
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal closeIcon={true} dimmer={'blurring'} style={{ textAlign: 'right' }}
                    onClose={() => {
                        this.setState({ openChangeNameModel: false });
                    }}
                    open={this.state.openChangeNameModel}>
                    <Modal.Header>
                        שינוי שם הרשימה
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Input style={{ textAlign: 'right' }} fluid placeholder="הכנס שם חדש - עברית ללא תווים מיוחדים" onChange={(e) => {
                                this.setState({ new_list_name: e.target.value });
                            }}></Input>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            content="שנה"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={this.changeListName}
                            positive
                        />
                        <Button color='black' onClick={() => this.setState({ openChangeNameModel: false })}>
                            ביטול
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal closeIcon={true} dimmer={'blurring'} style={{ textAlign: 'right' }}
                    onClose={() => {
                        this.setState({ openNewNameModel: false });
                    }}
                    open={this.state.openNewNameModel}>
                    <Modal.Header>
                        שם הרשימה
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Input style={{ textAlign: 'right' }} fluid placeholder="הכנס שם - עברית ללא תווים מיוחדים" onChange={(e) => {
                                this.setState({ new_list_name: e.target.value });
                            }}></Input>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            content="שמור"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={async () => {
                                try {
                                    this.setState({ isLoading: true })
                                    const pepole_list_id = new Date().getTime().toString();
                                    const pepole_list = {
                                        id: pepole_list_id,
                                        name: this.state.new_list_name,
                                        account_id: this.state.account_id
                                    }
                                    let changesList = this.state.pageData.filter(p => p.changed || p.added);
                                    const validation = this.validate(changesList);
                                    const numbers_fields = HEADERS.filter(h => h.type === "number");
                                    if (validation) {
                                        //update id and list_id
                                        for (let index = 0; index < changesList.length; index++) {
                                            changesList[index].id = new Date().getTime() + index;
                                            changesList[index].pepole_list_id = pepole_list_id;
                                            //convert fields to numbers
                                            numbers_fields.forEach(field => {
                                                if (changesList[index][field.key])
                                                    changesList[index][field.key] = parseInt(changesList[index][field.key])
                                            })
                                        }
                                        const response = await add_new_list(this.state.token, pepole_list, changesList);
                                        if (response.data.success) {

                                            const pepole_lists = response.data.pepole_lists;

                                            let pepole_lists_options = pepole_lists.map(p => {
                                                return {
                                                    key: p.id,
                                                    text: p.name,
                                                    value: p.id
                                                }
                                            })
                                            this.setState({
                                                pepole_lists_options: pepole_lists_options,
                                                success: true
                                            })

                                            await this.changePepoleList(null, { value: pepole_list_id })

                                            setTimeout(() => {
                                                this.setState({ success: null })
                                            }, 3000)
                                        }
                                        else {
                                            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
                                        }
                                    }
                                    this.setState({ openNewNameModel: false, isLoading: false })
                                }
                                catch (error) {
                                    this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                                    console.error('There was an error!', error);
                                }
                            }
                            }
                            positive
                        />
                        <Button color='black' onClick={() => this.setState({ openNewNameModel: false })}>
                            ביטול
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div >

        )
    }
}