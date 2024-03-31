# Projeto Push Notification com Expo Bare Workflow

Este projeto é uma aplicação Expo Bare Workflow que implementa o uso do Firebase Cloud Messaging (FCM) para notificações push e notificações locais com agendamento. Com esse projeto, você poderá enviar notificações para dispositivos móveis Android e iOS de forma remota utilizando o FCM, bem como agendar notificações locais para serem exibidas em momentos específicos.

## Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina. Você também precisará do Expo CLI para rodar o projeto localmente. Além disso, é necessário ter uma conta no Firebase Console para configurar o Firebase Cloud Messaging.

## Configuração

1. **Clone o repositório:**
    ```
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

2. **Navegue até o diretório do projeto:**
    ```
    cd nome-do-repositorio
    ```

3. **Instale as dependências do projeto:**
    ```
    npm install
    ```

4. **Configure o Firebase:**
   - Crie um novo projeto no [Firebase Console](https://console.firebase.google.com/).
   - Adicione um aplicativo iOS e/ou Android ao seu projeto Firebase, seguindo as instruções fornecidas.
   - Baixe o arquivo `google-services.json` (para Android) e/ou `GoogleService-Info.plist` (para iOS) e coloque-os na pasta `./android/app` (para Android) e/ou `./ios` (para iOS) do seu projeto.
   - Copie o Sender ID do seu projeto Firebase.
   - Cole o Sender ID no arquivo `./src/config/firebaseConfig.js`.

5. **Execute o projeto:**

   - Para iOS:
        ```
        npx pod-install
        npx react-native run-ios
        ```

   - Para Android:
        ```
        npx react-native run-android
        ```

   Isso iniciará o aplicativo em um emulador ou dispositivo físico.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
