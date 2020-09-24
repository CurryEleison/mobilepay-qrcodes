import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme) => ({
    helpbody: {
        
        '& h3': {
            ...theme.typography.h6,
        },
        '& p': {
            ...theme.typography.body1,
        },
        '& a': {
            ...theme.typography.body1,
            color: theme.palette.action.active,
        },
        '& a:hover': {
            color: theme.palette.text.secondary,
        },
        '& li': {
            ...theme.typography.body1,
        },
    }
})
);


function InfoDialog(props) {
    const {t} = useTranslation();

    const [open, setOpen] = useState(props.open);
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);


    const closeInfo = () => {
        setOpen(false);
        props.onClose();
    }
    return (

        <Dialog
            fullScreen={fullScreen}
            maxwidth="sm"
            open={open}
            onClose={closeInfo}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{t('help_title', 'Help & Info')}</DialogTitle>
            <DialogContent className={classes.helpbody}>
                <ul>
                    <li><Link href="#usage">{t('help_usage_headline', 'Using the QR Code Generator')}</Link></li>
                    
                    <li><Link href="#privacy">{t('help_privacy_headline', 'Privacy statement')}</Link></li>
                    <li><Link href="#credits">{t('help_credits_headline', 'Credits')}</Link></li>
                </ul>
                <Divider />

                <h3 id="usage">{t('help_usage_headline', 'Using the QR Code Generator')}</h3>
                <ReactMarkdown source={t('help_usage_text')} />
                <Divider />
                <h3 id="privacy">{t('help_privacy_headline', 'Privacy statement')}</h3>
                    <ReactMarkdown source={t('help_privacy_text')} />
                    <Divider />
                <h3 id="credits">{t('help_credits_headline', 'Credits')}</h3>
                <ReactMarkdown source={t('help_credits_text')} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeInfo}>{t('settings_close', 'Done')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog;
