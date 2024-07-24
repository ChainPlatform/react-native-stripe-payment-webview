# React Native Stripe Payment and React Native Web Stripe Payment
 The library allows you to use Stripe Payment with react-native without ejecting support both react-native and react-native-web.

<a href="https://npmjs.com/package/react-native-stripe-payment-webview">
  <img src="https://img.shields.io/npm/v/react-native-stripe-payment-webview.svg"></img>
  <img src="https://img.shields.io/npm/dt/react-native-stripe-payment-webview.svg"></img>
</a>
<a href="https://twitter.com/intent/follow?screen_name=doansan"><img src="https://img.shields.io/twitter/follow/doansan.svg?label=Follow%20@doansan" alt="Follow @doansan"></img></a>


<p align="center">
  <img src="https://i.imgur.com/pUSH1bo.png" width="340px"></img>
  <img src="https://i.imgur.com/Zz1Jpd0.png" width="340px"></img>
</p>


## Description
The library allows you to use [Stripe.js Checkout](https://stripe.com/payments/checkout) with react-native without ejecting. You can use it with both server-side implementations and client-side implementations. Simply ensure you follow the [url structure guidelines below](#important-notes-about-urls).


## Prequisites
- This library relies on [React Native Webview](https://www.npmjs.com/package/react-native-webview). Please follow [this guide](https://github.com/react-native-community/react-native-webview/blob/HEAD/docs/Getting-Started.md) to install in your project first.


## Installation

- Ensure you've completed the setps in [prequisites.](#prequisites)

- Install package via npm or yarn:

`npm install --save react-native-stripe-payment-webview` OR `yarn add react-native-stripe-payment-webview`

- If your project use react-native-web to build website:

`npm install --save @chainplatform/react-native-web-webview` OR `yarn add @chainplatform/react-native-web-webview`

Then setup by guide at: https://github.com/ChainPlatform/react-native-web-webview#readme

## Usage

- Import in your project

```javascript
import StripePayment from 'react-native-stripe-payment-webview';
```

```js
    <StripePayment
        return_url={"https://google.com"}
        public_key={datas.payment_infos.datas.publishable_key}
        client_secret={datas.payment_infos.datas.client_secret}
        paymentIntent={(datas) => {
            console.log("paymentIntent ", datas);
        }}
    />
```

## Component props

- `return_url` (String) - optional.
- `publishable_key` (String) - Stripe public key of your project.
- `client_secret` (String) - String to be passed to Stripe's `paymentIntent` function. [Docs](https://docs.stripe.com/payments/quickstart?client=html).
- `paymentIntent` (?Function) - Called upon calback of the checkout session 
- Support full Webview props


## Contributing
Pull requests are highly appreciated! For major changes, please open an issue first to discuss what you would like to change.

### Related Projects
- Other packages for react native and react native web: [ChainPlatform](https://github.com/ChainPlatform)

