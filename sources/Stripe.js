export function stripeHTML(public_key = "", client_secret = "", return_url = "", theme = "light") {
    return `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Accept a payment</title>
            <meta name="author" content="santran686@gmail.com">
            <meta name="author" content="chainplatform.net">
            <style>
              * {
                    box-sizing: border-box;
              }
              body {
                    font-family: system-ui, sans-serif;
                    font-size: 14px;
                    -webkit-font-smoothing: antialiased;
                    display: flex;
                    justify-content: center;      
              }
              form {
                    width: 100vw;
                    align-self: center;
              }
              .hidden {
                    display: none;
              }
              #payment-message {
                    color: rgb(105, 115, 134);
                    font-size: 16px;
                    line-height: 20px;
                    padding-top: 12px;
                    text-align: center;
              }
              #payment-element {
                    margin-bottom: 24px;
              }
              button {
                    background: #5469d4;
                    font-family: Arial, sans-serif;
                    color: #ffffff;
                    border-radius: 4px;
                    border: 0;
                    padding: 12px 16px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    display: block;
                    transition: all 0.2s ease;
                    width: 100%;
              }
              button:hover {
                    filter: contrast(115%);
              }
              button:disabled {
                    opacity: 0.5;
                    cursor: default;
              }
              .spinner,
              .spinner:before,
              .spinner:after {
                    border-radius: 50%;
              }
              .spinner {
                    color: #ffffff;
                    font-size: 22px;
                    text-indent: -99999px;
                    margin: 0px auto;
                    position: relative;
                    width: 20px;
                    height: 20px;
                    box-shadow: inset 0 0 0 2px;
                    -webkit-transform: translateZ(0);
                    -ms-transform: translateZ(0);
                    transform: translateZ(0);
              }
              .spinner:before,
              .spinner:after {
                    position: absolute;
                    content: "";
              }
              .spinner:before {
                    width: 10.4px;
                    height: 20.4px;
                    background: #5469d4;
                    border-radius: 20.4px 0 0 20.4px;
                    top: -0.2px;
                    left: -0.2px;
                    -webkit-transform-origin: 10.4px 10.2px;
                    transform-origin: 10.4px 10.2px;
                    -webkit-animation: loading 2s infinite ease 1.5s;
                    animation: loading 2s infinite ease 1.5s;
              }
              .spinner:after {
                    width: 10.4px;
                    height: 10.2px;
                    background: #5469d4;
                    border-radius: 0 10.2px 10.2px 0;
                    top: -0.1px;
                    left: 10.2px;
                    -webkit-transform-origin: 0px 10.2px;
                    transform-origin: 0px 10.2px;
                    -webkit-animation: loading 2s infinite ease;
                    animation: loading 2s infinite ease;
              }
              @-webkit-keyframes loading {
                0% {
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
              }
              @keyframes loading {
                0% {
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
              }
            </style>
            </head>
            <body>
                <form id="payment-form">
                    <div id="payment-element"></div>
                    <button id="submit">
                        <div class="spinner hidden" id="spinner"></div>
                        <span id="button-text" class="hidden">Pay now</span>
                    </button>
                    <div id="payment-message" class="hidden"></div>
                </form>
                <script>
                    let clientSecret; let strip; let elements;

                    let tag = document.createElement('script');
                    tag.src = 'https://js.stripe.com/v3';

                    function handleSubmit(e) {
                        e.preventDefault();
                        setLoading(true);
                        stripe.confirmPayment({
                            elements,
                            confirmParams: {
                                return_url: '${return_url != "" ? return_url : "https://google.com"}',
                            },
                            redirect: 'if_required',
                        }).then(function(result) {
                            (window.ReactNativeWebView || window.parent || window).postMessage(JSON.stringify(result), '*');
                            setLoading(false);
                        });
                    }
                    function setLoading(isLoading) {
                        if (isLoading) {
                            document.querySelector("#submit").disabled = true;
                            document.querySelector("#spinner").classList.remove("hidden");
                            document.querySelector("#button-text").classList.add("hidden");
                        } else {
                            document.querySelector("#submit").disabled = false;
                            document.querySelector("#spinner").classList.add("hidden");
                            document.querySelector("#button-text").classList.remove("hidden");
                        }
                    }

                    tag.onload = () => {
                        document.documentElement.style.colorScheme = '${theme}';
                        stripe = Stripe('${public_key}');
                        clientSecret = '${client_secret}';
                        document.querySelector("#payment-form").addEventListener("submit", handleSubmit);
                        elements = stripe.elements({ clientSecret });
                        const paymentOptions = { layout: "tabs" };
                        const paymentElement = elements.create("payment", paymentOptions);
                        document.querySelector("#button-text").classList.remove("hidden");
                        paymentElement.mount("#payment-element");
                    };
                    tag.onerror = () => { };
                    let firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                </script>
            </body>
        </html>`
}