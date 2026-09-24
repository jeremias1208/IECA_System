import React, { useState } from 'react';
import { HeroBanner } from '../components/ui/HeroBanner';
import { MOCK_DONATION_ACCOUNTS } from '../data/mockData';
import { 
  Heart, 
  Building2, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  Globe, 
  BookOpen, 
  GraduationCap, 
  Stethoscope, 
  Info,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';
import photoDondi from '../data/images/dondi.png';

export const DonationsPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('Oferta Geral & Missões');
  
  // Interactive Form State
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyIBAN = (iban: string, id: string) => {
    navigator.clipboard.writeText(iban);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-0 pb-16 space-y-12">
      {/* Hero Banner */}
      <HeroBanner
        eyebrow="Apoie a Missão da Igreja"
        title="Fazer uma Doação à IECA"
        imageSrc={photoDondi}
        description="Contribua para a expansão do Evangelho, manutenção dos Templos, acção social nas comunidades e formação de novas gerações em Angola."
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-card text-white text-xs space-y-1 max-w-sm">
          <div className="flex items-center gap-2 font-bold text-ieca-gold text-sm">
            <ShieldCheck className="w-4 h-4 text-ieca-gold" />
            <span>Transparência & Meios Oficiais</span>
          </div>
          <p className="text-gray-200 leading-relaxed">
            Todas as contribuições são geridas pelo Departamento de Finanças da IECA e aplicadas estritamente nos fins institucionais e sociais.
          </p>
        </div>
      </HeroBanner>

      {/* Intro Quote & Objectives */}
      <div className="bg-gradient-to-br from-gray-900 to-ieca-black text-white p-8 rounded-card border border-gray-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Heart className="w-80 h-80 text-ieca-coral" />
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-ieca-gold bg-ieca-gold/10 px-3 py-1 rounded-full border border-ieca-gold/20">
            2 Coríntios 9:7
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
            "Cada um contribua segundo propôs no seu coração; não com tristeza, nem por constrangimento; porque Deus ama ao que dá com alegria."
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            O seu apoio voluntário sustenta o trabalho missionário nos sínodos provinciais, alimenta projetos sociais de saúde e alfabetização e preserva o nosso património histórico de mais de 140 anos.
          </p>
        </div>
      </div>

      {/* Financial Accounts Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-ieca-black flex items-center gap-2">
              <Building2 className="w-6 h-6 text-ieca-coral" />
              Contas Bancárias Oficiais da IECA
            </h2>
            <p className="text-sm text-ieca-gray">
              Utilize o IBAN correspondente ao canal pretendido para a sua transferência ou depósito direto.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_DONATION_ACCOUNTS.map((acc) => {
            const isCopied = copiedId === acc.id;
            return (
              <div 
                key={acc.id}
                className="bg-white p-6 rounded-card border border-ieca-gray-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-ieca-beige text-ieca-black rounded-full border border-ieca-gold/30">
                      {acc.currency}
                    </span>
                    <Building2 className="w-5 h-5 text-gray-400 group-hover:text-ieca-coral transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-ieca-black">{acc.bankName}</h3>
                    <p className="text-xs text-ieca-gray font-medium mt-0.5">{acc.accountName}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-btn border border-gray-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Objetivo / Destino:</span>
                    <p className="text-xs font-semibold text-gray-800">{acc.purpose}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold uppercase text-ieca-gray">IBAN do Beneficiário:</span>
                  <div className="flex items-center gap-2 bg-gray-900 text-white p-2.5 rounded-btn font-mono text-xs overflow-x-auto justify-between">
                    <span className="select-all tracking-wider text-ieca-gold font-bold">{acc.iban}</span>
                    <button
                      onClick={() => handleCopyIBAN(acc.iban, acc.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${
                        isCopied
                          ? 'bg-ieca-green text-white'
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                      title="Copiar IBAN"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Areas of Impact */}
      <div className="bg-ieca-beige-light p-8 rounded-card border border-ieca-gold/20 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-xl font-extrabold text-ieca-black">Onde o Seu Apoio Transforma Vidas</h3>
          <p className="text-sm text-ieca-gray">
            A IECA canaliza recursos para 4 pilares fundamentais da missão da igreja em Angola:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-card border border-gray-200 space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-ieca-coral flex items-center justify-center mx-auto">
              <Globe className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-ieca-black">Evangelismo & Missões</h4>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Plantação de novas congregações em áreas rurais e urbanas, formação pastoral e envio de missionários.
            </p>
          </div>

          <div className="bg-white p-5 rounded-card border border-gray-200 space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-ieca-gold flex items-center justify-center mx-auto">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-ieca-black">Educação e Escolas</h4>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Manutenção dos institutos e escolas comunitárias que garantem ensino primário e secundário a milhares de jovens.
            </p>
          </div>

          <div className="bg-white p-5 rounded-card border border-gray-200 space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-ieca-green flex items-center justify-center mx-auto">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-ieca-black">Saúde e Ação Social</h4>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Dispensários médicos, centros de nutrição infantil e programas de combate à vulnerabilidade social.
            </p>
          </div>

          <div className="bg-white p-5 rounded-card border border-gray-200 space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-ieca-black">Património Histórico</h4>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Reabilitação dos templos centenários do Dôndi, Chilume, Camundongo, Chissamba e Silva Porto.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Form & Contact Support */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-card border border-ieca-gray-border shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-ieca-black flex items-center gap-2">
              <Heart className="w-5 h-5 text-ieca-coral" />
              Manifestar Intenção de Doação / Solicitar Recibo
            </h3>
            <p className="text-xs text-ieca-gray mt-1">
              Preencha o formulário para registar a sua oferta, informar o Departamento de Finanças ou solicitar comprovativo institucional.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-card text-center space-y-3">
              <div className="w-12 h-12 bg-ieca-green text-white rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-emerald-900">Agradecemos o Seu Apoio!</h4>
              <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                A sua manifestação de doação foi enviada com sucesso para o Secretariado de Finanças da IECA. Que Deus abençoe abundantemente a sua vida e família!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-ieca-green text-white font-bold text-xs rounded-btn hover:bg-emerald-700 transition-colors"
              >
                Enviar Nova Manifestação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-ieca-gray mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome ou da instituição"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-ieca-gray mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+244 9XX XXX XXX"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-ieca-gray mb-1">
                    Endereço de Email (Opcional)
                  </label>
                  <input
                    type="email"
                    placeholder="seu.email@exemplo.ao"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-ieca-gray mb-1">
                    Valor Estimado (AOA / USD)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 50.000 AOA"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-ieca-gray mb-1">
                  Finalidade da Doação
                </label>
                <select
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral bg-white"
                >
                  <option value="Oferta Geral & Missões">Oferta Geral & Missões</option>
                  <option value="Dízimos Congregacionais">Dízimos Congregacionais</option>
                  <option value="Projetos Sociais (Educação e Saúde)">Projetos Sociais (Educação e Saúde)</option>
                  <option value="Reabilitação de Templos Históricos">Reabilitação de Templos Históricos</option>
                  <option value="Coordenação de Crianças e Adolescentes">Coordenação de Crianças e Adolescentes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-ieca-gray mb-1">
                  Observações / Mensagem
                </label>
                <textarea
                  rows={3}
                  placeholder="Escreva detalhes adicionais ou número da nota de transferência..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-ieca-coral text-white font-bold text-sm rounded-btn hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submeter Manifesto de Doação</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Box & FAQ */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-card border border-ieca-gray-border shadow-sm space-y-4">
            <h4 className="font-extrabold text-base text-ieca-black flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-ieca-gold" />
              Contacto do Departamento de Finanças
            </h4>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Para confirmação de depósitos, emissão de recibos institucionais ou doações internacionais via SWIFT:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-btn border border-gray-100">
                <Phone className="w-4 h-4 text-ieca-coral flex-shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Atendimento Telefónico</span>
                  <span className="text-xs font-bold text-ieca-black">+244 923 000 111 / +244 912 000 222</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-btn border border-gray-100">
                <Mail className="w-4 h-4 text-ieca-coral flex-shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Correio Eletrónico Oficial</span>
                  <span className="text-xs font-bold text-ieca-black">financas@ieca.ao / doacoes@ieca.ao</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-ieca-black text-white p-6 rounded-card border border-gray-800 space-y-3">
            <div className="flex items-center gap-2 font-bold text-ieca-gold text-sm">
              <Info className="w-4 h-4 text-ieca-gold" />
              <span>Dúvidas Frequentes</span>
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <p className="font-semibold text-white">1. Como recebo o comprovativo oficial?</p>
              <p className="text-gray-400 leading-relaxed">
                Após efetuar a transferência, envie a cópia para <strong className="text-white">financas@ieca.ao</strong> ou via formulário para receber o recibo da tesouraria nacional.
              </p>
              <p className="font-semibold text-white pt-2">2. Posso doar em espécie ou bens materiais?</p>
              <p className="text-gray-400 leading-relaxed">
                Sim. Doações de materiais escolares, medicamentos e alimentos podem ser entregues em qualquer Secretaria Provincial do Sínodo ou na Sede Nacional no Morro Bento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
