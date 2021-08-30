import React, { useState } from "react";
import "./App.css";

//function to load razorpay script and add to webpage
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

function App() {
    const [name, setName] = useState("Serjeel");

    async function displayRazorpay() {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load");
            return;
        }

        const data = await fetch("http://localhost:8000/razorpay", { method: "POST" }).then((t) => t.json());

        console.log(data);

        const options = {
            key: process.env.REACT_APP_key_id,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: data.name,
            description: data.description,
            handler: async function (response) {
                console.log(response);

                await fetch("http://localhost:8000/afterPayment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(response),
                }).then((t) => t.json());

            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={displayRazorpay} target="_blank">
                    RAZOR PAY
                </button>
            </header>
        </div>
    );
}

export default App;
