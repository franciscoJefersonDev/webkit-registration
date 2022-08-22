import express from 'express';
import emailValidator from 'email-validator';

const route = express.Router();

route.post('/validate', async (request, response) => {
  const { firstNameUser, lastNameUser, emailUser, passwordUser, langUser } = await request.body;
  if(firstNameUser === '' || firstNameUser === null || firstNameUser === undefined || !firstNameUser) {
    response.status(400).json({error: 'There is no first name! please, type your first name.'});
    return
  }
  if(lastNameUser === '' || lastNameUser === null || lastNameUser === undefined || !lastNameUser) {
    response.status(400).json({error: 'There is no last name! please, type your last name.'});
    return
  }
  if(langUser !== 'en-US' && langUser !== 'pt-BR') {
    response.status(400).json({error: 'Language is invalide!'});
    return
  }
  if(emailUser === '' || emailUser === null || emailUser === undefined || !emailUser || !emailValidator.validate(emailUser)) {
    response.status(400).json({error: 'There is no email or invalid! please, type your email.'});
    return
  }
  if(passwordUser === '' || passwordUser === null || passwordUser === undefined || !passwordUser || passwordUser.length < 6) {
    response.status(400).json({error: 'There is no password or length is less than 6 digits! please, type your password.'});
    return
  }
  response.status(200).json({ success: true})
});

export default route