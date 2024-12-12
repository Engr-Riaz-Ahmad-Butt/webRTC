import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "./SubscriptionCard";
import SliderCard from "./SliderCard";
import Marquee from "react-fast-marquee";
const subscriptions = [
  {
    title: "Adobe Subscription",
    description:
      "Access Adobe’s creative suite including Photoshop, Illustrator, and more.",
    buttonText: "Subscribe",
    features: ["Photoshop", "Illustrator", "Adobe Fonts", "Lightroom"],
    price: "49.99",
    oldPrice: "59.99",
    discount: "20",
    logo: "./assets/adobe.png",
    logoWidth: "60px", // Set logo width
    logoHeight: "60px", // Set logo height
  },
  {
    title: "Microsoft Office",
    description:
      "Get the latest Office tools like Word, Excel, and PowerPoint.",
    buttonText: "Subscribe",
    features: ["Word", "Excel", "PowerPoint", "OneDrive"],
    price: "69.99",
    oldPrice: "89.99",
    discount: "22",
    logo: "./assets/microsoft.png",
    logoWidth: "40%",
    logoHeight: "60px",
  },
  {
    title: "Shopify Premium",
    description:
      "Enjoy ad-free music with Spotify Premium. Listen offline too!",
    buttonText: "Subscribe",
    features: [
      "Ad-free listening",
      "Offline mode",
      "Spotify Connect",
      "High-quality audio",
    ],
    price: "9.99",
    oldPrice: "12.99",
    discount: "23",
    logo: "./assets/Shopify.png",
    logoWidth: "50%",
    logoHeight: "60px",
  },
  {
    title: "WooCommerce",
    description: "Build and customize your online store with WooCommerce.",
    buttonText: "Subscribe",
    features: ["Flexible eCommerce", "Inventory management", "Secure payments"],
    price: "29.99",
    oldPrice: "39.99",
    discount: "25",
    logo: "./assets/WooCommerce.png",
    logoWidth: "40%",
    logoHeight: "60px",
  },
  {
    title: "BigCommerce",
    description:
      "Create a scalable online store with BigCommerce's powerful platform.",
    buttonText: "Subscribe",
    features: [
      "Multi-channel integration",
      "SEO optimized",
      "Advanced analytics",
    ],
    price: "49.99",
    oldPrice: "64.99",
    discount: "23",
    logo: "./assets/bigcommerce.png",
    logoWidth: "90%",
    logoHeight: "60px",
  },
  {
    title: "Microsoft Azure",
    description:
      "Access cloud computing and data management services with Azure.",
    buttonText: "Subscribe",
    features: [
      "Scalable cloud services",
      "AI and analytics",
      "Comprehensive security",
    ],
    price: "99.99",
    oldPrice: "129.99",
    discount: "20",
    logo: "./assets/azure.png",
    logoWidth: "50%",
    logoHeight: "60px",
  },
];

const Slider = [
  {
    title: "Adobe Subscription",
    logo: "./assets/adobe.png",
    logoWidth: "60px",
    logoHeight: "60px",
  },
  {
    title: "Microsoft Office",
    logo: "./assets/microsoft.png",
    logoWidth: "40%",
    logoHeight: "60px",
  },
  {
    title: "Shopify Premium",
    logo: "./assets/Shopify.png",
    logoWidth: "50%",
    logoHeight: "60px",
  },
  {
    title: "WooCommerce",
    logo: "./assets/WooCommerce.png",
    logoWidth: "40%",
    logoHeight: "60px",
  },
  {
    title: "BigCommerce",
    logo: "./assets/bigcommerce.png",
    logoWidth: "90%",
    logoHeight: "60px",
  },
  {
    title: "Microsoft Azure",
    logo: "./assets/azure.png",
    logoWidth: "50%",
    logoHeight: "60px",
  },
];

const SubscriptionCards = () => {
  const navigate = useNavigate();

  const handleSubscribe = (subscription) => {
    console.log("subscription", subscription);
    navigate("/subscribe", { state: subscription });
  };

  return (
    <>
     <div id="subscriptions">
        <div style={{ background: "#F5F5F7" }}>
          <MDBContainer className="py-5">
            <h2 className="text-center fw-bold">We power subscription for </h2>
            <MDBRow>
              {subscriptions.map((subscription, index) => (
                <MDBCol key={index} className="my-3" md="4">
                  <SubscriptionCard
                    title={subscription.title}
                    description={subscription.description}
                    buttonText={subscription.buttonText}
                    features={subscription.features}
                    price={subscription.price}
                    oldPrice={subscription.oldPrice}
                    discount={subscription.discount}
                    logo={subscription.logo}
                    logoWidth={subscription.logoWidth}
                    logoHeight={subscription.logoHeight}
                    onClick={() => handleSubscribe(subscription)}
                  />
                </MDBCol>
              ))}
            </MDBRow>
          </MDBContainer>
        </div>

        <div className="py-5">
          <MDBContainer>
            <h2 className="text-center fw-bold">Explore Top Platforms</h2>
            <Marquee speed={40} gradient={false}>
              {" "}
              {/* Added Marquee component */}
              {Slider.map((slide, index) => (
                <SliderCard
                  title={slide.title}
                  logo={slide.logo}
                  logoWidth={slide.logoWidth}
                  logoHeight={slide.logoHeight}
                />
              ))}
            </Marquee>
          </MDBContainer>
        </div>
      </div>
    </>
  );
};

export default SubscriptionCards;
