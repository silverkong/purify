import React from 'react';
import '../styles/center.css'; 

const nicknameStyle = { 
    color: '#444', 
    fontFamily: 'Poppins',
    fontSize: '1.875rem',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '1.875rem'
}

const inputStyle = { 
    width: '18.75rem',
    height: '4.375rem',
    flexShrink: '0', 
    borderRadius: '1.5625rem',
    border: '1px solid #DDD',
    background: '#FFF', 
    marginTop:'1.88rem'
}

const buttonStyle = { 
    width: '18.75rem',
    height: '3.75rem',
    flexShrink: '0', 
    borderRadius: '1.875rem',
    background: '#06F',
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: '1.125rem',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '1rem', 
    marginTop:'2.5rem'
}

const SetNickname = () => {
  return (
    <div className='center'>
       <p style={nicknameStyle}>Set Nickname</p>
       <input style={inputStyle}/>
       <button style={buttonStyle}>set nickname</button>
    </div>
  );
};

export default SetNickname;