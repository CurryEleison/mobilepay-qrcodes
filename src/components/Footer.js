import React from 'react';
import {makeStyles} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    footerspacing: {
        ...theme.typography.body1,
        [theme.breakpoints.up('md')]:
        {marginBottom: '1rem'},
    },
}));


function Footer(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
    <div className={classes.footerspacing}>{t('copyrightnotice')}</div>
    )
}

export default Footer;
