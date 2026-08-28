import { useState } from "react";
import {
  Inbox,
  CalendarCheck2,
  BellRing,
  ShieldCheck,
  Ban,
  KeyRound,
  Eye,
  MessageCircle,
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
} from "lucide-react";

// A Lucide não inclui mais logos de marcas (política da biblioteca), então o
// ícone do Instagram é um SVG customizado no mesmo estilo "outline" dos demais.
function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Troque pelo número real do WhatsApp da Isabelle (formato: DDI + DDD + número, só dígitos)
const WHATSAPP_NUMBER = "5500000000000";

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Oi! Quero organizar os boletos do meu MEI com a Assessoria de Boletos."
)}`;

function whatsappLinkFor(plano) {
  const msg = `Oi! Quero assinar o plano ${plano} da Assessoria de Boletos para o meu MEI.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function LogoIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoRing" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="logoArrow" x1="28" y1="36" x2="52" y2="14" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0F766E" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>

      {/* Anel do emblema */}
      <circle cx="32" cy="32" r="29" fill="none" stroke="url(#logoRing)" strokeWidth="4.5" />

      {/* Boletos empilhados */}
      <g transform="translate(15,22)">
        <rect x="0" y="4" width="16" height="20" rx="1.5" fill="#F8FAFC" opacity="0.55" transform="rotate(-8 8 14)" />
        <rect x="2" y="0" width="17" height="22" rx="1.5" fill="#F8FAFC" />
        <line x1="6" y1="6" x2="15" y2="6" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="6" y1="10" x2="15" y2="10" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="6" y1="14" x2="12" y2="14" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* Check de verificação */}
      <path
        d="M17 34 L24 41 L34 29"
        fill="none"
        stroke="#022C22"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 34 L24 41 L34 29"
        fill="none"
        stroke="#ECFDF5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Seta de crescimento */}
      <path
        d="M27 38 L46 19"
        stroke="url(#logoArrow)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M34 16 L48 16 L48 30 Z" fill="url(#logoArrow)" />
    </svg>
  );
}

function WhatsAppButton({ children, size = "md" }) {
  const sizing =
    size === "lg" ? "px-8 py-4 text-base md:text-lg" : "px-6 py-3 text-sm md:text-base";
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-3 rounded-full font-bold
                  bg-green-500 text-blue-950 shadow-lg
                  transition-all duration-300 ease-out
                  hover:bg-green-400 hover:shadow-2xl hover:-translate-y-0.5
                  active:translate-y-0
                  ${sizing}`}
    >
      <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.4} />
      {children}
    </a>
  );
}

function StepCard({ index, icon: Icon, title, description }) {
  return (
    <div
      className="group rounded-2xl bg-white p-8 border border-blue-100 shadow-md
                 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-950 text-white transition-colors duration-300 group-hover:bg-blue-800">
          <Icon className="h-7 w-7" strokeWidth={1.8} />
        </div>
        <span className="text-xs font-bold tracking-widest text-blue-300">
          PASSO {index}
        </span>
      </div>
      <h3 className="text-lg font-bold text-blue-950 mb-2 leading-snug">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function SecurityItem({ icon: Icon, text }) {
  return (
    <div className="rounded-xl bg-blue-900 border border-blue-800 p-6 transition-colors duration-300 hover:bg-blue-800">
      <Icon className="h-6 w-6 text-green-400 mb-4" strokeWidth={2} />
      <p className="text-blue-50 text-sm leading-relaxed font-medium">{text}</p>
    </div>
  );
}

function PlanCard({ name, price, description, features, highlighted, planLabel, idealFor }) {
  return (
    <div
      className={`relative h-full rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2
        ${
          highlighted
            ? "bg-blue-950 border-2 border-green-400 shadow-xl hover:shadow-2xl"
            : "bg-white border border-blue-100 shadow-md hover:shadow-xl"
        }`}
    >
      <div>
        {highlighted && (
          <span className="absolute -top-3 left-8 bg-green-500 text-blue-950 text-xs font-bold tracking-widest px-3 py-1 rounded-full">
            MAIS COMPLETO
          </span>
        )}

        <h3 className={`font-display text-xl font-extrabold ${highlighted ? "text-white" : "text-blue-950"}`}>
          {name}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${highlighted ? "text-blue-200" : "text-slate-600"}`}>
          {description}
        </p>

        <div className="mt-6 flex items-baseline gap-1">
          <span className={`font-display text-4xl font-extrabold ${highlighted ? "text-white" : "text-blue-950"}`}>
            {price}
          </span>
          <span className={`text-sm ${highlighted ? "text-blue-300" : "text-slate-500"}`}>/mês</span>
        </div>

        {idealFor && (
          <p
            className={`mt-2 text-xs font-semibold leading-relaxed ${
              highlighted ? "text-green-400" : "text-green-600"
            }`}
          >
            {idealFor}
          </p>
        )}

        <span
          className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold
            ${highlighted ? "bg-blue-900 text-green-400" : "bg-green-50 text-green-600"}`}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          Cancelamento gratuito a qualquer momento
        </span>

        <ul className="mt-7 space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${highlighted ? "text-green-400" : "text-green-500"}`}
                strokeWidth={2.5}
              />
              <span className={`text-sm leading-relaxed ${highlighted ? "text-blue-100" : "text-slate-600"}`}>
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={whatsappLinkFor(planLabel)}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full font-bold py-3.5 px-6
                   bg-green-500 text-blue-950 shadow-lg
                   transition-all duration-300 ease-out
                   hover:bg-green-400 hover:shadow-2xl hover:-translate-y-0.5"
      >
        <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.4} />
        Assinar via WhatsApp
      </a>
    </div>
  );
}

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="rounded-xl bg-white border border-blue-100 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
      >
        <span className="font-semibold text-blue-950 text-sm md:text-base">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-blue-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    question: "Vocês pagam os boletos por mim?",
    answer:
      "Não. Esse é o ponto mais importante: a gente nunca realiza pagamentos e nunca toca no seu dinheiro. Só organizamos as datas e avisamos você — quem paga, sempre, é você, do jeito que já faz hoje.",
  },
  {
    question: "Vocês pedem senha do banco ou dados sigilosos?",
    answer:
      "Nunca. Não pedimos senha de app bancário, cartão ou qualquer credencial financeira. Trabalhamos só com a cópia dos boletos que os fornecedores enviam — nada além disso.",
  },
  {
    question: "Como os fornecedores enviam os boletos?",
    answer:
      "Você adiciona nosso e-mail ou WhatsApp em cópia quando o fornecedor manda o boleto. A gente nunca fala diretamente com terceiros, só recebe a cópia e organiza para você.",
  },
  {
    question: "Posso trocar de plano depois?",
    answer:
      "Sim, sem burocracia. Se o Essencial não for suficiente ou se você não precisar mais do controle de contas a receber, é só chamar no WhatsApp e ajustamos o plano no mês seguinte.",
  },
];

