'use client';

import { useState, useRef, ChangeEvent } from 'react';
import html2canvas from 'html2canvas';
import { Upload, Download, Settings, FileImage, Image as ImageIcon, Phone, Instagram } from 'lucide-react';

export default function AdGeneratorApp() {
  const [logo, setLogo] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [motoImage, setMotoImage] = useState<string | null>(null);

  const [marca, setMarca] = useState('NOME DA MARCA');
  const [modelo, setModelo] = useState('MODELO DA MOTO');
  const [caracteristicas, setCaracteristicas] = useState(
    '✔️ Motor Elétrico 3000W\n✔️ Velocidade máx: 80km/h\n✔️ Autonomia de 60km\n✔️ Painel Digital\n✔️ Freios a disco'
  );
  const [infoExtra, setInfoExtra] = useState('Sem necessidade de CNH* (verifique a legislação local). Ideal para o dia a dia na cidade!');
  const [valorVista, setValorVista] = useState('R$ 14.990,00');
  const [valorParcelado, setValorParcelado] = useState('12x de R$ 1.350,00');
  const [telefone, setTelefone] = useState('(11) 99999-9999');
  const [instagram, setInstagram] = useState('@sualoja_motos');

  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setter(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const exportAsImage = async () => {
    if (!previewRef.current) return;
    try {
      setIsExporting(true);
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: null,
      });
      canvas.toBlob((blob) => {
        if (!blob) {
          alert('Erro ao processar imagem.');
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const fallbackName = 'moto';
        const formattedName = modelo ? modelo.trim().replace(/\s+/g, '-').toLowerCase() : fallbackName;
        link.download = `anuncio-${formattedName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Failed to export image', error);
      alert('Erro ao gerar a imagem. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 p-4 font-sans sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Formulário (Esquerda) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Settings className="w-6 h-6 text-yellow-500" />
              Gerador de Templates
            </h1>
            <p className="text-zinc-500 mb-6 text-sm">
              Preencha os dados abaixo e veja as alterações em tempo real no card ao lado.
            </p>

            <div className="space-y-5">
              {/* Seção: Imagens */}
              <div className="space-y-4 pb-5 border-b border-zinc-100">
                <h2 className="font-semibold text-lg">Mídias</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Imagem de Fundo (Opcional)</label>
                  <label className="flex items-center justify-center w-full p-3 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setBgImage)} />
                    <div className="flex gap-2 items-center text-zinc-500 text-sm">
                      <ImageIcon className="w-4 h-4" />
                      {bgImage ? 'Fundo definido. Clique para trocar.' : 'Upload Imagem de Fundo (Ex: Arte preta e amarela)'}
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Sua Logomarca (PNG sugerido)</label>
                  <label className="flex items-center justify-center w-full p-3 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setLogo)} />
                    <div className="flex gap-2 items-center text-zinc-500 text-sm">
                      <FileImage className="w-4 h-4" />
                      {logo ? 'Logo enviada. Clique para trocar.' : 'Upload Logo'}
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Foto da Moto (Sem fundo destacado)</label>
                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-xl cursor-pointer hover:bg-yellow-100 transition-colors">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setMotoImage)} />
                    <Upload className="w-8 h-8 text-yellow-600 mb-2" />
                    <span className="text-yellow-700 font-medium">Fazer Upload da Moto</span>
                    <span className="text-yellow-600 text-xs mt-1 text-center">Recomendado: PNG com fundo transparente</span>
                  </label>
                </div>
              </div>

              {/* Seção: Informações */}
              <div className="space-y-4 pb-5 border-b border-zinc-100">
                <h2 className="font-semibold text-lg">Informações da Moto</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Marca</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                      value={marca}
                      onChange={(e) => setMarca(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Modelo</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                      value={modelo}
                      onChange={(e) => setModelo(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Características (Lista)</label>
                  <textarea
                    className="w-full p-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none min-h-[100px]"
                    value={caracteristicas}
                    onChange={(e) => setCaracteristicas(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Informações Adicionais</label>
                  <textarea
                    className="w-full p-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none min-h-[80px]"
                    value={infoExtra}
                    onChange={(e) => setInfoExtra(e.target.value)}
                  />
                </div>
              </div>

              {/* Seção: Preços */}
              <div className="space-y-4">
                <h2 className="font-semibold text-lg">Preços</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Valor à vista</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none font-bold text-green-700"
                      value={valorVista}
                      onChange={(e) => setValorVista(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Parcelamento</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none font-semibold text-blue-700"
                      value={valorParcelado}
                      onChange={(e) => setValorParcelado(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Seção: Contato */}
              <div className="space-y-4 pb-5 border-b border-zinc-100">
                <h2 className="font-semibold text-lg">Contato</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone / WhatsApp</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Visualização (Direita) */}
        <div className="w-full lg:w-2/3 flex flex-col items-center">
          <div className="w-full max-w-[1080px] flex flex-col items-center sticky top-8">
            <div className="flex w-full justify-between items-center mb-4">
              <h2 className="font-bold text-xl text-zinc-700">Preview (1080x1080)</h2>
              <button
                onClick={exportAsImage}
                disabled={isExporting}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-bold py-2 px-6 rounded-full transition-colors disabled:opacity-50"
              >
                {isExporting ? 'Gerando...' : (
                  <>
                    <Download className="w-5 h-5" />
                    Baixar Imagem
                  </>
                )}
              </button>
            </div>

            {/* O Container do Anuncio a ser gerado. Ele usa aspect-square para ter um formato quadrado nativo (tipo Instagram),
                O layout utiliza as cores base preto/cinza e amarelo que representam muito bem motos elétricas. 
                Utiliza container queries e percentuais p/ renderizar bem independentemente do tamanho na tela */}
            <div className="w-full max-w-[800px] border shadow-2xl rounded-sm overflow-hidden bg-zinc-200 aspect-square flex @container">
              <div 
                ref={previewRef} 
                className="w-full h-full relative overflow-hidden font-sans"
                style={{ 
                  // Fallback bg colors se a imagem não for providenciada
                  backgroundColor: '#161618',
                }}
              >
                {/* Imagem de Fundo customizada (se existir) */}
                {bgImage ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center z-0" 
                    style={{ backgroundImage: `url(${bgImage})` }} 
                  />
                ) : (
                  /* Elementos Design Fallback Padrão (Sem imagem de fundo enviada) */
                  <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-zinc-900" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                    <div className="absolute bottom-0 right-0 w-1/3 h-full bg-yellow-500" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
                    <div className="absolute top-0 left-0 w-1/2 h-[120%] bg-zinc-950 opacity-40 transform -rotate-[20deg] origin-top-left"></div>
                    <svg className="absolute w-[20%] h-[20%] opacity-10 top-[20%] right-[10%] fill-yellow-500" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  </div>
                )}

                {/* Conteúdo (Z-Index maior) */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between p-[6%]">
                  
                  {/* Cabeçalho */}
                  <div className="flex justify-between items-start w-full gap-4">
                    {/* Logomarca */}
                    <div className="h-[15cqw] max-w-[60cqw] min-w-[20cqw] flex items-start shrink-0">
                      {logo ? (
                        <img src={logo} alt="Logo" className="max-h-full max-w-full object-contain object-left-top drop-shadow-md" />
                      ) : (
                        <div className="text-white text-[3cqw] font-black italic tracking-widest border-[0.3cqw] border-white px-[2cqw] py-[1cqw]">SUA LOGO</div>
                      )}
                    </div>
                  </div>

                  {/* Meio: Elementos descritivos e Moto */}
                  <div className="relative flex-1 flex my-4">
                    
                    {/* Imagem da Moto */}
                    <div className="absolute w-[60%] h-full right-[-5%] bottom-0 flex items-end justify-center z-20">
                      {motoImage ? (
                        <img src={motoImage} alt="Moto Elétrica" className="max-h-[110%] w-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]" />
                      ) : (
                        <div className="w-full h-3/4 border-4 border-dashed border-zinc-600 rounded-xl flex items-center justify-center text-zinc-500 bg-zinc-800/50 backdrop-blur-sm -rotate-6">
                            Foto da Moto Aqui
                        </div>
                      )}
                    </div>

                    {/* Textos Esquerda */}
                    <div className="w-[50%] h-full flex flex-col justify-center z-30 pt-[5%]">
                      <h3 className="text-yellow-400 font-bold uppercase tracking-widest mb-1 text-[2cqw] leading-none">{marca}</h3>
                      <h1 className="text-white font-black italic uppercase leading-none mb-4 text-[6cqw] drop-shadow-lg">
                        {modelo}
                      </h1>
                      
                      <div className="bg-zinc-950/80 backdrop-blur-md p-4 rounded-xl border-l-4 border-yellow-500 shadow-xl mb-4 w-[110%]">
                        <ul className="text-zinc-200 space-y-2 text-[1.8cqw] font-medium">
                          {caracteristicas.split('\n').map((linha, index) => (
                            <li key={index} className="flex gap-2">
                              <span></span> {linha}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {infoExtra && (
                        <div className="text-zinc-400 text-[1.4cqw] italic bg-zinc-900/60 p-2 rounded max-w-xs leading-tight border border-zinc-800">
                          {infoExtra}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rodapé / Preço */}
                  <div className="w-full mt-auto mb-2 flex items-end justify-between z-30">
                    <div className="flex flex-col bg-yellow-500 rounded-xl px-6 py-3 shadow-[0_10px_30px_rgba(234,179,8,0.3)] border-2 border-yellow-400 transform -skew-x-[10deg] ml-4">
                      <div className="transform skew-x-[10deg]">
                        <span className="block text-zinc-900 text-[1.8cqw] font-bold uppercase tracking-wider mb-1">Por apenas:</span>
                        <div className="text-zinc-950 text-[4cqw] font-black italic leading-none whitespace-nowrap">
                          {valorVista}
                        </div>
                        {valorParcelado && (
                          <div className="mt-1 text-zinc-800 font-bold text-[2cqw] bg-yellow-400 inline-block px-2 rounded-md">
                            ou {valorParcelado}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contatos (Abaixo da moto) */}
                    <div className="flex flex-col items-end gap-3 text-white">
                      {telefone && (
                        <div className="flex items-center justify-center gap-3 bg-zinc-950/80 backdrop-blur-md px-4 py-2.5 rounded-l-full rounded-r-lg border-r-4 border-yellow-500 shadow-xl w-[fit-content]">
                          <Phone className="w-[2.5cqw] h-[2.5cqw] text-yellow-400" />
                          <span className="font-bold text-[2.2cqw] tracking-wide">{telefone}</span>
                        </div>
                      )}
                      {instagram && (
                        <div className="flex items-center justify-center gap-3 bg-zinc-950/80 backdrop-blur-md px-4 py-2.5 rounded-l-full rounded-r-lg border-r-4 border-yellow-500 shadow-xl w-[fit-content]">
                          <Instagram className="w-[2.5cqw] h-[2.5cqw] text-yellow-400" />
                          <span className="font-bold text-[2.2cqw] tracking-wide">{instagram}</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <p className="mt-4 text-zinc-500 text-sm italic">
              A imagem será baixada em alta resolução para que os textos e a moto fiquem super nítidos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
