import React, {Component} from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { AddData, focus, select } from '../actions/index';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
          edit: false,
          value: '',
          checked: false,
          alert: '',
          id: 0,
        };
        this.handleChange = this.handleChange.bind(this);
      };
    edit () {
        this.setState ({ edit: true });
        if(document.getElementById('list') != null){
        let card = document.getElementById('list');
        card.style.pointerEvents = 'none';
        }
    };
    close () {
        this.setState ({ edit: false });
        this.setState ({ alert: '' });
        this.setState ( {value: '' });
        this.setState ({ checked: false });
        let card = document.getElementById('list');
        card.style.pointerEvents = 'auto';
    };
    save  ()  {
        let bday, id;
        if (this.nameInpute.value === "" || this.middleNameInpute.value === "" || this.surnameInpute.value === "" || this.state.value === "") {
            this.setState ({alert: 'Заполните помеченные поля "*" !'});
        } else {
        if ( document.getElementById("bday").value === "" ){
            bday = "";
        } else {
        let dd, mm, d = new Date(document.getElementById("bday").value);

        if (d.getDate()< 10){
            dd = "0" + d.getDate();
        } else {
            dd = d.getDate();
        }
        if (d.getMonth()< 10){
            mm = "0" + d.getMonth();
        } else {
            mm = d.getMonth();
        }
        bday = dd + "." + mm + "." + d.getFullYear();
        }
        const arr = {
            id: this.state.id,
            name: this.nameInpute.value,
            middle_name : this.middleNameInpute.value,
            surname: this.surnameInpute.value,
            position: this.state.value,
            bdate: bday,
            gender: document.querySelector('input[name=gender]:checked').value,
            fired: this.state.checked
        }
        this.setState ({edit: false});
        this.setState ({value: ''});
        this.setState ({alert: ''});
        this.setState ({ checked: false });
        this.props.AddData(this.state.id, this.nameInpute.value, this.middleNameInpute.value, this.surnameInpute.value, this.state.value, bday, document.querySelector('input[name=gender]:checked').value, this.state.checked);
        this.props.focus(true);
        this.props.select(arr);
        id = this.state.id + 1;
        this.setState({ id: id });
        let card = document.getElementById('list');
        card.style.pointerEvents = 'auto';
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    handleCheck  () {
		this.setState({checked: !this.state.checked});
	};

    card () {
        if (this.state.edit){
        return (
            <div>
                <div className="card">
                    <div className="cardTop">
                        <div className="headText">
                            Чтобы добавить работника в список, заполните форму:
                        </div>
                        <br />
                        <div className="alert">
                            {this.state.alert}
                        </div>
                        <div>
                            Поля помеченные <strong>"*"</strong>, обязательны для заполнения.
                        </div>
                    </div>
                    <div className="cardCont">
                        <div className="cardElem">
                            <div>
                                <input type="text" className="focus" placeholder="Фамилия" ref={(inpute) => { this.surnameInpute = inpute }} /> <strong>*</strong>
                            </div>
                            <div>
                                <input type="text" className="focus" placeholder="Имя" ref={(inpute) => { this.nameInpute = inpute }} /> <strong>*</strong>
                            </div>
                            <div>
                                <input type="text" className="focus"  placeholder="Отчество" ref={(inpute) => { this.middleNameInpute = inpute }} /> <strong>*</strong>
                            </div>
                            <div>
                                <span>Выберите должность: </span>
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value=""></option>
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
                                Дата рождения: <input className="focus" type="date" id="bday" name="bday" />
                            </div>
                            <div>
                                <span>Выберите пол:</span>
                                <div>
                                    Мужской: <input type='radio' id='male' name='gender' value='муж.' />
                                </div>
                                <div>
                                    Женский: <input type='radio' id='female' name='gender' value='жен.' />
                                </div>
                                <input type='radio' className='radioNone' id='none' value='' name='gender'  defaultChecked />
                            </div>
                            <div className="fired">
                                Уволен: <input type="checkbox" onChange={this.handleCheck.bind(this)} defaultChecked={this.state.checked} />
                            </div>
                        </div>
                    </div>
                    <button className="save" onClick={this.save.bind(this)}>Добавить</button>
                    <button className="close" onClick={this.close.bind(this)}>Отмена</button>
                </div>
            </div>
            );
        }
    };

    render () {
        return (
            <div>
                {this.card()}
                <button className="add" onClick={this.edit.bind(this)}>Добавить нового сотрудника</button>
            </div>
            );
        }
    }

function mapStateToProps (state) {
    return {
        data: state.Data,
        focus: state.actFocus

    };
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({
        AddData: AddData,
        focus: focus,
        select: select
    },
    dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(List);