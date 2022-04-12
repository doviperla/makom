import React from 'react';
import '../toolbar.css';

export class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="x-spreadsheet-toolbar" style="width: 1459px;">
                <div class="x-spreadsheet-toolbar-btns">
                    <div class="x-spreadsheet-toolbar-btn disabled" data-tooltip="Undo (Ctrl+Z)">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img undo"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn disabled" data-tooltip="Redo (Ctrl+Y)">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img redo"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Print (Ctrl+P)">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img print"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Paint format">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img paintformat"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Clear format">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img clearformat"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-divider"></div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Format">
                        <div class="x-spreadsheet-dropdown bottom-left">
                            <div class="x-spreadsheet-dropdown-header">
                                <div class="x-spreadsheet-dropdown-title">Normal</div>
                                <div class="x-spreadsheet-icon arrow-right">
                                    <div class="x-spreadsheet-icon-img arrow-down"></div>
                                </div>
                            </div>
                            <div class="x-spreadsheet-dropdown-content" style="width: 220px; display: none;">
                                <div class="x-spreadsheet-item">Normal</div>
                                <div class="x-spreadsheet-item">Plain Text</div>
                                <div class="x-spreadsheet-item divider"></div>
                                <div class="x-spreadsheet-item">
                                    Number
                                    <div class="label">1,000.12</div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    Percent
                                    <div class="label">10.12%</div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    RMB
                                    <div class="label">￥10.00</div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    USD
                                    <div class="label">$10.00</div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    EUR
                                    <div class="label">€10.00</div>
                                </div>
                                <div class="x-spreadsheet-item divider"></div>
                                <div class="x-spreadsheet-item">
                                    Date
                                    <div class="label">26/09/2008</div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    Time
                                    <div class="label">15:59:00</div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    Date time
                                    <div class="label">26/09/2008 15:59:00</div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    Duration
                                    <div class="label">24:01:00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-divider"></div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Font">
                        <div class="x-spreadsheet-dropdown bottom-left">
                            <div class="x-spreadsheet-dropdown-header">
                                <div class="x-spreadsheet-dropdown-title">Helvetica</div>
                                <div class="x-spreadsheet-icon arrow-right">
                                    <div class="x-spreadsheet-icon-img arrow-down"></div>
                                </div>
                            </div>
                            <div class="x-spreadsheet-dropdown-content" style="width: 160px; display: none;">
                                <div class="x-spreadsheet-item">Arial</div>
                                <div class="x-spreadsheet-item">Helvetica</div>
                                <div class="x-spreadsheet-item">Source Sans Pro</div>
                                <div class="x-spreadsheet-item">Comic Sans MS</div>
                                <div class="x-spreadsheet-item">Courier New</div>
                                <div class="x-spreadsheet-item">Verdana</div>
                                <div class="x-spreadsheet-item">Lato</div>
                            </div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Font size">
                        <div class="x-spreadsheet-dropdown bottom-left">
                            <div class="x-spreadsheet-dropdown-header">
                                <div class="x-spreadsheet-dropdown-title">10</div>
                                <div class="x-spreadsheet-icon arrow-right">
                                    <div class="x-spreadsheet-icon-img arrow-down"></div>
                                </div>
                            </div>
                            <div class="x-spreadsheet-dropdown-content" style="width: 60px; display: none;">
                                <div class="x-spreadsheet-item">7.5</div>
                                <div class="x-spreadsheet-item">8</div>
                                <div class="x-spreadsheet-item">9</div>
                                <div class="x-spreadsheet-item">10</div>
                                <div class="x-spreadsheet-item">10.5</div>
                                <div class="x-spreadsheet-item">11</div>
                                <div class="x-spreadsheet-item">12</div>
                                <div class="x-spreadsheet-item">14</div>
                                <div class="x-spreadsheet-item">15</div>
                                <div class="x-spreadsheet-item">16</div>
                                <div class="x-spreadsheet-item">18</div>
                                <div class="x-spreadsheet-item">22</div>
                                <div class="x-spreadsheet-item">24</div>
                                <div class="x-spreadsheet-item">26</div>
                                <div class="x-spreadsheet-item">36</div>
                                <div class="x-spreadsheet-item">42</div>
                            </div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-divider"></div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Font bold (Ctrl+B)">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img font-bold"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Font italic (Ctrl+I)">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img font-italic"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Underline (Ctrl+U)">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img underline"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Strike (Ctrl+U)">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img strike"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Text color">
                        <div class="x-spreadsheet-dropdown bottom-left">
                            <div class="x-spreadsheet-dropdown-header">
                                <div class="x-spreadsheet-icon" style="height: 16px; border-bottom: 3px solid rgb(10, 10, 10); border-top-color: rgb(10, 10, 10); border-right-color: rgb(10, 10, 10); border-left-color: rgb(10, 10, 10);">
                                    <div class="x-spreadsheet-icon-img color"></div>
                                </div>
                            </div>
                            <div class="x-spreadsheet-dropdown-content" style="width: auto; display: none;">
                                <div class="x-spreadsheet-color-palette">
                                    <table class="">
                                        <tbody class="">
                                            <tr class="x-spreadsheet-theme-color-placeholders">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 255, 255);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(0, 1, 0);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(231, 229, 230);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(68, 85, 105);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(91, 156, 214);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(237, 125, 49);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(165, 165, 165);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 192, 1);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(67, 113, 198);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(113, 174, 71);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-theme-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(242, 242, 242);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(127, 127, 127);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(208, 206, 207);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(213, 220, 228);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(222, 234, 246);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(252, 229, 213);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(237, 237, 237);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 242, 205);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(217, 226, 243);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(227, 239, 217);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-theme-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(216, 216, 216);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(89, 89, 89);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(175, 171, 172);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(173, 184, 202);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(189, 215, 238);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(247, 204, 172);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(219, 219, 219);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 229, 154);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(179, 198, 231);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(197, 224, 179);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-theme-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(191, 191, 191);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(63, 63, 63);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(117, 111, 111);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(133, 150, 176);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(156, 194, 230);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(244, 177, 132);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(201, 201, 201);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(254, 217, 100);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(142, 170, 218);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(167, 208, 140);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-theme-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(165, 165, 165);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(38, 38, 38);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(58, 56, 57);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(51, 63, 79);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(46, 117, 181);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(196, 90, 16);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(123, 123, 123);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(191, 142, 1);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(47, 85, 150);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(83, 129, 54);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-theme-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(127, 127, 127);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(12, 12, 12);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(23, 21, 22);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(34, 42, 53);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(31, 78, 122);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(132, 60, 10);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(82, 82, 82);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(126, 96, 0);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(32, 56, 100);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(54, 86, 36);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-standard-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(192, 0, 0);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(254, 0, 0);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(253, 193, 1);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 255, 1);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(147, 208, 81);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(0, 176, 78);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(1, 176, 241);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(1, 112, 193);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(1, 32, 96);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(112, 48, 160);"></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-divider"></div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Fill color">
                        <div class="x-spreadsheet-dropdown bottom-left">
                            <div class="x-spreadsheet-dropdown-header">
                                <div class="x-spreadsheet-icon" style="height: 16px; border-bottom: 3px solid rgb(255, 255, 255); border-top-color: rgb(255, 255, 255); border-right-color: rgb(255, 255, 255); border-left-color: rgb(255, 255, 255);">
                                    <div class="x-spreadsheet-icon-img bgcolor"></div>
                                </div>
                            </div>
                            <div class="x-spreadsheet-dropdown-content" style="width: auto; display: none;">
                                <div class="x-spreadsheet-color-palette">
                                    <table class="">
                                        <tbody class="">
                                            <tr class="x-spreadsheet-theme-color-placeholders">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 255, 255);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(0, 1, 0);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(231, 229, 230);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(68, 85, 105);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(91, 156, 214);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(237, 125, 49);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(165, 165, 165);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 192, 1);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(67, 113, 198);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(113, 174, 71);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-theme-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(242, 242, 242);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(127, 127, 127);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(208, 206, 207);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(213, 220, 228);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(222, 234, 246);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(252, 229, 213);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(237, 237, 237);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 242, 205);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(217, 226, 243);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(227, 239, 217);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-theme-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(216, 216, 216);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(89, 89, 89);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(175, 171, 172);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(173, 184, 202);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(189, 215, 238);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(247, 204, 172);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(219, 219, 219);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 229, 154);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(179, 198, 231);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(197, 224, 179);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-theme-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(191, 191, 191);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(63, 63, 63);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(117, 111, 111);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(133, 150, 176);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(156, 194, 230);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(244, 177, 132);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(201, 201, 201);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(254, 217, 100);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(142, 170, 218);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(167, 208, 140);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-theme-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(165, 165, 165);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(38, 38, 38);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(58, 56, 57);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(51, 63, 79);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(46, 117, 181);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(196, 90, 16);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(123, 123, 123);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(191, 142, 1);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(47, 85, 150);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(83, 129, 54);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-theme-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(127, 127, 127);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(12, 12, 12);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(23, 21, 22);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(34, 42, 53);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(31, 78, 122);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(132, 60, 10);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(82, 82, 82);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(126, 96, 0);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(32, 56, 100);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(54, 86, 36);"></div>
                                                </td>
                                            </tr>
                                            <tr class="x-spreadsheet-standard-colors">
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(192, 0, 0);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(254, 0, 0);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(253, 193, 1);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 255, 1);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(147, 208, 81);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(0, 176, 78);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(1, 176, 241);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(1, 112, 193);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(1, 32, 96);"></div>
                                                </td>
                                                <td class="">
                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(112, 48, 160);"></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Borders">
                        <div class="x-spreadsheet-dropdown bottom-left">
                            <div class="x-spreadsheet-dropdown-header">
                                <div class="x-spreadsheet-icon">
                                    <div class="x-spreadsheet-icon-img border-all"></div>
                                </div>
                            </div>
                            <div class="x-spreadsheet-dropdown-content" style="width: auto; display: none;">
                                <div class="x-spreadsheet-border-palette">
                                    <table class="">
                                        <tbody class="">
                                            <tr class="">
                                                <td class="x-spreadsheet-border-palette-left">
                                                    <table class="">
                                                        <tbody class="">
                                                            <tr class="">
                                                                <td class="">
                                                                    <div class="x-spreadsheet-border-palette-cell">
                                                                        <div class="x-spreadsheet-icon">
                                                                            <div class="x-spreadsheet-icon-img border-all"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="">
                                                                    <div class="x-spreadsheet-border-palette-cell">
                                                                        <div class="x-spreadsheet-icon">
                                                                            <div class="x-spreadsheet-icon-img border-inside"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="">
                                                                    <div class="x-spreadsheet-border-palette-cell">
                                                                        <div class="x-spreadsheet-icon">
                                                                            <div class="x-spreadsheet-icon-img border-horizontal"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="">
                                                                    <div class="x-spreadsheet-border-palette-cell">
                                                                        <div class="x-spreadsheet-icon">
                                                                            <div class="x-spreadsheet-icon-img border-vertical"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="">
                                                                    <div class="x-spreadsheet-border-palette-cell">
                                                                        <div class="x-spreadsheet-icon">
                                                                            <div class="x-spreadsheet-icon-img border-outside"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr class="">
                                                                <td class="">
                                                                    <div class="x-spreadsheet-border-palette-cell">
                                                                        <div class="x-spreadsheet-icon">
                                                                            <div class="x-spreadsheet-icon-img border-left"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="">
                                                                    <div class="x-spreadsheet-border-palette-cell">
                                                                        <div class="x-spreadsheet-icon">
                                                                            <div class="x-spreadsheet-icon-img border-top"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="">
                                                                    <div class="x-spreadsheet-border-palette-cell">
                                                                        <div class="x-spreadsheet-icon">
                                                                            <div class="x-spreadsheet-icon-img border-right"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="">
                                                                    <div class="x-spreadsheet-border-palette-cell">
                                                                        <div class="x-spreadsheet-icon">
                                                                            <div class="x-spreadsheet-icon-img border-bottom"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="">
                                                                    <div class="x-spreadsheet-border-palette-cell">
                                                                        <div class="x-spreadsheet-icon">
                                                                            <div class="x-spreadsheet-icon-img border-none"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td class="x-spreadsheet-border-palette-right">
                                                    <div class="x-spreadsheet-toolbar-btn">
                                                        <div class="x-spreadsheet-dropdown bottom-left">
                                                            <div class="x-spreadsheet-dropdown-header">
                                                                <div class="x-spreadsheet-icon" style="height: 16px; border-bottom: 3px solid rgb(0, 0, 0);">
                                                                    <div class="x-spreadsheet-icon-img line-color"></div>
                                                                </div>
                                                            </div>
                                                            <div class="x-spreadsheet-dropdown-content" style="width: auto; display: none;">
                                                                <div class="x-spreadsheet-color-palette">
                                                                    <table class="">
                                                                        <tbody class="">
                                                                            <tr class="x-spreadsheet-theme-color-placeholders">
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 255, 255);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(0, 1, 0);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(231, 229, 230);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(68, 85, 105);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(91, 156, 214);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(237, 125, 49);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(165, 165, 165);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 192, 1);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(67, 113, 198);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(113, 174, 71);"></div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr class="x-spreadsheet-theme-colors">
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(242, 242, 242);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(127, 127, 127);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(208, 206, 207);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(213, 220, 228);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(222, 234, 246);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(252, 229, 213);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(237, 237, 237);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 242, 205);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(217, 226, 243);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(227, 239, 217);"></div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr class="x-spreadsheet-theme-colors">
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(216, 216, 216);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(89, 89, 89);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(175, 171, 172);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(173, 184, 202);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(189, 215, 238);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(247, 204, 172);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(219, 219, 219);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 229, 154);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(179, 198, 231);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(197, 224, 179);"></div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr class="x-spreadsheet-theme-colors">
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(191, 191, 191);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(63, 63, 63);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(117, 111, 111);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(133, 150, 176);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(156, 194, 230);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(244, 177, 132);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(201, 201, 201);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(254, 217, 100);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(142, 170, 218);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(167, 208, 140);"></div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr class="x-spreadsheet-theme-colors">
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(165, 165, 165);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(38, 38, 38);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(58, 56, 57);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(51, 63, 79);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(46, 117, 181);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(196, 90, 16);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(123, 123, 123);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(191, 142, 1);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(47, 85, 150);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(83, 129, 54);"></div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr class="x-spreadsheet-theme-colors">
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(127, 127, 127);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(12, 12, 12);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(23, 21, 22);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(34, 42, 53);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(31, 78, 122);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(132, 60, 10);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(82, 82, 82);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(126, 96, 0);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(32, 56, 100);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(54, 86, 36);"></div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr class="x-spreadsheet-standard-colors">
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(192, 0, 0);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(254, 0, 0);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(253, 193, 1);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(255, 255, 1);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(147, 208, 81);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(0, 176, 78);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(1, 176, 241);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(1, 112, 193);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(1, 32, 96);"></div>
                                                                                </td>
                                                                                <td class="">
                                                                                    <div class="x-spreadsheet-color-palette-cell" style="background-color: rgb(112, 48, 160);"></div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="x-spreadsheet-toolbar-btn">
                                                        <div class="x-spreadsheet-dropdown bottom-left">
                                                            <div class="x-spreadsheet-dropdown-header">
                                                                <div class="x-spreadsheet-icon">
                                                                    <div class="x-spreadsheet-icon-img line-type"></div>
                                                                </div>
                                                            </div>
                                                            <div class="x-spreadsheet-dropdown-content" style="width: auto; display: none;">
                                                                <div class="x-spreadsheet-item state checked">
                                                                    <div class="x-spreadsheet-line-type">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;">
                                                                            <line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" style="user-select: none;"></line>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div class="x-spreadsheet-item state ">
                                                                    <div class="x-spreadsheet-line-type">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="2" style="user-select: none;">
                                                                            <line x1="0" y1="1.0" x2="50" y2="1.0" stroke-width="2" stroke="black" style="user-select: none;"></line>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div class="x-spreadsheet-item state ">
                                                                    <div class="x-spreadsheet-line-type">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="3" style="user-select: none;">
                                                                            <line x1="0" y1="1.5" x2="50" y2="1.5" stroke-width="3" stroke="black" style="user-select: none;"></line>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div class="x-spreadsheet-item state ">
                                                                    <div class="x-spreadsheet-line-type">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;">
                                                                            <line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="2" style="user-select: none;"></line>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div class="x-spreadsheet-item state ">
                                                                    <div class="x-spreadsheet-line-type">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;">
                                                                            <line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="1" style="user-select: none;"></line>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn disabled" data-tooltip="Merge cells">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img merge"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-divider"></div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Horizontal align">
                        <div class="x-spreadsheet-dropdown bottom-left">
                            <div class="x-spreadsheet-dropdown-header">
                                <div class="x-spreadsheet-icon arrow-left">
                                    <div class="x-spreadsheet-icon-img align-center"></div>
                                </div>
                                <div class="x-spreadsheet-icon arrow-right">
                                    <div class="x-spreadsheet-icon-img arrow-down"></div>
                                </div>
                            </div>
                            <div class="x-spreadsheet-dropdown-content" style="width: auto; display: none;">
                                <div class="x-spreadsheet-item">
                                    <div class="x-spreadsheet-icon">
                                        <div class="x-spreadsheet-icon-img align-left"></div>
                                    </div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    <div class="x-spreadsheet-icon">
                                        <div class="x-spreadsheet-icon-img align-center"></div>
                                    </div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    <div class="x-spreadsheet-icon">
                                        <div class="x-spreadsheet-icon-img align-right"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Vertical align">
                        <div class="x-spreadsheet-dropdown bottom-left">
                            <div class="x-spreadsheet-dropdown-header">
                                <div class="x-spreadsheet-icon arrow-left">
                                    <div class="x-spreadsheet-icon-img align-middle"></div>
                                </div>
                                <div class="x-spreadsheet-icon arrow-right">
                                    <div class="x-spreadsheet-icon-img arrow-down"></div>
                                </div>
                            </div>
                            <div class="x-spreadsheet-dropdown-content" style="width: auto; display: none;">
                                <div class="x-spreadsheet-item">
                                    <div class="x-spreadsheet-icon">
                                        <div class="x-spreadsheet-icon-img align-top"></div>
                                    </div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    <div class="x-spreadsheet-icon">
                                        <div class="x-spreadsheet-icon-img align-middle"></div>
                                    </div>
                                </div>
                                <div class="x-spreadsheet-item">
                                    <div class="x-spreadsheet-icon">
                                        <div class="x-spreadsheet-icon-img align-bottom"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Text wrapping">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img textwrap"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-divider"></div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Freeze cell">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img freeze"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Filter">
                        <div class="x-spreadsheet-icon">
                            <div class="x-spreadsheet-icon-img autofilter"></div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="Functions">
                        <div class="x-spreadsheet-dropdown bottom-left">
                            <div class="x-spreadsheet-dropdown-header">
                                <div class="x-spreadsheet-icon arrow-left">
                                    <div class="x-spreadsheet-icon-img formula"></div>
                                </div>
                                <div class="x-spreadsheet-icon arrow-right">
                                    <div class="x-spreadsheet-icon-img arrow-down"></div>
                                </div>
                            </div>
                            <div class="x-spreadsheet-dropdown-content" style="width: 180px; display: none;">
                                <div class="x-spreadsheet-item">SUM</div>
                                <div class="x-spreadsheet-item">AVERAGE</div>
                                <div class="x-spreadsheet-item">MAX</div>
                                <div class="x-spreadsheet-item">MIN</div>
                                <div class="x-spreadsheet-item">IF</div>
                                <div class="x-spreadsheet-item">AND</div>
                                <div class="x-spreadsheet-item">OR</div>
                                <div class="x-spreadsheet-item">CONCAT</div>
                            </div>
                        </div>
                    </div>
                    <div class="x-spreadsheet-toolbar-btn" data-tooltip="More" style="display: none;">
                        <div class="x-spreadsheet-dropdown bottom-right">
                            <div class="x-spreadsheet-dropdown-header">
                                <div class="x-spreadsheet-icon">
                                    <div class="x-spreadsheet-icon-img ellipsis"></div>
                                </div>
                            </div>
                            <div class="x-spreadsheet-dropdown-content" style="width: 12px; display: none; max-width: 420px;">
                                <div class="x-spreadsheet-toolbar-more"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}