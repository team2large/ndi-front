## NDI Front

#### Environnement local

- Node 16
- `npm i` pour installer les dependances
- `npm run start`

#### Environnement virtuel

- Docker
- `npm run docker`

### Projet

- Tous les paths sont absolus et partent du dossier src. NE PAS UITLISER DE PATH RELATIF
### Linting

- Un pre-commit hook est configuré pour détecter les erreurs de linting avant chaque commit.
- Si des erreurs se sont glissé dans le code et peuvent être résoudre automatiquement, utilisez `npm run lint:fix` pour les corriger.
- N'abusez pas des désactivations des règles ESlint !

### CSS

- Tout le css du projet est écrit en SCSS.
- Le fichier `src/styles/utils.scss` contient toutes les variables et mixins utilisées dans le projet.
- Chaque fichier de scss doit être écrit sous la forme `[nomDuFichier].module.scss`.
- Un exemple est présent dans `src/components/Home.jsx` et `src/styles/home.module.scss`.
