# MobilePay QR Code Generator

This is a small React app to generate QR codes for MobilePay payments. 

If you want to receive funds from someone, just type in your phone/MobilePay
number and optionally a currency amount, and ask people to point their camera at
your screen.

## Building

There's no backend and you don't need to have MobilePay installed to use it.
Everything is based on `create-react-app`. You can build with just `yarn build`,
and the assets in `./build` are ready to be deployed.



## TODO

- [ ] Add Danish translations
- [ ] Spruce up the configuration dialog
- [ ] Add helptext, privacy statement, credits etc
- [ ] Add footer statement
- [ ] Improve layout
- [ ] Better icon
- [ ] Point settings storage back to localStorage
- [ ] Optional: Add analytics & cookie warning
- [ ] Optional: Make it slightly more SEO friendly
- [ ] Add prettier
- [ ] Some tests

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

