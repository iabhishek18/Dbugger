import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Emailjs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_lz21ob1", "template_2d1qvbd", form.current, "VU12XavFNatwZljAP")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="fname" />
      <label>Email</label>
      <input type="email" name="mail" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default Emailjs;