import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Sponsors from "@/components/sponsors";
import UserForm from "@/components/userForm";
import "@/styles/home.css";
import Image from "next/image";
export default function Home() {
  return (
    <div>
      <section className="home-hero">
        <Image
          src="/hero-image.png"
          alt="Picture of the author"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={500}
          height={300}
        />
      </section>
      <section className="home-about-event">
        <div className="home-about-event-content">
          <h2>Aaravam 3.0 Onam Celebration</h2>
          <p>
            Welcome to <b>Aaravam 3.0</b>, an extravagant celebration of Onam,
            happening live on{" "}
            <b>
              September 6, 2025, at walderseestraße 100 ,30177, Hannover.
              Starting at 11:00 AM,
            </b>{" "}
            this event promises to be a day filled with vibrant cultural
            performances, exciting traditional games, and a delicious grand
            feast.
          </p>
          <h3>Event Highlights</h3>
          <ul>
            <li>Cultural Performances and Games</li>
            <li>Traditional Onam Sadhya (Kerala Feast)</li>
            <li>Tug of War (വടംവലി)</li>
            <li>DJ Night</li>
            <li>Exciting Surprises</li>
            <li>Lucky Draw</li>
          </ul>

          <p>
            Join us in celebrating Onam, one of the most cherished festivals,
            with joy and unity. This is a great opportunity to connect with the
            community, forge new friendships, and create lasting memories. Even
            though we are far from home, let’s come together and welcome the
            Onam season with enthusiasm and joy. Come and be part of this
            biggest Onam celebration in Hannover!
          </p>
          <div class="map-container">
           
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.93246446518!2d9.755480199999997!3d52.389774599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b07354b8bb7b97%3A0xa6d56ef46b88b5fc!2sWalderseestra%C3%9Fe%20100%2C%2030177%20Hannover%2C%20Germany!5e0!3m2!1sen!2suk!4v1752406883148!5m2!1sen!2suk"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="home-about-event-content-right">
          <div className="home-about-event-content-right-inner">
          <h3>Tickets Sold out!</h3>
            {/* <UserForm /> */}
          </div>
          <div className="home-about-event-content-right-inner">
            <Image
              src="/2025.jpeg"
              alt="Picture of the author"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={500}
              height={500}
            />
          </div>
          {/* <div className="mobi home-about-event-content-right-inner">
            <div className="box-title">Our Sponsors</div>
            <Sponsors />
          </div> */}
        </div>
      </section>
      {/* <div className="dek home-about-event-content-right-inner">
        <div className="box-title">Our Sponsors</div>
        <Sponsors />
      </div> */}
      <section className="home-about-event-content">
        <div className="box-title">For Queries</div>
        <div className="contact-box">
          <div className="contact-info">
            <div className="contact-item">
              <FaPhoneAlt className="icon" />
              <a href="tel:+491785575267">Midhun: +49 1785575267</a>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="icon" />
              <a href="tel:+4915510534195">Shyam: +49 15510534195</a>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="icon" />
              <a href="tel:+491794360268">Aswathy: +49 176 55790400</a>
            </div>
            <div className="contact-item email">
              <FaEnvelope className="icon" />
              <a href="mailto:Hannovermalayalis@gmail.com">
                Email: Hannovermalayalis@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
