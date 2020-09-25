# MobilePay QR Code Generator

This is a small React app to generate QR codes for MobilePay payments. It's
running at https://mobilepay-qrcode-generator.temp.dk/ .

If you want to receive funds from someone, just type in your phone/MobilePay
number and optionally a currency amount, and ask people to point their camera at
your screen.

MobilePay is a trademark of Danske Bank. This app is not associated with or
licensed by Danske Bank or MobilePay.

## Building

There's no backend and you don't need to have MobilePay installed to use it.
Everything is based on `create-react-app`. You can build with just `yarn build`,
and the assets in `./build` are ready to be deployed.



## TODO

- [x] Add Danish translations
- [x] Spruce up the configuration dialog
- [x] Add helptext, privacy statement, credits etc
- [x] Add footer statement
- [x] Improve layout
- [ ] Better icon
- [x] Dark mode
- [x] Point settings storage back to localStorage
- [ ] Optional: Add analytics & cookie warning
- [ ] Optional: Make it slightly more SEO friendly w. SSR
- [x] Add prettier
- [ ] Some tests
- [ ] enable service worker

## Credits

npm packages that were particularly helpful include:
- react and create-react-app
- @material-ui
- i18next
- qrcode

Snippets that helped me include:
- Debounced textfield by James Rees from
  https://gist.github.com/laytong/e2aeecf32283c3a1ab6edf8e38a78903#gistcomment-2881609
- localStorage hook by Dennis Vash from https://stackoverflow.com/a/62106152

Also:
- Favicon generator at https://realfavicongenerator.net/ 
