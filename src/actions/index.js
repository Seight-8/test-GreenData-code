export const select = (worker) => {
    document.querySelectorAll('.add')[0].setAttribute('disabled', 'disabled');
    return {
        type: "SELECTOR",
        payload: worker
    }
};
export const focus = (thisFocus) => {
    const add_focuse = {
        thisFocus
    }
    return {
        type: "ADD_FOCUS",
        payload: add_focuse
    }
};
export const AddData = (id, name, middle_name, surname, position, bdate, gender, fired) => {
    const worker = {
        id,
        name,
        middle_name,
        surname,
        position,
        bdate,
        gender,
        fired
      };
    return {
        type: "ADD_DATA",
        payload: worker
    }
};
export const updateDate = (id, name, middle_name, surname, position, bdate, gender, fired) => {
    const worker = {
        id,
        name,
        middle_name,
        surname,
        position,
        bdate,
        gender,
        fired
      };
    return {
        type: "UPDATE",
        payload: worker
    }
};
export const deletDate = (id) => {
    return {
        type: "DELETE",
        payload: id
    }
};