import { Pastorate } from '../types';
import abelHungulo from './images/Sinodo Provincial de Luanda/Pastor Abel Hungulo, titular do Pastorado de Samaria.jpg';
import abiasCauto from './images/Sinodo Provincial de Luanda/Pastor Abias Cauto, titular do Pastorado de Nova Vida.jpg';
import arnaldoMario from './images/Sinodo Provincial de Luanda/Pastor Arnaldo Cambonguele Mário titular do pastorado de Bereia.jpg';
import arturSanana from './images/Sinodo Provincial de Luanda/Pastor Artur Sanana, titular do Pastorado de Jericó.jpg';
import azevedoGueve from './images/Sinodo Provincial de Luanda/Pastor Azevedo Bango Gueve, titular do Pastorado de Monte Moriá -Viana.jpg';
import bonifacioCassoma from './images/Sinodo Provincial de Luanda/Pastor Bonifácio Cassoma, titular do Pastorado de Boa Nova.jpg';
import edgarSilva from './images/Sinodo Provincial de Luanda/Pastor Edgar Ernesto da Silva, titular do Pastorado de Emanuel e Director do Sínodo Local Norte.jpg';
import ernestoChinjenje from './images/Sinodo Provincial de Luanda/Pastor Ernesto Ngonga Chinjenje, titular do Pastorado de Filadélfia-Viana.jpg';
import gervazAbreu from './images/Sinodo Provincial de Luanda/Pastor Gervaz Abreu, Pastor no Pastorado de Boa Vista.jpg';
import horacioDumbo from './images/Sinodo Provincial de Luanda/Pastor Horácio Dumbo, titular do Pastorado de Nova Alegria-Samba.jpg';
import jorgeBoaz from './images/Sinodo Provincial de Luanda/Pastor Jorge Boaz, titular do Pastorado de Peregrinos.jpg';
import jorgeSalomao from './images/Sinodo Provincial de Luanda/Pastor Jorge Salomão, titular do Pastorado de Sião.jpg';
import linoSambambi from './images/Sinodo Provincial de Luanda/Pastor Lino Sambambi, titular do Pastorado de Ramiros.jpg';
import lusitanoButica from './images/Sinodo Provincial de Luanda/Pastor Lusitano Nhime Butica, titular do Pastorado de Nova Estrela.jpg';
import misaelHenriques from './images/Sinodo Provincial de Luanda/Pastor Misael Henriques, titular dos Pastorados de Dama e Boa Vista.jpg';
import noeKussivila from './images/Sinodo Provincial de Luanda/Pastor Noé Kussivila, titular do Pastorado de Betel.jpg';
import pedroCanivete from './images/Sinodo Provincial de Luanda/Pastor Pedro Júlio Canivete de Andrade, Secretário Provincial adjunto e titular do Pastorado de Vista Alegre - Director do Sínodo Local da Samba.jpg';
import pedroCatumbela from './images/Sinodo Provincial de Luanda/Pastor Pedro Santos Catumbela, titular do Pastorado de São João.jpg';
import queridoCapinala from './images/Sinodo Provincial de Luanda/Pastor Querido Capinãla, titular do Pastorado de Palestina.jpg';
import josefinaHungulo from './images/Sinodo Provincial de Luanda/Pastora Josefina Ilda Hungulo, titular do Pastorado de Belo Monte.jpg';
import paulinaAbreu from './images/Sinodo Provincial de Luanda/Pastora Paulina Caholo Abreu, titular do Pastorado de Bela Vista.jpg';
import rodeMario from './images/Sinodo Provincial de Luanda/Pastora Rode Mário, titular dos Pastorados de Boa Esperança e Caridade, Directora do Sínodo Local de Viana.jpg';
import teresaEurico from './images/Sinodo Provincial de Luanda/Pastora Teresa Gerente Eurico, titular do Pastorado de Monte Sinai.jpg';
import urracaSalomao from './images/Sinodo Provincial de Luanda/Pastora Urraca Salomão - Pastora no Pastorado de Sião.jpg';

