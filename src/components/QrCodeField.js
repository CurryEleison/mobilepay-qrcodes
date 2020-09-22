import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { makeStyles } from '@material-ui/core';
import fallbackqrcode from './fallback-qr-transparent.png'

/*
Will assume that props for acctno and amount are already validated
and will just use them. If acctno is falsy will use the fallback
display
*/

const generateQR = async (text) => {
    try {
      return await QRCode.toDataURL(text, {margin: 0});
    } catch (err) {
      console.error(err)
    }
  }
  
const qrprops = async (acctno, amount = NaN) => {
    let url = 'https://github.com/CurryEleison/mobilepay-qrcodes/';
    let alt = 'Put in your MobilePay Number';
    if (acctno) {
        if (amount > 0.0) {
            url = 'mobilepay://send?phone=' + acctno + '&amount=' + amount.toFixed(2)
            alt = `Pay ${amount} to ${acctno}`;
        } else {
            url = 'mobilepay://send?phone=' + acctno + '&lock=1'
            alt =  `Pay to ${acctno}`;
        }
    }
    const qrData = await generateQR(url);
    return {src: qrData, alt: alt};

}

const useStyles = makeStyles((theme) => ({
    qrcodeimg: {
        fontSize: theme.typography.h2.fontSize,
        width: '14ch',
        height: '14ch',
        display: 'flex',
    },
    invalidacctno: {
        backgroundImage: `url(${fallbackqrcode})`,
        fontSize: theme.typography.h2.fontSize,
        width: '14ch',
        height: '14ch',
        backgroundSize: '14ch',
        display: 'flex',
        alignItems: 'center',
        //justifyContent: 'center',
        textAlign: 'center',
        color: theme.palette.text.disabled,
        textShadow: `0px 0px 20px ${theme.palette.background.default}, 0px 0px 20px ${theme.palette.background.default}, 0px 0px 20px ${theme.palette.background.default}, 0px 0px 20px ${theme.palette.background.default}, 0px 0px 20px ${theme.palette.background.default}, 0px 0px 20px ${theme.palette.background.default}, 0px 0px 20px ${theme.palette.background.default}, 0px 0px 20px ${theme.palette.background.default}, 0px 0px 20px ${theme.palette.background.default}, 0px 0px 20px ${theme.palette.background.default} `,
    },
    })
);

function InvalidCodeField(props) {
    const classes = useStyles();
    return (
    <div className={classes.invalidacctno} >{props.alt}</div>
    )
}


function QrCodeField(props) {
    const classes = useStyles();

    const [isValid, setIsValid] = useState(false);
    const [qrProps, setQrProps] = useState({src: '', alt:''});

    const setValidQrProps = async (acctno, amount) => {
        const stuff = await qrprops(acctno, amount);
        setQrProps(stuff);
    }

    useEffect(() => {
        const valid = !!props.acctno;
        setIsValid(valid);
        setValidQrProps(props.acctno, props.amount);
    }, [props.acctno, props.amount]);

    if (!isValid) {
        return (<InvalidCodeField {...qrProps} />);
    }
    return (
        <img className={classes.qrcodeimg} {...qrProps} />
    )
}

export default QrCodeField;