import { useState } from "react";
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, TextMessageBoxFile, TextMessageBoxSelect } from "../../components"

interface Message {
  text: string;
}



export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (message: string) => {
    setIsLoading(true);
    setMessages([...messages, { text: message, isGpt: false }]);

    // TODO: UseCase
    setIsLoading(false);
    // TODO: Añadir el mensaje de respuesta con isGpt: true
  }


  return (
    <div className="chat-container" >
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="¡Hola! Soy err Chapty, un modelo de lenguaje de inteligencia artificial. ¿En qué puedo ayudarte hoy?" />

          {/* Mensajes */}
          {
            messages.map((message, index) => {
              if (message.isGpt) {
                return <GptMessage key={index} text={message.text} />
              } else {
                return <MyMessage key={index} text={message.text} />
              }
            })
          }

          {/* Loader */}
          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }

        </div>
      </div>
      <TextMessageBox
        // onSendMessage={(message) => console.log(message)}
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections // esto es como mandar true
      />
      {/* <TextMessageBoxFile
        // onSendMessage={(message) => console.log(message)}
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
      /> */}
      {/* <TextMessageBoxSelect
        // onSendMessage={(message) => console.log(message)}
        onSendMessage={console.log}
        placeholder="Escribe aquí lo que deseas"
        options={[{id: '1', text: 'Opción 1'}, {id: '2', text: 'Opción 2'}, {id: '3', text: 'Opción 3'}]}
      /> */}
    </div>
  )
}
