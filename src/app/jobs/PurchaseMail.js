const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { ad, user, content } = job.data
    await Mail.sendMail({
      from: '"Diego Fernandes" <diego@rocketseat.com.br>',
      to: ad.author.email,
      subject: `Solicitação de Compra: ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad } // variáveis que serão passadas para o template
    })
    return done()
  }
}

module.exports = new PurchaseMail()
