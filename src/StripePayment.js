import { Component, createRef } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { DEFAULT_USER_AGENT, DEFAULT_STRIPE_URL } from '../helpers';
import { stripeHTML } from '../sources/Stripe';

export default class StripePayment extends Component {
    constructor(props) {
        super(props);
        this.webPaymentRef = createRef(null);
    }

    getContent() {
        let loadContent = null;
        const return_url = typeof this.props.return_url != "undefined" ? this.props.return_url : "https://google.com";
        const public_key = typeof this.props.public_key != "undefined" ? this.props.public_key : "";
        const client_secret = typeof this.props.client_secret != "undefined" ? this.props.client_secret : "";
        const theme = typeof this.props.theme != "undefined" ? this.props.theme : "light";
        const style = typeof this.props.style != "undefined" ? this.props.style : "night";
        if (typeof this.props.useRemote != "undefined" && this.props.useRemote == true) {
            loadContent = { uri: DEFAULT_STRIPE_URL + '?return_url=' + return_url + '&public_key=' + public_key + '&client_secret=' + client_secret + '&theme=' + theme + '&style=' + style };
        } else {
            loadContent = { html: stripeHTML(public_key, client_secret, return_url, theme, style) };
        }
        return loadContent;
    }

    render() {
        const content = this.getContent();
        return (
            <WebView
                ref={this.webPaymentRef}
                scalesPageToFit={true}
                overScrollMode={"never"}
                nestedScrollEnabled={true}
                automaticallyAdjustContentInsets={true}
                javaScriptEnabled={true}
                originWhitelist={['*']}
                mixedContentMode="compatibility"
                {...this.props}
                source={content}
                userAgent={
                    typeof this.props.forceAndroidAutoplay != "undefined"
                        ? Platform.select({ android: DEFAULT_USER_AGENT, ios: '' })
                        : ''
                }
                onShouldStartLoadWithRequest={event => { return true; }}
                onMessage={(event) => {
                    if (
                        typeof event.nativeEvent.data == "string" &&
                        typeof JSON.parse(event.nativeEvent.data) == "object"
                    ) {
                        const datas = JSON.parse(event.nativeEvent.data);
                        if (typeof this.props.paymentIntent != "undefined") {
                            if (typeof datas.paymentIntent != "undefined") {
                                this.props.paymentIntent(datas.paymentIntent);
                                return;
                            }
                        }
                    }
                    if (typeof this.props.onMessage != "undefined") {
                        this.props.onMessage(event.nativeEvent.data);
                    }
                }}
            />
        );
    }
};