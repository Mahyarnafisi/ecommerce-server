import express from "express";
import { Resend } from "resend";
const resend = new Resend("re_FsvQZ5nD_FaRYwDhg3fxnvYTzRsBnanvT");

export const subscriptionController = async (req, res) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "mahyar.nafisi@gmail.com",
      to: "abbas.adnani@gmail.com",
      subject: "Hello World",
      html: "<strong>It works!</strong>",
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};
