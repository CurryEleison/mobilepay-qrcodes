import React, {useState, useReducer, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import QrCodeField from './QrCodeField';
import {cleanAndValidateMobilePay} from '../modules/validations';
// import debouncedInput from './debouncedInput'
import mobilepaylight from './mobilepay-light.svg';

// const  DebouncedTextField = debouncedInput(TextField, { timeout: 500 })

const useStyles = makeStyles((theme) => ({
    textField: {
        fontSize: theme.typography.h2.fontSize,
        width: '14ch',
    },
    inputText: {
        fontSize: theme.typography.h2.fontSize,
    },
    mainform: {
        // height: '100%',
        // width: '100%',

    },
    flexcentered: {
        display: 'flex',
        justifyContent: 'center',
    },
    amountAlignment: {
        [theme.breakpoints.up('md')]:
        { alignItems: 'flex-end', },

    }

}));


const acctnoReducer = (_, action) => {
    const newacctno = action.payload;

    console.log(newacctno);
    const status = cleanAndValidateMobilePay(newacctno);
    const iserror = ((!!status.validationError) && (status.validationError !== 'BLANK'));

    // Room for more validation here. Refactor function out eventually

    if (status.validationError) {
        action.onValidated(null);
        return {value: newacctno, error: iserror, helperText: status.validationError};
    }

    
    action.onValidated(status.cleanMobilePay);
    return {value: newacctno};
}


const amountReducer = (state, action) => {
    const newamount = action.payload;

    // need to work really hard to figure out the best guess at the amount here
    const parsedamount = parseFloat(newamount);

    action.onValidated(parsedamount);
    if (newamount && Number.isNaN(parsedamount)) {
        return {value: newamount, error: true, helperText: 'Not a number?'}
    }
    return {value: newamount, error: false, helperText: ''};
}

function QrCodeForm(props) {
    const classes = useStyles();

    const [validatedAcctNo, setValidatedAcctNo] = useState();
    const [validatedAmount, setValidatedAmount] = useState(NaN);

    const [acctno, setAcctno] = useReducer(acctnoReducer, {value: ''});
    const [amount, setAmount] = useReducer(amountReducer,  {value: ''});

    useEffect( () => {
           setAcctno({payload: props.acctno, onValidated: setValidatedAcctNo})
        }, [props.acctno]);

    return (
        <Grid container className={classes.mainform} spacing={4}>
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={4}  className={classes.flexcentered}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={12} className={classes.flexcentered}>
                        <TextField
                            value={acctno.value}
                            {...acctno}
                            onChange={(e) => { setAcctno({ payload: e.target.value, onValidated: setValidatedAcctNo }) }}
                            variant="outlined"
                            label="MobilePay Number"
                            placeholder="Your MobilePay"
                            required
                            className={classes.textField}
                            InputProps={{
                                classes: {
                                    input: classes.inputText,
                                },
                                startAdornment: <InputAdornment position="start">
                                    <Icon>
                                        <img src={mobilepaylight} alt="mobilepay"
                                        /> </Icon>
                                </InputAdornment>
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={12} className={clsx(classes.flexcentered, classes.amountAlignment)}>
                        <TextField
                            {...amount}
                            onChange={(e) => { setAmount({ payload: e.target.value, onValidated: setValidatedAmount }) }}
                            variant="outlined"
                            label="Amount"
                            placeholder="evt beløb"
                            className={classes.textField}
                            InputProps={{
                                classes: {
                                    input: classes.inputText,
                                },
                                startAdornment: <InputAdornment position="start">kr.</InputAdornment>,
                            }}
                            FormHelperTextProps={{
                                style: { 
                                    height: "1.25rem" ,
                                    marginTop: "0.25rem",
                                    marginBottom: "-1.5rem",

                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={4} className={classes.flexcentered}>
                <QrCodeField style={{margin: 'auto'}}
                    acctno={validatedAcctNo}
                    amount={validatedAmount}
                />
            </Grid>
            <Grid item xs={12} md={2} />
        </Grid>
    )
};

export default QrCodeForm;
