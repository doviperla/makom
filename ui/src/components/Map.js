import React from 'react';
import Spreadsheet from "x-data-spreadsheet";
import axios from 'axios';
import { API, HEADERS } from '../utils/constants';
import {
    Dimmer,
    Search,
    Grid,
    Dropdown,
    Loader,
    Message,
    Button,
    Icon,
    Label,
    Modal,
    Form,
    Input
} from 'semantic-ui-react';
import _ from 'lodash'
import { Route } from 'react-router-dom'

export class MapPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null,
            data: null,
            isLoading: true,
            error: null,
            search_loading: false,
            pepole: null,
            search_results: null,
            search_value: '',
            selected_col_i: null,
            selected_row_i: null,
            sheet_map: null,
            account_name: '',
            pepole_lists_options: [],
            pepole_list_selected: null,
            sum_places: 0,
            pepole_list_chenged: [],
            openSelectedTurModel: false,
            cell_range: null,
            turim: [],
            tur_name: "",
            tur_selected: null
        }
    }


    componentDidMount() {

        const keyboardEvent = new KeyboardEvent('keydown', {
            code: 'Tab',
            key: 'Tab',
            charCode: 9,
            keyCode: 9,
            view: window,
            bubbles: true
        });


        let user = localStorage.getItem('user_data');
        if (user) {
            user = JSON.parse(user).user;
            const s = new Spreadsheet("#x-spreadsheet-map", {
                mode: 'read', // edit | read
                showToolbar: true,
                showGrid: true,
                showContextmenu: false,
                view: {
                    height: () => document.documentElement.clientHeight - 115,
                    width: () => document.documentElement.clientWidth,
                },
                row: {
                    len: 100,
                    height: 60,
                },
                col: {
                    len: 22,
                    width: 100,
                    indexWidth: 60,
                    minWidth: 60,
                },
                style: {
                    bgcolor: '#ffffff',
                    align: 'center',
                    valign: 'middle',
                    textwrap: false,
                    strike: false,
                    underline: false,
                    color: '#0a0a0a',
                    font: {
                        name: 'Helvetica',
                        size: 10,
                        bold: false,
                        italic: false,
                    },
                },
            })
                .change(data => {
                    //get names from map table
                    const rows = Object.values(data.rows);
                    const rows_keys = Object.keys(data.rows);

                    let names = [];
                    for (let index = 0; index < rows.length; index++) {

                        if (rows[index].cells) {
                            const cells = Object.values(rows[index].cells)
                            const cells_keys = Object.keys(rows[index].cells)

                            for (let cell_index = 0; cell_index < cells.length; cell_index++) {
                                if (cells[cell_index].text) {

                                    let name = names.find((name) => name.key === `${rows_keys[index]} ${cells_keys[cell_index]}`)
                                    if (name)
                                        name.text = cells[cell_index].text;
                                    else
                                        names.push({
                                            key: this.find_map_key_by_tur(rows_keys[index], cells_keys[cell_index])
                                            , text: cells[cell_index].text
                                        })
                                }
                            }
                        }
                    }



                    //update pepole list
                    for (let p_index = 0; p_index < this.state.pepole.length; p_index++) {
                        const p_element = this.state.pepole[p_index];

                        const map_names = names.filter(n => n.text === `${p_element.first_name} ${p_element.last_name}`)
                        //map contain person and list not
                        for (let m_index = 0; m_index < map_names.length; m_index++) {
                            const m_element = map_names[m_index];
                            //person exist on map and not exist in list
                            if (!p_element.point_on_map || p_element.point_on_map === "") {
                                //add map point to list and calculate places
                                //if (m_element.key) {

                                p_element.point_on_map = m_element.key.toString();
                                p_element.changed = true;
                                p_element.places_count--;
                                //}
                            }
                            else {

                                let p_places = p_element.point_on_map.split(',');

                                const place_exist = p_places.find(p => p === m_element.key)

                                //add map point to list and calculate places
                                if (!place_exist) {
                                    p_element.point_on_map += `,${m_element.key}`
                                    p_element.places_count--;
                                    p_element.changed = true;
                                }
                            }
                        }

                        //list contain person and map not
                        if (p_element.point_on_map && p_element.point_on_map != "") {
                            let p_places = p_element.point_on_map.split(',');
                            let removed = [];
                            for (let place_index = 0; place_index < p_places.length; place_index++) {
                                const place = p_places[place_index];
                                const exist_on_map = names.find(n => n.text === `${p_element.first_name} ${p_element.last_name}` && n.key === place);
                                if (!exist_on_map) {
                                    p_element.places_count++;
                                    removed.push(place);
                                }
                            }
                            p_element.point_on_map = "";
                            for (let index = 0; index < p_places.length; index++) {
                                const element = p_places[index];
                                if (!removed.find(e => e === element)) {
                                    p_element.changed = true;
                                    if (p_element.point_on_map === "")
                                        p_element.point_on_map = element
                                    else
                                        p_element.point_on_map += `,${element}`
                                }
                            }
                        }
                        if (p_element.first_name === "דוב" && p_element.last_name === "פרלא") {
                        }
                    }

                    let count_of_places = 0;
                    this.state.pepole.map((p) => p.places_count != null ? count_of_places += p.places_count : 0)
                    this.setState({
                        data: data,
                        sum_places: count_of_places
                    })
                });
            s.on('cell-edited', (text, ri, ci) => {
                let sheet_map = this.state.sheet_map;
                sheet_map.datas[0].settings.mode = 'edit';
                sheet_map.reRender();
                this.setState({ sheet_map: sheet_map })
                // s.cellText(ri, ci, '')
                //allow open search only if the place mark by tur
                // for (let index = 0; index < this.state.turim.length; index++) {
                //     const element = this.state.turim[index];

                //     if (ci >= element.cell_range.sci && ci <= element.cell_range.eci && ri >= element.cell_range.sri && ri <= element.cell_range.eri) {
                //         this.setState({ search_value: text, selected_col_i: ci, selected_row_i: ri });
                //         if (text.length > 0) {
                //             this.handleSearchChange(null, { value: text });
                //             document.querySelector(".results").style.display = 'block';
                //         }
                //         else {
                //             document.querySelector(".results").style.display = 'none';
                //         }
                //     }
                // }
            })

            s.on('cell-selected', (cell, ri, ci) => {
                console.log(cell)
                this.setState({ cell_range: null })
            })

            s.on('cells-selected', (cell, cell_range) => {
                this.setState({ cell_range: cell_range })

                //check if cell_range equal to tur, if yes allow to remove tur
                const turim = this.state.turim;
                for (let row_index = cell_range.sri; row_index <= cell_range.eri; row_index++) {
                    for (let col_index = cell_range.sci; col_index <= cell_range.eci; col_index++) {
                        const tur = turim.find(t => t.cell_range.sri <= row_index && t.cell_range.eri >= row_index &&
                            t.cell_range.sci <= col_index && t.cell_range.eci >= col_index)
                        if (tur) {
                            this.setState({ tur_selected: tur })
                            break;
                        }
                    }
                }
            });

            axios.post(`${API}/pepole/get-all`, { token: user.token, pepole_list_id: null })
                .then(response => {
                    if (response.data.success) {
                        if (response.data.pepole.length > 0) {
                            const pepole = response.data.pepole;
                            const pepole_lists = response.data.pepole_lists;    
                            let pepole_lists_options = pepole_lists.map(p => {
                                return {
                                    key: p.id,
                                    text: p.name,
                                    value: p.id,
                                    className: 'right floated'
                                }
                            })

                            let count_of_places = 0;
                            pepole.map(p => p.places_count != null ? count_of_places += p.places_count : 0)

                            s.loadData(pepole_lists[pepole_lists.length - 1].map != null ? JSON.parse(pepole_lists[pepole_lists.length - 1].map) : {}) // load data

                            this.setState({
                                pepole: pepole, sheet_map: s, account_name: user.account_name, pepole_lists_options: pepole_lists_options,
                                pepole_list_selected: pepole_lists_options[pepole_lists.length - 1], isLoading: false, token: user.token,
                                data: JSON.parse(pepole_lists[pepole_lists.length - 1].map), sum_places: count_of_places,
                                turim: pepole_lists[pepole_lists.length - 1].turim != null ? JSON.parse(pepole_lists[pepole_lists.length - 1].turim) : []
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
    }

    is_cell_selected_in_tur = (col, row) => {
        // if (turim.find(t => t.cell_range.sri <= row && t.cell_range.eri >= row &&
        //     t.cell_range.sci <= col && t.cell_range.eci >= col)) {
        //     tur_selected = true;
        // }
    }

    find_map_key_by_tur = (map_row, map_coulmn) => {
        if (this.state.turim.length > 0) {
            for (let index = 0; index < this.state.turim.length; index++) {
                const tur = this.state.turim[index];
                if ((map_row >= tur.cell_range.sri && map_row <= tur.cell_range.eri)
                    && (map_coulmn >= tur.cell_range.sci && map_coulmn <= tur.cell_range.eci)) {
                    return `${map_row - tur.cell_range.sri} ${tur.tur_name} ${map_coulmn - tur.cell_range.sci}`
                }
                else {
                    return `${map_row} ${map_coulmn}`
                }
            }
        }
        else {
            return `${map_row} ${map_coulmn}`
        }
    }

    convert_col_num = (num) => {
        let arr = ['ת', 'ש', 'ר', 'ק', 'צ', 'פ', 'ע', 'ס', 'נ', 'מ', 'ל', 'כ', 'י', 'ט', 'ח', 'ז', 'ו', 'ה', 'ד', 'ג', 'ב', 'א']
        arr = arr.reverse();
        return arr[num];
    }

    changePepoleList = (e, data) => {
        this.setState({ error: null, isLoading: true })
        axios.post(`${API}/pepole/get-all`, { token: this.state.token, pepole_list_id: data.value })
            .then(response => {
                if (response.data.success) {
                    if (response.data.pepole.length > 0) {
                        const pepole = response.data.pepole;
                        const pepole_list = response.data.pepole_lists[response.data.pepole_lists.length - 1];
                        const selectedPepoleList = this.state.pepole_lists_options.find((list) => list.key === data.value);
                        let count_of_places = 0;
                        pepole.map((p) => p.places_count != null ? count_of_places++ : 0)
                        this.state.sheet_map.loadData(pepole_list.map != null ? JSON.parse(pepole_list.map) : {});
                        this.setState({
                            pepole: pepole,
                            pepole_list_selected: selectedPepoleList, isLoading: false, data: JSON.parse(pepole_list.map),
                            sum_places: count_of_places, turim: pepole_list.turim != null ? JSON.parse(pepole_list.turim) : []
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

    handleSearchChange = (e, data) => {
        if (data.value.length === 0) {
            return
        }
        else {
            this.setState({ search_loading: true })
            const re = new RegExp(_.escapeRegExp(data.value), 'i')
            const isMatch = (result) => re.test(result.last_name) || re.test(result.first_name)

            this.setState({ search_results: _.filter(this.state.pepole, isMatch), search_loading: false })
        }
    };

    saveChanges = () => {
        axios.post(`${API}/pepole/update-map`, {
            token: this.state.token, pepole_list_id: this.state.pepole_list_selected.key, map: JSON.stringify(this.state.data),
            pepole: this.state.pepole.filter(p => p.changed), turim: JSON.stringify(this.state.turim)
        })
            .then(response => {
                if (response.data.success) {

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

    numToSSColumn = (num) => {
        let s = '', t;

        while (num > 0) {
            t = (num - 1) % 26;
            s = String.fromCharCode(65 + t) + s;
            num = (num - t) / 26 | 0;
        }
        return s || undefined;
    }

    delete_tur = () => {
        let data = this.state.data;
        const tur_selected = this.state.tur_selected
        for (let row_index = tur_selected.cell_range.sri - 1; row_index <= tur_selected.cell_range.eri; row_index++) {
            let row = data.rows[row_index]
            if (row) {
                for (let col_index = tur_selected.cell_range.sci; col_index <= tur_selected.cell_range.eci; col_index++) {
                    if (row.cells[col_index]) {
                        delete row.cells[col_index]
                    }
                }
            }
        }
        this.state.sheet_map.loadData(data);
        this.setState({
            tur_selected: null,
            data: data,
            cell_range: null
        })
    }

    render() {
        let hedear = this.state.account_name;

        if (document.getElementsByClassName('x-spreadsheet-bottombar').length > 0) {
            document.getElementsByClassName('x-spreadsheet-bottombar')[0].style.display = 'none';
        }
        console.log(this.state.sheet_map)
        console.log(this.state.data)
        return (
            <div >
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
                <section dir="rtl" className="functions-row">
                    <div className="search">
                        <Search
                            loading={this.state.search_loading}
                            onSearchChange={this.handleSearchChange}
                            results={this.state.search_results}
                            value={this.state.search_value}
                            resultRenderer={(props) => {
                                return `${props.first_name} ${props.last_name} מס' מקומות ${props.places_count}`
                            }}
                            placeholder={"חיפוש לפי שם "}
                            onResultSelect={(e, data) => {
                                let selected = this.state.pepole.find((row) => row.id === data.result.id);
                                const cell_key = `${this.state.selected_row_i + 1} ${this.convert_col_num(this.state.selected_col_i)}`;
                                //selected.places_count--;
                                //selected.point_on_map = cell_key

                                document.querySelector(".results").dispatchEvent(new KeyboardEvent('keydown', {
                                    code: 'Tab',
                                    key: 'Tab',
                                    charCode: 9,
                                    keyCode: 9,
                                    view: window,
                                    bubbles: true
                                }))

                                this.state.sheet_map.cellText(this.state.selected_row_i, this.state.selected_col_i, `${selected.first_name} ${selected.last_name}`)

                                document.querySelector(".results").style.display = 'none';
                                this.setState({
                                    search_value: "",
                                    sum_places: --this.state.sum_places
                                });
                                this.state.sheet_map.reRender();
                            }}
                        />
                    </div>
                    <div className="pepole-list-ddl">
                        <Dropdown
                            selection
                            options={this.state.pepole_lists_options}
                            value={this.state.pepole_list_selected ? this.state.pepole_list_selected.value : ''}
                            onChange={this.changePepoleList}
                        />

                    </div>
                    <div className="bottuns-row">
                        <Button onClick={this.saveChanges} color={'yellow'}
                        >
                            שמירה
                                            <Icon name='save outline' />
                        </Button>
                        {this.state.cell_range != null && this.state.tur_selected == null &&
                            <Button onClick={() => this.setState({ openSelectedTurModel: true })} color={'yellow'}
                            >
                                סמן טור
                                            <Icon name='bookmark' />
                            </Button>
                        }
                        {this.state.cell_range != null && this.state.tur_selected != null &&
                            <Button onClick={this.delete_tur} color={'yellow'}
                            >
                                מחק טור
                                            <Icon name='bookmark' />
                            </Button>
                        }


                        <Route render={({ history }) => (
                            <Button onClick={() => {
                                history.push('/list')
                            }} color={'yellow'}
                            >
                                מעבר לרשימות
                                <Icon name='list' />
                            </Button>
                        )} />
                        <Label className="places-label">
                            מס' מקומות שנותרו לסידור
                            <Label.Detail>{this.state.sum_places}</Label.Detail>
                        </Label>
                    </div>
                </section>
                <section>
                    {this.state.error != null &&
                        <Message
                            error
                            header=' שגיאה '
                            content={this.state.error}
                        />
                    }
                    {this.state.message != null &&
                        <Message
                            info
                            header=' '
                            content={this.state.message}
                        />
                    }
                    <div id="x-spreadsheet-map"></div>
                </section>
                <Modal
                    closeIcon={true} dimmer={'blurring'}
                    onClose={() => {
                        this.setState({ openSelectedTurModel: false });
                    }}
                    open={this.state.openSelectedTurModel}
                    className='export-modal'
                >
                    <Modal.Header>תן שם לקבוצת התאים המסומנת, הטור במפה ירשם לפי שם זה</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Button disabled={this.state.tur_name === ""} onClick={() => {
                                if (this.state.cell_range.sri === 0) {
                                    this.setState({
                                        openSelectedTurModel: false,
                                        error: "השורה שמעל הטור שסימנת לא פנויה, רד שורה כדי לאפשר כותרת"
                                    })
                                }
                                else {
                                    let turim = this.state.turim;

                                    if (turim.find(t => t.tur_name === this.state.tur_name)) {
                                        this.setState({
                                            openSelectedTurModel: false,
                                            error: "השם שבחרת לטור כבר קיים"
                                        })
                                    }
                                    else {
                                        turim.push({ tur_name: this.state.tur_name, cell_range: this.state.cell_range })

                                        let data = this.state.data;
                                        //paint background on map
                                        if (!data) {
                                            data = {};
                                            data.name = this.state.sheet_map.datas[0].name;
                                            data.freeze = "A1";
                                            data.styles = [];
                                            data.merges = [];
                                            data.rows = {};
                                            data.cols = { "len": 22 };
                                            data.validations = [];
                                            data.autofilter = {};
                                        }
                                        //insert header
                                        data.merges.push(`${this.numToSSColumn(this.state.cell_range.sci + 1)}:${this.state.cell_range.sri - 1}, ${this.numToSSColumn(this.state.cell_range.eci + 1)}:${this.state.cell_range.sri - 1}`);
                                        if (!data.rows[this.state.cell_range.sri - 1])
                                            data.rows[this.state.cell_range.sri - 1] = {};
                                        if (!data.rows[this.state.cell_range.sri - 1].cells)
                                            data.rows[this.state.cell_range.sri - 1].cells = {}
                                        if (!data.rows[this.state.cell_range.sri - 1].cells[this.state.cell_range.sci])
                                            data.rows[this.state.cell_range.sri - 1].cells[this.state.cell_range.sci] = {}
                                        data.rows[this.state.cell_range.sri - 1].cells[this.state.cell_range.sci].merge = [0, this.state.cell_range.eci - this.state.cell_range.sci];

                                        data.styles.push({ bgcolor: '#e7e5e6', font: { size: 14 }, color: "white" });
                                        data.rows[this.state.cell_range.sri - 1].cells[this.state.cell_range.sci].style = data.styles.length - 1
                                        data.rows[this.state.cell_range.sri - 1].cells[this.state.cell_range.sci].text = this.state.tur_name;

                                        //change bg_color to all selected cells
                                        data.styles.push({ "bgcolor": "#deeaf6" });
                                        for (let start_row = this.state.cell_range.sri; start_row <= this.state.cell_range.eri; start_row++) {
                                            if (!data.rows[start_row]) {
                                                data.rows[start_row] = { cells: {} }
                                            }
                                            let cells = data.rows[start_row].cells;
                                            for (let start_cell = this.state.cell_range.sci; start_cell <= this.state.cell_range.eci; start_cell++) {
                                                if (!cells[start_cell])
                                                    cells[start_cell] = {};
                                                if (!cells[start_cell].style)
                                                    cells[start_cell].style = data.styles.length - 1;
                                            }
                                        }
                                        this.state.sheet_map.loadData(data);
                                        this.setState({
                                            turim: turim,
                                            tur_name: "", cell_range: null, openMarkModel: false,
                                            data: data
                                        })
                                    }
                                }
                            }}>
                                שמירה
                            </Button>
                            &nbsp; &nbsp; &nbsp;
                            <Input placeholder="שם הטור" onChange={(e) => {
                                this.setState({ tur_name: e.target.value })
                            }}></Input>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div >
        )
    }
}