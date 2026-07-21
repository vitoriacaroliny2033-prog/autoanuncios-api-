const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    projeto: "AutoAnúncios ML",
    mensagem: "API funcionando!"
  });
});

app.get("/login/mercadolivre", (req, res) => {
  const url =
    `https://auth.mercadolivre.com.br/authorization` +
    `?response_type=code` +
    `&client_id=${process.env.CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

  res.redirect(url);
});

app.get("/oauth/callback", (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Código de autorização não recebido.");
  }

  res.send(`
    <h1>AutoAnúncios ML</h1>
    <p>Login autorizado com sucesso!</p>
    <p>O código foi recebido pelo sistema.</p>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`AutoAnúncios ML rodando na porta ${PORT}`);
});
