import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Flags from 'country-flag-icons/react/3x2';

import debouncedInput from './debouncedInput'
import {cleanAndValidateMobilePay} from '../modules/validations';


const  DebouncedTextField = debouncedInput(TextField, { timeout: 500 })


const useStyles = makeStyles((theme) => ({
    textfield: {
        width: '15rem',
    },
    flag: {
        height: '1rem',

    }
}))



function SettingsDialog(props) {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = useState(props.open);
    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const closeInfo = () => {
        setOpen(false);
        props.onClose();
    }

    // useEffect(() => {
    //     console.log(props.storedSettings);
    //     console.log(props.settings);
    // }, [props.storedSettings]);


    const [acctno, setAcctno] = useState(props.storedSettings.acctno || '');
    const [acctnoHelp, setAcctnoHelp] = useState({error: false, helperText: ''});

    const [title, setTitle] = useState(props.storedSettings.title || '');
    const [language, setLanguage] = useState(props.storedSettings.language || props.settings.language);


    const handleAcctNoChange = (newVal) => {
        setAcctno(newVal);
        const status = cleanAndValidateMobilePay(newVal);
        const iserror = ((!!status.validationError) && (status.validationError !== 'BLANK'));
        setAcctnoHelp({error: iserror, helperText: status.validationError});
        if (!iserror) {
            props.onChange({
                ...props.storedSettings,
                acctno: newVal,
            });
        }
    }

    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
        props.onChange({
            ...props.storedSettings,
            title: newTitle,
        })
    }

    const handleLanguageChange = (newLanguage) => {
        console.log(newLanguage);
        setLanguage(newLanguage);
        props.onChange({
            ...props.storedSettings,
            language: newLanguage,
        })
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            maxwidth="sm"
            open={open}
            onClose={closeInfo}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Configure"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Save your settings for future visits
                </DialogContentText>
                <div>
                    <DebouncedTextField
                        value={acctno}
                        variant="outlined"
                        label="MobilePay Number"
                        onChange={(e) => { handleAcctNoChange(e.target.value) }}
                        {...acctnoHelp}
                        className={classes.textfield}
                    />
                </div>
                <div>

                    <TextField
                        value={title}
                        variant="outlined"
                        label="Headline"
                        onChange={(e) => { handleTitleChange(e.target.value) }}
                        className={classes.textfield}
                    />
                </div>
                <div>
                    <Select
                        label="Language"
                        value={language}
                        variant="outlined"
                        style={{ width: '12em' }}
                        onChange={(e) => { handleLanguageChange(e.target.value) }}
                    >
                        <MenuItem value="da"><IconButton><Flags.DK className={classes.flag} /></IconButton> Dansk</MenuItem>
                        <MenuItem value="en"><IconButton><Flags.GB className={classes.flag} /></IconButton> English</MenuItem>
                    </Select>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={closeInfo} color="primary">Done</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SettingsDialog;
