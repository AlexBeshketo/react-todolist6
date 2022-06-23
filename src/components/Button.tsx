import React from 'react';
type PropsType= {
    callback: ()=> void,
    name:string
}

const Button = (props:PropsType) => {

    const onClickHandler = ()=> {
        props.callback()
    }

    return (
        <>
            <button onClick={onClickHandler}>{props.name}</button>
        </>
    );
};

export default Button;