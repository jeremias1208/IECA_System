import { useState } from 'react';
import { MapPin, UserCheck, X } from 'lucide-react';

interface Pastorate {
  id: string;
  name: string;
  pastor: string;
  pastorTitle?: string;
  location: string;
  synod?: string;
  establishedYear?: number;
  pastorPhoto?: string;
}

interface PastorateCardProps {
  pastorate: Pastorate;
}

export default function PastorateCard({ pastorate }: PastorateCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          group w-full text-left
          bg-white p-4 rounded-card
          border border-gray-200
          shadow-sm
          hover:border-ieca-coral
          hover:shadow-xl
          hover:-translate-y-1
          transition-all duration-300 ease-out
          cursor-pointer
          focus:outline-none
          focus:ring-2
          focus:ring-ieca-coral/40
        "
      >
        {/* Fotografia */}
        {pastorate.pastorPhoto ? (
          <div className="relative overflow-hidden rounded-card mb-4">
            <img
              src={pastorate.pastorPhoto}
              alt={pastorate.pastor}
              className="
                w-full h-40
                object-cover
                transition-transform duration-500
                group-hover:scale-105
              "
            />

            {/* Overlay */}
            <div
              className="
                absolute inset-0
                bg-black/0
                group-hover:bg-black/40
                transition-colors duration-300
                flex items-center justify-center
              "
            >
              <span
                className="
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-300
                  bg-white/90
                  text-ieca-black
                  px-4 py-2
                  rounded-full
                  text-xs
                  font-bold
                  shadow-lg
                "
              >
                Ver detalhes
              </span>
            </div>
          </div>
        ) : (
          <div
            className="
              w-full h-40
              rounded-card
              bg-gray-100
              flex items-center justify-center
              text-gray-400
              mb-4
            "
          >
            Sem fotografia
          </div>
        )}

        {/* Informações principais */}
        <div className="space-y-2">
          <span
            className="
              inline-flex
              text-[10px]
              uppercase
              font-bold
              text-ieca-gold
              bg-amber-50
              px-2 py-1
              rounded
              border border-amber-200
            "
          >
            {pastorate.establishedYear
              ? `Fundado em ${pastorate.establishedYear}`
              : 'Pastorado'}
          </span>

          <h5 className="font-bold text-sm text-ieca-black leading-snug">
            {pastorate.name}
          </h5>

          {pastorate.synod && (
            <p className="text-[11px] text-ieca-gray">
              {pastorate.synod}
            </p>
          )}
        </div>

        {/* Pastor / Local */}
        <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
          <div className="text-ieca-coral font-bold flex items-start gap-2 text-xs">
            <UserCheck className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />

            <span>
              {pastorate.pastorTitle ?? 'Pastor'}: {pastorate.pastor}
            </span>
          </div>

          <div className="text-ieca-gray text-[11px] flex items-start gap-2">
            <MapPin className="w-3 h-3 mt-0.5 text-gray-400 flex-shrink-0" />

            <span>
              Local: {pastorate.location}
            </span>
          </div>
        </div>
      </button>

      {/* MODAL */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/60
            backdrop-blur-sm
            flex items-center justify-center
            p-4
          "
          onClick={() => setIsOpen(false)}
        >
          <div
            className="
              relative
              w-full max-w-3xl
              max-h-[90vh]
              overflow-y-auto
              bg-white
              rounded-2xl
              shadow-2xl
              animate-[modalIn_0.25s_ease-out]
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Fechar */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar"
              className="
                absolute
                top-4 right-4
                z-10
                w-10 h-10
                rounded-full
                bg-black/60
                text-white
                flex items-center justify-center
                hover:bg-black/80
                transition-colors
              "
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Fotografia grande */}
              <div className="bg-gray-100">
                {pastorate.pastorPhoto ? (
                  <img
                    src={pastorate.pastorPhoto}
                    alt={pastorate.pastor}
                    className="
                      w-full
                      h-[350px]
                      md:h-full
                      min-h-[450px]
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      min-h-[350px]
                      md:min-h-[450px]
                      flex items-center justify-center
                      text-gray-400
                    "
                  >
                    Sem fotografia
                  </div>
                )}
              </div>

              {/* Detalhes */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span
                  className="
                    inline-flex w-fit
                    text-[10px]
                    uppercase
                    font-bold
                    text-ieca-gold
                    bg-amber-50
                    px-3 py-1
                    rounded-full
                    border border-amber-200
                  "
                >
                  {pastorate.establishedYear
                    ? `Fundado em ${pastorate.establishedYear}`
                    : 'Pastorado'}
                </span>

                <h2
                  className="
                    mt-4
                    text-2xl md:text-3xl
                    font-bold
                    text-ieca-black
                    leading-tight
                  "
                >
                  {pastorate.name}
                </h2>

                {pastorate.synod && (
                  <p className="mt-2 text-sm text-ieca-gray">
                    {pastorate.synod}
                  </p>
                )}

                {/* Informações */}
                <div className="mt-7 space-y-5">

                  {/* Pastor */}
                  <div className="flex gap-3">
                    <div
                      className="
                        w-10 h-10
                        rounded-full
                        bg-red-50
                        flex items-center justify-center
                        flex-shrink-0
                      "
                    >
                      <UserCheck className="w-5 h-5 text-ieca-coral" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Responsável
                      </p>

                      <p className="text-sm font-bold text-ieca-black">
                        {pastorate.pastorTitle ?? 'Pastor'}:{' '}
                        {pastorate.pastor}
                      </p>
                    </div>
                  </div>

                  {/* Localização */}
                  <div className="flex gap-3">
                    <div
                      className="
                        w-10 h-10
                        rounded-full
                        bg-gray-100
                        flex items-center justify-center
                        flex-shrink-0
                      "
                    >
                      <MapPin className="w-5 h-5 text-gray-500" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Localização
                      </p>

                      <p className="text-sm font-medium text-ieca-black">
                        {pastorate.location}
                      </p>
                    </div>
                  </div>

                  {/* Fundação */}
                  {pastorate.establishedYear && (
                    <div className="flex gap-3">
                      <div
                        className="
                          w-10 h-10
                          rounded-full
                          bg-amber-50
                          flex items-center justify-center
                          flex-shrink-0
                        "
                      >
                        <span className="text-ieca-gold font-bold text-xs">
                          {pastorate.establishedYear}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">
                          Fundação
                        </p>

                        <p className="text-sm font-medium text-ieca-black">
                          Desde {pastorate.establishedYear}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fechar */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="
                    mt-8
                    w-full
                    bg-ieca-coral
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                    text-sm
                    hover:opacity-90
                    transition-opacity
                  "
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}