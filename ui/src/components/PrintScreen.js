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
            1: 'א', 2: 'ב', 3: 'ג', 4: 'ד', 5: 'ה', 6: 'ו', 7: 'ז', 8: 'ח', 9: 'ט', 10: 'י',
            11: 'יא', 12: 'יב', 13: 'יג', 14: 'יד', 15: 'טו', 16: 'טז', 17: 'יז', 18: 'יח', 19: 'יט', 20: 'כ',
            21: 'כא', 22: 'כב', 23: 'כג', 24: 'כד', 25: 'כה', 26: 'כו', 27: 'כז', 28: 'כח', 29: 'כט', 30: 'ל',
            31: 'לא', 32: 'לב', 33: 'לג', 34: 'לד', 35: 'לה', 36: 'לו', 37: 'לז', 38: 'לח', 39: 'לט', 40: 'מ',
            41: 'מא', 42: 'מב', 43: 'מג', 44: 'מד', 45: 'מה', 46: 'מו', 47: 'מז', 48: 'מח', 49: 'מט', 50: 'נ',
            51: 'נא', 52: 'נב', 53: 'נג', 54: 'נד', 55: 'נה', 56: 'נו', 57: 'נז', 58: 'נח', 59: 'נט', 60: 'ס',
            61: 'סא', 62: 'סב', 63: 'סג', 64: 'סד', 65: 'סה', 66: 'סו', 67: 'סז', 68: 'סח', 69: 'סט', 70: 'ע',
            71: 'עא', 72: 'עב', 73: 'עג', 74: 'עג', 75: 'עה', 76: 'עו', 77: 'עז', 78: 'עח', 79: 'עט', 80: 'פ',
            81: 'פא', 82: 'פב', 83: 'פג', 84: 'פד', 85: 'פה', 86: 'פו', 87: 'פז', 88: 'פח', 89: 'פט', 90: 'צ',
            91: 'צא', 92: 'צב', 93: 'צג', 94: 'צד', 95: 'צה', 96: 'צו', 97: 'צז', 98: 'צח', 99: 'צט', 100: 'ק',
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

        const index_file_name = `${this.props.selected_time === 'kipur' ? ' יום כיפור' : ' ראש השנה'} ${this.props.pepole_list_data.find(d => d.id === this.props.selected_year).name}`
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
                            filename={`${this.state.index_file_name}.csv`} ref={rf => this.downloder = rf} data={this.state.index_data}>הדפס אינדקס</CSVLink>
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