import React from 'react';
import { Congregation } from '../../types';
import { MapPin, Phone, Mail, Clock, Navigation, X, ExternalLink } from 'lucide-react';

interface MapModalProps {
  congregation: Congregation | null;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ congregation, onClose }) => {
  if (!congregation) return null;

  const lat = congregation.coordinates?.lat ?? congregation.lat ?? null;
  const lng = congregation.coordinates?.lng ?? congregation.lng ?? null;
  const hasCoordinates = lat !== null && lng !== null;
  const mapOsmUrl = hasCoordinates
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`
    : '';

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-card overflow-hidden shadow-2xl space-y-0 relative border border-ieca-gray-border animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-ieca-black text-white p-5 flex items-center justify-between border-b-4 border-ieca-coral">
          <div>
            <span className="bg-ieca-green-light text-ieca-green text-xs font-bold px-2.5 py-0.5 rounded">
              {congregation.province}
            </span>
            <h3 className="font-serif font-bold text-2xl text-white mt-1">
              {congregation.name}
            </h3>
            <p className="text-xs text-ieca-coral font-medium">{congregation.synod}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left: Interactive Map Container */}
          <div className="md:col-span-7 bg-gray-100 h-64 md:h-full relative min-h-[300px]">
            {hasCoordinates ? (
              <>
                <iframe 
                  title={congregation.name}
                  src={mapOsmUrl}
                  className="w-full h-full border-none"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1.5 rounded shadow text-ieca-black flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-ieca-coral" />
                  <span>{lat!.toFixed(4)}, {lng!.toFixed(4)}</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-center text-sm text-gray-600 px-6">
                Coordenadas indisponíveis para esta congregação.
              </div>
            )}
          </div>

          {/* Right: Contact & Details */}
          <div className="md:col-span-5 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4 text-xs text-ieca-black">
              <div>
                <span className="text-[11px] font-bold text-ieca-coral uppercase tracking-wider block mb-1">Pastor Responsável:</span>
                <span className="font-semibold text-sm text-ieca-black">{congregation.pastor ?? 'Pastor não informado'}</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-ieca-coral uppercase tracking-wider block mb-1">Endereço Completo:</span>
                <p className="flex items-start gap-1.5 text-gray-700">
                  <MapPin className="w-4 h-4 text-ieca-coral flex-shrink-0 mt-0.5" />
                  <span>{congregation.address}, {congregation.city}, Província do {congregation.province}</span>
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-ieca-coral uppercase tracking-wider block mb-1">Contactos Diretos:</span>
                <div className="space-y-1.5 text-gray-700">
                  {congregation.phone ? (
                    <div className="flex items-center gap-2">
                      <a 
                        href={`tel:${congregation.phone.replace(/\s+/g, '')}`}
                        className="flex items-center gap-1.5 hover:text-ieca-coral text-ieca-black font-medium transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-ieca-coral" />
                        <span>{congregation.phone}</span>
                      </a>
                      <a 
                        href={`https://wa.me/${congregation.phone.replace(/\D/g, '')}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-green-100 text-green-700 hover:bg-green-200 text-[10px] font-bold px-2 py-0.5 rounded transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-400">Contacto telefónico não disponível</span>
                  )}
                  {congregation.email && (
                    <a 
                      href={`mailto:${congregation.email}`}
                      className="flex items-center gap-1.5 hover:text-ieca-coral text-gray-700 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-ieca-coral" />
                      <span>{congregation.email}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Cultos list */}
              <div className="bg-ieca-beige-light p-3 rounded-md space-y-1 border border-ieca-beige">
                <span className="text-[11px] font-bold text-ieca-black uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-ieca-coral" />
                  Horários dos Cultos:
                </span>
                {congregation.services.map((srv, idx) => (
                  <div key={idx} className="text-[11px]">
                    <strong className="text-ieca-black">{srv.day} ({srv.time}):</strong> {srv.type}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              {hasCoordinates ? (
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-ieca-coral hover:bg-ieca-coral-hover text-white text-xs font-bold py-2.5 px-3 rounded shadow transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Abrir no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="w-full bg-gray-200 text-gray-600 text-xs font-bold py-2.5 px-3 rounded shadow text-center">
                  Google Maps indisponível
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
