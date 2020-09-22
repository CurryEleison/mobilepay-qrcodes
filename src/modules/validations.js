
const cleanAndValidateMobilePay = (phone) => {
    let validationError = null;
    const cleanedacctno = (phone || '').replace(/\D/g, '');
    if (cleanedacctno === '') {
        validationError = 'BLANK';
    }
    else if ((/[^0-9\s]/.test(phone))) {
        validationError = 'ONLYNUMBERS';
    } else {
        if (cleanedacctno.length < 6) {
            validationError = "TOOFEWDIGITS";
        }
        if (cleanedacctno.length > 8) {
            validationError = "TOOMANYDIGITS";
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