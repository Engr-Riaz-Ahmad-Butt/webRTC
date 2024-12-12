import React from 'react';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

export default function Faqs() {
  return (
    <div id='faqs' className="container my-5">
      <h2 className="text-center mb-4 text-black">Frequently Asked Questions</h2>

      <MDBAccordion initialActive={1}>
        <MDBAccordionItem
          collapseId={1}
          headerTitle={
            <span className="text-dark fw-bold">
              <i className="fas fa-question-circle me-2"></i>What is SubscriptionABC?
            </span>
          }
        >
          <p>
            <strong>SubscriptionABC</strong> provides a platform where you can easily subscribe to various software services like Adobe, Microsoft Office, and more. We offer flexible payment options and instant access to your subscriptions.
          </p>
        </MDBAccordionItem>

        <MDBAccordionItem
          collapseId={2}
          headerTitle={
            <span className="text-dark fw-bold">
              <i className="fas fa-question-circle me-2"></i>How do I manage my subscription?
            </span>
          }
        >
          <p>
            You can manage your subscription by logging into your account. From there, you can view your active subscriptions, update your payment methods, and make changes to your plan.
          </p>
        </MDBAccordionItem>

        <MDBAccordionItem
          collapseId={3}
          headerTitle={
            <span className="text-dark fw-bold">
              <i className="fas fa-question-circle me-2"></i>Can I get a refund for my subscription?
            </span>
          }
        >
          <p>
            Yes, we offer refunds within 30 days of your purchase. Please refer to our refund policy for more details on eligibility and the process.
          </p>
        </MDBAccordionItem>
      </MDBAccordion>
    </div>
  );
}
