import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, data } = req.body;

    if (!to || !subject || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Formatação do corpo do e-mail
    const htmlContent = `
      <h1>Novo cálculo da Calculadora Solar</h1>
      <h2>Dados do Cliente</h2>
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>E-mail:</strong> ${data.email}</p>
      <p><strong>Consumo Mensal:</strong> ${data.consumo} kWh</p>
      <p><strong>Estado:</strong> ${data.estado}</p>
      <p><strong>Tipo de Imóvel:</strong> ${data.tipoImovel}</p>
      <p><strong>Área Disponível:</strong> ${data.areaDisponivel} m²</p>
      
      <h2>Resultados do Cálculo</h2>
      <p><strong>Potência do Sistema:</strong> ${data.resultados.potenciaSistema} kWp</p>
      <p><strong>Área Necessária:</strong> ${data.resultados.areaNecessaria} m²</p>
      <p><strong>Área Suficiente:</strong> ${data.resultados.areaSuficiente ? 'Sim' : 'Não'}</p>
      <p><strong>Custo Estimado:</strong> R$ ${data.resultados.custoSistema}</p>
      <p><strong>Economia Mensal:</strong> R$ ${data.resultados.economiaMensal}</p>
      <p><strong>Retorno do Investimento:</strong> ${data.resultados.retornoInvestimento} anos</p>
      <p><strong>Redução de CO2:</strong> ${data.resultados.reducaoCO2} kg/ano</p>
    `;

    // Configuração do transporte de e-mail
    // Nota: Em produção, você deve usar variáveis de ambiente para estas credenciais
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Envio do e-mail
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@voltenergiasolar.com.br',
      to,
      subject,
      html: htmlContent,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Error sending email', details: error.message });
  }
}