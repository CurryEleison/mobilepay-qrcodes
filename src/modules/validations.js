
const cleanAndValidateMobilePay = (t, phone) => {
    let validationError = null;
    const cleanedacctno = (phone || '').replace(/\D/g, '');
    if (cleanedacctno === '') {
        validationError = t('BLANK');
    }
    else if ((/[^0-9\s]/.test(phone))) {
        validationError = t('ONLYNUMBERS');
    } else {
        if (cleanedacctno.length < 6) {
            validationError = t('TOOFEWDIGITS');
        }
        if (cleanedacctno.length > 8) {
            validationError = t('TOOMANYDIGITS');
        }
    }
    return {
        validationError: validationError,
        cleanMobilePay: cleanedacctno,
    }
}

export {
    cleanAndValidateMobilePay
};