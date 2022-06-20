import React from 'react';
import { Cell } from './Cell';
import {
    Icon
} from 'semantic-ui-react';
import { CompactPicker } from 'react-color';

export class Grid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            number_of_cells: 10000,
            numbers_of_cells_in_row: 100,
            number_of_rows: 100,
            mouse_click: false,
            show_tooltips: [true, true, true, true, true],
            display_fontsize_dropdown: 'none',
            display_text_color_dropdown: 'none',
            display_bg_color_dropdown: 'none',
            display_h_align_dropdown: 'none',
            display_v_align_dropdown: 'none',
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        //avoid new rendered in mouse up
        if (this.state.mouse_click && !nextState.mouse_click) {
            return false
        }
        return true
    }

    key_press = (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
            const selected_keys = this.props.selected_keys;
            let selected_key = selected_keys[selected_keys.length - 1];
            console.log(selected_key)
            const row = this.state.number_of_cells / this.state.numbers_of_cells_in_row;
            const coulmn = selected_key % this.state.numbers_of_cells_in_row

            switch (e.key) {
                case "ArrowRight":
                    selected_key = coulmn + 1 < this.state.numbers_of_cells_in_row ? selected_key + 1 : selected_key;
                    break;
                case "ArrowLeft":
                    selected_key = coulmn !== 0 ? selected_key - 1 : selected_key;
                    break;
                case "ArrowUp":
                    selected_key = selected_key >= row ? selected_key - row : selected_key;
                    break;
                case "ArrowDown":
                    selected_key = selected_key < this.state.number_of_cells - row ? selected_key + row : selected_key;
                    break;

                default:
                    break;
            }
            this.props.update_state({ selected_keys: [selected_key] })
        }
    }

    cell_selected = (key) => {
        const selected_key = key;
        this.props.update_state({ selected_keys: [selected_key] })
        this.setState({ mouse_click: true })
    }

    get_style = (key) => {
        const selected_style = this.props.cells_style.find(s => s.key === key);
        if (!selected_style)
            return {};
        return { ...selected_style };
    }

    remove_anneccery_keys = (selected_keys, start_row, end_row, start_coulmn, end_coulmn) => {
        const rows = this.state.number_of_rows;
        const coulmns_in_row = this.state.numbers_of_cells_in_row;
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

    handle_mouse_over_out = (key, over) => {
        const rows = this.state.number_of_rows;
        const coulmns_in_row = this.state.numbers_of_cells_in_row;

        if (this.state.mouse_click) {
            let selected_keys = this.props.selected_keys;
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
            this.props.update_state({ selected_keys: selected_keys })
        }
    }

    render_grid = () => {
        let coulmns = [];
        for (let key = 0; key < this.state.number_of_cells; key++) {
            //const merge = this.props.merge_cells.find(m => m.key === key);
            coulmns.push(
                //merge ? this.render_merge_coulmn(key, merge) :
                this.render_coulmn(key)
            );
        }
        return coulmns;
    }

    render_coulmn = (cell_key) => {
        const merge_cell = this.props.merge_cells.find(cell => cell.key === cell_key);

        //ignore keys of cells that spans by mrege cell
        if (this.props.merge_cells.find(cell => cell.ignore_cells.includes(cell_key)))
            return

        let style = this.get_style(cell_key);

        if (merge_cell) {
            style.gridColumn = `span ${merge_cell.coulmns}`;
            style.gridRow = `span ${merge_cell.rows}`;
        }
        return <Cell key={cell_key}
            style={style}
            selected={this.props.selected_keys.includes(cell_key) ? true : false}
            text={this.get_text(cell_key)}
            onMouseUp={() => {
                this.setState({ mouse_click: false })
            }}
            onMouseOver={() => this.handle_mouse_over_out(cell_key, true)}
            // onMouseOut={() => this.handle_mouse_over_out(cell_key, false)}
            onMouseDown={() => this.cell_selected(cell_key)}
            onKeyDown={(text) => {
                let text_cells = this.props.text_cells;
                let text_cell = text_cells.find(c => c.key === cell_key);
                if (!text_cell) {
                    text_cell = { key: cell_key, text: text };
                    text_cells.push(text_cell)
                }
                else
                    text_cell.text = text

                this.props.update_state({ text_cells: text_cells })
            }}
        />
    }

    get_text = (key) => {
        const text_cell = this.props.text_cells.find(c => c.key === key);
        if (!text_cell)
            return '';
        if (text_cell.selected_pepole)
            return text_cell.selected_pepole.name
        return text_cell.text;
    }

    _get_selected_font_size = () => {
        const key = this.props.selected_keys[0];
        if (key) {
            const selected_cell_style = this.props.cells_style.find(c => c.key === key);
            if (selected_cell_style && selected_cell_style['fontSize'])
                return selected_cell_style['fontSize'].replace('px', '')
            else
                return 14
        }
        return 14;
    }

    insert_style = (style_key, style_value) => {
        let cells_style = this.props.cells_style;

        for (let index = 0; index < this.props.selected_keys.length; index++) {
            let cell_style = cells_style.find(c => c.key === this.props.selected_keys[index])
            if (!cell_style) {
                cell_style = { key: this.props.selected_keys[index] }
                cell_style[style_key] = style_value;
                cells_style.push(cell_style)
            }
            else {
                cell_style[style_key] = style_value;
            }
        }
        this.props.update_state({ cells_style: cells_style });
    }

    is_selected_cell_styled = (style_key, style_value) => {
        const key = this.props.selected_keys[0];
        if (key) {
            const selected_cell_style = this.props.cells_style.find(c => c.key === key);
            if (selected_cell_style && selected_cell_style[style_key] && selected_cell_style[style_key] === style_value)
                return true
            else if (!selected_cell_style || !selected_cell_style[style_key])
                return null
            else
                return false
        }
        return null;
    }

    _is_merge_cell = () => {
        const key = this.props.selected_keys[0];
        const merge_cell = this.props.merge_cells.find(m => m.key === key);
        return merge_cell ? true : false;
    }

    _get_selected_cell_style = (style_key) => {
        const key = this.props.selected_keys[0];
        if (key) {
            const selected_cell_style = this.props.cells_style.find(c => c.key == key);
            if (selected_cell_style && selected_cell_style[style_key])
                return selected_cell_style[style_key]
            else
                return ''
        }
        return '';
    }

    _render_toolbar = () => {
        const font_color = this._get_selected_cell_style('color');
        const bg_color = this._get_selected_cell_style('backgroundColor');
        return (
            <div className="toolbar">
                <div className="toolbar-btns">
                    {this.props.selected_pepole_data.length > 0 &&
                        <div className="toolbar-btn">
                            {this.props.sidebar_visible &&
                                <Icon name="arrow alternate circle left outline" size='big' onClick={() => {
                                    this.props.update_state({ sidebar_visible: false })
                                }}></Icon>
                            }
                            {!this.props.sidebar_visible &&
                                <Icon name="arrow alternate circle right outline" size='big' onClick={() => {
                                    this.props.update_state({ sidebar_visible: true })
                                }}></Icon>
                            }
                        </div>
                    }
                    <div className="toolbar-btn tooltip" onClick={() => {
                        let cells_style = this.props.cells_style;
                        let merge_cells = this.props.merge_cells;
                        let text_cells = this.props.text_cells;
                        let selected_pepole_data = this.props.selected_pepole_data;
                        let count_of_pepole = this.props.count_of_pepole;

                        for (let index = 0; index < this.props.selected_keys.length; index++) {
                            const key = this.props.selected_keys[index];
                            cells_style = cells_style.filter(c => c.key !== key);
                            merge_cells = merge_cells.filter(m => m.key !== key);
                            const text_cell = text_cells.find(t => t.key === key);

                            if (text_cell) {
                                if (text_cell.selected_pepole) {
                                    let selected = selected_pepole_data.find(p => p.key === text_cell.selected_pepole?.key)
                                    selected.value = selected.value + 1;
                                    count_of_pepole++;
                                }
                            }
                            text_cells = text_cells.filter(t => t.key !== key);
                        }
                        this.props.update_state({
                            cells_style: cells_style, merge_cells: merge_cells,
                            text_cells: text_cells, selected_pepole_data: selected_pepole_data
                        })
                        this.props.on_clear_cell(count_of_pepole);
                    }}>
                        <span className="tooltiptext">נקה עיצוב</span>
                        <div className="toolbar-btn-icon">
                            <div className="toolbar-btn-icon-img clearformat" ></div>
                        </div>
                    </div>
                    <div className="toolbar-btn tooltip"
                        onClick={() => {
                            let show_tooltips = this.state.show_tooltips;
                            show_tooltips[0] = this.state.display_fontsize_dropdown === 'none' ? false : true
                            this.setState({
                                display_fontsize_dropdown: this.state.display_fontsize_dropdown === 'none' ?
                                    'block' : 'none',
                                show_tooltips: show_tooltips
                            })
                        }}>

                        {this.state.show_tooltips[0] &&
                            <span className="tooltiptext">גודל גופן</span>
                        }

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
                    <div className={this.is_selected_cell_styled('fontWeight', 'bold') ? "toolbar-btn active tooltip" : "toolbar-btn tooltip"}
                        onClick={() => {
                            let display_bold = !this.is_selected_cell_styled('fontWeight', 'bold');
                            let value = display_bold ? "bold" : "normal";
                            this.insert_style("fontWeight", value);
                        }}>
                        <span className="tooltiptext">הדגשה</span>
                        <div className="toolbar-btn-icon">
                            <div className="toolbar-btn-icon-img fontbold" ></div>
                        </div>
                    </div>
                    <div className={this.is_selected_cell_styled('fontStyle', 'italic') ? "toolbar-btn active tooltip" : "toolbar-btn tooltip"}
                        onClick={() => {
                            let italic = !this.is_selected_cell_styled('fontStyle', 'italic');
                            let value = italic ? "italic" : "normal";
                            this.insert_style("fontStyle", value);
                        }}>
                        <span className="tooltiptext">הטייה</span>
                        <div className="toolbar-btn-icon">
                            <div className="toolbar-btn-icon-img fontitalic" ></div>
                        </div>
                    </div>
                    <div className={this.is_selected_cell_styled('textDecorationLine', 'underline') ? "toolbar-btn active tooltip" : "toolbar-btn tooltip"}
                        onClick={() => {
                            let underline = !this.is_selected_cell_styled('textDecorationLine', 'underline');
                            let value = underline ? "underline" : "none";
                            this.insert_style("textDecorationLine", value);
                        }} >
                        <span className="tooltiptext">קו תחתון</span>
                        <div className="toolbar-btn-icon">
                            <div className="toolbar-btn-icon-img undeline" ></div>
                        </div>
                    </div>
                    <div className="toolbar-btn tooltip"
                        onClick={() => {
                            let show_tooltips = this.state.show_tooltips;
                            show_tooltips[1] = this.state.display_text_color_dropdown === 'none' ? false : true
                            this.setState({
                                display_text_color_dropdown: this.state.display_text_color_dropdown === 'none' ?
                                    'block' : 'none',
                                show_tooltips: show_tooltips
                            })
                        }}>
                        {this.state.show_tooltips[1] &&
                            <span className="tooltiptext">צבע טקסט</span>
                        }

                        <div className="toolbar-dropdown bottom-left">
                            <div className="toolbar-dropdown-header" >
                                <div className="x-spreadsheet-icon" style={{
                                    height: '16px', borderBottom: '3px solid ' +
                                        `${font_color === '' ? 'rgb(10, 10, 10)' : font_color} `
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
                    <div className="toolbar-btn tooltip"
                        onClick={() => {
                            let show_tooltips = this.state.show_tooltips;
                            show_tooltips[2] = this.state.display_text_color_dropdown === 'none' ? false : true
                            this.setState({
                                display_bg_color_dropdown: this.state.display_bg_color_dropdown === 'none' ?
                                    'block' : 'none',
                                show_tooltips: show_tooltips
                            })
                        }}>
                        {this.state.show_tooltips[2] &&
                            <span className="tooltiptext">צבע תא</span>
                        }
                        <div className="toolbar-dropdown bottom-left">
                            <div className="toolbar-dropdown-header" >
                                <div className="x-spreadsheet-icon" style={{
                                    height: '16px', borderBottom: '3px solid ' +
                                        `${bg_color === '' ? 'rgb(10, 10, 10)' : bg_color} `
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
                    <div className={this._is_merge_cell() ? "toolbar-btn active tooltip" : "toolbar-btn tooltip"}
                        onClick={() => {
                            if (this.props.selected_keys.length > 1) {
                                let selected_keys_array = this.props.selected_keys;
                                selected_keys_array = selected_keys_array.sort((a, b) => { return a - b });
                                const min_key = selected_keys_array[0];
                                let coulmns = [];
                                let rows = [];
                                for (let index = 0; index < selected_keys_array.length; index++) {
                                    let coulmn = selected_keys_array[index] % this.state.numbers_of_cells_in_row;
                                    if (!coulmns.includes(coulmn))
                                        coulmns.push(coulmn);
                                    let row = Math.round(selected_keys_array[index] / this.state.numbers_of_cells_in_row);
                                    if (!rows.includes(row))
                                        rows.push(row);
                                }

                                let merge_arr = this.props.merge_cells;
                                merge_arr.push({
                                    key: min_key, coulmns: coulmns.length,
                                    rows: rows.length,
                                    ignore_cells: selected_keys_array.filter(key => key !== min_key)
                                })
                                this.props.update_state({ merge_cells: merge_arr, selected_keys: [min_key] })
                            }
                        }}>
                        <span className="tooltiptext">אחד תאים</span>
                        <div className="x-spreadsheet-icon">
                            <div className="x-spreadsheet-icon-img merge">
                            </div>
                        </div>
                    </div>
                    <div className="x-spreadsheet-toolbar-divider"></div>
                    <div className="toolbar-btn tooltip"
                        onClick={() => {
                            let show_tooltips = this.state.show_tooltips;
                            show_tooltips[3] = this.state.display_text_color_dropdown === 'none' ? false : true
                            this.setState({
                                display_h_align_dropdown: this.state.display_h_align_dropdown === 'none' ?
                                    'block' : 'none',
                                show_tooltips: show_tooltips
                            })
                        }}>
                        {this.state.show_tooltips[3] &&
                            <span className="tooltiptext">יישור טקסט</span>
                        }
                        <div className="x-spreadsheet-dropdown bottom-left">
                            <div className="x-spreadsheet-dropdown-header">
                                {this.is_selected_cell_styled('justifyContent', 'flex-start') &&
                                    <div className="x-spreadsheet-icon arrow-left">
                                        <div className="x-spreadsheet-icon-img align-left">
                                        </div>
                                    </div>
                                }

                                {this.is_selected_cell_styled('justifyContent', 'flex-end') &&
                                    <div className="x-spreadsheet-icon arrow-left">
                                        <div className="x-spreadsheet-icon-img align-right">
                                        </div>
                                    </div>
                                }

                                {(this.is_selected_cell_styled('justifyContent', 'center')
                                    || this.is_selected_cell_styled('justifyContent', 'center') == null) &&
                                    <div className="x-spreadsheet-icon arrow-left">
                                        <div className="x-spreadsheet-icon-img align-center">
                                        </div>
                                    </div>
                                }

                                <div className="x-spreadsheet-icon arrow-right">
                                    <div className="x-spreadsheet-icon-img arrow-down">
                                    </div>
                                </div>

                            </div>
                            <div className="x-spreadsheet-dropdown-content" style={{ width: "auto", display: this.state.display_h_align_dropdown }}>
                                <div className="x-spreadsheet-item">
                                    <div className="x-spreadsheet-icon">
                                        <div className="x-spreadsheet-icon-img align-left" onClick={() => {
                                            this.insert_style("justifyContent", 'flex-start');
                                        }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="x-spreadsheet-item">
                                    <div className="x-spreadsheet-icon">
                                        <div className="x-spreadsheet-icon-img align-center" onClick={() => {
                                            this.insert_style("justifyContent", 'center');
                                        }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="x-spreadsheet-item">
                                    <div className="x-spreadsheet-icon">
                                        <div className="x-spreadsheet-icon-img align-right" onClick={() => {
                                            this.insert_style("justifyContent", 'flex-end');
                                        }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="toolbar-btn tooltip"
                        onClick={() => {
                            let show_tooltips = this.state.show_tooltips;
                            show_tooltips[4] = this.state.display_text_color_dropdown === 'none' ? false : true
                            this.setState({
                                display_v_align_dropdown: this.state.display_v_align_dropdown === 'none' ?
                                    'block' : 'none',
                                show_tooltips: show_tooltips
                            })
                        }}>
                        {this.state.show_tooltips[4] &&
                            <span className="tooltiptext">יישור טקסט</span>
                        }
                        <div className="x-spreadsheet-dropdown bottom-left">
                            <div className="x-spreadsheet-dropdown-header">
                                {(this.is_selected_cell_styled('alignItems', 'center')
                                    || this.is_selected_cell_styled('alignItems', 'center') == null) &&
                                    <div className="x-spreadsheet-icon arrow-left">
                                        <div className="x-spreadsheet-icon-img align-middle">
                                        </div>
                                    </div>
                                }
                                {this.is_selected_cell_styled('alignItems', 'flex-start')
                                    &&
                                    <div className="x-spreadsheet-icon arrow-left">
                                        <div className="x-spreadsheet-icon-img align-top">
                                        </div>
                                    </div>
                                }
                                {this.is_selected_cell_styled('alignItems', 'flex-end')
                                    &&
                                    <div className="x-spreadsheet-icon arrow-left">
                                        <div className="x-spreadsheet-icon-img align-bottom">
                                        </div>
                                    </div>
                                }
                                <div className="x-spreadsheet-icon arrow-right">
                                    <div className="x-spreadsheet-icon-img arrow-down">
                                    </div>
                                </div>
                            </div>
                            <div className="x-spreadsheet-dropdown-content" style={{ width: 'auto', display: this.state.display_v_align_dropdown }}>
                                <div className="x-spreadsheet-item">
                                    <div className="x-spreadsheet-icon">
                                        <div className="x-spreadsheet-icon-img align-top" onClick={() => {
                                            this.insert_style("alignItems", 'flex-start');
                                        }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="x-spreadsheet-item">
                                    <div className="x-spreadsheet-icon">
                                        <div className="x-spreadsheet-icon-img align-middle" onClick={() => {
                                            this.insert_style("alignItems", 'center');
                                        }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="x-spreadsheet-item">
                                    <div className="x-spreadsheet-icon">
                                        <div className="x-spreadsheet-icon-img align-bottom" onClick={() => {
                                            this.insert_style("alignItems", 'flex-end');
                                        }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    render() {
        return (
            <section>
                {this._render_toolbar()}
                {/* //scroller */}
                <div style={{ width: window.innerWidth - 25 + 'px', overflowX: 'scroll', position: 'sticky', top: '40px' }} ref={rf => this.scroller = rf} onScroll={(event, data) => {
                    this.container.scrollLeft = this.scroller.scrollLeft
                }}>
                    <div style={{ width: this.state.numbers_of_cells_in_row * 150 + 'px', height: '1px' }}>
                    </div>
                </div>
                <div>
                    <div style={{ width: window.innerWidth - 25 + 'px', overflowX: 'scroll' }} ref={rf => this.container = rf} >
                        <div className='container'
                            onKeyDown={(e) => this.key_press(e)}>
                            {
                                this.render_grid()
                            }
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}