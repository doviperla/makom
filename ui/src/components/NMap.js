import React from 'react';
import {
    Dimmer,
    Sidebar,
    Dropdown,
    Loader,
    List,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import '../index.css';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import ReactTooltip from 'react-tooltip';
// import { Toolbar } from './Toolbar';
import { CompactPicker } from 'react-color';
import { get_lists_data } from '../services/map.service';

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
        }
    }

    number_of_cells = 5000;

    componentWillUnmount() {

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
            const res = await get_lists_data(user);
            if (res.status === 200) {
                this.setState({ pepole_list_data: res.data.pepole_lists, pepole_data: res.data.pepole })
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    render_coulmn = (key) => {
        return <div key={key} tabIndex="0" className={this.state.selected_keys.includes(key) ? "selected" : "td"}
            style={this.get_style(key)}
            onMouseUp={() => { this.setState({ mouse_click: false }) }}
            onMouseDown={() => this.cell_selected(key)}
            onMouseOver={() => this.handle_mouse_over_out(key, true)}
            onMouseOut={() => this.handle_mouse_over_out(key, false)}
            onKeyDown={(event) => {
                let text_cells = this.state.text_cells;
                const cell_key = this.state.selected_keys[0];
                let text_cell = text_cells.find(c => c.key === cell_key);
                if ((event.which >= 48 && event.which <= 57) || (event.which >= 65 && event.which <= 90)
                    || (event.which >= 97 && event.which <= 122) || (event.which >= 128 && event.which <= 155)) {
                    if (!text_cell) {
                        text_cell = { key: cell_key, text: '', selected_pepole: null };
                        text_cells.push(text_cell)
                    }
                    text_cell.text += event.key;
                    this.setState({ text_cells: text_cells })
                }
                if (event.which == 8) { //backspace
                    if (text_cell && text_cell.text.length > 0) {
                        text_cell.text = text_cell.text.slice(0, -1)
                    }
                    this.setState({ text_cells: text_cells })
                }
            }}
        >
            {this.get_text(key)}
        </div>
    }

    render_merge_coulmn = (key, merge) => {
        const selected_key = this.state.selected_keys.includes(key)
        let style = this.get_style(key);
        style.height = `${(merge.height * 40) - 2}px`
        style.width = `${(merge.width * 100) - 2}px`
        style.zIndex = 20
        style.position = 'relative'
        style.border = selected_key ? '3px solid #4B89FF' : '1px solid #A5A5A5';
        style.backgroundColor = selected_key ? '#EDF3FF' : style.backgroundColor ? style.backgroundColor : '#fff'
        // style.padding= '1em';
        // style.margin = '-2px'
        console.log(merge)

        return <div className={"td -row-span-2"}>
            <div key={key}
                style={style}
                onMouseUp={() => { this.setState({ mouse_click: false }) }}
                onMouseDown={() => this.cell_selected(key)}
                onMouseOver={() => this.handle_mouse_over_out(key, true)}
                onMouseOut={() => this.handle_mouse_over_out(key, false)}
                onKeyDown={(event) => {
                    let text_cells = this.state.text_cells;
                    const cell_key = this.state.selected_keys[0];
                    let text_cell = text_cells.find(c => c.key === cell_key);
                    if ((event.which >= 48 && event.which <= 57) || (event.which >= 65 && event.which <= 90)
                        || (event.which >= 97 && event.which <= 122) || (event.which >= 128 && event.which <= 155)) {
                        if (!text_cell) {
                            text_cell = { key: cell_key, text: '', selected_pepole: null };
                            text_cells.push(text_cell)
                        }
                        text_cell.text += event.key;
                        this.setState({ text_cells: text_cells })
                    }
                    if (event.which == 8) { //backspace
                        if (text_cell && text_cell.text.length > 0) {
                            text_cell.text = text_cell.text.slice(0, -1)
                        }
                        this.setState({ text_cells: text_cells })
                    }
                }}
            >
                {this.get_text(key)}
                {/* {key} */}
            </div>
        </div>
    }

    render_grid = () => {
        let coulmns = [];
        for (let key = 0; key < this.number_of_cells; key++) {
            const merge = this.state.merge_cells.find(m => m.key === key);
            coulmns.push(
                merge ? this.render_merge_coulmn(key, merge) :
                    this.render_coulmn(key)
            );
        }
        return coulmns;
    }

    get_style = (key) => {
        const selected_style = this.state.cells_style.find(s => s.key === key);
        if (!selected_style)
            return {};
        return { ...selected_style };
    }

    get_text = (key) => {
        const text_cell = this.state.text_cells.find(c => c.key === key);
        if (!text_cell)
            return '';
        if (text_cell.selected_pepole)
            return text_cell.selected_pepole.name
        return text_cell.text;
    }

    insert_style = (style_key, style_value) => {
        let cells_style = this.state.cells_style;

        for (let index = 0; index < this.state.selected_keys.length; index++) {
            let cell_style = cells_style.find(c => c.key === this.state.selected_keys[index])

            if (!cell_style) {
                cell_style = { key: this.state.selected_keys[index] }
                cell_style[style_key] = style_value;
                cells_style.push(cell_style)
            }
            else {
                cell_style[style_key] = style_value;
            }
        }
        this.setState({ cells_style: cells_style });
    }

    cell_selected = (key) => {
        const selected_key = key;
        this.setState({ selected_keys: [selected_key], mouse_click: true })
    }

    handle_mouse_over_out = (key, over) => {
        const rows = this.number_of_cells / 100;
        const coulmns_in_row = 50;

        if (this.state.mouse_click) {
            let selected_keys = this.state.selected_keys;
            const start = selected_keys[0];
            const start_row = Math.floor(start / rows);
            const end_row = Math.floor(key / rows);

            const start_coulmn = start % coulmns_in_row;
            const end_coulmn = key % coulmns_in_row;

            if (start_row < end_row) {
                for (let row = start_row; row <= end_row; row++) {
                    if (start_coulmn < end_coulmn) {
                        for (let coulmn = start_coulmn; coulmn <= end_coulmn; coulmn++) {
                            this.push_to_arr_if_not_exist(selected_keys, (row * coulmns_in_row) + coulmn)
                        }
                    }
                    if (start_coulmn > end_coulmn) {
                        for (let coulmn = end_coulmn; coulmn <= start_coulmn; coulmn++) {
                            this.push_to_arr_if_not_exist(selected_keys, (row * coulmns_in_row) + coulmn)
                        }
                    }
                }
            }
            if (start_row > end_row) {
                for (let row = end_row; row <= start_row; row++) {
                    if (start_coulmn < end_coulmn) {
                        for (let coulmn = start_coulmn; coulmn <= end_coulmn; coulmn++) {
                            this.push_to_arr_if_not_exist(selected_keys, (row * coulmns_in_row) + coulmn)
                        }
                    }
                    if (start_coulmn > end_coulmn) {
                        for (let coulmn = end_coulmn; coulmn <= start_coulmn; coulmn++) {
                            this.push_to_arr_if_not_exist(selected_keys, (row * coulmns_in_row) + coulmn)
                        }
                    }
                }
            }
            this.push_to_arr_if_not_exist(selected_keys, key);
            selected_keys = this.remove_anneccery_keys(selected_keys, start_row, end_row, start_coulmn, end_coulmn);
            this.setState({ selected_keys: selected_keys })
            console.log(this.state.selected_keys)
        }
    }

    remove_anneccery_keys = (selected_keys, start_row, end_row, start_coulmn, end_coulmn) => {
        const rows = this.number_of_cells / 100;
        const coulmns_in_row = 50;
        let arr = [];
        for (let index = 0; index < selected_keys.length; index++) {
            const r = Math.floor(selected_keys[index] / rows);
            if ((r >= start_row && r <= end_row) || (r >= end_row && r <= start_row)) {

            }
            else {
                arr.push(selected_keys[index])
            }
        }
        selected_keys = selected_keys.filter(key => !arr.includes(key));
        arr = [];
        for (let index = 0; index < selected_keys.length; index++) {
            const c = selected_keys[index] % coulmns_in_row
            if ((c >= start_coulmn && c <= end_coulmn) || (c >= end_coulmn && c <= start_coulmn)) {

            }
            else {
                arr.push(selected_keys[index])
            }
        }
        selected_keys = selected_keys.filter(key => !arr.includes(key));
        return selected_keys;
    }

    push_to_arr_if_not_exist = (arr, val) => {
        if (!arr.includes(val))
            arr.push(val);
        return arr;
    }

    remove_from_arr = (arr, key) => {
        const index = arr.indexOf(key);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    key_press = (e) => {
        if (e.key == "ArrowRight" || e.key == "ArrowLeft" || e.key == "ArrowUp" || e.key == "ArrowDown") {
            const selected_keys = this.state.selected_keys;
            let selected_key = selected_keys[selected_keys.length - 1];
            const row = this.number_of_cells / 100;
            switch (e.key) {
                case "ArrowRight":
                    selected_key = selected_key + 1;
                    break;
                case "ArrowLeft":
                    selected_key = selected_key != 0 ? selected_key - 1 : selected_key;
                    break;
                case "ArrowUp":
                    selected_key = selected_key >= row ? selected_key - row : selected_key;
                    break;
                case "ArrowDown":
                    selected_key = selected_key < this.number_of_cells - row ? selected_key + row : selected_key;
                    break;

                default:
                    break;
            }
            this.setState({ selected_keys: [selected_key] })
        }
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

    mark_cells = () => {
        const selected_keys = this.state.selected_keys;
        let turim = this.state.turim;
        for (let index = 0; index < selected_keys.length; index++) {
            turim = this.push_to_arr_if_not_exist(turim, selected_keys[index]);
        }
        this.setState({
            turim: turim,
            selected_keys: [],
        })
    }

    unmark_cells = () => {
        const selected_keys = this.state.selected_keys;
        let turim = this.state.turim
        for (let index = 0; index < selected_keys.length; index++) {
            turim = this.remove_from_arr(turim, selected_keys[index]);
        }
        this.setState({
            turim: turim,
            selected_keys: [],
        })
    }

    _show_sidebar = () => {
        this.setState({ sidebar_visible: true });
    }

    _get_years = () => {
        return this.state.pepole_list_data.length > 0 ? this.state.pepole_list_data.map((p, index) => {
            return { key: index, value: p.id, text: p.name }
        }) : [];
    }

    _change_selected_pepole_data = () => {
        let pepole_data = this.state.pepole_data.filter(p => p.pepole_list_id === this.state.selected_year);
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
                    return { key: p.id, name: `הרב ${p.first_name} ${p.last_name}`, value: p.mens_rosh_ashana }
                else
                    return { key: p.id, name: `הרב ${p.first_name} ${p.last_name}`, value: p.mens_kipur }
            }
            else {
                if (rosh_hashana)
                    return { key: p.id, name: `גברת ${p.last_name}`, value: p.womens_rosh_ashana }
                else
                    return { key: p.id, name: `גברת ${p.last_name}`, value: p.womens_kipur }
            }
        })
        this.setState({ selected_pepole_data: pepole_data, sidebar_visible: true });
    }

    _get_selected_font_size = () => {
        const key = this.state.selected_keys[0];
        if (key) {
            const selected_cell_style = this.state.cells_style.find(c => c.key == key);
            if (selected_cell_style && selected_cell_style['fontSize'])
                return selected_cell_style['fontSize'].replace('px', '')
            else
                return 14
        }
        return 14;
    }

    is_selcted_cell_styled = (style_key, style_value) => {
        const key = this.state.selected_keys[0];
        if (key) {
            const selected_cell_style = this.state.cells_style.find(c => c.key == key);
            if (selected_cell_style && selected_cell_style[style_key] && selected_cell_style[style_key] == style_value)
                return true
            else
                return false
        }
        return false;
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

    render() {
        const times_options = [{ key: 'rosh_ashana', value: 'rosh_ashana', text: "ראש השנה" }, { key: 'kipur', value: 'kipur', text: "יום כיפור" }]
        const gender_options = [{ key: 'men', value: 'men', text: 'גברים' }, { key: 'women', value: 'women', text: 'נשים' }]
        const font_color = this._get_selected_cell_style('color');
        const bg_color = this._get_selected_cell_style('backgroundColor');
        return (
            <div >
                <Dimmer active={this.state.isLoading}>
                    <Loader size="large">נא המתן...</Loader>
                </Dimmer>
                <SemanticToastContainer position="top-left" />
                <div style={{ width: '100%' }}>
                    <section className="functions-row">
                        <div className="bottuns-row">
                            <Dropdown selection placeholder='שנה'
                                onChange={(event, data) => {
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
                            {/* <Button onClick={this.saveChanges} color={'yellow'}
                            >
                                שמירה
                                <Icon name='save outline' />
                            </Button>
                            {this.state.selected_keys.some(cell => !this.state.turim.includes(cell)) &&
                                <Button onClick={() => this.mark_cells()} color={'yellow'}
                                >
                                    סמן
                                    <Icon name='bookmark' />
                                </Button>
                            }
                            {this.state.selected_keys.some(cell => this.state.turim.includes(cell)) &&
                                <Button onClick={this.unmark_cells} color={'yellow'}
                                >
                                    מחק סימון
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
                            <Button onClick={() => {
                                let sidebar_visible = this.state.sidebar_visible ? false : true;
                                this.setState({ sidebar_visible: sidebar_visible })
                            }} color={'yellow'}
                            >
                                רשימת מתפללים
                                <Icon name='list' />
                            </Button> */}
                            {/* <Popup content={'רשימת מתפללים'}
                                inverted
                                style={{ borderRadius: 5, opacity: 0.8, pointerEvents: 'none' }}
                                trigger={<Button
                                    onClick={this._show_sidebar}
                                    color={'yellow'}
                                    icon="list"
                                />}
                            /> */}
                        </div>
                    </section>
                </div>
                <Sidebar.Pushable>
                    <Sidebar icon="labeled" style={{ textAlign: 'center' }} selection divided relaxed direction={'right'} as={List}
                        visible={this.state.sidebar_visible} >
                        {
                            this.state.selected_pepole_data.map(s =>
                                <List.Item value={s.key} onClick={(event, data) => {
                                    const key = data.value
                                    let selected_pepole_data = this.state.selected_pepole_data;
                                    let text_cells = this.state.text_cells;
                                    let selected_pepole = selected_pepole_data.find(p => p.key == key)
                                    if (selected_pepole.value > 0) {
                                        selected_pepole.value--;

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
                                    this.setState({ selected_pepole_data: selected_pepole_data, text_cells: text_cells })
                                }}>
                                    {`${s.name} : ${s.value}`}
                                </List.Item>
                            )
                        }
                    </Sidebar>
                    <Sidebar.Pusher>
                        <div className="toolbar">
                            <div className="toolbar-btns">
                                <div className="toolbar-btn" data-type="light" data-tip="נקה עיצוב" data-place="bottom" onClick={() => {
                                    let cells_style = this.state.cells_style;
                                    for (let index = 0; index < this.state.selected_keys.length; index++) {
                                        const key = this.state.selected_keys[index];
                                        cells_style = cells_style.filter(c => c.key != key);
                                    }
                                    this.setState({ cells_style: cells_style })
                                }}>
                                    <div className="toolbar-btn-icon">
                                        <div className="toolbar-btn-icon-img clearformat" ></div>
                                    </div>
                                </div>
                                <div className="toolbar-btn" data-type="light" data-tip="גודל גופן" data-place="bottom" onClick={() => {
                                    this.setState({
                                        display_fontsize_dropdown: this.state.display_fontsize_dropdown === 'none' ?
                                            'block' : 'none'
                                    })
                                }}>
                                    <div className="x-spreadsheet-dropdown bottom-left">
                                        <div className="x-spreadsheet-dropdown-header">
                                            <div className="x-spreadsheet-dropdown-title">
                                                {
                                                    this._get_selected_font_size()
                                                }</div>
                                            <div className="x-spreadsheet-icon arrow-right">
                                                <div className="x-spreadsheet-icon-img arrow-down">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="x-spreadsheet-dropdown-content" style={{ width: '60px', display: this.state.display_fontsize_dropdown }}>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '7.5px')}>7.5</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '8px')}>8</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '9px')}>9</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '10px')}>10</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '10.5px')}>10.5</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '11px')}>11</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '12px')}>12</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '14px')}>14</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '15px')}>15</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '16px')}>16</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '18px')}>18</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '22px')}>22</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '24px')}>24</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '26px')}>26</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '36px')}>36</div>
                                            <div className="x-spreadsheet-item" onClick={() => this.insert_style('fontSize', '42px')}>42</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="x-spreadsheet-toolbar-divider"></div>
                                <div className={this.is_selcted_cell_styled('fontWeight', 'bold') ? "toolbar-btn active" : "toolbar-btn"}
                                    data-type="light" data-tip="הדגשה (ctrl + b)" data-place="bottom" onClick={() => {
                                        let display_bold = !this.is_selcted_cell_styled('fontWeight', 'bold');
                                        let value = display_bold ? "bold" : "normal";
                                        this.insert_style("fontWeight", value);
                                    }}>
                                    <div className="x-spreadsheet-icon">
                                        <div className="x-spreadsheet-icon-img font-bold" ></div>
                                    </div>
                                </div>
                                <div className={this.is_selcted_cell_styled('fontStyle', 'italic') ? "toolbar-btn active" : "toolbar-btn"} data-tip="הטייה (ctrl + i)" data-place="bottom"
                                    data-type="light" onClick={() => {
                                        let italic = !this.is_selcted_cell_styled('fontStyle', 'italic');
                                        let value = italic ? "italic" : "normal";
                                        this.insert_style("fontStyle", value);
                                    }}>
                                    <div className="toolbar-btn-icon">
                                        <div className="toolbar-btn-icon-img fontitalic" ></div>
                                    </div>
                                </div>
                                <div className={this.is_selcted_cell_styled('textDecorationLine', 'underline') ? "toolbar-btn active" : "toolbar-btn"} data-tip="קו תחתון (ctrl + u)" data-place="bottom"
                                    data-type="light" onClick={() => {
                                        let underline = !this.is_selcted_cell_styled('textDecorationLine', 'underline');
                                        let value = underline ? "underline" : "none";
                                        this.insert_style("textDecorationLine", value);
                                    }} >
                                    <div className="toolbar-btn-icon">
                                        <div className="toolbar-btn-icon-img undeline" ></div>
                                    </div>
                                </div>
                                <div className="toolbar-btn" data-tip="צבע טקסט" data-place="bottom"
                                    data-type="light"
                                    onClick={() => {
                                        this.setState({
                                            display_text_color_dropdown: this.state.display_text_color_dropdown === 'none' ?
                                                'block' : 'none'
                                        })
                                    }}>
                                    <div className="toolbar-dropdown bottom-left">
                                        <div className="toolbar-dropdown-header" >
                                            <div className="x-spreadsheet-icon" style={{
                                                height: '16px', borderBottom: '3px solid ' +
                                                    `${font_color == '' ? 'rgb(10, 10, 10)' : font_color} `
                                            }}>
                                                <div className="x-spreadsheet-icon-img color"></div>
                                            </div>
                                        </div>
                                        <div className="toolbar-dropdown-content" style={{ width: 'auto', display: this.state.display_text_color_dropdown }}>
                                            <CompactPicker onChangeComplete={(color) => {
                                                this.insert_style("color", color.hex);
                                            }}></CompactPicker>
                                        </div>
                                    </div>
                                </div>
                                <div className="toolbar-btn" data-tip="צבע תא" data-place="bottom"
                                    data-type="light"
                                    onClick={() => {
                                        this.setState({
                                            display_bg_color_dropdown: this.state.display_bg_color_dropdown === 'none' ?
                                                'block' : 'none'
                                        })
                                    }}>
                                    <div className="toolbar-dropdown bottom-left">
                                        <div className="toolbar-dropdown-header" >
                                            <div className="x-spreadsheet-icon" style={{
                                                height: '16px', borderBottom: '3px solid ' +
                                                    `${bg_color == '' ? 'rgb(10, 10, 10)' : bg_color} `
                                            }}>
                                                <div className="x-spreadsheet-icon-img bgcolor"></div>
                                            </div>
                                        </div>
                                        <div className="toolbar-dropdown-content" style={{ width: 'auto', display: this.state.display_bg_color_dropdown }}>
                                            <CompactPicker onChangeComplete={(color) => {
                                                this.insert_style("backgroundColor", color.hex);
                                            }}></CompactPicker>
                                        </div>
                                    </div>
                                </div>
                                <div className="toolbar-btn" data-tip="אחד תאים" data-place="bottom"
                                    data-type="light" onClick={() => {
                                        if (this.state.selected_keys.length > 1) {
                                            const selected_keys_array = this.state.selected_keys.sort();
                                            const min_key = selected_keys_array[0];
                                            const max_key = selected_keys_array[selected_keys_array.length - 1];
                                            let merge_arr = this.state.merge_cells;
                                            const width = (max_key - min_key) / 100 + "".split('.')[1];
                                            console.log(width);
                                            merge_arr.push({
                                                key: min_key, width: 1,
                                                height: (Math.floor(max_key / 50) - Math.floor(min_key / 50)) + 1
                                            })
                                            this.setState({ merge_cells: merge_arr, selected_keys: [0] })
                                        }
                                    }}>
                                    <div className="x-spreadsheet-icon">
                                        <div className="x-spreadsheet-icon-img merge">
                                        </div>
                                    </div>
                                </div>
                                <div className="x-spreadsheet-toolbar-divider"></div>
                                <div className="toolbar-btn" onClick={() => {
                                    this.setState({
                                        display_h_align_dropdown: this.state.display_h_align_dropdown === 'none' ?
                                            'block' : 'none'
                                    })
                                }}>
                                    <div className="x-spreadsheet-dropdown bottom-left">
                                        <div className="x-spreadsheet-dropdown-header">
                                            <div className="x-spreadsheet-icon arrow-left">
                                                <div className="x-spreadsheet-icon-img align-center">
                                                </div>
                                            </div>
                                            <div className="x-spreadsheet-icon arrow-right">
                                                <div className="x-spreadsheet-icon-img arrow-down">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="x-spreadsheet-dropdown-content" style={{ width: "auto", display: this.state.display_h_align_dropdown }}>
                                            <div className="x-spreadsheet-item"><div className="x-spreadsheet-icon">
                                                <div className="x-spreadsheet-icon-img align-left">
                                                </div>
                                            </div>
                                            </div>
                                            <div className="x-spreadsheet-item">
                                                <div className="x-spreadsheet-icon">
                                                    <div className="x-spreadsheet-icon-img align-center">
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="x-spreadsheet-item">
                                                <div className="x-spreadsheet-icon">
                                                    <div className="x-spreadsheet-icon-img align-right">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="toolbar-btn" data-tooltip="יישור אנכי" onClick={() => {
                                    this.setState({
                                        display_v_align_dropdown: this.state.display_v_align_dropdown === 'none' ?
                                            'block' : 'none'
                                    })
                                }}>
                                    <div className="x-spreadsheet-dropdown bottom-left">
                                        <div className="x-spreadsheet-dropdown-header">
                                            <div className="x-spreadsheet-icon arrow-left">
                                                <div className="x-spreadsheet-icon-img align-middle">
                                                </div></div><div className="x-spreadsheet-icon arrow-right">
                                                <div className="x-spreadsheet-icon-img arrow-down">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="x-spreadsheet-dropdown-content" style={{ width: 'auto', display: this.state.display_v_align_dropdown }}>
                                            <div className="x-spreadsheet-item">
                                                <div className="x-spreadsheet-icon">
                                                    <div className="x-spreadsheet-icon-img align-top">
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="x-spreadsheet-item">
                                                <div className="x-spreadsheet-icon">
                                                    <div className="x-spreadsheet-icon-img align-middle">
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="x-spreadsheet-item">
                                                <div className="x-spreadsheet-icon">
                                                    <div className="x-spreadsheet-icon-img align-bottom">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section>
                            <div style={{ width: '100%', overflowX: 'auto', overflowY: 'auto' }}>
                                <div className='resp-table'
                                    onKeyDown={(e) => this.key_press(e)}>
                                    {
                                        this.render_grid()
                                    }
                                </div>
                            </div>
                        </section>
                    </Sidebar.Pusher>

                </Sidebar.Pushable>

                <ReactTooltip />
            </div >
        )
    }
}