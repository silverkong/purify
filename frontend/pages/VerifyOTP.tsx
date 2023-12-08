import React, { useRef } from 'react';
import '../styles/center.css'; 
import google from '../image/google.png'; 

const nicknameStyle = { 
    color: '#444', 
    fontFamily: 'Poppins',
    fontSize: '1.875rem',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '1.875rem'
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
    marginTop:'3.19rem'
}

const imgStyle = { 
    marginTop:'3.06rem'
}

const inputBoxStyle = { 
    marginTop:'2.5rem', 
    display: 'flex',
    gap: '0.5rem'
}

const inputStyle = { 
    width: '4.375rem',
    height: '5.625rem',
    borderRadius: '1.25rem',
    border: '1px solid #DDD',
    background: '#FFF', 
    gap:'0.88rem',
    color: '#444',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: '2.1875rem',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '2.1875rem'
}

const VerifyOTP = () => {
    const inputRefs = Array.from({ length: 6 }, (_, index) => useRef(null));

    const handleInputChange = (index, e) => {
        if (/^\d$/.test(e)) {
            if (index < inputRefs.length - 1) {
                inputRefs[index + 1].current.focus();
            }
        }
    };

    return (
        <div className='center'>
            <p style={nicknameStyle}>Verify OTP Code</p>
            <img src={google} style={imgStyle}/>
            <div style={inputBoxStyle}>
                {inputRefs.map((ref, index) => (
                    <input
                        key={index}
                        style={inputStyle}
                        type="text"
                        maxLength="1"
                        ref={ref}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))}
            </div>
            <button style={buttonStyle}>Verify OTP</button>
        </div>
    );
};

export default VerifyOTP;
