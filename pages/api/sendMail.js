import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API);

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: req.body.email,
      from: "QuickShare.noreply@proton.me",
      subject: `Welcome to Quick Share`,
      html: `
        <div>
          Hi ${req.body.username}, <br>
          Thanks for using our platform. <br>
          Your login id :- <b>${req.body.id} </b> <br>
          Hope you enjoy it.
        </div>`,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
