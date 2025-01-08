import { ChecklistOutlined } from "@mui/icons-material";

export default function Eligibilty() {
  return (
    <section className="eligibility-section">
      <ul className="guidelines">
        <li>
          <ChecklistOutlined className="check-icon" />
          Class 10th with English as a mandatory subject.
        </li>
        <li>
          <ChecklistOutlined className="check-icon" />
          Exceptional candidature from the vernacular medium will be considered
          on request and fulfilment of interviewing requirements.
        </li>
        <li>
          <ChecklistOutlined className="check-icon" />
          Ability to follow the course schedule and complete assignments.
        </li>
      </ul>
      <div className="heading">
        <h2>Who can enroll- eligibility guidelines</h2>
      </div>
    </section>
  );
}
