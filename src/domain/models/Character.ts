/**
 * Interface para o modelo completo do personagem
 * Responsabilidade: Representar um personagem completo com todos os componentes
 *
 * Este modelo combina os componentes modulares (Basic, Profile, Attributes)
 * para formar um personagem completo no sistema GURPS.
 */

import { CharacterBasic } from './CharacterBasic';
import { CharacterProfile } from './CharacterProfile';
import { CharacterAttributes } from './CharacterAttributes';

export interface Character {
  basic: CharacterBasic;
  profile: CharacterProfile;
  attributes: CharacterAttributes;
}
