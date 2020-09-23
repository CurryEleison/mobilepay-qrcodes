import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer(props) {
    const { t } = useTranslation();
    return (
    <span>{t('copyrightnotice')}</span>
    )
}

export default Footer;
