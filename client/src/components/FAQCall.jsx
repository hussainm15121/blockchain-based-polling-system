import React from 'react';
import FAQ from './FAQ';


function FAQCall() {
    return (
        <div className="section gradient-bg-welcome">
        <div className="CallFAQ">
            <div className="FAQHead">Frequently Asked Questions</div>
        <FAQ title="How can I change my password?" content="Navigate to the profile page from the your dashboard and click on change password" />
        <FAQ title="How to create an account?" content="Navigate to the register page, fill in your details and click register " />
        <FAQ title="How can I create a poll?" content="Once you are logged in and verified, click on create poll on your dashboard's sidebar. Metamask wallet conection is required to create a poll" />
        <FAQ title="How to connect my metamask wallet to the website?" content="The alert to connect to your metamask wallet pops up once you visit our website" />
        </div>
        <div className="TextBelow">Couldn't find an Answer?</div>
        <button className="Email">Email Us Your Question</button>
        </div>
    );
}

export default FAQCall;