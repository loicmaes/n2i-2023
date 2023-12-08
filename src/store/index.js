import { createStore } from 'vuex'
import {login} from "@/assets/functions/authentication.js";

export default createStore({
  state: {
    // Game
    game: undefined,
    leaderBoard: undefined,
    recap: undefined,
    // Lang messages
    lang: {
      register: {
        title: `Inscription`,
        btn: `Créer mon compte`,
        creating: `Création du compte...`,
        secondary_action: `J'ai déjà un compte.`,
        placeholders: {
          username: `Nom d'utilisateur`,
          password: `Mot de passe`,
          confirm: `Confirmer le mot de passe`
        }
      },
      login: {
        title: `Connexion`,
        btn: `Continuer l'aventure`,
        signing: `Connexion...`,
        secondary_action: `Je n'ai pas de compte.`,
        placeholders: {
          username: `Nom d'utilisateur`,
          password: `Mot de passe`
        }
      },
      default_placeholder: 'Écrivez quelque chose...',
      game: {
        menu: {
          title: `EcoVenture`,
          play_btn: 'Jouer',
          new_btn: 'Nouvelle partie',
          continue_btn: 'Reprendre',
          quit_btn: `Quitter`
        },
        next_btn: `Jeu suivant ›`,
        right_price: {
          first_step: `Estime le nombre :`,
          steps_left: `C'est %dir ! Il te reste %tries essais.`,
          placeholder: `Trouve le nombre`,
          skip: `Passer à la suite ›`
        }
      }
    }
  },
  getters: {},
  mutations: {
    storeGame (state, payload) {
      const game = {
        ...payload.game,
        round: undefined
      }
      if (payload.token) login(payload.token)
      state.game = game
    },
    updateRoundInfo (state, payload) {
      state.game.round = payload
    },
    clearGame (state) {
      state.game = undefined
    },
    incrementScore (state, payload = 1) {
      state.game.score += payload
    },
    storeRecap (state, payload) {
      state.recap = payload
    },
    storeLeader (state, payload) {
      state.leaderBoard = payload
    }
  },
  actions: {},
  modules: {}
})
