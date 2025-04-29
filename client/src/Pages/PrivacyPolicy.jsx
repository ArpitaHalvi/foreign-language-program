import { Link, NavLink } from "react-router-dom";
import { intro, policies, collectedInformation } from "./PrivacyPolicies";

export default function PrivacyPolicy() {
  return (
    <section className="privacy-policy">
      <div className="container">
        <h2>Privacy Policy</h2>
        <div className="policies">
          <p className="update-date">Effective Date: 23-04-2025</p>
          <p className="intro-p">{intro}</p>
          <div className="info-we-collect">
            <h3>Information We Collect</h3>
            <h4>We may collect the following types of information:</h4>
            <br />
            <div className="info-types">
              {collectedInformation.map((data, index) => {
                return (
                  <div key={index} className="info-type">
                    <h5>
                      {index + 1}. {data.name}
                    </h5>
                    <ul>
                      {data.info.map((d, idx) => {
                        return <li key={idx}>{d}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="policy-container">
            {policies.map((policies, index) => {
              const { title, subheading, policy } = policies;
              return (
                <div key={`policy-${index}`} className="policy-item">
                  <h3>{title}</h3>
                  <h4>{subheading}</h4>
                  <div>
                    {policy.map((p, idx) => {
                      return <p key={idx}>{p}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="privacy-footer">
          <p>
            Our website may contain links to external websites. We are not
            responsible for their content or privacy practices. Our services are
            not directed to children under 13 without parental consent. We do
            not knowingly collect data from children without appropriate
            authorization.
          </p>
          <p>
            We may update this policy from time to time. Any changes will be
            posted on this page with the updated date. If you have questions or
            concerns about this Privacy Policy, contact us at:
          </p>
          <ul>
            <li>
              Email:
              <Link to="mailto:sonalchaturvedi76@gmail.com">
                sonalchaturvedi76@gmail.com
              </Link>
            </li>
            <li>
              Phone:
              <Link to="tel:+919200720230"> +91 9200720230</Link>
            </li>
            <li>
              Website:
              <NavLink to="https://flp"> https://flp</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
