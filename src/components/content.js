import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {select, deletDate, updateDate, focus, AddData} from '../actions/index';
import {connect} from 'react-redux';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
          edit: false,
          alert: '',
          value: '',
        };
        this.handleChange = this.handleChange.bind(this);
    };

    edit () {
        this.setState ({ edit: true });
        this.props.focus(false);
        this.setState ({ checked: this.props.active.fired });

    }

    save () {
        let bday, checked;
        if (this.nameInpute.value === "" || this.middleNameInpute.value === "" || this.surnameInpute.value === "") {
            this.setState ({alert: 'Заполните помеченные поля *'});
            this.setState({value: this.props.active.position});
        } else {
            if ( document.getElementById("bday").value === "" ){
                bday = "";
            } else {
                let dd, mm, yy, d = document.getElementById("bday").value;
                dd = d.slice(8 , 10);
                mm = d.slice(5 , 7);
                yy = d.slice(0 , 4);
                bday = dd + '.' + mm + '.' + yy;
            }

            if(this.props.actFocus.thisFocus === true) {
                checked = this.props.active.fired;
            } else {
                checked = this.state.checked;
            }
            this.props.updateDate(this.props.active.id, this.nameInpute.value, this.middleNameInpute.value, this.surnameInpute.value, this.toggle(), bday, document.querySelector('input[name=gender]:checked').value, checked);
            this.setState({ dis: 'disabled' });
            document.querySelectorAll('.add')[0].removeAttribute('disabled');
            this.nameInpute.value = "";
            this.middleNameInpute.value = "";
            this.surnameInpute.value = "";
            this.setState ({value: ""});
            bday = "";
            document.querySelector('input[name=gender]:checked').value = "";
            this.setState ({alert: ''});
            this.setState ({ edit: false });
            this.props.focus(false);
            this.setState ({ checked: '' });

            }
    }

    close () {
        document.querySelectorAll('.add')[0].removeAttribute('disabled');
        this.setState ({ edit: false });
        this.props.focus(false);
        this.setState ({ checked: '' });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleCheck  () {
        this.setState ({ checked: !this.props.active.fired });
    }

    Cont () {
        let male, female, none;

        if (this.state.edit === true || this.props.actFocus.thisFocus === true){
            if (this.props.active.gender === "муж.") {
                male = true;
                female = false;
                none = false;
            } else {
                if (this.props.active.gender === "жен."){
                    male = false;
                    female = true;
                    none = false;
                } else {
                    male = false;
                    female = false;
                    none = true;
                }
            }

            let dd, mm, yy, bdate, d = this.props.active.bdate;
            dd = d.slice(0 , 2);
            mm = d.slice(3 , 5);
            yy = d.slice(6 , 10);
            bdate = yy + '-' + mm + '-' + dd;
            return(
                <div className="card" key={this.props.active.id}>
                    <div className="headText">
                        Изменение данных работника:
                    </div>
                    <br />
                    <div className="alert">
                        {this.state.alert}
                    </div>
                    <div>
                        Поля помеченные <strong>"*"</strong>, обязательны для заполнения.
                    </div>
                    <div className="cardCont">
                        <div className="cardElem">
                            <div>
                                <input type="text" defaultValue={this.props.active.surname} ref={(inpute) => { this.surnameInpute = inpute }} /> <strong>*</strong>
                            </div>
                            <div>
                                <input type="text" defaultValue={this.props.active.name} ref={(inpute) => { this.nameInpute = inpute }} /> <strong>*</strong>
                            </div>
                            <div>
                                <input type="text" defaultValue={this.props.active.middle_name} ref={(inpute) => { this.middleNameInpute = inpute }} /> <strong>*</strong>
                            </div>
                            <div>
                                <span>Выберите должность: </span>
                                <select defaultValue={this.props.active.position} className="toggle" onChange={this.handleChange}>
                                    <option value="электрик">электрик</option>
                                    <option value="слесарь">слесарь</option>
                                    <option value="сварщик">сварщик</option>
                                    <option value="стропольщик">стропольщик</option>
                                    <option value="маляр">маляр</option>
                                </select> <strong>*</strong>
                            </div>
                        </div>
                        <div className="cardElem">
                            <div>
                                Дата рождения: <input type="date" id="bday" name="bday" defaultValue={bdate} />
                            </div>
                            <div>
                                <span>Выберите пол:</span>
                                <div>
                                    Мужской: <input type='radio' id='male' name='gender' value='муж.' defaultChecked={male} />
                                </div>
                                <div>
                                    Женский<input type='radio' id='female' name='gender' value='жен.' defaultChecked={female} />
                                </div>
                                <input type='radio' className='radioNone' id='none' value='' name='gender'  defaultChecked={none} />
                            </div>
                            <div className="fired">
                                Уволен: <input type="checkbox" onChange={this.handleCheck.bind(this)} defaultChecked={this.props.active.fired} />
                            </div>
                        </div>
                    </div>
                    <button className="save" onClick={this.save.bind(this)}>Сохранить</button>
                    <button className="close" onClick={this.close.bind(this)}>Назад</button>
                </div>
            );
        }
    }

    delete () {
        this.props.deletDate(this.props.active);
        this.setState({ edit: false });
        this.props.focus(false);
    }

    toggle () {
        if (this.state.value === ''){
            return this.props.active.position;
        }else {
            return this.state.value;
        }
    }

    render() {
        let dis;
        if (this.state.edit === true || this.props.actFocus.thisFocus === true) {
            dis = '';
        } else {
            dis = 'disabled';
        }

        return(
            <div>
                {this.Cont()}
                <button className="del" onClick={this.delete.bind(this)} disabled={dis}>Удалить выбранного сотрудника</button>
                <div className="list l2" id="list">
                    {this.props.data.map((data, index) => {

                        let status;
                        if (data.fired === true){
                            status = "уволен"
                        } else {
                            status = ""
                        }
                        let background;

                        if ((this.state.edit === true && data.id === this.props.active.id) || (this.props.actFocus.thisFocus === true && data.id === this.props.active.id)){

                            background = 'active';
                        }
                        return(
                            <div key={index} onClick={() => this.props.select (data)} className={background}>
                                <div className="data" onClick={this.edit.bind(this)} >
                                    <div className="w_name">{data.surname} {data.name} {data.middle_name}</div>
                                    <div className="w_position">{data.position}</div>
                                    <div className="w_date">{data.bdate}</div>
                                    <div className="w_gender">{data.gender}</div>
                                    <div className="w_status">{status}</div>
                                </div>

                            </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        data: state.Data,
        actFocus: state.actFocus,

        active: state.Active

    };
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({select: select, deletDate:deletDate, updateDate: updateDate, focus: focus, AddData: AddData}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Content);