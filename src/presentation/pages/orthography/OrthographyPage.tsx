import { useState } from "react";
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, GptOrthographyMessage } from "../../components"
import { OrthographyUseCase } from "../../../core/use-cases/orthography.use-case";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors:string[];
    message: string;
  }
}



export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false }] );


    const {ok, errors, message, userScore} = await OrthographyUseCase(text);

    if (!ok) {
      setMessages( (prev) => [...prev, { text: 'No se pudo realizar la correción', isGpt: true }] );
    } else {
      setMessages( (prev) => [...prev, { text: message, isGpt: true, info: { userScore, errors, message } }] );
    }


    setIsLoading(false);
    
  }


  return (
    <div className="chat-container" >
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones" />

          {/* Mensajes */}
          {
            messages.map((message, index) => {
              if (message.isGpt) {
                return <GptOrthographyMessage key={index} {...message.info!} />
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

    </div>
  )
}