export default function AssessoriaBoletosLanding() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen w-full bg-slate-50 text-blue-950 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* ================= HERO ================= */}
      <header className="w-full bg-blue-950">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 flex flex-col items-center text-center">
          {/* Logo / brand mark */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900 border border-blue-800 overflow-hidden">
              <LogoIcon className="h-8 w-8" />
            </div>
            <span className="text-white font-bold text-lg font-display tracking-tight">
              Assessoria de Boletos
            </span>
          </div>

          {/* Pre-title */}
          <span className="inline-block bg-blue-900 text-green-400 text-xs font-bold tracking-widest px-4 py-2 rounded-full border border-blue-800 mb-6">
            FEITO PARA O MEI QUE NÃO TEM TEMPO DE CONTABILIDADE
          </span>

          <h1 className="font-display text-white text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
            Chega de perder dinheiro com multas por boletos esquecidos.
          </h1>

          <p className="mt-6 text-blue-100 text-base md:text-lg max-w-xl leading-relaxed">
            A gente recebe os boletos em cópia, organiza tudo num cronograma simples
            e te avisa no WhatsApp antes do vencimento. Você foca em vender —
            a gente cuida de você não esquecer nenhuma conta.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <WhatsAppButton size="lg">
              Falar agora no WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </WhatsAppButton>
            <span className="text-blue-300 text-sm">
              Resposta em até 1 dia útil · sem compromisso
            </span>
          </div>
        </div>
      </header>

      {/* ================= COMO FUNCIONA ================= */}
      <section className="w-full bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <div className="mb-14 max-w-xl mx-auto text-center">
            <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">
              Como funciona
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-blue-950 leading-tight">
              Três passos simples entre o boleto chegar e você dormir tranquilo.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              index={1}
              icon={Inbox}
              title="Recebimento prático"
              description="Seus fornecedores enviam os boletos em cópia para a gente — você só pede pra colocar nosso contato no CC. Nada muda na sua rotina com eles."
            />
            <StepCard
              index={2}
              icon={CalendarCheck2}
              title="Organização de cronograma"
              description="Cada boleto entra numa planilha simples, com data de vencimento, valor e fornecedor. Um raio-x claro de tudo que seu MEI tem pra pagar no mês."
            />
            <StepCard
              index={3}
              icon={BellRing}
              title="Alertas no WhatsApp"
              description="A gente te avisa com antecedência, direto no zap, quando um boleto está perto de vencer. Você decide quando pagar — nós garantimos que você não esqueça."
            />
          </div>
        </div>
      </section>

      {/* ================= SEGURANÇA ================= */}
      <section className="w-full bg-blue-950">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
            <div className="md:w-1/3 text-center md:text-left">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-900 text-green-400 mb-5 border border-blue-800">
                <ShieldCheck className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <h2 className="font-display text-3xl font-extrabold text-white leading-tight">
                Seu dinheiro nunca passa pela gente.
              </h2>
              <p className="mt-4 text-blue-200 text-sm leading-relaxed">
                Nosso trabalho é 100% de organização e aviso. O pagamento é sempre
                feito por você, do jeito que já faz hoje.
              </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SecurityItem icon={Ban} text="Nunca fazemos pagamentos por você" />
              <SecurityItem icon={KeyRound} text="Nunca pedimos senhas ou dados bancários" />
              <SecurityItem icon={Eye} text="Apenas fazemos triagem e notificação, com total sigilo" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLANOS E PREÇOS ================= */}
      <section className="w-full bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <div className="mb-14 max-w-xl mx-auto text-center">
            <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">
              Planos e preços
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-blue-950 leading-tight">
              Escolha o nível de organização que o seu MEI precisa agora.
            </h2>
            <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
              Sem contrato de fidelidade, sem letra miúda. Cancele ou troque de plano quando quiser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
            <PlanCard
              name="Essencial"
              price="R$ 79,90"
              description="Ideal para quem só precisa parar de esquecer boleto de fornecedor."
              planLabel="Essencial"
              idealFor="Ideal para quem tem até 8 fornecedores fixos"
              features={[
                "Cadastro de até 8 boletos por mês",
                "Aviso de vencimento no WhatsApp",
                "Lembrete mensal do DAS-MEI",
                "Suporte em horário comercial",
              ]}
            />
            <PlanCard
              name="Completo"
              price="R$ 149,90"
              description="Para quem também quer visibilidade do que tem a receber no mês."
              planLabel="Completo"
              highlighted
              idealFor="Ideal para quem tem fluxo maior e precisa de controle de recebidos"
              features={[
                "Cadastro de até 20 boletos por mês",
                "Alertas diários próximos ao vencimento",
                "Controle de contas a receber",
                "Resumo mensal de entradas e saídas",
                "Suporte com resposta prioritária",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="w-full bg-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <div className="mb-12 max-w-xl mx-auto text-center">
            <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">
              Perguntas frequentes
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-blue-950 leading-tight">
              Dúvidas comuns antes de começar.
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="w-full bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 text-center">
          <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">
            Comece hoje
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-blue-950 leading-tight max-w-2xl mx-auto">
            Organize a rotina financeira do seu MEI ainda hoje.
          </h2>
          <p className="mt-5 text-slate-600 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Manda um oi no WhatsApp e a gente te explica como começar a receber
            os boletos em cópia esta semana.
          </p>
          <div className="mt-9 flex justify-center">
            <WhatsAppButton size="lg">Organizar meus boletos agora</WhatsAppButton>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="w-full bg-blue-950 border-t border-blue-900">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-900 border border-blue-800 overflow-hidden">
                  <LogoIcon className="h-6 w-6" />
                </div>
                <span className="font-display text-white font-bold text-sm">
                  Assessoria de Boletos
                </span>
              </div>
              <p className="text-blue-300 text-xs leading-relaxed max-w-xs">
                Organização e triagem para MEIs. Nunca movimentamos seu dinheiro.
              </p>
            </div>

            {/* Contact */}
            <div>
              <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
                Fale com a gente
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-blue-100 text-sm mb-3 transition-colors duration-300 hover:text-green-400"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                WhatsApp
              </a>
              <a
                href="mailto:contato@assessoriadeboletos.com.br"
                className="flex items-center gap-2.5 text-blue-100 text-sm transition-colors duration-300 hover:text-green-400"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                contato@assessoriadeboletos.com.br
              </a>
            </div>

            {/* Social */}
            <div>
              <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
                Redes sociais
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 border border-blue-800 text-blue-100 transition-all duration-300 hover:bg-green-500 hover:text-blue-950 hover:-translate-y-0.5"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="mailto:contato@assessoriadeboletos.com.br"
                  aria-label="E-mail"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 border border-blue-800 text-blue-100 transition-all duration-300 hover:bg-green-500 hover:text-blue-950 hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-blue-400 text-xs">
              © {new Date().getFullYear()} Assessoria de Boletos. Todos os direitos reservados.
            </span>
            <span className="text-blue-500 text-xs text-center sm:text-right">
              Apenas triagem e notificação · zero acesso ao seu dinheiro
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
