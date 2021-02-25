import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { htmlToReact, markdownify } from "../utils";
import styled from "styled-components";

const FormDiv = styled.div`
  form {
    width: 100%;
  }
  .input-field {
    position: relative;
    width: 100$;
    height: 44px;
    line-height: 44px;
    margin-bottom: 40px;
  }
  .input-field-textarea {
    position: relative;
    width: 100$;
    line-height: 44px;
    margin-bottom: 40px;
  }
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #231f20;
    transition: 0.2s all;
    cursor: text;
  }
  input,
  textarea {
    width: 100%;
    border: 0;
    outline: 0;
    padding: 0.5rem 0;
    border-bottom: 2px solid #231f20;
    box-shadow: none;
    color: #111;
    background-color: transparent;
  }
  input,
  textarea:invalid {
    outline: 0;
    // color: #ff2300;
    //   border-color: #ff2300;
  }
  input:focus,
  input:valid {
    border-color: #006e74;
  }
  input:focus ~ label,
  input:valid ~ label {
    font-size: 14px;
    top: -24px;
    color: #006e74;
  }

  textarea:focus ~ label,
  textarea:valid ~ label {
    font-size: 14px;
    top: -24px;
    color: #006e74;
  }
`;

const Child = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    let body = {
      email_content:
        "Hi,<br/><br/>" +
        data.message +
        "<br/><br/>" +
        "Best Regards,<br/> " +
        data.first_name +
        " " +
        data.last_name +
        "<br/><br/>You can contact me via: " +
        data.email,
      email_subject:
        data.subject + " [" + data.first_name + " " + data.last_name + "]",
      // from_email: data.email,
      from_email: "noreply@ustdigital.io",
      to_email: "mike.zhang@ust.com",
    };
    fetch(
      "https://fc-ipa-dev-send-email.azurewebsites.net/api/sendemail?code=es3a8ms7tfL2YOn3vMZj9EmTy77JXJeSG1Z0/VcKak06e1AJvzZcZA==",
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
  };
  // console.log(errors);
  let section = _.get(props, "section", null);
  return (
    <section
      id={_.get(section, "section_id", null)}
      className={
        "block contact-block bg-" +
        _.get(section, "background", null) +
        " outer"
      }
    >
      <div className="block-header inner-small">
        {_.get(section, "title", null) && (
          <h2 className="block-title">{_.get(section, "title", null)}</h2>
        )}
        {_.get(section, "subtitle", null) && (
          <p className="block-subtitle">
            {htmlToReact(_.get(section, "subtitle", null))}
          </p>
        )}
      </div>
      <div className="block-content inner-medium">
        {markdownify(_.get(section, "content", null))}
        <FormDiv>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field">
              <input
                type="text"
                id="name"
                required
                name="first_name"
                ref={register({ required: true, maxLength: 80 })}
              />
              <label htmlFor="name">First Name*</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                required
                name="last_name"
                ref={register({ required: true, maxLength: 80 })}
              />
              <label htmlFor="name">Last Name*</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                required
                name="email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              />
              <label htmlFor="Email">Email*</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                required
                name="subject"
                ref={register({ required: true })}
              />
              <label htmlFor="name">Subject*</label>
            </div>
            <div className="input-field-textarea">
              <textarea
                type="area"
                required
                name="message"
                ref={register({ required: true })}
              />
              <label htmlFor="Message">Message*</label>
            </div>
            <button type="submit" className="button contact">
              Submit
            </button>
          </form>
        </FormDiv>
      </div>
    </section>
  );
};

export default Child;
