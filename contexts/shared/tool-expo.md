# Expo SDK 54

**Framework:** React Native com Expo  
**Versão:** ~54.0.33  
**React:** 19.1.0  
**React Native:** 0.81.5

## Configuração Principal

**Arquivo:** `app.json`

```json
{
  "expo": {
    "name": "Arcadex",
    "slug": "arcadex",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "package": "com.rabeek.arcadex"
    },
    "android": {
      "package": "com.rabeek.arcadex",
      "adaptiveIcon": { ... },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-web-browser",
      "@react-native-google-signin/google-signin",
      "expo-font",
      "@react-native-community/datetimepicker",
      "react-native-google-mobile-ads"
    ],
    "scheme": "com.rabeek.arcadex"
  }
}
```

## Scripts Disponíveis

```bash
npm run start      # expo start
npm run android    # expo run:android
npm run ios        # expo run:ios
npm run web        # expo start --web
```

## Plugins Configurados

| Plugin | Propósito |
|--------|-----------|
| `expo-web-browser` | Navegador para autenticação OAuth |
| `@react-native-google-signin/google-signin` | Login com Google |
| `expo-font` | Carregamento de fontes customizadas |
| `@react-native-community/datetimepicker` | Seletores de data/hora |
| `react-native-google-mobile-ads` | Anúncios AdMob |

## Configurações Específicas

### Google Sign-In
- **iOS URL Scheme:** `com.googleusercontent.apps.244804460623-34s85mtuntdm4e1f9l3k3gjbhnpb2ikp`
- **Android Client ID:** `com.googleusercontent.apps.244804460623-34s85mtuntdm4e1f9l3k3gjbhnpb2ikp`
- **Web Client ID:** `com.googleusercontent.apps.244804460623-fnjn7m1nlu1jojrmgmjh7mc0k60eoujo`

### AdMob
- **Android App ID:** `ca-app-pub-4506325131029046~1752141616`
- **iOS App ID:** `ca-app-pub-4506325131029046~1752141616`

## TypeScript

**Arquivo:** `tsconfig.json`

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@firebase/auth": ["./node_modules/@firebase/auth/dist/index.rn.d.ts"]
    }
  }
}
```

## Nova Arquitetura

O app está configurado com `newArchEnabled: true`, utilizando a Nova Arquitetura do React Native (Fabric + TurboModules).
