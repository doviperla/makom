import React from 'react';
import { CSVLink } from "react-csv";
import {
    Button,
    Icon
} from 'semantic-ui-react';

export class PrintScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index_file_name: null,
            index_data: [],
            csv_download: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState?.index_data?.length === 0 && this.state?.index_data?.length > 0) {
            console.log(this.state?.index_data)
            this.convert_json_to_csv(this.state.index_data, this.state.index_file_name)
        }
    }


    render_index_rows = () => {
        const print_data = this.props.print_data;
        let gridTemplateRows = '';
        for (let index = 0; index < print_data.sum_rows; index++) {
            gridTemplateRows += `80px `
        }
        let style = {
            display: 'grid',
            gridTemplateColumns: `150px`,
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
        const print_data = this.props.print_data;
        const style = {
            backgroundColor: 'gray',
            color: 'white',
            border: '1px solid #A5A5A5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
        let row_index = 0;
        for (let index = 0; index < print_data.sum_rows; index++) {
            const exist = print_data.rows.includes(index + 1)
            if (exist)
                row_index++;
            coulmns.push(<div tabIndex="0"
                style={style}>
                {exist ? row_index : ''}
                {/* {key} */}
            </div>)
        }
        return coulmns;
    }

    render_index_coulmns = () => {
        const print_data = this.props.print_data;
        let gridTemplateColumns = '';
        for (let index = 0; index <= print_data.sum_coulmns; index++) {
            gridTemplateColumns += `150px `
        }
        let style = {
            display: 'grid',
            gridTemplateColumns: gridTemplateColumns,
            gridTemplateRows: `80px`,

        }
        return <div style={style}>
            {
                this.render_index_coulmn()
            }
        </div>
    }

    render_index_coulmn = () => {
        let coulmns = [];
        const print_data = this.props.print_data;
        const text_coulmns = print_data.coulmns;
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
        let coulmn_index = 0;
        for (let index = 0; index <= print_data.sum_coulmns; index++) {
            let text = '';
            if (text_coulmns.includes(index + 1)) {
                text = this.gematriya(coulmn_index + 1);
                coulmn_index++;
            }
            coulmns.push(<div tabIndex="0"
                style={style}>
                {text}
            </div>)
        }
        return coulmns;
    }

    gematriya = (number) => {
        const gematriya_obj = {
            1: '??', 2: '??', 3: '??', 4: '??', 5: '??', 6: '??', 7: '??', 8: '??', 9: '??', 10: '??',
            11: '????', 12: '????', 13: '????', 14: '????', 15: '????', 16: '????', 17: '????', 18: '????', 19: '????', 20: '??',
            21: '????', 22: '????', 23: '????', 24: '????', 25: '????', 26: '????', 27: '????', 28: '????', 29: '????', 30: '??',
            31: '????', 32: '????', 33: '????', 34: '????', 35: '????', 36: '????', 37: '????', 38: '????', 39: '????', 40: '??',
            41: '????', 42: '????', 43: '????', 44: '????', 45: '????', 46: '????', 47: '????', 48: '????', 49: '????', 50: '??',
            51: '????', 52: '????', 53: '????', 54: '????', 55: '????', 56: '????', 57: '????', 58: '????', 59: '????', 60: '??',
            61: '????', 62: '????', 63: '????', 64: '????', 65: '????', 66: '????', 67: '????', 68: '????', 69: '????', 70: '??',
            71: '????', 72: '????', 73: '????', 74: '????', 75: '????', 76: '????', 77: '????', 78: '????', 79: '????', 80: '??',
            81: '????', 82: '????', 83: '????', 84: '????', 85: '????', 86: '????', 87: '????', 88: '????', 89: '????', 90: '??',
            91: '????', 92: '????', 93: '????', 94: '????', 95: '????', 96: '????', 97: '????', 98: '????', 99: '????', 100: '??',
        }

        return gematriya_obj[number];
    }

    render_print_container = () => {
        const print_data = this.props.print_data;
        let gridTemplateColumns = '';
        let gridTemplateRows = '';

        for (let index = 0; index < print_data.sum_coulmns; index++) {
            gridTemplateColumns += `150px `
        }
        for (let index = 0; index < print_data.sum_rows; index++) {
            gridTemplateRows += `80px `
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
        let index_arr = [];
        let coulmns = [];
        const print_data = this.props.print_data;
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
                cells.push((row * this.props.numbers_of_cells_in_row) + col)
            }
        }
        cells = cells.sort((a, b) => { return a - b });
        for (let index = 0; index < cells.length; index++) {
            coulmns.push(
                this.render_print_coulmn(cells[index], index_arr)
            );
        }

        const index_file_name = `${this.props.selected_time === 'kipur' ? ' ?????? ??????????' : ' ?????? ????????'} ${this.props.pepole_list_data.find(d => d.id === this.props.selected_year).name}`
        if (this.state?.index_data?.length === 0)
            this.setState({ index_file_name: index_file_name, index_data: index_arr });
        return coulmns;
    }

    convert_json_to_csv = (index_data, index_file_name) => {
        let csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF";
        for (let index = 0; index < index_data.length; index++) {
            csvContent += Object.values(index_data[index]).join(",");
            csvContent += "\n"
        }
        console.log(csvContent);
        // const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", csvContent);
        link.setAttribute("download", index_file_name);
        document.body.appendChild(link);

        link.click();
    }

    get_text = (key) => {
        const text_cell = this.props.text_cells.find(c => c.key === key);
        if (!text_cell)
            return '';
        // if (text_cell.selected_pepole)
        //     return text_cell.selected_pepole.name
        return text_cell;
    }

    get_style = (key) => {
        const selected_style = this.props.cells_style.find(s => s.key === key);
        if (!selected_style)
            return {};
        return { ...selected_style };
    }

    render_print_coulmn = (cell, index_arr) => {
        const merge_cell = this.props.merge_cells.find(c => c.key === cell);
        //ignore keys of cells that spans by mrege cell
        if (this.props.merge_cells.find(c => c.ignore_cells.includes(cell)))
            return
        let style = this.get_style(cell);
        let text = '';
        const text_cell = this.props.text_cells.find(c => c.key === cell);
        if (text_cell) {
            if (text_cell.selected_pepole?.name) {
                index_arr.push({ name: text_cell.selected_pepole.name, index: `${Math.round(cell / 100)}, ${this.gematriya(cell % 100)}` })
                text = text_cell.selected_pepole.name;
            }
            else
                text = text_cell.text
            style.border = '1px solid #A5A5A5';
        }

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
            {text}
            {/* {key} */}
        </div>
    }

    render() {
        return (
            <section>
                {/* <div>
                    <Button className='print_btns' style={{ backgroundColor: '#FAAF40', color: 'white' }} onClick={() => this.downloder.link.click()}
                    >
                        <Icon name='save outline' />
                        <CSVLink
                            filename={`${this.state.index_file_name}.csv`} ref={rf => this.downloder = rf} data={this.state.index_data}>???????? ????????????</CSVLink>
                    </Button>
                </div> */}


                <div style={{ width: '100%', overflowX: 'auto', overflowY: 'auto' }} ref={rf => this.scroller = rf} onScroll={(event, data) => {
                    this.container.scrollLeft = this.scroller.scrollLeft
                }}>
                    {
                        this.render_index_coulmns()
                    }
                </div>
                <div style={{ display: 'flex' }} >
                    <div>
                        {
                            this.render_index_rows()
                        }
                    </div>
                    <div style={{ width: '100%', overflowX: 'hidden', overflowY: 'auto' }} ref={rf => this.container = rf} >
                        {
                            this.render_print_container()
                        }
                    </div>
                </div>
            </section>
        )
    }
}