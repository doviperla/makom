import React from 'react';
import {
    Dropdown,
    List,
    Button,
    Input,
    Modal,
    Header,
    Message,
    Label,
    Icon
} from 'semantic-ui-react';
import { Grid } from './Grid'
import { AppHeader } from './Header';
import { Loader } from './Loader';
import { Redirect } from 'react-router-dom';
import '../index.css';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { get_lists, get_pepole_data, update_map, get_map } from '../services/map.service';
import { Route } from 'react-router-dom';
import { PrintScreen } from './PrintScreen'


export class NMapPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected_keys: [0],
            mouse_click: false,
            turim: [],
            merge_cells: [],
            cells_style: [],
            text_cells: [],
            display_fontsize_dropdown: 'none',
            display_text_color_dropdown: 'none',
            display_bg_color_dropdown: 'none',
            display_h_align_dropdown: 'none',
            display_v_align_dropdown: 'none',
            sidebar_visible: false,
            pepole_list_data: [],
            pepole_data: [],
            selected_year: '',
            selected_time: '',
            selected_gender: '',
            selected_pepole_data: [],
            selected_pepole_data_source: [],
            user: null,
            is_loading: true,
            copy_modal_visible: false,
            copy_selected_year: '',
            copy_selected_time: '',
            copy_selected_gender: "",
            print_mode: false,
            numbers_of_cells_in_row: 100,
            number_of_cells: 10000,
            print_data: {},
            error: null,
            count_of_pepole: 0,
            show_tooltips: [true, true, true, true, true],
            openDeleteModel: false
        }
    }

    async componentDidMount() {
        try {
            // document.addEventListener("keydown", this.key_press.bind(this));
            let user = localStorage.getItem('user_data');

            if (!user) {
                <Redirect
                    to={{
                        pathname: '/login',
                    }}
                />
            }
            user = JSON.parse(user).user;
            const res = await get_lists(user);

            this.setState({ pepole_list_data: res.data.pepole_lists, user: user, is_loading: false })
        }
        catch (e) {
            console.error(e);
        }
    }

    render_index_rows = () => {
        const print_data = this.state.print_data;
        let gridTemplateRows = '';
        for (let index = 0; index < print_data.sum_rows; index++) {
            gridTemplateRows += `${print_data.cell_height}px `
        }
        let style = {
            display: 'grid',
            gridTemplateColumns: `${print_data.cell_width}px`,
            gridTemplateRows: gridTemplateRows,
        }
        return <div style={style}>
            {
                this.render_index_row()
            }
        </div>
    }

    render_index_row = () => {
        let coulmns = [];
        const print_data = this.state.print_data;
        const style = {
            backgroundColor: 'gray',
            color: 'white',
            border: '1px solid #A5A5A5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
        for (let index = 0; index < print_data.sum_rows; index++) {
            coulmns.push(<div tabIndex="0"
                style={style}>
                {index + 1}
                {/* {key} */}
            </div>)
        }
        return coulmns;
    }

    render_index_coulmns = () => {
        const print_data = this.state.print_data;
        let gridTemplateColumns = '';
        for (let index = 0; index <= print_data.sum_coulmns; index++) {
            gridTemplateColumns += `${print_data.cell_width}px `
        }
        let style = {
            display: 'grid',
            gridTemplateColumns: gridTemplateColumns,
            gridTemplateRows: `${print_data.cell_height}px`,

        }
        return <div style={style}>
            {
                this.render_index_coulmn()
            }
        </div>
    }

    render_index_coulmn = () => {
        let coulmns = [];
        const print_data = this.state.print_data;
        const text_coulmns = print_data.coulmns;
        console.log(text_coulmns);
        const style = {
            backgroundColor: 'gray',
            color: 'white',
            border: '1px solid #A5A5A5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
        //insert first empty coulmn
        coulmns.push(<div tabIndex="0" style={style}></div>)

        for (let index = 0; index <= print_data.sum_coulmns; index++) {
            coulmns.push(<div tabIndex="0"
                style={style}>
                {text_coulmns.includes(index) ? this.gematriya(print_data.sum_coulmns - (index + 1)) : ''}
            </div>)
        }
        return coulmns;
    }

    gematriya = (number) => {
        const gematriya_obj = {
            1: 'א', 2: 'ב', 3: 'ג', 4: 'ד', 5: 'ה', 6: 'ו', 7: 'ז', 8: 'ח', 9: 'ט', 10: 'י',
            11: 'יא', 12: 'יב', 13: 'יג', 14: 'יד', 15: 'טו', 16: 'טז', 17: 'יז', 18: 'יח', 19: 'יט', 20: 'כ',
            21: 'כא', 22: 'כב', 23: 'כג', 24: 'כד', 25: 'כה', 26: 'כו', 27: 'כז', 28: 'כח', 29: 'כט', 30: 'ל',
            31: 'לא', 32: 'לב', 33: 'לג', 34: 'לד', 35: 'לה', 36: 'לו', 37: 'לז', 38: 'לח', 39: 'לט', 40: 'מ',
            41: 'מא', 42: 'מב', 43: 'מג', 44: 'מד', 45: 'מה', 46: 'מו', 47: 'מז', 48: 'מח', 49: 'מט', 50: 'נ'
        }

        return gematriya_obj[number];
    }

    render_print_container = () => {
        const print_data = this.state.print_data;
        let gridTemplateColumns = '';
        let gridTemplateRows = '';

        for (let index = 0; index < print_data.sum_coulmns; index++) {
            gridTemplateColumns += `${print_data.cell_width}px `
        }
        for (let index = 0; index < print_data.sum_rows; index++) {
            gridTemplateRows += `${print_data.cell_height}px `
        }

        let style = {
            display: 'grid',
            gridTemplateColumns: gridTemplateColumns,
            gridTemplateRows: gridTemplateRows
        }
        return <div style={style}>
            {
                this.render_print_grid()
            }
        </div>
    }

    render_print_grid = () => {
        let coulmns = [];
        const print_data = this.state.print_data;
        let cells = [];
        const start_row = Math.min(...print_data.rows);
        const end_row = Math.max(...print_data.rows);
        const start_coulmn = Math.min(...print_data.coulmns);
        const end_coulmn = Math.max(...print_data.coulmns);

        let style = {};

        style.border = '1px solid #A5A5A5';
        style.display = 'flex';
        style.justifyContent = 'center';
        style.alignItems = 'center';

        for (let row = start_row; row <= end_row; row++) {
            for (let col = start_coulmn; col <= end_coulmn; col++) {
                cells.push((row * this.state.numbers_of_cells_in_row) + col)
            }
        }
        cells = cells.sort((a, b) => { return a - b });
        console.log(cells);
        console.log(this.state.merge_cells)
        for (let index = 0; index < cells.length; index++) {
            coulmns.push(
                this.render_print_coulmn(cells[index])
            );
        }
        return coulmns;
    }

    render_print_coulmn = (cell) => {
        const merge_cell = this.state.merge_cells.find(c => c.key === cell);
        //ignore keys of cells that spans by mrege cell
        if (this.state.merge_cells.find(c => c.ignore_cells.includes(cell)))
            return
        let style = this.get_style(cell);

        style.border = '1px solid #A5A5A5';

        if (!style.display) {
            style.display = 'flex';
            style.justifyContent = 'center';
            style.alignItems = 'center';
        }

        if (merge_cell) {
            style.gridColumn = `span ${merge_cell.coulmns}`;
            style.gridRow = `span ${merge_cell.rows}`;
        }
        return <div key={cell} tabIndex="0"
            style={style}>
            {this.get_text(cell)}
            {/* {key} */}
        </div>
    }

    _get_selected_cell_style = (style_key) => {
        const key = this.state.selected_keys[0];
        if (key) {
            const selected_cell_style = this.state.cells_style.find(c => c.key == key);
            if (selected_cell_style && selected_cell_style[style_key])
                return selected_cell_style[style_key]
            else
                return ''
        }
        return '';
    }

    get_text = (key) => {
        const text_cell = this.state.text_cells.find(c => c.key === key);
        if (!text_cell)
            return '';
        if (text_cell.selected_pepole)
            return text_cell.selected_pepole.name
        return text_cell.text;
    }

    create_toast = (message) => {
        toast({
            type: 'warning',
            icon: '',
            title: 'שים לב',
            description: message,
            animation: 'bounce',
            time: 5000,
        });
    }

    _show_sidebar = () => {
        this.setState({ sidebar_visible: true });
    }

    _get_years = () => {
        return this.state.pepole_list_data.length > 0 ? this.state.pepole_list_data.map((p, index) => {
            return { key: index, value: p.id, text: p.name }
        }) : [];
    }

    _change_selected_pepole_data = async () => {
        try {
            this.setState({ error: null, is_loading: true })
            const response = await get_pepole_data(this.state.user.token, this.state.selected_year);
            if (response.data.success) {
                let pepole_data = response.data.pepole_data;
                let men = false;
                let rosh_hashana = false;

                if (this.state.selected_gender === 'men') {
                    men = true;
                    if (this.state.selected_time === "rosh_ashana") {
                        rosh_hashana = true;
                        pepole_data = pepole_data.filter(p => p.mens_rosh_ashana)
                    }
                    if (this.state.selected_time === "kipur") {
                        pepole_data = pepole_data.filter(p => p.mens_kipur)
                    }
                }
                if (this.state.selected_gender === 'women') {
                    if (this.state.selected_time === "rosh_ashana") {
                        rosh_hashana = true;
                        pepole_data = pepole_data.filter(p => p.womens_rosh_ashana)
                    }
                    if (this.state.selected_time === "kipur") {
                        pepole_data = pepole_data.filter(p => p.womens_kipur)
                    }
                }

                pepole_data = pepole_data.map(p => {
                    if (men) {
                        if (rosh_hashana)
                            return { key: p.id, name: `הרב ${p.first_name} ${p.last_name}`, value: p.mens_rosh_ashana, comments: p.comments }
                        else
                            return { key: p.id, name: `הרב ${p.first_name} ${p.last_name}`, value: p.mens_kipur, comments: p.comments }
                    }
                    else {
                        if (rosh_hashana)
                            return { key: p.id, name: `גברת ${p.wife_name ? p.wife_name[0] : ''} ${p.last_name}`, value: p.womens_rosh_ashana, comments: p.comments }
                        else
                            return { key: p.id, name: `גברת ${p.wife_name ? p.wife_name[0] : ''} ${p.last_name}`, value: p.womens_kipur, comments: p.comments }
                    }
                })

                let merge_cells = this.state.merge_cells;
                let cells_style = this.state.cells_style;
                let text_cells = this.state.text_cells;

                const res = await get_map(this.state.user, this.state.selected_year, this.state.selected_gender, this.state.selected_time);
                if (res.data.map) {
                    const map = JSON.parse(res.data.map);
                    merge_cells = map.merge_cells;
                    cells_style = map.cells_style;
                    text_cells = map.text_cells;
                }
                let count_of_pepole = 0;
                for (let index = 0; index < pepole_data.length; index++) {
                    const pepole_in_map = text_cells.filter(cell => cell.selected_pepole?.key === pepole_data[index].key)

                    pepole_data[index].value = pepole_data[index].value - pepole_in_map.length;

                    count_of_pepole += pepole_data[index].value;
                }

                this.setState({
                    selected_pepole_data: pepole_data, selected_pepole_data_source: pepole_data, sidebar_visible: true,
                    merge_cells: merge_cells, cells_style: cells_style, text_cells: text_cells, is_loading: false,
                    count_of_pepole: count_of_pepole
                });
            }
            else
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", is_loading: false });
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", is_loading: false });
            console.error('There was an error!', error);
        }

    }

    _handleSearchChange = (e, data) => {
        const selected_pepole_data = this.state.selected_pepole_data_source;
        if (data.value.length == 0) {
            this.setState({ selected_pepole_data: selected_pepole_data })
            return
        }
        const results_pepole_data = selected_pepole_data.filter(p => p.name.includes(data.value));
        this.setState({ selected_pepole_data: results_pepole_data })
    }

    _deleteMap = async () => {
        try {
            const map = {
                merge_cells: [],
                cells_style: [],
                text_cells: [],
            }

            let selected_pepole_data = this.state.selected_pepole_data;
            let count_of_pepole = this.state.count_of_pepole;

            this.setState({ is_loading: true, error: null });
            const response = await update_map(this.state.user, this.state.selected_year, this.state.selected_gender, this.state.selected_time, JSON.stringify(map));
            if (!response.data.success) {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
            }
            //retrun pepule to list
            for (let index = 0; index < this.state.text_cells.length; index++) {
                const text_cell = this.state.text_cells[index];
                if (text_cell.selected_pepole) {
                    let selected = selected_pepole_data.find(p => p.key === text_cell.selected_pepole.key)
                    selected.value = selected.value + 1;
                    count_of_pepole++;
                }
            }

            this.setState({ is_loading: false, merge_cells: [], cells_style: [], text_cells: [], selected_pepole_data: selected_pepole_data, count_of_pepole: count_of_pepole })
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", is_loading: false });
            console.error('There was an error!', error);
        }
    }

    _saveChanges = async () => {
        try {
            const map = {
                merge_cells: this.state.merge_cells,
                cells_style: this.state.cells_style,
                text_cells: this.state.text_cells,
            }

            this.setState({ is_loading: true, error: null });
            const response = await update_map(this.state.user, this.state.selected_year, this.state.selected_gender, this.state.selected_time, JSON.stringify(map));
            if (!response.data.success) {
                this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה" });
            }
            this.setState({ is_loading: false })
        }
        catch (error) {
            this.setState({ error: "ארעה שגיאה, במידה והתקלה נמשכת אנא פנה לתמיכה", is_loading: false });
            console.error('There was an error!', error);
        }
    }

    _print = async () => {
        //hide all parts in screen
        this.setState({ print_mode: true, is_loading: true })
        //calculate screen width and height
        const screen_width = window.innerWidth;
        const screen_height = window.innerHeight;
        //get number of coulmns and spaces between coulmns
        let coulmns = [];
        let rows = [];
        let cells = [];
        for (let index = 0; index < this.state.text_cells.length; index++) {
            cells.push(this.state.text_cells[index].key)
        }
        for (let index = 0; index < this.state.cells_style.length; index++) {
            if (!cells.includes(this.state.cells_style[index].key))
                cells.push(this.state.cells_style[index].key)
        }

        for (let index = 0; index < this.state.merge_cells.length; index++) {
            const merge_cell = this.state.merge_cells[index];
            if (!cells.includes(this.state.merge_cells[index].key))
                cells.push(this.state.merge_cells[index].key)
            for (let ignore_cell_index = 0; ignore_cell_index < merge_cell.ignore_cells.length; ignore_cell_index++) {
                if (!cells.includes(merge_cell.ignore_cells[ignore_cell_index]))
                    cells.push(merge_cell.ignore_cells[ignore_cell_index])
            }
        }
        //const cells = this._array_unique([...this.state.merge_cells.map(m => m.key), ...this.state.text_cells.map(t => t.key), ...this.state.cells_style.map(s => s.key)])
        cells = cells.sort((a, b) => { return a - b });
        console.log(cells)
        for (let index = 0; index < cells.length; index++) {
            const cell_number = cells[index];
            const coulmn = (cell_number % this.state.numbers_of_cells_in_row);
            const row = Math.round(cell_number / this.state.numbers_of_cells_in_row);
            if (!coulmns.includes(coulmn))
                coulmns.push(coulmn);
            if (!rows.includes(row))
                rows.push(row);
        }
        console.log(rows);
        console.log(coulmns);
        const coulmns_spaces = this._calc_spaces(coulmns);
        const rows_spaces = this._calc_spaces(rows);

        const sum_coulmns = coulmns.length + coulmns_spaces.length;
        const sum_rows = rows.length + rows_spaces.length;

        //calculate size of cell, add one more coulmn and one more row to index, - 100px to header
        const cell_width = Math.round(screen_width / (sum_coulmns + 1));
        const cell_height = Math.round((screen_height - 100) / (sum_rows + 1));

        const print_data = {
            cell_width: cell_width,
            cell_height: cell_height,
            sum_coulmns: sum_coulmns,
            sum_rows: sum_rows,
            coulmns: coulmns,
            rows: rows
        }

        this.setState({ print_data: print_data, is_loading: false });
    }

    _calc_spaces = (array) => {
        let spaces = [];
        array = array.sort((a, b) => { return a - b });
        for (let index = 0; index < array.length; index++) {
            if (index < array.length - 1) {
                let gap = array[index + 1] - array[index];
                if (gap > 1) {
                    for (let g = 1; g < gap; g++) {
                        spaces.push(array[index] + 1)
                    }
                }
            }
        }

        return spaces;
    }



    render() {
        const times_options = [{ key: 'rosh_ashana', value: 'rosh_ashana', text: "ראש השנה" }, { key: 'kipur', value: 'kipur', text: "יום כיפור" }]
        const gender_options = [{ key: 'men', value: 'men', text: 'גברים' }, { key: 'women', value: 'women', text: 'נשים' }]
        const list_height = (window.outerHeight * 0.8) + 'px'
        return (
            <div >
                {this.state.is_loading &&
                    <Loader />
                }

                <SemanticToastContainer position="top-left" />

                <div>
                    <div style={{ width: '100%' }}>
                        <AppHeader user={this.state.user} print_mode={this.state.print_mode} selected_time={this.selected_time}
                            pepole_list_data={this.state.pepole_list_data}
                            selected_year={this.state.selected_year} />
                        {!this.state.print_mode &&
                            <section>
                                <section className="functions-row">
                                    <div className="ddl-row">
                                        <Dropdown selection placeholder='שנה'
                                            onChange={(event, data) => {
                                                console.log(data.value)
                                                this.setState({ selected_year: data.value }, () => {
                                                    if (this.state.selected_year != '' && this.state.selected_time != '' && this.state.selected_gender != '')
                                                        this._change_selected_pepole_data();
                                                })
                                            }} options={this._get_years()} />
                                        <Dropdown selection placeholder='ר"ה\יוהכ"פ' options={times_options} onChange={(event, data) => {
                                            this.setState({ selected_time: data.value }, () => {
                                                if (this.state.selected_year != '' && this.state.selected_time != '' && this.state.selected_gender != '')
                                                    this._change_selected_pepole_data();
                                            })
                                        }} />
                                        <Dropdown selection placeholder='גברים\נשים' options={gender_options} onChange={(event, data) => {
                                            this.setState({ selected_gender: data.value }, () => {
                                                if (this.state.selected_year != '' && this.state.selected_time != '' && this.state.selected_gender != '')
                                                    this._change_selected_pepole_data();
                                            })
                                        }} />
                                    </div>
                                    <div>
                                        <Button onClick={this._saveChanges} style={{ backgroundColor: '#FAAF40', color: 'white' }} disabled={this.state.selected_pepole_data.length > 0 ? false : true}
                                        >
                                            <Icon name='save outline' />
                                            שמירה

                                        </Button>
                                        <Button onClick={() => this.setState({ openDeleteModel: true })} style={{ backgroundColor: '#FAAF40', color: 'white' }} disabled={this.state.selected_pepole_data.length > 0 ? false : true}
                                        >
                                            <Icon name='remove circle' />
                                            מחק מפה

                                        </Button>
                                        <Button onClick={() => this.setState({ copy_modal_visible: true })} style={{ backgroundColor: '#FAAF40', color: 'white' }} disabled={this.state.selected_pepole_data.length > 0 ? false : true}
                                        >
                                            <Icon name='copy outline' />
                                            העתקת מפה
                                        </Button>
                                        <Button onClick={this._print} style={{ backgroundColor: '#FAAF40', color: 'white' }}
                                            disabled={this.state.selected_pepole_data.length > 0 ? false : true}
                                        >
                                            <Icon name='print' />
                                            הדפסה
                                        </Button>
                                        <Route render={({ history }) => (
                                            <Button style={{ direction: 'rtl', backgroundColor: '#FAAF40', color: 'white' }} onClick={() => {
                                                history.push('/list')
                                            }}
                                            >
                                                מעבר לרשימות
                                                <Icon name='list' />
                                            </Button>
                                        )} />
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
                                </section>
                                <section style={{ display: 'flex' }}>
                                    {this.state.sidebar_visible &&
                                        <div icon="labeled" style={{ textAlign: 'center', position: 'sticky', alignSelf: 'flex-start', top: '0px' }}>
                                            <div className="search">
                                                <Input icon='search' iconPosition='left' placeholder='חיפוש'
                                                    onChange={this._handleSearchChange}></Input>
                                                <Label style={{ fontSize: 'larger', color: '#4B89FF' }}>{this.state.count_of_pepole}</Label>
                                            </div>
                                            <List divided relaxed style={{ overflowY: "scroll", height: list_height, cursor: 'pointer' }}>
                                                {
                                                    this.state.selected_pepole_data.map(s =>
                                                        <List.Item value={s.key} key={s.key} onClick={(event, data) => {
                                                            const key = data.value
                                                            let selected_pepole_data = this.state.selected_pepole_data;
                                                            let text_cells = this.state.text_cells;
                                                            let selected_pepole = selected_pepole_data.find(p => p.key == key)
                                                            let count_of_pepole = this.state.count_of_pepole;
                                                            if (selected_pepole.value > 0) {
                                                                selected_pepole.value--;
                                                                count_of_pepole = count_of_pepole - 1;
                                                                if (this.state.selected_keys.length == 1) {
                                                                    const cell_key = this.state.selected_keys[0];
                                                                    let selected_text_cell = text_cells.find(c => c.key === cell_key);
                                                                    if (selected_text_cell) {
                                                                        if (selected_text_cell.selected_pepole) {
                                                                            selected_pepole_data.find(p => p.key == selected_text_cell.selected_pepole.key).value++;
                                                                        }
                                                                        selected_text_cell.selected_pepole = selected_pepole;
                                                                    }
                                                                    else {
                                                                        selected_text_cell = { key: cell_key, text: '', selected_pepole: selected_pepole }
                                                                        text_cells.push(selected_text_cell);
                                                                    }
                                                                }
                                                            }
                                                            this.setState({ selected_pepole_data: selected_pepole_data, text_cells: text_cells, count_of_pepole: count_of_pepole })
                                                        }}>
                                                            {`${s.name} : ${s.value}`}
                                                        </List.Item>
                                                    )
                                                }
                                            </List>

                                        </div>
                                    }
                                    <div>
                                        <Grid
                                            selected_pepole_data={this.state.selected_pepole_data}
                                            sidebar_visible={this.state.sidebar_visible}
                                            count_of_pepole={this.state.count_of_pepole}
                                            text_cells={this.state.text_cells}
                                            update_state={(state) => {
                                                this.setState(state)
                                            }}
                                            merge_cells={this.state.merge_cells}
                                            selected_keys={this.state.selected_keys}
                                            cells_style={this.state.cells_style}
                                            on_clear_cell={(count_of_pepole) => {
                                                if (count_of_pepole != this.state.count_of_pepole)
                                                    this.setState({ count_of_pepole: count_of_pepole })
                                            }}
                                        >
                                        </Grid>
                                    </div>
                                </section>
                            </section>
                        }
                        {this.state.print_mode &&
                            <PrintScreen user={this.state.user}
                                pepole_list_data={this.state.pepole_list_data}
                                selected_time={this.state.selected_time}
                                selected_year={this.state.selected_year}
                                numbers_of_cells_in_row={this.state.numbers_of_cells_in_row}
                                merge_cells={this.state.merge_cells}
                                print_data={this.state.print_data}
                                cells_style={this.state.cells_style}
                                text_cells={this.state.text_cells}
                            />
                        }
                    </div>
                </div>

                <Modal closeIcon={true} dimmer={'blurring'} style={{ textAlign: 'right' }}
                    onClose={() => {
                        this.setState({ openDeleteModel: false });
                    }}
                    open={this.state.openDeleteModel}>
                    <Modal.Header>
                        מחיקת מפה
                    </Modal.Header>
                    <Modal.Content >
                        ?מחיקת הרשימה תמחוק את כל נתוני המפה, האם תרצה להמשיך
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            content="כן"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={this._deleteMap}
                            positive
                        />
                        <Button color='black' onClick={() => this.setState({ openDeleteModel: false })}>
                            לא
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Modal className='copy_modal'
                    onClose={() => this.setState({ copy_modal_visible: false })}
                    open={this.state.copy_modal_visible}
                >
                    <Modal.Header>העתקת מפה</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>העתק מפה מ - </Header>
                            <div>
                                <Dropdown selection placeholder='שנה'
                                    onChange={(event, data) => {
                                        this.setState({ copy_selected_year: data.value })
                                    }} options={this._get_years()} />
                                <Dropdown selection placeholder='ר"ה\יוהכ"פ' options={times_options}
                                    onChange={(event, data) => {
                                        this.setState({ copy_selected_time: data.value })
                                    }} />
                                <Dropdown selection placeholder='גברים\נשים' options={gender_options}
                                    onChange={(event, data) => {
                                        this.setState({ copy_selected_gender: data.value })
                                    }} />
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions className='copy_modal_actions'>
                        <Button color='black' onClick={() => this.setState({ copy_modal_visible: false })}>
                            בטל
                        </Button>
                        <Button
                            content="העתק"
                            labelPosition='left'
                            icon='checkmark'
                            onClick={async () => {
                                let merge_cells = this.state.merge_cells;
                                let cells_style = this.state.cells_style;
                                let text_cells = this.state.text_cells;
                                this.setState({ is_loading: true })
                                const res = await get_map(this.state.user, this.state.copy_selected_year,
                                    this.state.copy_selected_gender, this.state.copy_selected_time);

                                const map = JSON.parse(res.data.map);
                                merge_cells = map.merge_cells;
                                cells_style = map.cells_style;
                                text_cells = map.text_cells;


                                this.setState({
                                    copy_modal_visible: false, merge_cells: merge_cells, cells_style: cells_style,
                                    text_cells: text_cells, is_loading: false
                                });
                            }}
                            positive
                        />
                    </Modal.Actions>
                </Modal>
            </div >

        )
    }
}