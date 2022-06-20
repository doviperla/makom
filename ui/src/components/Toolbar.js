import React from 'react';


export class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="toolbar">
                <div className="toolbar-btns">
                    {this.props.list_btn_visible &&
                        <div className="toolbar-btn">
                            {this.state.sidebar_visible &&
                                <Icon name="arrow alternate circle left outline" size='big' onClick={() => {
                                    this.setState({ sidebar_visible: false })
                                }}></Icon>
                            }
                            {!this.state.sidebar_visible &&
                                <Icon name="arrow alternate circle right outline" size='big' onClick={() => {
                                    this.setState({ sidebar_visible: true })
                                }}></Icon>
                            }
                        </div>
                    }
                    <div className="toolbar-btn tooltip" onClick={() => {
                        let cells_style = this.state.cells_style;
                        let merge_cells = this.state.merge_cells;
                        let text_cells = this.state.text_cells;
                        let selected_pepole_data = this.state.selected_pepole_data;
                        let count_of_pepole = this.state.count_of_pepole;

                        for (let index = 0; index < this.state.selected_keys.length; index++) {
                            const key = this.state.selected_keys[index];
                            cells_style = cells_style.filter(c => c.key != key);
                            merge_cells = merge_cells.filter(m => m.key != key);
                            const text_cell = text_cells.find(t => t.key === key);

                            if (text_cell) {
                                if (text_cell.selected_pepole) {
                                    let selected = selected_pepole_data.find(p => p.key == text_cell.selected_pepole.key)
                                    selected.value = selected.value + 1;
                                    count_of_pepole++;
                                }
                            }
                            text_cells = text_cells.filter(t => t.key != key);
                        }
                        this.setState({
                            cells_style: cells_style, merge_cells: merge_cells,
                            text_cells: text_cells, selected_pepole_data: selected_pepole_data,
                            count_of_pepole: count_of_pepole
                        })
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
                    <div className={this.is_selcted_cell_styled('fontWeight', 'bold') ? "toolbar-btn active tooltip" : "toolbar-btn tooltip"}
                        onClick={() => {
                            let display_bold = !this.is_selcted_cell_styled('fontWeight', 'bold');
                            let value = display_bold ? "bold" : "normal";
                            this.insert_style("fontWeight", value);
                        }}>
                        <span className="tooltiptext">הדגשה</span>
                        <div className="toolbar-btn-icon">
                            <div className="toolbar-btn-icon-img fontbold" ></div>
                        </div>
                    </div>
                    <div className={this.is_selcted_cell_styled('fontStyle', 'italic') ? "toolbar-btn active tooltip" : "toolbar-btn tooltip"}
                        onClick={() => {
                            let italic = !this.is_selcted_cell_styled('fontStyle', 'italic');
                            let value = italic ? "italic" : "normal";
                            this.insert_style("fontStyle", value);
                        }}>
                        <span className="tooltiptext">הטייה</span>
                        <div className="toolbar-btn-icon">
                            <div className="toolbar-btn-icon-img fontitalic" ></div>
                        </div>
                    </div>
                    <div className={this.is_selcted_cell_styled('textDecorationLine', 'underline') ? "toolbar-btn active tooltip" : "toolbar-btn tooltip"}
                        onClick={() => {
                            let underline = !this.is_selcted_cell_styled('textDecorationLine', 'underline');
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
                    <div className={this._is_merge_cell() ? "toolbar-btn active tooltip" : "toolbar-btn tooltip"}
                        onClick={() => {
                            if (this.state.selected_keys.length > 1) {
                                let selected_keys_array = this.state.selected_keys;
                                selected_keys_array = selected_keys_array.sort((a, b) => { return a - b });
                                const min_key = selected_keys_array[0];
                                console.log(selected_keys_array)
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

                                let merge_arr = this.state.merge_cells;
                                console.log(coulmns);
                                merge_arr.push({
                                    key: min_key, coulmns: coulmns.length,
                                    rows: rows.length,
                                    ignore_cells: selected_keys_array.filter(key => key != min_key)
                                })
                                console.log(merge_arr)
                                this.setState({ merge_cells: merge_arr, selected_keys: [min_key] })
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
                                {this.is_selcted_cell_styled('justifyContent', 'flex-start') &&
                                    <div className="x-spreadsheet-icon arrow-left">
                                        <div className="x-spreadsheet-icon-img align-left">
                                        </div>
                                    </div>
                                }

                                {this.is_selcted_cell_styled('justifyContent', 'flex-end') &&
                                    <div className="x-spreadsheet-icon arrow-left">
                                        <div className="x-spreadsheet-icon-img align-right">
                                        </div>
                                    </div>
                                }

                                {(this.is_selcted_cell_styled('justifyContent', 'center')
                                    || this.is_selcted_cell_styled('justifyContent', 'center') == null) &&
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
                                {(this.is_selcted_cell_styled('alignItems', 'center')
                                    || this.is_selcted_cell_styled('alignItems', 'center') == null) &&
                                    <div className="x-spreadsheet-icon arrow-left">
                                        <div className="x-spreadsheet-icon-img align-middle">
                                        </div>
                                    </div>
                                }
                                {this.is_selcted_cell_styled('alignItems', 'flex-start')
                                    &&
                                    <div className="x-spreadsheet-icon arrow-left">
                                        <div className="x-spreadsheet-icon-img align-top">
                                        </div>
                                    </div>
                                }
                                {this.is_selcted_cell_styled('alignItems', 'flex-end')
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
}