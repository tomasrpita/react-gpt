import { GptMessage } from "../../components"

export const OrthographyPage = () => {
  return (
    <div className="chat-container" >
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="¡Hola! Soy err Chapty, un modelo de lenguaje de inteligencia artificial. ¿En qué puedo ayudarte hoy?" />
        </div>
      </div>
    </div>
  )
}
