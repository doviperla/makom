import React from 'react';
import _ from 'lodash'
import axios from 'axios';
import { API, HEADERS } from '../utils/constants';
import {
    Segment,
    Table,
    Grid,
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
    Loader
} from 'semantic-ui-react';
import ContentEditable from 'react-contenteditable'
import axiosInterceptor from '../utils/interceptor'
import { CSVLink } from "react-csv";
import CSVReader from 'react-csv-reader';
import { Route } from 'react-router-dom'

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
            showUpdatesButtons: false,
            currentPage: 1,
            totalPages: 0,
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
            new_list_name: ""
        };
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        let user = localStorage.getItem('user_data');
        if (user) {
            user = JSON.parse(user).user;
            axios.post(`${API}/pepole/get-all`, { token: user.token, pepole_list_id: null })
                .then(response => {
                    if (response.data.success) {
                        if (response.data.pepole.length > 0) {
                            const pepole = response.data.pepole;
                            const pepole_lists = response.data.pepole_lists;
                            const totalPages = parseInt(pepole.length / this.state.itemsPerPage);

                            let pepole_lists_options = pepole_lists.map(p => {
                                return {
                                    key: p.id,
                                    text: p.name,
                                    value: p.id
                                }
                            })

                            this.setState({
                                pepole: pepole, pageData: pepole.slice(0, this.state.itemsPerPage),
                                totalPages: totalPages, pepole_lists_options: pepole_lists_options,
                                pepole_list_selected: pepole_lists_options[pepole_lists_options.length - 1],
                                user: `${user.firstName} - ${user.lastName}`,
                                token: user.token, account_name: user.account_name, account_logo: user.account_logo,
                                account_id: user.account_id, isLoading: false
                            })
                        }
                    }
                    else
                        this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                })
                .catch(error => {
                    this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                    console.error('There was an error!', error);
                });
        }
        else
            window.location('/');
    }

    newRow = () => {
        let row = {};
        const rowKeys = Object.keys(this.state.pepole[0]);
        rowKeys.forEach(prop => {
            row[prop] = '';
        });
        row.id = new Date().getDate();
        row.added = true;
        row.pepole_list_id = this.state.pepole_list_selected.key;
        return row;
    }

    handleContentEditable = event => {
        const value = event.target.value;
        const column = event.currentTarget.dataset.column;
        const row = event.currentTarget.dataset.row;
        const added = event.currentTarget.dataset.new_row == 'true';

        let { pageData } = this.state;

        if (added === false) {
            let updatedRow = pageData.find((item, i) => item.id == row);
            updatedRow[column] = value;
            updatedRow.changed = true;
        }
        else {
            pageData[0][column] = value;
        }
        this.setState({
            pageData: pageData,
            showUpdatesButtons: true
        })
    }

    downloadCsv = () => {
        let data = [];
        data.push(HEADERS.map(h => h.title));
        const pepole = this.state.pepole;
        for (let p of pepole) {
            let arr = [];
            for (let key in p) {
                if (key != 'id' && key != 'changed' && key != 'pepole_list_id')
                    arr.push(p[key]);
            }
            data.push(arr);
        }
        this.setState({ exportData: data, openExportModal: true })
    }

    validateRow = (changesList) => {
        this.setState({ error: null })
        let empty = true;
        let isNotNumber;
        let isValidate = true;

        changesList.forEach(element => {
            HEADERS.forEach(header => {
                if (element[header.key] != "") {
                    empty = false;
                }
            });
        });
        console.log(empty);
        if (empty) {
            this.setState({ error: "לא ניתן להכניס שורה ריקה" })
            return false;
        }
        else {
            for (const element of changesList) {
                for (const header of HEADERS) {
                    if (header.type === "number") {
                        isNotNumber = isNaN(element[header.key]);
                        if (isNotNumber && element[header.key] != '') {
                            isValidate = false;
                            this.setState({ error: `חובה להזין מספרים בלבד בשדה "${header.title}"` })
                            break;
                        }
                    }
                }
            }
            return isValidate;
        }
    }

    saveChanges = () => {
        const changesList = this.state.pageData.filter(p => p.changed || p.added);
        const validation = this.validateRow(changesList);
        if (changesList.length > 0) {
            if (validation) {
                axios.post(`${API}/pepole/update-list`, { token: this.state.token, changesList: changesList })
                    .then(response => {
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
                                totalPages: totalPages, currentPage: 1, showUpdatesButtons: false
                            })

                        }
                        else {
                            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
                            console.error('There was an error!', response.data.error);
                        }
                    })
                    .catch(error => {
                        this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
                        console.error('There was an error!', error);
                    });
            }
        }
    }

    deleteRow = () => {
        axios.post(`${API}/pepole/delete-row`, { token: this.state.token, row: this.state.selectedRow })
            .then(response => {
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
            })
            .catch(error => {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
                console.error('There was an error!', error);
            });
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

        this.setState({ pageData: pageData, currentPage: data.activePage, showUpdatesButtons: false });
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
        const newRow = this.newRow();
        pageData.splice(0, 0, newRow);
        this.setState({ pageData: pageData, showUpdatesButtons: true });
    }

    handleSearchChange = (e, data) => {
        clearTimeout(search_timeout);
        this.setState({ search_loading: true, search_value: data.value })

        search_timeout = setTimeout(() => {
            if (data.value.length === 0) {
                const pepole = this.state.pepole;
                this.setState({
                    pageData: pepole.slice(0, this.state.itemsPerPage),
                    currentPage: 1,
                    search_loading: false
                })
                return
            }

            const re = new RegExp(_.escapeRegExp(data.value), 'i')
            const isMatch = (result) => re.test(result.last_name) || re.test(result.first_name)

            this.setState({ search_results: _.filter(this.state.pepole, isMatch), search_loading: false })
        }, 300)
    };

    importFile = (data, fileInfo) => {
        this.setState({ error: null, isLoading: true })
        let uploadError = "";
        if (fileInfo.type != "application/vnd.ms-excel")
            uploadError = "סוג הקובץ אינו נתמך"
        if (uploadError == "") {
            if (data.length > 0) {
                console.log(data)
                for (let header of HEADERS) {
                    const headerFind = data[0].find((d) => d.replace('"', '') === header.title.replace('"', ''));
                    if (!headerFind) {
                        uploadError += `הכותרת "${header.title}" אינה קיימת`
                        break;
                    }
                }
            }
        }
        //     if (uploadError == "") {
        //         for (let row of data) {
        //             console.log(row.length)
        //             if (row && row.length != HEADERS.length) {
        //                 console.log(row);
        //                 console.log(HEADERS.length)

        //                 uploadError = "כמות התאים אינה זהה לנדרש"
        //                 break;
        //             }
        //         }

        //     }
        //     if (uploadError != "") {
        //         uploadError += `
        //    ! נסה להוריד את הטבלה הקיימת כדי לראות דוגמה לקובץ תקין`
        //         this.setState({ error: uploadError, isLoading: false })
        //     }
        if (uploadError == "") {
            const pepole_list_id = new Date().getTime()
            const pepole_list = {
                id: pepole_list_id,
                name: fileInfo.name.split('.')[0], account_id: this.state.account_id
            }

            let pepole_list_data = [];

            for (let index = 1; index < data.length; index++) {
                const element = data[index];
                console.log(element)
                let pepole_row = {};
                pepole_row.id = new Date().getTime() + index;

                pepole_row.pepole_list_id = pepole_list_id;
                for (let header_index = 0; header_index < HEADERS.length; header_index++) {
                    const header = HEADERS[header_index];
                    if (header.type === "number")
                        pepole_row[header.key] = parseInt(element[header_index]);
                    else
                        pepole_row[header.key] = element[header_index];
                }
                pepole_list_data.push(pepole_row);
            }

            axios.post(`${API}/pepole/add-new-list`, {
                token: this.state.token, pepole_list: pepole_list,
                pepole_list_data: pepole_list_data
            })
                .then(response => {
                    if (response.data.success) {
                        window.location.reload();
                    }
                    else {
                        this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                        console.error('There was an error!', response.data.error);
                    }
                })
                .catch(error => {
                    this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                    console.error('There was an error!', error);
                });
        }
    }

    deleteList = () => {
        this.setState({ error: null, isLoading: true, openDeleteModel: false })
        axios.post(`${API}/pepole/delete-list`, {
            token: this.state.token,
            pepole_list_id: this.state.pepole_list_selected.key
        })
            .then(response => {
                if (response.data.success) {
                    window.location.reload();
                }
                else {
                    this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                    console.error('There was an error!', response.data.error);
                }
            })
            .catch(error => {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                console.error('There was an error!', error);
            });
    }

    changeListName = () => {
        this.setState({ error: null, isLoading: true, openChangeNameModel: false })
        axios.post(`${API}/pepole/change-name-list`, {
            token: this.state.token,
            pepole_list_id: this.state.pepole_list_selected.key,
            pepole_list_name: this.state.new_list_name
        })
            .then(response => {
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
            })
            .catch(error => {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                console.error('There was an error!', error);
            });
    }

    changePepoleList = (e, data) => {
        this.setState({ error: null, isLoading: true })
        axios.post(`${API}/pepole/get-all`, { token: this.state.token, pepole_list_id: data.value })
            .then(response => {
                if (response.data.success) {
                    if (response.data.pepole.length > 0) {
                        const pepole = response.data.pepole;
                        const totalPages = parseInt(pepole.length / this.state.itemsPerPage);

                        const selectedPepoleList = this.state.pepole_lists_options.find((list) => list.key === data.value);

                        this.setState({
                            pepole: pepole, pageData: pepole.slice(0, this.state.itemsPerPage),
                            totalPages: totalPages, pepole_list_selected: selectedPepoleList, isLoading: false
                        })
                    }
                }
                else
                    this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
            })
            .catch(error => {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", isLoading: false });
                console.error('There was an error!', error);
            });

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
                <section >
                    <Grid columns={3} className={'row-header header'}>
                        <Grid.Row>
                            <Grid.Column>
                                <div>
                                    <p>
                                        {this.state.user}
                                    </p>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div>
                                    <pre>
                                        <span className="header-title">
                                            {hedear}
                                        </span>
                                    </pre>
                                </div>
                            </Grid.Column>
                            <Grid.Column>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </section>
                <section className="functions-row">
                    <div className="search">
                        <Search
                            loading={this.state.search_loading}
                            onSearchChange={this.handleSearchChange}
                            results={this.state.search_results}
                            value={this.state.search_value}
                            resultRenderer={(props) => {
                                return `${props.first_name} ${props.last_name}`
                            }}
                            placeholder={"חיפוש לפי שם "}
                            onResultSelect={(e, data) => {
                                const selected = this.state.pepole.find((row) => row.id === data.result.id);
                                this.setState({ pageData: [selected], currentPage: 1 });
                            }}
                        />
                    </div>
                    <div classNmae="pepole-list-ddl">
                        <Dropdown
                            selection
                            options={this.state.pepole_lists_options}
                            value={this.state.pepole_list_selected ? this.state.pepole_list_selected.value : ''}
                            onChange={this.changePepoleList}
                        />
                    </div>
                    <div className="bottuns-row">
                        <Button onClick={this.signOut} color={'yellow'}
                        >
                            יציאה
                                            <Icon name='sign-out' />
                        </Button>
                        <Button onClick={this.addRow} disabled={this.state.showUpdatesButtons} color={'yellow'}
                        >
                            הוספת שורה
                                            <Icon name='add' />
                        </Button>
                        <Button onClick={this.downloadCsv} color={'yellow'} disabled={this.state.showUpdatesButtons}
                        >
                            הוצא לקובץ
                                            <Icon name='file excel outline' />
                        </Button>
                        <Button color={'yellow'} disabled={this.state.showUpdatesButtons}
                        >
                            <CSVReader onFileLoaded={this.importFile} inputId="file" inputName="file" cssInputClass="inputfile" />
                            <label className="inputlabel" htmlFor="file">טען קובץ</label>
                            <Icon name='file excel outline' />
                        </Button>
                        <Button onClick={() => { this.setState({ openDeleteModel: true }) }} color={'yellow'} disabled={this.state.showUpdatesButtons}
                        >
                            מחק רשימה
                                            <Icon name='file excel outline' />
                        </Button>
                        <Button onClick={() => { this.setState({ openChangeNameModel: true }) }} color={'yellow'} disabled={this.state.showUpdatesButtons}
                        >
                            שנה שם רשימה
                                            <Icon name='file excel outline' />
                        </Button>

                        {this.state.showUpdatesButtons &&
                            <Button onClick={this.saveChanges} color={'yellow'}
                            >
                                שמירה
                                            <Icon name='save outline' />
                            </Button>
                        }

                        <Route render={({ history }) => (
                            <Button onClick={() => {
                                history.push('/')
                            }} color={'yellow'}
                            >
                                מעבר למפה
                                <Icon name='map' />
                            </Button>
                        )} />

                    </div>

                </section>
                <section>
                    <div>
                        <Segment basic style={{ overflow: 'auto', maxHeight: '65vh' }}>
                            {this.state.error != null &&
                                <Message
                                    error
                                    header=' שגיאה '
                                    content={this.state.error}
                                />
                            }
                            <Table className="pepole-table"
                                color={'yellow'}
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
                                        pageData.map((row, row_index) => {
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
                                                        rowKeys.map((cell, index) => {
                                                            if (cell != "id" && cell != "changed" && cell != "pepole_list_id") {
                                                                return (
                                                                    <Table.Cell key={row.id + '_' + index}>
                                                                        <ContentEditable
                                                                            html={row[cell] ? row[cell].toString() : ''}
                                                                            data-column={cell}
                                                                            data-row={row.id}
                                                                            data-new_row={row.added ? true : false}
                                                                            className="content-editable"
                                                                            onChange={this.handleContentEditable}
                                                                        />
                                                                    </Table.Cell>
                                                                )
                                                            }
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
                                activePage={this.state.currentPage}
                                onPageChange={this.switchPage}
                                pageItem={<Button color={'yellow'} size={'large'} />}
                                ellipsisItem={<Button icon="ellipsis horizontal" disabled color={'yellow'} />}
                                firstItem={<Button disabled={this.state.currentPage <= 1}
                                    content="ראשון"
                                    icon="angle double left" labelPosition="left" color={'yellow'}
                                />}
                                lastItem={<Button disabled={this.state.currentPage >= totalPages}
                                    content="אחרון"
                                    icon="angle double right" labelPosition="right" color={'yellow'}
                                />}
                                prevItem={<Button disabled={this.state.activePage <= 1}
                                    content="הקודם" icon="left arrow"
                                    labelPosition="left" color={'yellow'}
                                />}
                                nextItem={<Button disabled={this.state.activePage >= totalPages}
                                    content="הבא" icon="right arrow"
                                    labelPosition="right" color={'yellow'}
                                />}
                                totalPages={totalPages}
                                secondary
                            />
                        </Segment>
                        <Segment basic textAlign="center" color={'yellow'} style={{ margin: "14px" }}>
                            {"הצג"} {'   '}
                            <Button.Group color="yellow" size={'large'}>
                                <Dropdown compact
                                    button
                                    inline
                                    upward
                                    floating
                                    closeOnChange
                                    openOnFocus
                                    onChange={this.updateItemsPerPage}
                                    value={this.state.itemsPerPage}
                                    options={[
                                        { key: '10', value: 10, text: '10' },
                                        { key: '20', value: 20, text: '20' },
                                        { key: '50', value: 50, text: '50' }]}
                                />
                            </Button.Group>
                            {'   '} {"שורות לעמוד"}
                        </Segment>
                    </div>
                </section>
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
                <Modal closeIcon={true} dimmer={'blurring'}
                    onClose={() => {
                        this.setState({ openDeleteModel: false });
                    }}
                    open={this.state.openDeleteModel}>
                    <Modal.Header>
                        מחיקת רשימה
                    </Modal.Header>
                    <Modal.Content>
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
                <Modal closeIcon={true} dimmer={'blurring'}
                    onClose={() => {
                        this.setState({ openChangeNameModel: false });
                    }}
                    open={this.state.openChangeNameModel}>
                    <Modal.Header>
                        שינוי שם הרשימה
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Input fluid placeholder="הכנס שם חדש - עברית ללא תווים מיוחדים" onChange={(e) => {
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
            </div >

        )
    }
}