const LUANDA_SYNOD = 'Sínodo Provincial de Luanda';
const PASTOR_TITLE = 'Pastor(a) titular';

const pastorate = (id: string, name: string, pastor: string, pastorPhoto: string): Pastorate => ({
  id,
  name,
  location: 'Luanda',
  province: 'Luanda',
  pastor,
  pastorTitle: PASTOR_TITLE,
  pastorPhoto,
  synod: LUANDA_SYNOD
});

export const LUANDA_PASTORATES: Pastorate[] = [
  pastorate('luanda-samaria', 'Pastorado de Samaria', 'Pastor Abel Hungulo', abelHungulo),
  pastorate('luanda-nova-vida', 'Pastorado de Nova Vida', 'Pastor Abias Cauto', abiasCauto),
  pastorate('luanda-bereia', 'Pastorado de Bereia', 'Pastor Arnaldo Cambonguele Mário', arnaldoMario),
  pastorate('luanda-jerico', 'Pastorado de Jericó', 'Pastor Artur Sanana', arturSanana),
  pastorate('luanda-monte-moria', 'Pastorado de Monte Moriá - Viana', 'Pastor Azevedo Bango Gueve', azevedoGueve),
  pastorate('luanda-boa-nova', 'Pastorado de Boa Nova', 'Pastor Bonifácio Cassoma', bonifacioCassoma),
  pastorate('luanda-emanuel', 'Pastorado de Emanuel', 'Pastor Edgar Ernesto da Silva', edgarSilva),
  pastorate('luanda-filadelfia', 'Pastorado de Filadélfia - Viana', 'Pastor Ernesto Ngonga Chinjenje', ernestoChinjenje),
  pastorate('luanda-boa-vista', 'Pastorado de Boa Vista', 'Pastor Gervaz Abreu', gervazAbreu),
  pastorate('luanda-nova-alegria', 'Pastorado de Nova Alegria - Samba', 'Pastor Horácio Dumbo', horacioDumbo),
  pastorate('luanda-peregrinos', 'Pastorado de Peregrinos', 'Pastor Jorge Boaz', jorgeBoaz),
  pastorate('luanda-siao-jorge', 'Pastorado de Sião', 'Pastor Jorge Salomão', jorgeSalomao),
  pastorate('luanda-ramiros', 'Pastorado de Ramiros', 'Pastor Lino Sambambi', linoSambambi),
  pastorate('luanda-nova-estrela', 'Pastorado de Nova Estrela', 'Pastor Lusitano Nhime Butica', lusitanoButica),
  pastorate('luanda-dama', 'Pastorado de Dama', 'Pastor Misael Henriques', misaelHenriques),
  pastorate('luanda-betel', 'Pastorado de Betel', 'Pastor Noé Kussivila', noeKussivila),
  pastorate('luanda-vista-alegre', 'Pastorado de Vista Alegre', 'Pastor Pedro Júlio Canivete de Andrade', pedroCanivete),
  pastorate('luanda-sao-joao', 'Pastorado de São João', 'Pastor Pedro Santos Catumbela', pedroCatumbela),
  pastorate('luanda-palestina', 'Pastorado de Palestina', 'Pastor Querido Capinãla', queridoCapinala),
  pastorate('luanda-belo-monte', 'Pastorado de Belo Monte', 'Pastora Josefina Ilda Hungulo', josefinaHungulo),
  pastorate('luanda-bela-vista', 'Pastorado de Bela Vista', 'Pastora Paulina Caholo Abreu', paulinaAbreu),
  pastorate('luanda-boa-esperanca', 'Pastorado de Boa Esperança', 'Pastora Rode Mário', rodeMario),
  pastorate('luanda-monte-sinai', 'Pastorado de Monte Sinai', 'Pastora Teresa Gerente Eurico', teresaEurico),
  pastorate('luanda-siao-urraca', 'Pastorado de Sião', 'Pastora Urraca Salomão', urracaSalomao)
];